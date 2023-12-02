const MonthlySpend = require('../models/monthlySpendModel');

const getSpend = async (req, res) => {
  const monthlySpend = await MonthlySpend.find({})

  res.status(200).json(monthlySpend);
}

const saveSpend = async (req, res) => {
  const spendData = req.body

  try {
    const result = await Promise.all(

      spendData.map(async (spendItem) => {
        const { category, budget, month, year } = spendItem;
        const monthlySpend = new MonthlySpend({ category, budget, month, year});
        return await monthlySpend.save();
      })
    );
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteSpend = async (req, res) => {
  const id = req.params.id;

  try {
    const monthlySpend = await MonthlySpend.findByIdAndDelete(id);

    if (!monthlySpend) {
      return res.status(404).json({ error: 'Spend item not found' });
    }

    res.status(200).json({ message: 'Spend item deleted'});
  } catch (error) {
    res.status(500).json({error: error.message});
  } 
}

const updateSpend = async (req, res) => {
  const id = req.params.id;
  const updatedSpend = req.body

  try {
    const updatedSpendItem = await MonthlySpend.findByIdAndUpdate(id, updatedSpend, {
      new: true,
      runValidators: true
    });

    if (!updatedSpendItem) {
      return res.status(404).json({ error: 'Spend item not found' });
    }

    res.status(200).json({ message: 'Spend updated' })
  } catch(error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = { getSpend, saveSpend, deleteSpend, updateSpend };