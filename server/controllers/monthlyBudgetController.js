const MonthlyBudget = require('../models/monthlyBudgetModel');

// get the monthly budget
const getMonthlyBudget = async (req, res) => {
  const monthlyBudget = await MonthlyBudget.find({})

  res.status(200).json(monthlyBudget);
}

// create a monthly budget
const createMonthlyBudget = async (req, res) => {
  const { category, budget } = req.body

  try {
    const monthlyBudget = await MonthlyBudget.create({category, budget})
    res.status(200).json(monthlyBudget);
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

// update the budget

// delete single elements from the budget

// update a single element from the budget

module.exports = {createMonthlyBudget, getMonthlyBudget};