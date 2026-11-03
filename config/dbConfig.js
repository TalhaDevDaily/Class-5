const mongoose = require('mongoose');

function mongooseConnect() {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log(`Established connection with Database`))
    .catch(err => console.log(`Failure to connect to Server`));
}

module.exports = mongooseConnect;
