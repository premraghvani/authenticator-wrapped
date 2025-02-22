// Script to track the authentication codes and times

// Observes for all changes - the observers
const observer = new MutationObserver((mutations) => {
    checkState();
});
observer.observe(document.body, { childList: true, subtree: true, attributes: true });

if (typeof browser === "undefined") {
    var browser = chrome;
}

// Checks the state
let stateLastLogged = 0;
function checkState(){
    let codeBox = document.getElementById("idRichContext_DisplaySign");
    let didntHearBox = document.getElementById("idDiv_SAASTO_Title");
    let deniedBox = document.getElementById("idDiv_SAASDS_Title");
    const d = new Date();

    if(codeBox !== null && stateLastLogged !== 1){
        browser.runtime.sendMessage({ action: "appendData", key: "logs", data: `\n${d.getTime()}:${codeBox.innerHTML}` });
        stateLastLogged = 1;
    } else if(didntHearBox != null && didntHearBox.innerHTML.toUpperCase() == "WE DIDN'T HEAR FROM YOU" && stateLastLogged !== 2){
        browser.runtime.sendMessage({ action: "appendData", key: "logs", data: `\n${d.getTime()}:TO` });
        stateLastLogged = 2;
    } else if(deniedBox != null && deniedBox.innerHTML.toUpperCase() == "REQUEST DENIED" && stateLastLogged !== 3){
        browser.runtime.sendMessage({ action: "appendData", key: "logs", data: `\n${d.getTime()}:DN` });
        stateLastLogged = 3;
    }
}