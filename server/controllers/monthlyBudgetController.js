const MonthlyBudget = require('../models/monthlyBudgetModel');

// get the monthly budget
const getMonthlyBudget = async (req, res) => {
  const monthlyBudget = await MonthlyBudget.find({})

  res.status(200).json(monthlyBudget);
}

// create a monthly budget
const createMonthlyBudget = async (req, res) => {
  const { category, budget } = req.body;
  console.log(req.body)
  const monthlyBudget = new MonthlyBudget({ category, budget });
  try {
    const result = await monthlyBudget.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// update the budget

// delete single elements from the budget

// update a single element from the budget

module.exports = {createMonthlyBudget, getMonthlyBudget};