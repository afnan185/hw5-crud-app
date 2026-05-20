const mongoose = require('mongoose');

const tradeSchema = new mongoose.Schema({
  ticker: {
    type: String,
    required: true,
    trim: true,
  },

  },
);

module.exports = mongoose.model('Trade', tradeSchema);
