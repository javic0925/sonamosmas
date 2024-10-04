// webShare.js

// Add an event listener to the share button
document.getElementById('shareButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default behavior (e.g., navigating to '#')

    // Check if the Web Share API is supported by the browser
    if (navigator.share) {
        navigator.share({
            title: 'Sonamos Más',
            text: 'Check out Sonamos Más, your go-to app for exclusive content from Impac Records and La Boom!',
            url: window.location.href // Share the current page URL
        })
        .then(() => console.log('Sharing successful!'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
        alert('Web Share API not supported in this browser.');
    }
});