import { appendData, getData } from "./databaseChrome.js";
import { statisticsGenerator } from "./statsGenerator.js";

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
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
