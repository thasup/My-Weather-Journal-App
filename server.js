/* Express to run server and routes */
const express = require('express');

/* Start up an instance of app */
const app = express();

/* Dependencies */
const bodyParser = require('body-parser')

/* Middleware */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

/* Initialize the main project folder*/
app.use(express.static('website'));

// Defines the port number 
const port = 8000;

/* Spin up the server*/
const server = app.listen(port, listening);

function listening(){
    console.log(`Server is running!`);
    console.log(`Running on localhost: ${port}`);
};

/* Empty JS object to act as endpoint for all routes */
let projectData = {};

// Return Endpoint Data, GET Route I: Server Side

// Return Endpoint Data, GET Route II: Client Side

// POST Route