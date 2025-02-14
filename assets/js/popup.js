chrome.runtime.sendMessage({ action: "statisticsGenerator" }).then(resp => {
    document.getElementById("resp").innerHTML = JSON.stringify(resp);
    
});