const express = require('express');
const router = express.Router();
const MonthlyBudget = require('../models/monthlyBudget');

// Get the monthly budget
router.get('/', (req, res) => {
  const monthlyBudget = new MonthlyBudget({
    category: 'Shopping',
    budget: 24
  });

  monthlyBudget.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

// Post a new budget
router.post('/', (req, res) => {
  res.json({mssg: 'POST a New Budget'})
})

// Update the monthly budget
router.patch('/', (req, res) => {
  res.json({mssg: 'Update the Monthly Budget'})
})

module.exports = router;