import { getData } from "./database.js";

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

        const currentDay = new Date()       // gets the current time to compare to

        let NoOfValidSignIns = 0            // This chunk of code gets the amount of valid sign-ins
        let eachNumberAppearance = {} // finds how many times each number is put in
        for (let i = 0; i < data.length; i++) {
            if (!(isNaN(data[i].code))) {
                NoOfValidSignIns += 1

                let code = data[i].code
                if(eachNumberAppearance[code] == undefined){
                    eachNumberAppearance[code] = 1;
                } else {
                    eachNumberAppearance[code] += 1;
                }
            }
        }


        let tfHrsSignIns = 0                // This chunck of code gets the number of sign-ins in the last 24hrs (86.400.000 milliseconds)
        for (let i = 0; i < data.length; i++){
            if (currentDay-data[i].timestamp < 86400000 && !(isNaN(data[i].code))) {
                tfHrsSignIns += 1
            }
        }

        let weeklySignIns = 0               // This chunck of code gets the number of sign-ins in the last week (604.800.000 milliseconds)
        for (let i = 0; i < data.length; i++) {
            if (currentDay-data[i].timestamp < 604800000 && !(isNaN(data[i].code))) {
                weeklySignIns += 1
            }
        }

        let TOs = 0                         // This chunk of code gets the number of objects with the code "TO"
        for (let i = 0; i < data.length; i++) {
            if (data[i].code == 'TO') {
                TOs += 1
            }
        }

        let DNs = 0                         // This chunk of code gets the number of objects with the code "DN"
        for (let i = 0; i < data.length; i++) {
            if (data[i].code == 'DN') {
                DNs += 1
            }
        }

        let maxCode = 0                     // This chunk of code finds the code that has appeared the most regularly that is not "TO" or "DN"
        let myList = []                     // This first half of the code chunk creates an array that stores the amount of objects of each code at the index of that code
        for (let i = 0; i < data.length; i++) {
            if (!(isNaN(data[i].code))){
                if (myList[data[i].code] == undefined) {
                    myList[data[i].code] = 1
                } else {
                    myList[data[i].code] += 1
                }
            }
        }
        let maxValue = 0                    // This second half of the code chunk finds the index of the max value in the array. This is equivalent to the most frequent code
        for (let i = 0; i < myList.length; i++) {
            if (!(myList[i] == undefined) && (myList[i] > maxValue)) {
                maxValue = myList[i]
                maxCode = i
            }
        }
        
        // This creates the JSON object to be returned
        let finalReturnData = {
            "TotalNumberOfSignINs": NoOfValidSignIns,
            "NumberOfTwentyFourHourSignIns": tfHrsSignIns,
            "NumberOfWeekSignIns": weeklySignIns,
            "NumberOfTOs": TOs,
            "NumberOfDNs": DNs,
            "MostCommonCode": maxCode,
            "EachAppearance":eachNumberAppearance
        }
        
        callback(finalReturnData || {})
    });
}