const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const budgetRoutes = require('./routes/budgetRoutes');
const spendRoutes = require('./routes/spendRoutes');

require("dotenv").config();

// Create an Express app
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB: ' + err);
  });

// middelware to console log the type of request 
app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use((req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  console.log('Request Body:', req.body);
  next();
});

//routes
app.get('/', (req, res) => {
  res.send('Root of application')
})

app.use('/budgets', budgetRoutes);
app.use('/spends', spendRoutes);