const WEB_APP_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";
document.addEventListener("DOMContentLoaded", async () => {
  const status = document.getElementById("status");
  const platformElement = document.getElementById("platform");
  const titleElement = document.getElementById("title");
  const urlElement = document.getElementById("url");
  const jsonElement = document.getElementById("json");

  const intuitionElement = document.getElementById("intuition");
  const revStatusElement = document.getElementById("revStatus");
  const lastRevisedElement = document.getElementById("lastRevised");
  const nextRevisionElement = document.getElementById("nextRevision");
  const topicsElement = document.getElementById("topics");

  const saveButton = document.getElementById("save");

  // --------------------------------------------------
  // 1. Get the currently active tab
  // --------------------------------------------------

  const [tab] = await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });

  if (!tab || !tab.url) {
    status.textContent = "Could not detect the current page.";
    return;
  }

  // --------------------------------------------------
  // 2. Detect platform
  // --------------------------------------------------

  const url = new URL(tab.url);
  const hostname = url.hostname;

  let platform = "Unsupported";

  if (
    hostname === "leetcode.com" ||
    hostname.endsWith(".leetcode.com")
  ) {
    platform = "Leetcode";
  } else if (
    hostname === "geeksforgeeks.org" ||
    hostname.endsWith(".geeksforgeeks.org")
  ) {
    platform = "GFG";
  }

  platformElement.textContent = platform;
  urlElement.textContent = tab.url;

  if (platform === "Unsupported") {
    status.textContent = "This page is not supported yet.";
    return;
  }

  // --------------------------------------------------
  // 3. Get problem title from content.js
  // --------------------------------------------------

  try {
    const response = await chrome.tabs.sendMessage(tab.id, {
      action: "getProblemTitle",
    });

    const problemTitle = response?.title || "Unknown";

    titleElement.textContent = problemTitle;
    status.textContent = "Problem page detected.";

    // --------------------------------------------------
    // 4. Save button
    // --------------------------------------------------

    saveButton.addEventListener("click", async () => {

      // Get values entered/selected by the user
      const intuition = intuitionElement.value;
      const statusValue = revStatusElement.value;
      const topicsValue = topicsElement.value;
      const lastRevised = lastRevisedElement.value;
      const nextRevision = nextRevisionElement.value;

      // Create the problem object
      const problem = {
        platform,
        title: problemTitle,
        status: statusValue,
        questionLink: tab.url,
        intuition,
        topicsValue,
        lastRevised,
        nextRevision,
      };

      // Show the object in console
      console.log("1. Problem:", problem);
      console.log("2. Sending request...");

      try {

        const response = await fetch(WEB_APP_URL, {
          method: "POST",
          body: JSON.stringify(problem),
        });

        console.log("3. Response received:", response);
        console.log("4. Status:", response.status);

        const result = await response.json();

        console.log("5. Response body:", result);

        // Show result in popup
        if (result.success) {
          status.textContent = "Problem saved successfully!";
        } else {
          status.textContent = "Failed to save problem.";
          console.error("Apps Script error:", result.error);
        }
      } catch (error) {
        console.error("6. Fetch error:", error);
        status.textContent = "Failed to save problem.";
      }
    });
  } catch (error) {

    console.error("Could not communicate with content script:", error);

    status.textContent =
      "Could not detect the problem. Please reload the page.";
  }
});
