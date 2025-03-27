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
                <p>Total Sign Ins</p>
                <span>${response.TotalNumberOfSignINs}</span>

                <p>Past 24 Hours</p>
                <span>${response.NumberOfTwentyFourHourSignIns}</span>

                <p>Past 7 Days</p>
                <span>${response.NumberOfWeekSignIns}</span>

                <p>Number of Failures</p>
                <span>${response.NumberOfTOs + response.NumberOfDNs}</span>

                <p>Most Common Code</p>
                <span>${response.MostCommonCode}</span>
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
