const mongoose = require('mongoose');

function mongooseConnect() {
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log(`Connection with server Established!`))
    .catch(err => console.log(`Failed to connect to DB`));
}

module.exports = mongooseConnect;
