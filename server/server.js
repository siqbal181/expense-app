const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const MonthlyBudget = require('./models/monthlyBudget');
require("dotenv").config({ path: './config.env' });

// Create an Express app
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB using Mongoose
const dbURI = 'mongodb+srv://sidra:8cLQDlmR7W5CfHfO@expense-app.hzsnzwi.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ' + err);
  });

// routes
app.get('/save-budget', (req, res) => {
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