// import mongoose library
const mongoose = require("mongoose");
// connect environment variables 
require("dotenv").config();

// options of config database
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

// connect to database
mongoose
  .connect(process.env.database_URI, options)
  .then(() => {
    console.log("Database connect");
  })
  .catch((err) => {
    console.log("Err database connect", err);
  });