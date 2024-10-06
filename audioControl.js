// Global variables
let currentAudio = null; // Store the current audio object to control playback
let currentStream = null; // Track the current stream URL being played
let lastStream = null; // Track the last stream URL that was played
let isPlaying = false; // Track if audio is playing

// Get the necessary elements
const playerImage = document.getElementById('playerImage');
const botonStop = document.getElementById('botonstop');
const botonStop2 = document.getElementById('botonstop2');
const radioBanner = document.querySelector('.radioBanner');
const radioBanner2 = document.querySelector('.radioBanner2');

// Function to show the loading gif in place of the play button
function showLoading() {
    if (playerImage) {
        playerImage.style.display = 'block';
        playerImage.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGltOGwzaXlpZHVzdDZ0ZHRiZWt6aGh0YjNiYzU3bGV2bDJxbThucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wvtt4mtViPOSrLYNFh/giphy.gif'; // Show loading animation
    }
    if (botonStop) botonStop.style.display = 'none'; // Ensure stop buttons are hidden during loading
    if (botonStop2) botonStop2.style.display = 'none';
}

// Function to set media session metadata
function setMediaSession(streamTitle, albumTitle, artworkUrl) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: streamTitle,
            artist: albumTitle,
            artwork: [
                { src: artworkUrl, sizes: '512x512', type: 'image/png' }
            ]
        });

        // Optionally, you can also handle media actions like play/pause
        navigator.mediaSession.setActionHandler('play', function() { 
            currentAudio.play(); 
        });
        navigator.mediaSession.setActionHandler('pause', function() { 
            currentAudio.pause(); 
        });
    }
}

// Function to show the appropriate stop button and hide loading gif
function showStopButton(stopButtonId) {
    if (playerImage) playerImage.style.display = 'none'; // Hide the play/loading button once stream starts
    if (stopButtonId === 'botonstop' && botonStop) {
        botonStop.style.display = 'block'; // Show C7 stop button
        if (botonStop2) botonStop2.style.display = 'none'; // Hide C20 stop button
    } else if (stopButtonId === 'botonstop2' && botonStop2) {
        botonStop2.style.display = 'block'; // Show C20 stop button
        if (botonStop) botonStop.style.display = 'none'; // Hide C7 stop button
    }
}

// Function to show the play button again (after stopping audio)
function showPlayButton() {
    if (playerImage) {
        playerImage.style.display = 'block'; // Show the play button again
        playerImage.src = '/assets/icons/playnegroblanco.png'; // Reset to play button image
    }
    if (botonStop) botonStop.style.display = 'none';
    if (botonStop2) botonStop2.style.display = 'none';
}

// Function to stop all audio
function stopAllStreams() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = ''; // Clear the audio source
        isPlaying = false;
        lastStream = currentStream; // Store the last stream URL before stopping
        currentStream = null; // Reset the current stream
        showPlayButton(); // Show the play button after stopping
    }
}

// Function to play a stream and handle loading
function playStream(streamUrl, stopButtonId) {
    stopAllStreams(); // Stop any currently playing audio
    showLoading(); // Show loading gif

    // Create a new audio object and start playing the stream
    currentAudio = new Audio(streamUrl);
    currentAudio.play().then(() => {
        isPlaying = true;
        showStopButton(stopButtonId); // Show the appropriate stop button once stream plays

        // Set the media session metadata depending on the stream
        if (streamUrl === 'https://c7.radioboss.fm/stream/128') {
            setMediaSession('Impac Records Radio', 'Sonamos Más', '/assets/imgs/IRRBANNER.png');
        } else if (streamUrl === 'https://c20.radioboss.fm:8354/stream') {
            setMediaSession('La Boom Radio', 'Sonamos Más', '/assets/imgs/LBRBANNER.png');
        }
    }).catch(() => {
        showPlayButton(); // If stream fails, reset to play button
    });

    currentStream = stopButtonId; // Track which stream is playing

    // Handle when the audio ends
    if (currentAudio) {
        currentAudio.addEventListener('ended', function() {
            currentStream = null; // Reset the current stream
            isPlaying = false;
            showPlayButton(); // Reset to "play" state when the stream ends
        });
    }
}

// Add event listeners for banner clicks (check if elements exist first)
if (radioBanner) {
    radioBanner.addEventListener('click', function() {
        playStream('https://c7.radioboss.fm/stream/128', 'botonstop'); // Play C7 stream and show botonstop
    });
}

if (radioBanner2) {
    radioBanner2.addEventListener('click', function() {
        playStream('https://c20.radioboss.fm:8354/stream', 'botonstop2'); // Play C20 stream and show botonstop2
    });
}

// Add event listeners for stop button clicks (check if elements exist first)
if (botonStop) {
    botonStop.addEventListener('click', function() {
        stopAllStreams(); // Stop the C7 stream and show play button
    });
}

if (botonStop2) {
    botonStop2.addEventListener('click', function() {
        stopAllStreams(); // Stop the C20 stream and show play button
    });
}

// Autoplay the first stream 2 seconds after DOM is loaded
window.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        if (!isPlaying) {
            playStream('https://c7.radioboss.fm/stream/128', 'botonstop'); // Autoplay C7 stream
        }
    }, 3000); // Autoplay after 2 seconds
});

// If the play button is clicked after audio ends, resume the last stream
if (playerImage) {
    playerImage.addEventListener('click', function() {
        if (!isPlaying && lastStream) {
            playStream(lastStream === 'botonstop' ? 'https://c7.radioboss.fm/stream/128' : 'https://c20.radioboss.fm:8354/stream', lastStream);
        }
    });
}