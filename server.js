// Require modules
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const cors = require('cors');

app.use(cors());

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initialize the main project folder
app.use(express.static('website'));

// Defines the port number
const port = process.env.PORT || 8000;

// Spin up the server
app.listen(port, () => {
  console.log('Server is running!');
  console.log(`Running on localhost: ${port}`);
});

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
  const {
    date,
    city,
    icon,
    temp,
    feeling,
    condition,
    feelLike,
    windSpeed,
    humidity,
    pressure,
    visibility,
  } = request.body;

  const newEntry = {
    date,
    city,
    icon,
    temp,
    feeling,
    condition,
    feelLike,
    windSpeed,
    humidity,
    pressure,
    visibility,
  };

  projectData = newEntry;
  // console.log(projectData);
});
