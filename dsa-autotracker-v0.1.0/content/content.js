console.log("DSA AutoTracker content script loaded.");

function getLeetcodeTitle() {
  const part = window.location.pathname.split("/")[2];
  const probLink = document.querySelector(`a[href="/problems/${part}/"]`);
  const textContent = probLink?.textContent;
  const title = textContent?.substring(textContent.indexOf(".") + 1).trim();
  console.log(title);

  return title;
}

function getGFGTitle() {
  return document.querySelector("div.pusher h3")?.textContent.trim();
}

function getProblemTitle() {
  const hostname = window.location.hostname;
  if (hostname === "leetcode.com") {
    return getLeetcodeTitle();
  }
  return getGFGTitle();
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "getProblemTitle") {
    sendResponse({
      title: getProblemTitle(),
    });
  }
});
