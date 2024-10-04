// Function to fetch and update the data for the first radio container
function updateRadioContainer1() {
    fetch('https://c7.radioboss.fm/w/nowplayinginfo?u=128')
        .then(response => response.json())
        .then(data => {
            // Update now playing info and listeners
            document.querySelector('.nowPlayingInfo p').textContent = data.nowplaying || 'No info available';
            document.querySelector('.listenerCounter span').textContent = data.listeners || '0'; // Update only the number
        })
        .catch(error => {
            console.error('Error fetching radio container 1 data:', error);
            document.querySelector('.nowPlayingInfo p').textContent = 'Error fetching data';
            document.querySelector('.listenerCounter span').textContent = '0'; // Update only the number
        });
}

// Function to fetch and update the data for the second radio container
function updateRadioContainer2() {
    fetch('https://c20.radioboss.fm/w/nowplayinginfo?u=354')
        .then(response => response.json())
        .then(data => {
            // Update now playing info and listeners
            document.querySelector('.nowPlayingInfo2 p').textContent = data.nowplaying || 'No info available';
            document.querySelector('.listenerCounter2 span').textContent = data.listeners || '0'; // Update only the number
        })
        .catch(error => {
            console.error('Error fetching radio container 2 data:', error);
            document.querySelector('.nowPlayingInfo2 p').textContent = 'Error fetching data';
            document.querySelector('.listenerCounter2 span').textContent = '0'; // Update only the number
        });
}

// Function to set loading state
function setLoadingState() {
    document.querySelector('.nowPlayingInfo p').textContent = 'Loading...';
    document.querySelector('.listenerCounter span').textContent = 'Loading...';
    document.querySelector('.nowPlayingInfo2 p').textContent = 'Loading...';
    document.querySelector('.listenerCounter2 span').textContent = 'Loading...';
}

// Set intervals to update the data every 15 seconds (15000 milliseconds)
setInterval(updateRadioContainer1, 15000);
setInterval(updateRadioContainer2, 15000);

// Initial call to populate the data when the page loads
setLoadingState();  // Show loading message initially
updateRadioContainer1();
updateRadioContainer2();