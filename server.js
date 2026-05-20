const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Trade = require('./models/Trade');

//environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const trades = await Trade.find();
    res.render('index', { trades });
  } catch (error) {
    res.status(500).send('Error fetching trades');
  }
});

app.post('/trades', async (req, res) => {
  try {
    const { ticker, type, outcome } = req.body;
    await Trade.create({ ticker, type, outcome });
    res.redirect('/');
  } catch (error) {
    res.status(500).send('Error creating trade');
  }
});

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
