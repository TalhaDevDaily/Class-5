require('dotenv').config();
const express = require('express');
const app = express();
const middlewareBlockage = require('./middleware/middleBlock');

// controllers
const {
  registerUser,
  getAll,
  removeUser,
  updateUser,
} = require('./controllers/authenticationController');

// mongooseConnection
const mongooseConnect = require('./config/dbConfig');

// Multer expressJS
const multer = require('multer');
const crypto = require('crypto');

// connecting mongoose to the database
mongooseConnect();

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Multer - DiskStorage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, file.fieldname + '-' + raw.toString('hex') + '.jpg');
      cb(null, Date.now() + '-' + file.originalname);
    });
  },
});

const upload = multer({ storage: storage });
//////////////////////////////////////////////////////////////////////

app.post('/user/signup', upload.single('city'), registerUser);

app.get('/user/all', middlewareBlockage, getAll);

app.delete('/user/remove/:id', removeUser);

app.post('/user/update/:id', updateUser);

app.listen(8000, () => console.log(`Server is running`));
