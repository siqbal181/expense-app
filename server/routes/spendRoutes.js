const express = require('express');
const router = express.Router();
const MonthlySpend = require('../models/monthlySpend')

router.get('/', (req, res) => {
  const monthlySpend = new MonthlySpend({
    category: 'Bills',
    budget: 150,
    month: 'January'
  })

  monthlySpend.save()
    .then((result) => {
      res.send(result)
    })
    .catch((err) => {
      console.log(err);
    })
})

module.exports = router;