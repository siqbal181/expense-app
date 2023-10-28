const MonthlyBudget = require('../models/monthlyBudgetModel');

// get the monthly budget
const getMonthlyBudget = async (req, res) => {
  const monthlyBudget = await MonthlyBudget.find({})

  res.status(200).json(monthlyBudget);
}

// create a monthly budget
const createMonthlyBudget = async (req, res) => {
  const budgetData = req.body

  try {
    const result = await Promise.all(
      budgetData.map(async (budgetItem) => {
        const { category, budget } = budgetItem;
        const monthlyBudget = new MonthlyBudget({ category, budget });
        console.log(budgetItem);
        return await monthlyBudget.save();
      })
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}
// update the budget

// delete single elements from the budget

// update a single element from the budget

module.exports = {createMonthlyBudget, getMonthlyBudget};