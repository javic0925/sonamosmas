document.addEventListener('DOMContentLoaded', function() {
    let currentAudio = null;  
    let lastStreamUrl = 'https://c7.radioboss.fm/stream/128';  
    let isPlaying = false;  

    // Function to show the loading animation
    function showLoading() {
        document.getElementById('player').innerHTML = `<img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGltOGwzaXlpZHVzdDZ0ZHRiZWt6aGh0YjNiYzU3bGV2bDJxbThucCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/wvtt4mtViPOSrLYNFh/giphy.gif" alt="Loading" />`; 
    }

    // Function to set media session metadata
    function setMediaSession(streamTitle, albumTitle, artworkUrl) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: streamTitle,
                artist: albumTitle,
                artwork: [{ src: artworkUrl, sizes: '512x512', type: 'image/png' }]
            });
        }
    }

    // Function to play the stream
    function playStream(streamUrl, stopButtonClass) {
        showLoading(); // Show loading animation
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.src = '';  
            isPlaying = false;
        }
    
        lastStreamUrl = streamUrl;
        currentAudio = new Audio(streamUrl);
        currentAudio.play().then(() => {
            isPlaying = true;
            document.getElementById('player').innerHTML = `<img src="/assets/icons/${stopButtonClass}.png" alt="Stop Button">`;
        }).catch(error => {
            console.log("Autoplay blocked by browser, user interaction needed.");
        });
    }

    function stopStream() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.src = '';  
            currentAudio = null;    
            isPlaying = false;

            document.getElementById('player').innerHTML = `<img src="/assets/icons/playnegroblanco.png" alt="Play Button">`;
        }
    }

    // First radio stream (Impac Records Radio)
    document.querySelector('.radioBanner').addEventListener('click', function() {
        playStream('https://c7.radioboss.fm/stream/128', 'botonstop');
        setMediaSession('Impac Records Radio', 'Sonamos Mas', '/assets/imgs/IRRBANNEr.PNG');
    });

    // Second radio stream (La Boom Radio)
    document.querySelector('.radioBanner2').addEventListener('click', function() {
        playStream('https://c20.radioboss.fm:8354/stream', 'botonstop2');
        setMediaSession('La Boom Radio', 'Sonamos Mas', '/assets/imgs/LBRBANNER.png');
    });

    // Play button event listener to toggle between play and stop
    document.getElementById('player').addEventListener('click', function() {
        if (isPlaying) {
            stopStream(); 
        } else if (lastStreamUrl) {
            const stopButtonClass = lastStreamUrl === 'https://c7.radioboss.fm/stream/128' ? 'botonstop' : 'botonstop2';
            playStream(lastStreamUrl, stopButtonClass); 
        }
    });
});