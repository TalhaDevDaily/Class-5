const express = require('express');
const app = express();

const mongoose = require('mongoose');
const User = require('./models/userModel');
const middlewareBlockage = require('./middleware/middleBlock');

app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://TalhaDevDaily:%40R0146306c@nodejs-sandbox.zmstzzn.mongodb.net/userDB',
  )
  .then(() => console.log(`Established connection with Database`))
  .catch(err => console.log(`Failure to connect to Server`));

// Create User
app.post('/user/signup', (req, res) => {
  const { name, email, password } = req.body;

  const errors = [];

  if (!name) errors.name = `Name required`;
  if (!email) errors.email = `Email required`;
  if (!password) errors.password = `Password required`;

  if (errors.name || errors.email || email.password)
    res.status(400).send(errors);

  const register = new User({
    name: name,
    email: email,
    password: password,
  });

  register.save();

  res.status(200).send(`Check your email for verification link`);
});

// Read allUser
app.get('/user/all', middlewareBlockage, (req, res) => {
  const allUser = User.find({});
  res.status(200).send(`${allUser.length} has joined the platform so far!
    ${allUser}`);
});

// Delete User
app.delete('/user/remove/:id', async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndDelete(id);

  res.status(200).send(`Account deleted! Sad to see you go :(`);
});

// Update userProfile
app.post('/user/update/:id', (req, res) => {
  const { id } = req.params;

  const update = User.findByIdAndUpdate({ _id: id }, req.body, {
    returnDocument: 'after',
  });
  res.status(200).send(`Account has been updated!
    ${update}`);
});

app.listen(8000, () => console.log(`Server is running`));
