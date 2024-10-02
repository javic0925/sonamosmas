// Function to fetch and update the data for the first radio container
function updateRadioContainer1() {
    fetch('https://c7.radioboss.fm/w/nowplayinginfo?u=128')
        .then(response => response.json())
        .then(data => {
            // Update now playing info and listeners
            document.querySelector('.nowPlayingInfo p').textContent = data.nowplaying;
            document.querySelector('.listenerCounter').textContent = data.listeners;
        })
        .catch(error => {
            console.error('Error fetching radio container 1 data:', error);
        });
}

// Function to fetch and update the data for the second radio container
function updateRadioContainer2() {
    fetch('https://c20.radioboss.fm/w/nowplayinginfo?u=354')
        .then(response => response.json())
        .then(data => {
            // Update now playing info and listeners
            document.querySelector('.nowPlayingInfo2 p').textContent = data.nowplaying;
            document.querySelector('.listenerCounter2').textContent = data.listeners;
        })
        .catch(error => {
            console.error('Error fetching radio container 2 data:', error);
        });
}

// Set intervals to update the data every 15 seconds (15000 milliseconds)
setInterval(updateRadioContainer1, 15000);
setInterval(updateRadioContainer2, 15000);

// Initial call to populate the data when the page loads
updateRadioContainer1();
updateRadioContainer2();