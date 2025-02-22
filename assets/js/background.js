import { appendData, getData } from "./database.js";
import { statisticsGenerator } from "./statsGenerator.js";

if (typeof browser === "undefined") {
    var browser = chrome;
}
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "appendData") {
        appendData(request.key, request.data);
        sendResponse("Success");
    }

    if (request.action === "statisticsGenerator") {
        statisticsGenerator((resp) => {
            sendResponse(resp);
        });
        return true;
    }
});