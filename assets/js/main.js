// Ensure compatibility with both Chrome and Firefox
if (typeof browser === "undefined") {
    var browser = chrome;
}

// Send a message to get statistics
browser.runtime.sendMessage({ action: "statisticsGenerator" })
    .then(response => {
        if (response) {
            // Format and display the response
            document.getElementById("stat01").innerHTML = response.TotalNumberOfSignINs
            document.getElementById("stat02").innerHTML = response.NumberOfTwentyFourHourSignIns
            document.getElementById("stat03").innerHTML = response.NumberOfWeekSignIns
            document.getElementById("stat04").innerHTML = response.NumberOfDNs
            document.getElementById("stat05").innerHTML = response.NumberOfTOs
            document.getElementById("stat06").innerHTML = response.MostCommonCode
            document.getElementById("stat07").innerHTML = response.TotalNumberOfSignINs - response.NumberOfDNs - response.NumberOfTOs

            // for each number's appearance
            const numbox = document.getElementById("eachAppearance");
            let appearances = [];

            for (let i = 10; i <= 99; i++) {
                let count = response.EachAppearance[i.toString()];
                if (count == undefined) {
                    count = 0;
                }
                appearances.push({ code: i, count: count });
            }

            appearances.sort((a, b) => {
                if (b.count === a.count) {
                    return a.code - b.code;  // If counts are the same, sort by code ascending
                }
                return b.count - a.count;  // Sort by count descending
            });

            // Render the sorted blocks
            appearances.forEach(item => {
                numbox.innerHTML += `<div class="block">
                    <h3>#${item.code}</h3>
                    <p>${item.count}</p>
                </div>`;
            });

        }
    })
    .catch(error => {
        console.error("Error fetching statistics:", error);
    });