const mongoose = require("mongoose");
require('dotenv').config()

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  const mongoString = process.env.DATABASE_URL;
  mongoose.connect(mongoString);
  const database = mongoose.connection;
  database.once('connected', () => {
    console.log('Database Connected');
  });
  database.on('error', (error) => {
    console.log(error)
  });

  
}

module.exports = dbConnect;