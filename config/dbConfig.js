const mongoose = require('mongoose');

function mongooseConnect() {
  return mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log(`Established connection with Database`))
    .catch(err => console.log(`Failure to connect to the Database: ${err}`));
}

module.exports = mongooseConnect;
