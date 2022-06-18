//dynamically change the video image and href link
update();

async function update() {
    const data = await getLocalStreamData();
    const status = data.status;
    const clipData = await getLocalClipsData();
    console.log(clipData);
    const watchstream = document.getElementById("watchstream");
    if (data.status !== "live") {
      watchstream.innerText = "";
    }

    document.getElementById("statusHeader").innerText = "xQc Status: " + status;
    document.getElementById("clip1").href = clipData.clip1.url;
    document.getElementById("clip2").href = clipData.clip2.url;
    document.getElementById("clip3").href = clipData.clip3.url;
    document.getElementById("clip4").href = clipData.clip4.url;
    document.getElementById("clip5").href = clipData.clip5.url;
    document.getElementById("clip6").href = clipData.clip6.url;
    document.getElementById("clip7").href = clipData.clip7.url;
    document.getElementById("clip8").href = clipData.clip8.url;
    document.getElementById("clip9").href = clipData.clip9.url;
    document.getElementById("clip10").href = clipData.clip10.url;
    document.getElementById("image1").src = clipData.clip1.thumbnail;
    document.getElementById("image1").title = clipData.clip1.title;
    document.getElementById("image2").src = clipData.clip2.thumbnail;
    document.getElementById("image2").title = clipData.clip2.title;
    document.getElementById("image3").src = clipData.clip3.thumbnail;
    document.getElementById("image3").title = clipData.clip3.title;
    document.getElementById("image4").src = clipData.clip4.thumbnail;
    document.getElementById("image4").title = clipData.clip4.title;
    document.getElementById("image5").src = clipData.clip5.thumbnail;
    document.getElementById("image5").title = clipData.clip5.title;
    document.getElementById("image6").src = clipData.clip6.thumbnail;
    document.getElementById("image6").title = clipData.clip6.title;
    document.getElementById("image7").src = clipData.clip7.thumbnail;
    document.getElementById("image7").title = clipData.clip7.title;
    document.getElementById("image8").src = clipData.clip8.thumbnail;
    document.getElementById("image8").title = clipData.clip8.title;
    document.getElementById("image9").src = clipData.clip9.thumbnail;
    document.getElementById("image9").title = clipData.clip9.title;
    document.getElementById("image10").src = clipData.clip10.thumbnail;
    document.getElementById("image10").title = clipData.clip10.title;
    document.getElementById("clip1Views").innerText = "View Count: " + clipData.clip1.viewer_count;
    document.getElementById("clip2Views").innerText = "View Count: " + clipData.clip2.viewer_count;
    document.getElementById("clip3Views").innerText = "View Count: " + clipData.clip3.viewer_count;
    document.getElementById("clip4Views").innerText = "View Count: " + clipData.clip4.viewer_count;
    document.getElementById("clip5Views").innerText = "View Count: " + clipData.clip5.viewer_count;
    document.getElementById("clip6Views").innerText = "View Count: " + clipData.clip6.viewer_count;
    document.getElementById("clip7Views").innerText = "View Count: " + clipData.clip7.viewer_count;
    document.getElementById("clip8Views").innerText = "View Count: " + clipData.clip8.viewer_count;
    document.getElementById("clip9Views").innerText = "View Count: " + clipData.clip9.viewer_count;
    document.getElementById("clip10Views").innerText = "View Count: " + clipData.clip10.viewer_count;
}


// Grab from local storage the top 10 clips data
async function getLocalClipsData() {
    return new Promise(function(resolve, reject) {
      browser.storage.sync.get(['clips'], function(result) {
        console.log("getting local clips data....")
        if (!result.clips) {
            console.log("no clips found " + result.clips);
            return;
        } else {
            console.log("clips data found in local storage. no API call needed.")
            resolve(result.clips);
        }
      });
    });
}

// Grab from local storage the streamer status
async function getLocalStreamData() {
    return new Promise(function(resolve, reject) {
      browser.storage.sync.get(['streamData'], function(result) {
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