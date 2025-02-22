// database for chrome

// to get data
export function getData(key, callback) {
    if (typeof browser === "undefined") {
        var browser = chrome;
    }
    browser.storage.local.get(key, (data) => {
        callback(data[key] || "");
    });
}

// to set data
export function setData(key, data) {
    if (typeof browser === "undefined") {
        var browser = chrome;
    }
    browser.storage.local.set({ [key]: data });
}

// to append data
export function appendData(key, data) {
    getData(key, (fullData) => {
        fullData += data;
        setData(key, fullData);
    });
}
