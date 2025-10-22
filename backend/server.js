
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // Standard port for local API

// Middleware
app.use(cors()); // Allows frontend to make requests

app.use(bodyParser.json());

