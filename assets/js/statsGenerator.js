import { getData } from "./databaseChrome.js";

// function which parses the logs
export function logsParser(callback){
    getData("logs",(logs)=>{
        let logList = logs.split("\n");
        let finalList = [];
        for(var i = 0; i < logList.length; i++){ // each line contains the transaction
            let currentLine = logList[i].split(":");
            // filters out for invalid
            if(currentLine.length != 2){
                continue;
            } else if(isNaN(parseInt(currentLine[0]))){
                continue;
            } else if(currentLine[1].length != 2){
                continue;
            }
            // formats
            let date = new Date(parseInt(currentLine[0]));
            finalList.push({
                timestamp: date,
                code: currentLine[1]
            })
        }
        // return the dataset
        callback(finalList || []);
    });
}

export function statisticsGenerator(callback){
    logsParser((data)=>{
        /* INPUT: an array of objects as "data", with for example:
        [
            {
                "timestamp":<object>,  // this object is the date object, and you can apply actions to it directly
                "code":"93"
            },
            {
                "timestamp":<object>,
                "code":"TO"             // special cases to the code: if its a number it was what was shown, else "TO" is timeout, "DN" is denied.
            }
        ]

        Return: feel free to do somet in JSON
        */
        callback(data || {})
    });
}