const mongoose = require('mongoose');
const Schema = mongoose.Schema; // will define the structure of the documents 

const spendSchema = new Schema({
  category: {
    type: String, 
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  month: {
    type: String,
    required: true
  }
}, { timestamps: true });

const MonthlySpend = mongoose.model('MonthlySpend', spendSchema);

module.exports = MonthlySpend;
