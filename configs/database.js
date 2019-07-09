/* eslint-disable no-console */

const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

// Build the connection string
const dbURI = `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}/seed-of-life`;

console.log(dbURI);


// Create the database connection
mongoose.connect(dbURI, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log(`[${new Date()}] Mongoose connection successful`);
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`[${new Date()}] Mongoose default connection error: ${err}`);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log(`[${new Date()}] Mongoose default connection disconnected`);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log(`[${new Date()}] Mongoose default connection disconnected through app termination`);
    process.exit(0);
  });
});

mongoosePaginate.paginate.options = {
  lean: true,
  limit: 10
};

module.exports = db;
