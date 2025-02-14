// database for chrome

// to get data
export function getData(key, callback) {
    chrome.storage.local.get(key, (data) => {
        callback(data[key] || "");
    });
}

// to set data
export function setData(key, data) {
    chrome.storage.local.set({ [key]: data });
}

// to append data
export function appendData(key, data) {
    getData(key, (fullData) => {
        fullData += data;
        setData(key, fullData);
    });
}
