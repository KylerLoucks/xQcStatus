// listener that creates an alarm that plays every minute
browser.runtime.onInstalled.addListener(async () => {
    browser.alarms.create('statusCheck', { periodInMinutes: 5});
    browser.alarms.create('clipUpdate', { periodInMinutes: 60})
    
    // update local storage clip data and streamer status upon first installing the extension
    const responseData = await getStreamData();
    await updateLocalStorage(responseData.status, responseData.category, responseData.title)
    await updateClipData();
});

// run code when clicking the notification that pops
browser.notifications.onClicked.addListener(async function() {
    let url = '';
    url = 'https://twitch.tv/xqc'
    chrome.tabs.create({
        url: url
    });
});

// run code when the alarm plays
browser.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name == "statusCheck") {
        sendNotification();
    }

    if (alarm.name == "clipUpdate") {
        updateClipData();
    }
    
});


// Make an API call to grab data containing streamer status
async function getStreamData() {
    const res = await fetch("https://km9pm20ikb.execute-api.us-west-2.amazonaws.com/prod/stream", {
    method: 'GET',
    headers: {
        'content-type': 'application/json;'
    },
    mode: 'cors',
    });
    const json = await res.json();
    return json;
}
// Make an API call to grab data containing top 10 clips
async function getClipsData() {
    const res = await fetch("https://km9pm20ikb.execute-api.us-west-2.amazonaws.com/prod/clips", {
    method: 'GET',
    headers: {
        'content-type': 'application/json;'
    },
    mode: 'cors',
    });
    const json = await res.json();
    return json;
}

// Grab data from local storage
async function getLocalStreamData() {
    return new Promise((resolve, reject) => {
      browser.storage.sync.get(['streamData'], (result) => {
        if (Object.keys(result).length !== 0) {
            resolve(result.streamData);
        } else {
            resolve({
                title: "",
                category: "",
                status: "offline"
            }); 
        }
      });
    });
}


// get the local data containing the notification "options" setting
async function getLocalNotificationData() {
    return new Promise(function(resolve, reject) {
        browser.storage.sync.get(['notification'], function (result) {
            if (!result.notification) {
                browser.storage.sync.set({'notification': 'all'});
                resolve("all");
            } else {
                resolve(result.notification);
            }
        });
    });
}

// send a notification if streamer changes games or goes live
async function sendNotification() {
    const notification = await getLocalNotificationData();
    const responseData = await getStreamData();
    const status = responseData.status;
    const title = responseData.title;
    const category = responseData.category;

    const data = await getLocalStreamData();
    const currentStatus = data.status;
    console.log("Local storage states: xQc is " + currentStatus);
    const currentTitle = data.title;
    const currentCategory = data.category;

    // if the category changes, send a notification
    if (notification === "all" && currentCategory !== "" && currentCategory !== category && category !== "") {
        browser.notifications.create({
            iconUrl: '/images/128.png',
            message: '',
            title: 'xQc changed games from: ' + currentCategory + ' to: ' + category,
            type: 'basic'
        });
        updateLocalStorage(status, category, title);
    }

    // if streamer is offline, update local storage
    if (status.toLowerCase() === 'offline') {
        updateLocalStorage(status, category, title);
    }

    // if streamer goes live when local storage states they were offline, send a notification
    if (currentStatus.toLowerCase() === 'offline' && status.toLowerCase() === 'live' && notification !== "none") { 
        browser.notifications.create({
            iconUrl: '/images/128.png',
            message: `${title}`,
            title: 'xQc is live! Category: ' + category,
            type: 'basic'
        });

        updateLocalStorage(status, category, title);
    }
}

async function updateLocalStorage(newStatus, newCategory, newTitle) {
    const localStreamData = await getLocalStreamData();
    localStreamData.status = newStatus;
    localStreamData.category = newCategory;
    localStreamData.title = newTitle;
    saveStreamData(localStreamData);
}

async function updateClipData() {
    // set clip data in local storage
    const clipData = await getClipsData();
    browser.storage.sync.set({'clips': clipData});
}

// save to local storage
function saveStreamData(streamData) {
    browser.storage.sync.set({'streamData': streamData});
}