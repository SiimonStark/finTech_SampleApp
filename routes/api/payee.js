const express = require('express');
const router = express.Router();

// Payee Model
const Payee = require('../../models/Payee');

// @route GET api/payee
router.get('/', (req, res) => {
  Payee.find()
    .then(payee => res.json(payee))
})

// @route POST api/payee
router.post('/', (req, res) => {
  const newPayee = new Payee({
    Payee: req.body.Payee,
    Payment: req.body.Payment
  });

  newPayee.save().then(payee => res.json(payee));
})

module.exports = router;