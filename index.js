require('dotenv').config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const User = require('./models/userModel');
const middlewareBlockage = require('./middleware/middleBlock');
const mongooseConnect = require('./config/dbConfig');
const {
  registerationController,
} = require('./controllers/authenticationController');
// Multer
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use('/uploads', express.static('uploads'));

mongooseConnect();

// Create User
app.post('/user/signup', upload.single('asia'), registerationController);

// Read allUser
app.get('/user/all', middlewareBlockage, async (req, res) => {
  const allUser = await User.find({});
  res.status(200).json(allUser);
});

// Delete User
app.delete('/user/remove/:id', async (req, res) => {
  const { id } = req.params;

  const existingUser = User.findOne({ email: email });
  if (!existingUser)
    return res.status(400).json({
      message: `User already exists`,
    });

  await User.findByIdAndDelete(id);

  res.status(200).json({
    message: `Account deleted! Sad to see you go :(`,
  });
});

// Update userProfile
app.post('/user/update/:id', async (req, res) => {
  const { id } = req.params;

  const update = await User.findByIdAndUpdate({ _id: id }, req.body, {
    returnDocument: 'after',
  });
  res.status(200).json({
    message: `Account has been updated!`,
    update,
  });
});

app.listen(8000, () => console.log(`Server is running`));
