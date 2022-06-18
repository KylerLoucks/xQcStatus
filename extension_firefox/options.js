const notificationDropdown = document.getElementById("notificationSelect");


// set notification to 'all' if there isn't any in storage
browser.storage.sync.get(['notification'], function (result) {
    if (!result.notification) {
        chrome.storage.sync.set({'notification': 'all'})
        notificationDropdown.selectedIndex = 2;
    }
});
// save the notification preference to local storage 
notificationDropdown.onchange = function (event) {
    browser.storage.sync.set({'notification': event.target.value})
};

// keep the notification preference based on what is saved to local storage
browser.storage.sync.get(['notification'], function (result) {
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