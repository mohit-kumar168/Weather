const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '8ddffe2a13msh16766abbe6668c0p1cd1e5jsne99d4a49625f',
        'x-rapidapi-host': 'weather-api138.p.rapidapi.com'
    }
};



async function getWeather(city) {
    city_name.innerHTML = city;
    const url = 'https://weather-api138.p.rapidapi.com/weather?city_name=' + city;
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const main = result.main;
        const sun = result.sys;
        const wind = result.wind;

        const temp = document.querySelectorAll('.temp');
        const feels_like = document.querySelectorAll('.feels_like');
        const min_temp = document.querySelectorAll('.min_temp');
        const max_temp = document.querySelectorAll('.max_temp');
        const pressure = document.querySelectorAll('.pressure');
        const humidity = document.querySelectorAll('.humidity');
        const sea_level = document.querySelectorAll('.sea_level');
        const sunrise = document.querySelectorAll('.sunrise');
        const sunset = document.querySelectorAll('.sunset');
        const wind_speed = document.querySelectorAll('.wind_speed');
        const wind_degree = document.querySelectorAll('.wind_degree');
        const visibility = document.querySelectorAll('.visibility');

        function updateElements(nodeList, value) {
            nodeList.forEach(element => {
                element.innerHTML = value;
            });
        }

        function deg(kel){
            let temp = kel - 273.15;
            return temp.toFixed(2);
        }


        updateElements(temp, deg(main.temp));
        updateElements(feels_like, deg(main.feels_like));
        updateElements(min_temp, deg(main.temp_min));
        updateElements(max_temp, deg(main.temp_max));
        updateElements(pressure, main.pressure);
        updateElements(humidity, main.humidity);
        updateElements(sea_level, main.sea_level);
        updateElements(sunrise, new Date(sun.sunrise * 1000).toLocaleTimeString());
        updateElements(sunset, new Date(sun.sunset * 1000).toLocaleTimeString());
        updateElements(wind_speed, wind.speed);
        updateElements(wind_degree, wind.deg);
        updateElements(visibility, result.visibility);

    } catch (error) {
        console.error(error);
    }
}

const submit = document.querySelector("#submit");
submit.addEventListener('click', (e) => {
    e.preventDefault();
    getWeather(city.value);
})

getWeather("Delhi")


document.getElementById("seattle").addEventListener('click', (e) => {
    e.preventDefault();
    getWeather("Seattle");
})

document.getElementById("bangalore").addEventListener('click', (e) => {
    e.preventDefault();
    getWeather("Bangalore");
})

