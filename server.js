const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {

      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {

    console.error('MongoDB connection error:', error.message);
  });
