const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

router.get('/', async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

router.post('/', async (req, res) => {
  const newExpense = new Expense(req.body);
  const saved = await newExpense.save();
  res.json(saved);
});

router.delete('/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

module.exports = router;
