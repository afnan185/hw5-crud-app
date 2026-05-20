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

app.put('/trades/:id', async (req, res) => {
  try {
    const updatedTrade = await Trade.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedTrade);
  } catch (error) {
    res.status(500).json({ error: 'Error updating trade' });
  }
});

app.delete('/trades/:id', async (req, res) => {
  try {
    await Trade.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting trade' });
  }
});

const mongoOptions = {
  serverSelectionTimeoutMS: 10000,
};

mongoose
  .connect(process.env.MONGO_URI, mongoOptions)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
    console.error(
      'Fix: In MongoDB Atlas go to Network Access and add your IP (or 0.0.0.0/0 for dev).'
    );
    process.exit(1);
  });
