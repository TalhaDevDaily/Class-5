require('dotenv').config();
const express = require('express');
const app = express();

// controllers
const registerUser = require('./config/dbConfig');

// mongooseConnection
const mongoose = require('mongoose');
const mongooseConnect = require('./config/dbConfig');
mongooseConnect();

app.use(express.json());

app.post('/user/signup', registerUser);

app.listen(8000, () => console.log(`Server is running`));
