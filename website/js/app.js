// Defined Global Variables
const zipcode = document.querySelector('#zip');
const feeling = document.querySelector('#feeling');
const summitBtn = document.querySelector('#generate');
const errorMsg = document.querySelector('#error-msg');

const city = document.querySelector('#main-place');
const date = document.querySelector('#main-date');
const icon = document.querySelector('#main-icon');
const temperature = document.querySelector('#main-temp');
const condition = document.querySelector('#main-condition');

const feelLike = document.querySelector('#feel-like');
const windSpeed = document.querySelector('#wind-speed');
const humidity = document.querySelector('#humidity');
const pressure = document.querySelector('#pressure');
const visibility = document.querySelector('#visibility');

const iconPath = 'https://openweathermap.org/img/wn/';

// Add Event Listener to Summit button
summitBtn.addEventListener('click', runProcess);

// Run runProcess Function
function runProcess (evt) {
    evt.preventDefault();

    // API Key
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey = '&appid=0157a18e1dec25c35696d5b92e0836d9';
    const units = '&units=metric';

    const urlAPI = baseURL + zipcode.value + apiKey + units;

    // API request for wreather data from openweathermap.org
    getWeatherData(urlAPI)

    // POST data to empty JS object
    .then((data) => {
        postData('/add', {
            date: today,
            city: data.name,
            icon: data.weather[0].icon,
            temp: Math.round(data.main.temp),
            feeling: feeling.value,
            condition: data.weather[0].main,
            feelLike: Math.round(data.main.feels_like),
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            visibility: data.visibility/1000
        });
        console.log(data);
    })

    // Update website UI
    .then(() => {
        updateUI();
    })
};

// Create a new date instance dynamically with JS
let localDate = new Date();
const year = [
    'January', 
    'February', 
    'March', 
    'April', 
    'May', 
    'June', 
    'July', 
    'August', 
    'September', 
    'October', 
    'November', 
    'December'];
let today = `${localDate.getDate()} ${year[localDate.getMonth()]} ${localDate.getFullYear()}`;

// Retrieve weather data from web API
const getWeatherData = async (urlAPI) => {

    const response = await fetch(urlAPI)

    try {
        const weatherData = await response.json();
        if (weatherData.cod === '404') {
            errorMsg.innerHTML = 'ZIP code is invalid.';
        } else if (zipcode.value === '') {
            errorMsg.innerHTML = 'please enter ZIP code.';
        } else {
            errorMsg.innerHTML = '';
            return weatherData;
        }
    } catch(error) {
        console.log('error', error);
    }
};

// Function for POST data
const postData = async ( url = '', data = {}) => {
    console.log(data);

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    
    try {
        const newData = await response;
        //console.log(newData);
        return newData
    } catch(error) {
        console.log("error", error);
    }
};

// Update website UI
const updateUI = async () => {
    const response = await fetch('/retrieve');

    try {
        const data = await response.json();
        city.innerHTML = `<p>${data.city}</p>`;
        date.innerHTML = `<p>${data.date}</p>`;
        icon.innerHTML = `<img src="${iconPath}${data.icon}@4x.png" alt=""/>`;
        temperature.innerHTML = `<p>${data.temp} °C</p>`;
        condition.innerHTML = `<p>${data.condition}</p>`;

        feelLike.innerHTML = `<p>Feels Like   ${data.feelLike} °C</p>`;
        windSpeed.innerHTML = `<p>Wind Speed   ${data.windSpeed} m/s</p>`;
        humidity.innerHTML = `<p>Humidity   ${data.humidity} %</p>`;
        pressure.innerHTML = `<p>Pressure   ${data.pressure} hPa</p>`;
        visibility.innerHTML = `<p>Visibility   ${data.visibility} km</p>`
    } catch(error) {
        console.log("error", error);
    }
};