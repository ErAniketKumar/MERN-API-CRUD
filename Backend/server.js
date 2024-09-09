const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/thisRoutes');
const dotenv = require('dotenv').config(); // Ensure this is called at the top
const PORT = process.env.PORT || 3500;
const uri = process.env.MONGODB_URI;
const run = require('./db/connection');

// Connect to the database
run(uri);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api', router); // Add a base path for the router

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));