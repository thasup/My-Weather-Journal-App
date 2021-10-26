// Defined Global Variables
const zipcode = document.querySelector('#zip').value;
const feeling = document.querySelector('#feeling').value;
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
const sunrise = document.querySelector('#sunrise');
const sunset = document.querySelector('#sunset');

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
//console.log(today);

// Retrieve weather data from web API
const getWeatherData = async (urlAPI) => {

    const response = await fetch(urlAPI)

    try {
        const weatherData = await response.json();
        if (weatherData.cod === '404') {
            errorMsg.innerHTML = 'ZIP code is invalid.';
        } else {
            return weatherData;
        }
    } catch(error) {
        console.log('error', error);
    }
};

// Function for POST data
const postData = async ( url = '', data = {}) => {
    console.log(data)

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
    
    try {
        const newData = await response.json();
        console.log(newData);
        return newData
    } catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
};

// Update website UI
const updateUI = async () => {
    const response = await fetch('/retrieve');

    try {
        console.log(data);
        const data = await response.json();
        city.innerHTML = `<p>${data.city}</p>`;
        date.innerHTML = `<p>${data.date}</p>`;
        icon.innerHTML = `<p>${data.date}</p>`; //???????????????????
        temperature.innerHTML = `<p>${data.temp}°C</p>`;
        condition.innerHTML = `<p>${data.condition}</p>`;

        feelLike.innerHTML = `<p>${data.feelLike}°C</p>`;
        windSpeed.innerHTML = `<p>${data.windSpeed}m/s</p>`;
        humidity.innerHTML = `<p>${data.humidity}%</p>`;
        pressure.innerHTML = `<p>${data.pressure}hPa</p>`;
        visibility.innerHTML = `<p>${data.visibility}km</p>`;
        sunrise.innerHTML = `<p>${data.sunrise}</p>`;
        sunset.innerHTML = `<p>${data.sunset}</p>`
    } catch(error) {
        // appropriately handle the error
        console.log("error", error);
    }
};

// POST ZIP code and feeling to server side


// Add Event Listener to Summit button
summitBtn.addEventListener('click', runProcess);

// Run runProcess Function
function runProcess (evt) {
    evt.preventDefault();

    // API Key
    const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
    const baseURLFiveDay = 'http://api.openweathermap.org/data/2.5/forecast?zip='
    const apiKey = '&appid=0157a18e1dec25c35696d5b92e0836d9'
    const units = '&units=metric'
    const urlAPI = baseURL + zipcode + apiKey + units;
    console.log("fetch weather data");
    console.log(zipcode);
    // API request for wreather data from openweathermap.org
    getWeatherData(urlAPI)

    // POST data to empty JS object
    .then((data) => {
        postData('/add', {
            date: today,
            city: data.name,
            temp: Math.round(data.main.temp),
            feeling: feeling,
            condition: data.weather.main,
            feelLike: Math.round(data.main.feels_like),
            windSpeed: data.wind.speed,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            visibility: data.visibility/1000,
            sunrise: new Date(data.sys.sunrise * 1000),
            sunset: new Date(data.sys.sunset * 1000)
        });
    })

    // Update website UI
    .then(() => {
        updateUI();
    })
    zipcode.value = '';
};