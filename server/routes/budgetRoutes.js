const express = require('express');
const router = express.Router();
const { saveBudget, getBudget, deleteBudget } = require("../controllers/monthlyBudgetController");

// Get the monthly budget
router.get('/', getBudget);

// Post a new budget
router.post('/save-budget', saveBudget)

// Delete a budget
router.delete('/delete-budget/:id', deleteBudget)

// Update the monthly budget
// router.patch('/update-budget/:id', // pending )

module.exports = router;