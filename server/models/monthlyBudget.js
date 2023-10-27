const mongoose = require('mongoose');
const Schema = mongoose.Schema; // will define the structure of the documents 

const budgetSchema = new Schema({
  category: {
    type: String, 
    required: true
  },
  budget: {
    type: Number,
    required: true
  }
}, { timestamps: true });

const MonthlyBudget = mongoose.model('MonthlyBudget', budgetSchema);

module.exports = MonthlyBudget;
