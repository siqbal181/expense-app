const express = require('express');
const router = express.Router();
const { saveBudget, getBudget, deleteBudget, updateBudget } = require("../controllers/monthlyBudgetController");

// Get the monthly budget
router.get('/', getBudget);

// Post a new budget
router.post('/save-budget', saveBudget)

// Delete a budget
router.delete('/delete-budget/:id', deleteBudget)

// Edit a monthly budget item
router.patch('/update-budget/:id', updateBudget);

module.exports = router;