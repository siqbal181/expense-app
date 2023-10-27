const express = require('express');
const router = express.Router();
const { createMonthlyBudget, getMonthlyBudget } = require("../controllers/monthlyBudgetController");

// Get the monthly budget
router.get('/', getMonthlyBudget);

// Post a new budget
router.post('/', createMonthlyBudget)

// Update the monthly budget
router.patch('/', (req, res) => {
  res.json({mssg: 'Update the Monthly Budget'})
})

module.exports = router;