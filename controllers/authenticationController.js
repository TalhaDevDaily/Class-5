const User = require('../models/userModel');

// Create User
function registerUser(req, res) {
  const { name, email } = req.body;

  const register = new User({
    name: name,
    email: email,
  });
}

module.exports = { registerUser };
