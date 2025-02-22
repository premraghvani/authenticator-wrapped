if (typeof browser === "undefined") {
    var browser = chrome;
}
browser.runtime.sendMessage({ action: "statisticsGenerator" }).then(resp => {
    document.getElementById("resp").innerHTML = JSON.stringify(resp);
    
});