// Ensure compatibility with both Chrome and Firefox
if (typeof browser === "undefined") {
    var browser = chrome;
}

// Send a message to get statistics
browser.runtime.sendMessage({ action: "statisticsGenerator" })
    .then(response => {
        // Get the element where the response will be displayed
        const respElement = document.getElementById("resp");

        if (response) {
            // Format and display the response
            respElement.innerHTML = `
                    <div class="block">
                        <h3>Total Attempts</h3>
                        <p>${response.TotalNumberOfSignINs}</p>
                    </div>
                    <div class="block">
                        <h3>Past 24 Hours</h3>
                        <p>${response.NumberOfTwentyFourHourSignIns}</p>
                    </div>
                    <div class="block">
                        <h3>Past 7 Days</h3>
                        <p>${response.NumberOfWeekSignIns}</p>
                    </div>
                    <div class="block">
                        <h3>Number of Failures</h3>
                        <p>${response.NumberOfTOs + response.NumberOfDNs}</p>
                    </div>
                    <div class="block">
                        <h3>Most Common Code</h3>
                        <p>${response.MostCommonCode}</p>
                    </div>
            `;
            respElement.classList.remove("loading"); // Remove loading class
        } else {
            respElement.textContent = "No data received :(";
        }
    })
    .catch(error => {
        // Handle errors
        console.error("Error fetching statistics:", error);
        document.getElementById("resp").textContent = "Failed to load statistics :(";
    });


    document.getElementById("openBigData").addEventListener("click", function() {
        browser.tabs.create({ url: browser.runtime.getURL("assets/html/main.html") });
    });
    