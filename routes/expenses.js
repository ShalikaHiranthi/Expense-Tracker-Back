const express = require("express");
const router = express.Router();
const Expense = require("../models/Expense");

router.get("/", async (req, res) => {
  const expenses = await Expense.find();
  res.json(expenses);
});

router.post("/", async (req, res) => {
  const newExpense = new Expense(req.body);
  const saved = await newExpense.save();
  res.json(saved);
});

router.delete("/:id", async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

router.get("/monthly-summary", async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json(summary);
  } catch (error) {
    console.error("Summary error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
