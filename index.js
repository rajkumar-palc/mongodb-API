require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes')

const mongoString = process.env.DATABASE_URL;
const app = express();

app.use(express.json());

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (err) => console.log(err));
database.on('connected', () => console.log("Database Connected"));

// Enable the CORS Policy
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'https://localhost:3000'); // Replace with the appropriate origin
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with the appropriate origin
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use('/api',routes);

app.listen(2000, ()=> {
    console.log("Start on 2000");
})
