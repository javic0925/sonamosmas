document.addEventListener('DOMContentLoaded', function() {
    let currentAudio = null;  // Keeps track of the currently playing audio stream
    let lastStreamUrl = '';   // Stores the last played stream URL

    // Function to autoplay the stream
    function autoPlayStream() {
        lastStreamUrl = 'https://c7.radioboss.fm/stream/128';
        currentAudio = new Audio(lastStreamUrl);
        currentAudio.play().catch(error => {
            console.log("Autoplay blocked by browser, will require user interaction");
        });
        
        // Update the play button to stop state
        document.getElementById('player').innerHTML = `<img src="/assets/icons/botonstop.png" alt="Stop Button">`;
    }

    function playStream(streamUrl, buttonId, stopButtonClass) {
        // Stop the current stream if any
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.src = '';  // Clear the current stream to ensure it stops
        }

        // Store the last played stream URL
        lastStreamUrl = streamUrl;

        // Create a new Audio object for the selected stream
        currentAudio = new Audio(streamUrl);
        currentAudio.play();

        // Change the button to stop
        document.getElementById('player').innerHTML = `<img src="/assets/icons/${stopButtonClass}.png" alt="Stop Button">`;

        // Event listener to stop and reset if the button is pressed again
        document.getElementById(buttonId).addEventListener('click', stopStream);
    }

    function stopStream() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.src = '';  // Stop the stream
            currentAudio = null;    // Reset the audio object

            // Reset the play button back to its original state but keep the last stream URL
            document.getElementById('player').innerHTML = `<img src="/assets/icons/playnegroblanco.png" alt="Play Button">`;
        }
    }

    document.querySelector('.radioContainer').addEventListener('click', function() {
        playStream('https://c7.radioboss.fm/stream/128', 'radioContainer', 'botonstop');
    });

    document.querySelector('.radioContainer2').addEventListener('click', function() {
        playStream('https://c20.radioboss.fm:8354/stream', 'radioContainer2', 'botonstop2');
    });

    // Play button event listener to resume the last stream if pressed again
    document.getElementById('player').addEventListener('click', function() {
        if (currentAudio) {
            stopStream(); // If it's already playing, stop it
        } else if (lastStreamUrl) {
            // If no stream is playing, resume the last stream URL
            playStream(lastStreamUrl, '', 'botonstop');
        }
    });

    // Autoplay the first stream when the page loads
    autoPlayStream();
});