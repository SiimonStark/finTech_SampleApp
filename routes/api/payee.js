const express = require('express');
const router = express.Router();
const sample = require('../../data/sample.json');

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
    Payment: req.body.Payment,
    Remittance: req.body.Remittance || []
  });

  newPayee.save().then(payee => res.json(payee));
})

// @route DELETE api/reset
// @Descript Empty database and fill with sample data
router.delete('/:id', (req, res) => {
  Payee
    .findById(req.params.id)
    .then(payee => payee.deleteOne().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false}));
})


// @route POST api/reset
// @Descript Empty database and fill with sample data
router.post('/reset', (req, res) => {
  // Clear database
  Payee.deleteMany({})
    // Create new schema instances based on sample data
    .then(() => {
      return sample.map(p => {
        const newPayee = new Payee({
          Payee: p.Payee,
          Payment: p.Payment,
          Remittance: p.Remittance
        })
        newPayee.save()
        return newPayee
      });
    })
    .then(result => res.json(result))
    .catch(err => res.json(`Failed to Reset ${err}`));
})
// !! Struggled the most getting /reset to return the information that I wanted it to. It was working first try, but not in the way I wanted.

module.exports = router;