const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require("config");

const payee = require('./routes/api/payee');

const app = express();

app.use(bodyParser.json());

// DB Config
const db = config.get('mongoURI');

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

// Serve Static Build file in Production
if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log("Server started on port ", port));