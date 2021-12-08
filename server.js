// Require modules
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initialize the main project folder
app.use(express.static('website'));

// Defines the port number 
const port = 8000;

// Spin up the server
const server = app.listen(port, listening);

function listening () {
    console.log(`Server is running!`);
    console.log(`Running on localhost: ${port}`);
};

// Empty JS object to act as endpoint for all routes
let projectData = {};


// GET Route
app.get('/retrieve', (request, response) => {
    response.send(projectData);
    // console.log(projectData);
});

// POST Route
app.post('/add', (request, response) => {
    response.send('POST received');
    const newEntry = {
        date: request.body.date,
        city: request.body.city,
        icon: request.body.icon,
        temp: request.body.temp,
        feeling: request.body.feeling,
        condition: request.body.condition,
        feelLike: request.body.feelLike,
        windSpeed: request.body.windSpeed,
        humidity: request.body.humidity,
        pressure: request.body.pressure,
        visibility: request.body.visibility
    };
    projectData = newEntry;
    // console.log(projectData);
});