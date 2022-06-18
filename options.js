const notificationDropdown = document.getElementById("notificationSelect"); // constant variable for referencing the 'notificationSelect' dropdown


// set notification to 'all' if there isn't any in storage
chrome.storage.sync.get(['notification'], function (result) {
    if (!result.notification) {
        chrome.storage.sync.set({'notification': 'all'})
        notificationDropdown.selectedIndex = 2;
    }
});
// save the notification preference to local storage 
notificationDropdown.onchange = function (event) {
    chrome.storage.sync.set({'notification': event.target.value})
};

// keep the notification preference based on what is saved to local storage
chrome.storage.sync.get(['notification'], function (result) {
  switch (result.notification) {
    case "none":
        notificationDropdown.selectedIndex = 0;
        break;
    case "live":
        notificationDropdown.selectedIndex = 1;
        break;
    case "all":
        notificationDropdown.selectedIndex = 2;
        break;
    default:
        break;
  }
});