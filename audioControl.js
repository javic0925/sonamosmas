document.addEventListener('DOMContentLoaded', function() {
    let currentAudio = null;  // Keeps track of the currently playing audio stream
    let lastStreamUrl = 'https://c7.radioboss.fm/stream/128';   // Default to the first stream URL

    // Function to play the stream
    function playStream(streamUrl, stopButtonClass) {
        // Stop any current stream
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.src = '';  // Clear the current stream to ensure it stops
        }

        // Store the last played stream URL
        lastStreamUrl = streamUrl;

        // Create a new Audio object for the selected stream
        currentAudio = new Audio(streamUrl);
        currentAudio.play().catch(error => {
            console.log("Autoplay blocked by browser, user interaction needed.");
        });

        // Update the play button to stop state
        document.getElementById('player').innerHTML = `<img src="/assets/icons/${stopButtonClass}.png" alt="Stop Button">`;
    }

    // Function to stop the stream
    function stopStream() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.src = '';  // Stop the stream
            currentAudio = null;    // Reset the audio object

            // Reset the play button back to its original state
            document.getElementById('player').innerHTML = `<img src="/assets/icons/playnegroblanco.png" alt="Play Button">`;
        }
    }

    // Add click event for the first radio container
    document.querySelector('.radioContainer').addEventListener('click', function() {
        playStream('https://c7.radioboss.fm/stream/128', 'botonstop');
    });

    // Add click event for the second radio container
    document.querySelector('.radioContainer2').addEventListener('click', function() {
        playStream('https://c20.radioboss.fm:8354/stream', 'botonstop2');
    });

    // Play button event listener to resume the last stream if pressed again
    document.getElementById('player').addEventListener('click', function() {
        if (currentAudio) {
            stopStream(); // If it's already playing, stop it
        } else if (lastStreamUrl) {
            // If no stream is playing, resume the last stream URL
            playStream(lastStreamUrl, 'botonstop');
        }
    });

    // Prompt user to start audio manually due to autoplay restrictions
    document.getElementById('player').addEventListener('click', function() {
        if (!currentAudio) {
            playStream(lastStreamUrl, 'botonstop');
        }
    });
});