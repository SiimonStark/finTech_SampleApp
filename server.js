const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const payee = require('./routes/api/payee');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
  .connect(
    db,
    //* This object helps to connect to mLab
    {
      useUnifiedTopology: true,
      useNewUrlParser: true
    }
  )
  .then(() => console.log("Connected to Atlas 📡"))
  .catch((err) => console.log("Failed to connect to Atlas 🛑", err));

// Use Routes
app.use('/api/payee', payee);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port ", port));