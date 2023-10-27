const express = require('express');
const router = express.Router();
const MonthlyBudget = require('../models/monthlyBudget');

router.get('/save-budget', (req, res) => {
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

module.exports = router;