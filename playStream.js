// Declare global variables here (only once)
let currentAudio = null; // Store the current audio object to control playback
let lastStreamUrl = null; // Store the last stream URL
let isPlaying = false; // Track if audio is playing
let isPaused = false; // Track if the audio is paused by the user
let currentStream = null; // Store the current stream

// Function to show the loading animation
function showLoading() {
    const playerImage = document.getElementById('playerImage');
    if (playerImage) {
        playerImage.src = 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGltOGwzaXlpZHVzdDZ0ZHRiZWt6aGh0YjNiYzU3bGV2bDJxbThucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wvtt4mtViPOSrLYNFh/giphy.gif'; // Show loading animation
    }
}

// Function to set the default play button
function showPlayButton() {
    const playerImage = document.getElementById('playerImage');
    if (playerImage) {
        playerImage.src = '/assets/icons/playnegroblanco.png'; // Reset to play button
    }
    document.getElementById('botonstop').style.display = 'none'; // Hide stop button
    document.getElementById('botonstop2').style.display = 'none'; // Hide stop button
}

// Function to stop all streams
function stopAllStreams() {
    console.log('Stopping all streams...');
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.src = ''; // Clear the audio source
        isPlaying = false;
        isPaused = true;
        console.log('Audio paused and cleared');
        showPlayButton(); // Show the play button after stopping
    } else {
        console.log('No current audio to stop');
    }
}

// Function to play the stream and update the button states
function playStream(streamUrl, stopButtonId) {
    showLoading(); // Show loading animation while stream loads

    // Stop any currently playing audio
    stopAllStreams();

    // Store the stream URL for resuming
    lastStreamUrl = streamUrl;

    // Create a new audio object and start playing the stream from the live point
    currentAudio = new Audio(streamUrl);
    currentAudio.play().then(() => {
        isPlaying = true; // Audio is playing
        isPaused = false;
        togglePlayButton(true, stopButtonId); // Show the appropriate stop button
    }).catch(() => {
        isPlaying = false; // If audio fails to play, reset state
        showPlayButton(); // Show the play button if loading fails
    });

    currentStream = stopButtonId; // Track the current stream

    // Handle when the audio ends
    currentAudio.addEventListener('ended', function() {
        currentStream = null; // Reset the current stream
        isPlaying = false;
        showPlayButton(); // Reset to "play" state when the stream ends
    });
}

// Function to toggle the play/pause/stop buttons
function togglePlayButton(isPlaying, stopButtonId) {
    const playerImage = document.getElementById('playerImage');

    if (isPlaying) {
        // Hide play button, show appropriate stop button
        if (stopButtonId === 'botonstop') {
            document.getElementById('botonstop').style.display = 'block';
            document.getElementById('botonstop2').style.display = 'none';
        } else if (stopButtonId === 'botonstop2') {
            document.getElementById('botonstop').style.display = 'none';
            document.getElementById('botonstop2').style.display = 'block';
        }
    } else {
        showPlayButton(); // Show play button if no stream is playing
    }
}

// Function to resume playing the last stream after a pause
function resumeStream() {
    if (lastStreamUrl && !isPlaying) {
        playStream(lastStreamUrl, currentStream); // Play the last used stream URL
    }
}