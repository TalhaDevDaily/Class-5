require('dotenv').config();
const express = require('express');
const app = express();
const mongooseConnect = require('./config/dbConfig');
const {
  createUser,
  readUser,
  deleteUser,
  updateUser,
} = require('./controllers/authenticationController');
const middlewareBlockage = require('./middleware/middleBlock');

// Multer - Disk Usage
const multer = require('multer');
const crypto = require('crypto');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads');
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err);
      cb(null, file.fieldname + '-' + raw.toString('hex'));
    });
  },
});

const upload = multer({ storage: storage });

app.use(express.json());

mongooseConnect();

app.post('/user/create', createUser);

app.get('/user/all', middlewareBlockage, readUser);

app.delete('/user/remove/:id', deleteUser);

app.post('/user/change/:id', updateUser);

app.listen(8000, () => console.log(`Server is running`));
