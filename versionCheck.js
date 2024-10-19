const currentVersion = '1.0.2';  // Local version

// Function to check the version and show the refresh button if needed
function checkVersion() {
    // Fetch the latest version from the server
    fetch('/version.json')
        .then(response => response.json())
        .then(data => {
            const latestVersion = data.version;

            // Compare the current version with the latest version
            if (currentVersion !== latestVersion) {
                // Show the refresh button if the version is different
                document.getElementById('refreshButton').style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Error fetching version.json:', error);
        });
}

// Run the version check every 5 seconds (5000 milliseconds)
setInterval(checkVersion, 5000);

// Optionally, run the check immediately on page load
document.addEventListener('DOMContentLoaded', function() {
    checkVersion();
});
