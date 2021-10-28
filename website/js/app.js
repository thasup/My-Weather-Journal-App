// Defined Global Variables
const zipcode = document.querySelector('#zip');
const country = document.querySelector('#country');
const feeling = document.querySelector('#feeling');
const summitBtn = document.querySelector('#generate');
const errorMsg1 = document.querySelector('#error-msg1');
const errorMsg2 = document.querySelector('#error-msg2');

const city = document.querySelector('#main-place');
const date = document.querySelector('#main-date');
const icon = document.querySelector('#main-icon');
const temperature = document.querySelector('#main-temp');
const condition = document.querySelector('#main-condition');
const youFeel = document.querySelector('#you-feel');

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

    getURL();

    // API request for wreather data from openweathermap.org
    getWeatherData(getURL())

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

// Combine URL components
const getURL = () => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey = '&appid=0157a18e1dec25c35696d5b92e0836d9';
    const units = '&units=metric';

    if (country.value === '') {
        errorMsg2.style.display = "none";
        let urlAPI = baseURL + zipcode.value + apiKey + units;
        return urlAPI;
    } else if (country.value.length !== 2) {
        errorMsg2.style.display = "block";
        let urlAPI = baseURL + zipcode.value + `,` + country.value + apiKey + units;
        return urlAPI;
    } else {
        errorMsg2.style.display = "none";
        let urlAPI = baseURL + zipcode.value + `,` + country.value + apiKey + units;
        return urlAPI;
    }
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
        if (weatherData.cod === '404' || weatherData.cod === '400') {
            errorMsg1.style.display = "block";
        } else if (weatherData.cod === '404' && country.value !== '') {
            errorMsg1.style.display = "none";
        } else if (zipcode.value === '') {
            errorMsg1.style.display = "block";
        } else {
            errorMsg1.style.display = "none";
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
        city.innerHTML = `${data.city}`;
        date.innerHTML = `${data.date}`;
        icon.innerHTML = `<img src="${iconPath}${data.icon}@4x.png" alt=""/>`;
        temperature.innerHTML = `${data.temp} <span id="cel">°C</span>`;
        condition.innerHTML = `${data.condition}`;
        youFeel.innerHTML = `And You Feeling.. ${data.feeling}!`;

        feelLike.innerHTML = `Feels Like   ${data.feelLike} °C`;
        windSpeed.innerHTML = `Wind Speed   ${data.windSpeed} m/s`;
        humidity.innerHTML = `Humidity   ${data.humidity} %`;
        pressure.innerHTML = `Pressure   ${data.pressure} hPa`;
        visibility.innerHTML = `Visibility   ${data.visibility} km`
    } catch(error) {
        console.log("error", error);
    }
};