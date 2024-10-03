document.addEventListener('DOMContentLoaded', function() {
    // Fetch the greetings JSON
    fetch('https://raw.githubusercontent.com/javic0925/sonamosmas/a43c7eb70a75da52e7546add6bb0d388dad56374/greetings.json') // Replace with your actual JSON URL
        .then(response => response.json())
        .then(data => {
            const greetings = data.greetings;

            // Get the current hour to determine time of day
            const currentHour = new Date().getHours();
            let greetingMessage = '';

            if (currentHour >= 5 && currentHour < 12) {
                // Morning
                greetingMessage = greetings.find(greet => greet.timeOfDay === 'morning').message;
            } else if (currentHour >= 12 && currentHour < 18) {
                // Afternoon
                greetingMessage = greetings.find(greet => greet.timeOfDay === 'afternoon').message;
            } else {
                // Evening
                greetingMessage = greetings.find(greet => greet.timeOfDay === 'evening').message;
            }

            // Update the welcome message
            const welcomeMsg = document.querySelector('.welcomeMsg h4');
            const existingText = welcomeMsg.innerHTML.split('<br>')[0]; // Keep ¡Hola, intact
            welcomeMsg.innerHTML = `${existingText}<br>${greetingMessage}`;
        })
        .catch(error => {
            console.log('Error fetching greetings:', error);
        });
});