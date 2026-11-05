const User = require('../models/userModel');

// Create User
function registerUser(req, res) {
  const { name, email } = req.body;

  const register = new User({
    name: name,
    email: email,
  });

  register.save();

  res.status(200).json({
    message: `Please check ${email} for verification.`,
  });
}

// Read all Users
async function getAll(req, res) {
  const readAll = await User.find({});
  res.status(200).json({
    totalUsers: readAll.length,
    allUsers: readAll,
  });
}

module.exports = { registerUser, getAll };
