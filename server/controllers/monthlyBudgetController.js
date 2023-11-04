const MonthlyBudget = require('../models/monthlyBudgetModel');

// get the monthly budget
const getBudget = async (req, res) => {
  const monthlyBudget = await MonthlyBudget.find({})

  res.status(200).json(monthlyBudget);
}

// create a monthly budget
const saveBudget = async (req, res) => {
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

const deleteBudget = async (req, res) => {
  const id = req.params.id; 
  try {
    const monthlyBudget = await MonthlyBudget.findByIdAndDelete(id);

    if (!monthlyBudget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update a single element from the budget
const updateBudget = async (req, res) => {
  const id = req.params.id; 
  const updatedBudget = req.body; 

  try {
    const updatedBudgetItem = await MonthlyBudget.findByIdAndUpdate(id, updatedBudget, {
      new: true,
      runValidators: true
,    });

    if (!updatedBudgetItem) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    res.status(200).json({ message: 'Budget updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {saveBudget, getBudget, deleteBudget, updateBudget};