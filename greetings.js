function updateGreeting() {
    // Fetch the greetings JSON
    fetch('https://javic0925.github.io/sonamosmas/greetings.json') // Replace with your actual JSON URL
        .then(response => response.json())
        .then(data => {
            const greetings = data.greetings;
            console.log('Fetched greetings:', data.greetings); // Log fetched greetings

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
            welcomeMsg.innerHTML = `¡Hola!<br>${greetingMessage}`;
            
            // Log the update to the console
            console.log('DOM updated with new greeting:', greetingMessage);
        })
        .catch(error => {
            console.log('Error fetching greetings:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    updateGreeting(); // Initial call when the page loads

    // Set the interval to run every 10 seconds (10000 milliseconds) for development
    setInterval(updateGreeting, 600000);
});