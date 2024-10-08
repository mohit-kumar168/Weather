const apiKey = '8ddffe2a13msh16766abbe6668c0p1cd1e5jsne99d4a49625f';
const apiHost = 'weather-api138.p.rapidapi.com';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': apiHost
    }
};

// Function to fetch and display weather for a specific city (for both search and common cities)
async function getWeather(city, selectorPrefix = null) {
    const url = `https://weather-api138.p.rapidapi.com/weather?city_name=${city}`;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const main = result.main;
        const sun = result.sys;
        const wind = result.wind;
        const visibility = result.visibility;

        console.log(result);
        

        // If it's for the search bar, update the main weather section
        if (!selectorPrefix) {
            document.querySelector("#city_name").innerText = city;
            document.querySelector(".temp").innerText = `${(main.temp - 273.15).toFixed(2)}°C`;
            document.querySelector(".feels_like").innerText = `${(main.feels_like - 273.15).toFixed(2)}°C`;
            document.querySelector(".min_temp").innerText = `${(main.temp_min - 273.15).toFixed(2)}°C`;
            document.querySelector(".max_temp").innerText = `${(main.temp_max - 273.15).toFixed(2)}°C`;
            document.querySelector(".pressure").innerText = `${main.pressure} hPa`;
            document.querySelector(".humidity").innerText = `${main.humidity}%`;
            document.querySelector(".sea_level").innerText = `${main.sea_level} ASL`;
            document.querySelector(".wind_speed").innerText = `${wind.speed} m/s`;
            document.querySelector(".wind_degree").innerText = `${wind.deg}°`;
            document.querySelector(".sunrise").innerText = new Date(sun.sunrise * 1000).toLocaleTimeString();
            document.querySelector(".sunset").innerText = new Date(sun.sunset * 1000).toLocaleTimeString();
            document.querySelector(".visibility").innerText = `${visibility} m`;
        } else {
            // If it's for the common cities, update their respective section
            document.querySelector(`${selectorPrefix} .temp`).innerText = `${(main.temp - 273.15).toFixed(2)}°C`;
            document.querySelector(`${selectorPrefix} .feels_like`).innerText = `${(main.feels_like - 273.15).toFixed(2)}°C`;
            document.querySelector(`${selectorPrefix} .min_temp`).innerText = `${(main.temp_min - 273.15).toFixed(2)}°C`;
            document.querySelector(`${selectorPrefix} .max_temp`).innerText = `${(main.temp_max - 273.15).toFixed(2)}°C`;
            document.querySelector(`${selectorPrefix} .pressure`).innerText = `${main.pressure} hPa`;
            document.querySelector(`${selectorPrefix} .humidity`).innerText = `${main.humidity}%`;
            document.querySelector(`${selectorPrefix} .wind_speed`).innerText = `${wind.speed} m/s`;
            document.querySelector(`${selectorPrefix} .wind_degree`).innerText = `${wind.deg}°`;
            document.querySelector(`${selectorPrefix} .sunrise`).innerText = new Date(sun.sunrise * 1000).toLocaleTimeString();
            document.querySelector(`${selectorPrefix} .sunset`).innerText = new Date(sun.sunset * 1000).toLocaleTimeString();
        }
    } catch (error) {
        console.error('Error fetching weather:', error);
    }
}

// List of common cities and their respective HTML sections
const commonCities = [
    { city: 'Shanghai', selectorPrefix: '#shanghai-weather' },
    { city: 'Boston', selectorPrefix: '#boston-weather' },
    { city: 'Lucknow', selectorPrefix: '#lucknow-weather' },
    { city: 'Kolkata', selectorPrefix: '#kolkata-weather' }
];

// Fetch and display weather for each common city when the page loads
window.addEventListener('DOMContentLoaded', () => {
    commonCities.forEach(({ city, selectorPrefix }) => {
        getWeather(city, selectorPrefix);
    });
});

// Handle user search (independent of common cities)
const searchButton = document.querySelector("#submit");
const cityInput = document.querySelector("#city");

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    const city = cityInput.value;
    getWeather(city);  // This will update the top part of the website with the searched city's weather
});

document.getElementById("london").addEventListener('click', (e) => {
    e.preventDefault();
    getWeather("London");
})

document.getElementById("seattle").addEventListener('click', (e) => {
    e.preventDefault();
    getWeather("Seattle");
})

document.getElementById("bangalore").addEventListener('click', (e) => {
    e.preventDefault();
    getWeather("Bangalore");
})

getWeather("Delhi");

