# DSA AutoTracker 🚀

A Chrome Extension that helps automate DSA problem tracking.

DSA AutoTracker detects the problem you're currently solving on **LeetCode** or **GeeksforGeeks** and allows you to save the problem details directly into your Google Sheet.

Instead of manually maintaining a DSA revision sheet, the extension automatically captures the problem metadata and lets you enter your own intuition, topics, revision status, and revision dates.

---

## ✨ Features

- Automatically detects the current platform
  - LeetCode
  - GeeksforGeeks
- Automatically detects the problem title
- Automatically captures the problem URL
- Add your own problem intuition
- Add DSA topics
- Track revision status
- Set your own last revision date
- Set your own next revision date
- Save problems directly to Google Sheets
- Uses Google Apps Script as the backend

---

# 🏗️ Architecture

```text
                    LeetCode / GFG
                          │
                          ▼
                 Chrome Content Script
                          │
                          ▼
                   Extension Popup
                          │
                          │ HTTP POST
                          ▼
                  Google Apps Script
                          │
                          ▼
                     Google Sheet

```

# Google Apps Script Backend Setup

DSA AutoTracker uses **Google Apps Script** as a small backend between the Chrome extension and your Google Sheet.

The flow is:

```text
Chrome Extension
       │
       │ POST request
       ▼
Google Apps Script
       │
       │ doPost(e)
       ▼
Google Sheet
