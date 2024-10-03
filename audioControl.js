document.addEventListener('DOMContentLoaded', function() {
    let currentAudio = null;  // Keeps track of the currently playing audio stream
    let lastStreamUrl = 'https://c7.radioboss.fm/stream/128';   // Default to the first stream URL
    let isPlaying = false;  // To track the play state

    // Function to play the stream
    function playStream(streamUrl, stopButtonClass) {
        // Stop the current stream if any
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.src = '';  // Clear the current stream to ensure it stops
            isPlaying = false;
        }
    
        // Store the last played stream URL
        lastStreamUrl = streamUrl;
    
        // Create a new Audio object for the selected stream
        currentAudio = new Audio(streamUrl);
        currentAudio.play().then(() => {
            isPlaying = true;
            // Update the play button to stop state
            document.getElementById('player').innerHTML = `<img src="/assets/icons/${stopButtonClass}.png" alt="Stop Button">`;
        }).catch(error => {
            console.log("Autoplay blocked by browser, user interaction needed.");
        });
    }
    // Function to stop the stream
    function stopStream() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.src = '';  // Stop the stream
            currentAudio = null;    // Reset the audio object
            isPlaying = false;

            // Reset the play button back to its original state
            document.getElementById('player').innerHTML = `<img src="/assets/icons/playnegroblanco.png" alt="Play Button">`;
        }
    }

    // Add click event for the first radio container
   // Add click event for the first radio container
document.querySelector('.radioBanner').addEventListener('click', function() {
    playStream('https://c7.radioboss.fm/stream/128', 'botonstop');
});

// Add click event for the second radio container
document.querySelector('.radioBanner2').addEventListener('click', function() {
    playStream('https://c20.radioboss.fm:8354/stream', 'botonstop2');
});

  // Play button event listener to toggle between play and stop
document.getElementById('player').addEventListener('click', function() {
    if (isPlaying) {
        stopStream(); // If it's already playing, stop it
    } else if (lastStreamUrl) {
        // If no stream is playing, resume the last stream URL
        const stopButtonClass = lastStreamUrl === 'https://c7.radioboss.fm/stream/128' ? 'botonstop' : 'botonstop2';
        playStream(lastStreamUrl, stopButtonClass); // Play the correct stream and update the button accordingly
    }
});
});