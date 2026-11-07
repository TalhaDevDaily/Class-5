const User = require('../models/userModel');

// Create User
async function createUser(req, res) {
  const { name, email, password } = req.body;

  const errors = {};

  if (!name) errors.name = `Name required!`;
  if (!email) errors.email = `Email required!`;
  if (!password) errors.password = `Password required!`;

  if (errors.name || errors.email || errors.password)
    return res.status(400).json({ errors });

  const existingEmail = await User.findOne({ email: email });
  if (existingEmail)
    return res.status(400).json({
      message: `User ${existingEmail.email} already exist`,
    });

  const create = new User({
    name: name,
    email: email,
    password: password,
  });

  create.save();

  res.status(200).json({ message: `User created` });
}

// Read all Users
async function readUser(req, res) {
  const readAll = await User.find({});
  res.status(200).json({
    message: `You have ${readAll.length} users so far!
    ${readAll}`,
  });
}

// Delete User by ID
async function deleteUser(req, res) {
  const { id } = req.params;

  const existingUser = await User.findOne({ _id: id });
  if (!existingUser)
    return res.status(400).send(`No such user with the given ID exist`);

  const deleteUser = await User.findByIdAndDelete(id);
  res.status(200).json({
    message: `User has been removed! Sad to see you go :(`,
    deleteUser,
  });
}

module.exports = { createUser };
