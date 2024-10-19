// Function to fetch and update the Ko-Fi URL and background based on the now playing DJ
function updateKofiURL() {
    // Fetch the valid DJs JSON
    fetch('https://javic0925.github.io/sonamosmas/GithubDJS.json')
        .then(response => response.json())
        .then(responseData => {
            const validDJs = responseData.validDJs; // Access the array inside the validDJs object
            console.log('Fetched validDJs JSON array:', validDJs); // Log the fetched array

            // Ensure validDJs is an array
            if (!Array.isArray(validDJs)) {
                console.error('Error: validDJs is not an array. Fetched structure:', validDJs);
                return;
            }

            // Fetch the current now playing information for radioContainer1
            fetch('https://c7.radioboss.fm/w/nowplayinginfo?u=128')
                .then(response => response.json())
                .then(data => {
                    const nowPlaying = data.nowplaying.toLowerCase();
                    console.log('Now playing for radioContainer1:', nowPlaying); // Log now playing info

                    // Check if nowPlaying matches a DJ name from the JSON, with "| En vivo"
                    const validDJ = validDJs.find(dj => nowPlaying === `${dj.name.toLowerCase()} | en vivo`);

                    if (validDJ) {
                        // Update the Ko-Fi URL and background if there's a valid match
                        const irrKofiLink = document.querySelector('#irrKofiURL');
                        const radioBanner = document.querySelector('.radioBanner');

                        irrKofiLink.setAttribute('href', validDJ.kofiURL);
                        irrKofiLink.style.display = 'flex'; // Show the Ko-Fi button
                        radioBanner.style.backgroundImage = `url(${validDJ.irrFlat})`; // Use image from validDJs JSON
                    } else {
                        // Hide the Ko-Fi button and reset background if no match
                        document.querySelector('#irrKofiURL').style.display = 'none';
                        document.querySelector('.radioBanner').style.backgroundImage = 'url(/assets/imgs/irrflatbanner.jpg)'; // Reset background
                    }
                })
                .catch(error => console.error('Error fetching now playing info for radioContainer1:', error));

            // Fetch the current now playing information for radioContainer2
            fetch('https://c20.radioboss.fm/w/nowplayinginfo?u=354')
                .then(response => response.json())
                .then(data => {
                    const nowPlaying = data.nowplaying.toLowerCase();
                    console.log('Now playing for radioContainer2:', nowPlaying); // Log now playing info

                    // Check if nowPlaying matches a DJ name from the JSON, with "| En vivo"
                    const validDJ = validDJs.find(dj => nowPlaying === `${dj.name.toLowerCase()} | en vivo`);

                    if (validDJ) {
                        // Update the Ko-Fi URL and background if there's a valid match
                        const lbrKofiLink = document.querySelector('#lbrKofiURL');
                        const radioBanner2 = document.querySelector('.radioBanner2');

                        lbrKofiLink.setAttribute('href', validDJ.kofiURL);
                        lbrKofiLink.style.display = 'flex'; // Show the Ko-Fi button
                        radioBanner2.style.backgroundImage = `url(${validDJ.lbrFlat})`; // Use image from validDJs JSON
                    } else {
                        // Hide the Ko-Fi button and reset background if no match
                        document.querySelector('#lbrKofiURL').style.display = 'none';
                        document.querySelector('.radioBanner2').style.backgroundImage = 'url(/assets/imgs/lbrflatbanner.jpg)'; // Reset background
                    }
                })
                .catch(error => console.error('Error fetching now playing info for radioContainer2:', error));
        })
        .catch(error => console.error('Error fetching valid DJs JSON:', error));
}

// Call the function initially
updateKofiURL();

// Set an interval to refresh the Ko-Fi URL and backgrounds every 10 seconds (10000 milliseconds)
setInterval(updateKofiURL, 10000);