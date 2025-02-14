chrome.runtime.sendMessage({ action: "getData", key: "logs" }).then(resp => {
    document.getElementById("resp").innerHTML = JSON.stringify(resp);
});