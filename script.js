const searchBtn = document.getElementById('searchBtn');
const locationSelect = document.getElementById('locationSelect');
const weatherInfo = document.getElementById('weatherInfo');
const container = document.querySelector('.container');

const apiKey = '11eeb30b3c4241459a655505231908'; // Replace with your actual API key
const apiUrl = 'http://api.weatherapi.com/v1/current.json';

// Array of cities
const cities = [
    "New York", "Los Angeles", "Chicago", "Houston", "Miami",
    "Toronto", "London", "Paris", "Berlin", "Rome",
    "Tokyo", "Sydney", "Beijing", "Moscow", "Cairo",
    // ... add more cities
];

// Populate the select element with options
cities.forEach(city => {
    const option = document.createElement('option');
    option.value = city;
    option.textContent = city;
    locationSelect.appendChild(option);
});

searchBtn.addEventListener('click', () => {
    const selectedLocation = locationSelect.value;
    if (selectedLocation) {
        getWeatherData(selectedLocation);
    } else {
        weatherInfo.innerHTML = 'Please select a location.';
    }
});

function getWeatherData(location) {
    const url = `${apiUrl}?key=${apiKey}&q=${location}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const current = data.current;
            const weatherHTML = `
                <div class="weather-details animate">
                    <h2>Weather in ${data.location.name}, ${data.location.country}</h2>
                    <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
                    <p><strong>Humidity:</strong> ${current.humidity}%</p>
                    <p><strong>Wind Speed:</strong> ${current.wind_kph} km/h</p>
                </div>
            `;
            weatherInfo.innerHTML = weatherHTML;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            weatherInfo.innerHTML = 'Error fetching weather data. Please try again later.';
        });
}

locationSelect.addEventListener('focus', () => {
    locationSelect.parentElement.classList.add('active');
});

locationSelect.addEventListener('blur', () => {
    locationSelect.parentElement.classList.remove('active');
});
