const express = require('express');
const router = express.Router();
const { getSpend, saveSpend, deleteSpend, updateSpend } = require('../controllers/monthlySpendController')

router.get('/', getSpend);

router.post('/save-spend', saveSpend);

router.delete('/delete-spend/:id', deleteSpend);

router.patch('/update-spend/:id', updateSpend);

module.exports = router;