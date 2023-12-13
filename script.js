// Replace 'YOUR_OPENWEATHERMAP_API_KEY' with your OpenWeatherMap API key
const openWeatherMapApiKey = 'e78ee2e779563ab79f73191bd9f55610';

// Replace 'YOUR_MAPBOX_ACCESS_TOKEN' with your Mapbox access token
mapboxgl.accessToken = 'pk.eyJ1Ijoic2hpbXJvayIsImEiOiJjbG1taGJuOTEwbWpvMmxsMWY4ZWRsbWw2In0.knWXZEHCWG4Uh69hGrnA6g';

let map;
let marker;
let selectedCoordinates = null;

// Function to initialize the map
function initMap() {
    map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // You can choose a different map style
        center: [0, 0], // Initial center coordinates
        zoom: 5, // Initial zoom level
    });

    // Listen for a click event on the map to set the marker
    map.on('click', function (e) {
        if (!marker) {
            marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map);
        } else {
            marker.setLngLat(e.lngLat);
        }
        selectedCoordinates = e.lngLat;
    });

    // Add a button click event to fetch weather data
    const fetchWeatherButton = document.getElementById('fetchWeatherButton');
    fetchWeatherButton.addEventListener('click', function () {
        if (selectedCoordinates) {
            fetchWeatherData(selectedCoordinates);
        } else {
            alert('Please select a location on the map first.');
        }
    });
}

// Function to fetch and display weather data
function fetchWeatherData(coordinates) {
    // Make a request to OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lng}&units=metric&appid=${openWeatherMapApiKey}`)
        .then(response => response.json())
        .then(data => {
            const weatherInfo = `
                Weather: ${data.weather[0].main}
                Description: ${data.weather[0].description}
                Temperature: ${data.main.temp}°C
            `;

            // Display the weather information to the user
            alert(weatherInfo);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Call the initMap function to start the application
initMap();
