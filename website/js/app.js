// Defined Global Variables
let zipcode = document.querySelector('#zip').value;
let feeling = document.querySelector('#feeling').value;
const summitBtn = document.querySelector('#generate');

const city = document.querySelector('#main-place');
const date = document.querySelector('#main-date');
const icon = document.querySelector('#main-icon');
const temperature = document.querySelector('#main-temp');
const condition = document.querySelector('#main-condition');

const feelLike = document.querySelector('#feel-like');
const windSpeed = document.querySelector('#wind-speed');
const humidity = document.querySelector('#humidity');
const pressure = document.querySelector('#pressure');

// API Key
const baseURL = 'api.openweathermap.org/data/2.5/weather?zip='
const baseURL = 'api.openweathermap.org/data/2.5/forecast?zip='
const apiKey = '&appid=0157a18e1dec25c35696d5b92e0836d9'
const units = '&units=metric'

// Create a new date instance dynamically with JS
let date = new Date();
// const year = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
let today = `${date.getDate()} ${year[date.getMonth()]} ${date.getFullYear()}`;
console.log(today);

// Add Event Listener to Summit button for Retrieve Data
summitBtn.addEventListener('click', runForecast);

// Run runForecast Function
runForecast = (evt) => {
    evt.preventDefault();

    // API request for wreather data from openweathermap.org
    retrieveData(baseURL + zipcode + apiKey + units)

    // POST data to empty JS object
    .then((data) => {
        postData('/add', {
            date: today,
            city: data.name, //??????????????
            temp: Math.round(data.main.temp), //??????????????
            feeling: feeling
        });
    })

    // Update website UI
    .then(() => {
        updateUI();
    })
};

// Retrieve data from web API
retrieveData = async (url) => {
    const response = await fetch(url)
    try {
        const weatherData = await response.json();
        return weatherData;
    } catch(error) {
        console.log("error", error);
    }
};

// Function for POST data
postData = async ( url = '', data = {}) => {
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

// Update website UI function