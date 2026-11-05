require('dotenv').config();
const express = require('express');
const app = express();
const middlewareBlockage = require('./middleware/middleBlock');

// controllers
const {
  registerUser,
  getAll,
} = require('./controllers/authenticationController');

// mongooseConnection
const mongoose = require('mongoose');
const mongooseConnect = require('./config/dbConfig');
mongooseConnect();

app.use(express.json());

app.post('/user/signup', registerUser);

app.get('/user/all', middlewareBlockage, getAll);

app.listen(8000, () => console.log(`Server is running`));
