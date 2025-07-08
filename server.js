const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const expenseRoutes = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  }))
  .catch(err => console.log(err));
