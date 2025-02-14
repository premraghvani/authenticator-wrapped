import { appendData, getData } from "./databaseChrome.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "appendData") {
        appendData(request.key, request.data);
        sendResponse({ status: "success" });
    }

    if (request.action === "getData") {
        getData(request.key, (resp) => {
            sendResponse({ data: resp });
        });
        return true;
    }
});
