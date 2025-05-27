const express = require('express');
const router = express.Router();

// Grocery Model
const Grocery = require('../../models/Grocery');

// @route   GET api/groceries
// @desc    Get All Grocery Items
// @access  Public
router.get('/', async (req, res) => {
  try {
    const groceries = await Grocery.find().sort({ date: -1 });
    res.json(groceries);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/groceries
// @desc    Create A Grocery Item
// @access  Public
router.post('/', async (req, res) => {
  try {
    const newGrocery = new Grocery({
      name: req.body.name,
      quantity: req.body.quantity,
      unit: req.body.unit,
      category: req.body.category,
      frequency: req.body.frequency || 'daily'
    });

    const grocery = await newGrocery.save();
    res.json(grocery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/groceries/:id
// @desc    Update A Grocery Item
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const grocery = await Grocery.findById(req.params.id);
    
    if (!grocery) {
      return res.status(404).json({ msg: 'Grocery item not found' });
    }
    
    // Update fields
    if (req.body.name) grocery.name = req.body.name;
    if (req.body.quantity) grocery.quantity = req.body.quantity;
    if (req.body.unit) grocery.unit = req.body.unit;
    if (req.body.category) grocery.category = req.body.category;
    if (req.body.frequency) grocery.frequency = req.body.frequency;
    if (req.body.purchased !== undefined) grocery.purchased = req.body.purchased;
    
    await grocery.save();
    res.json(grocery);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/groceries/:id
// @desc    Delete A Grocery Item
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const grocery = await Grocery.findByIdAndDelete(req.params.id);
    
    if (!grocery) {
      return res.status(404).json({ msg: 'Grocery item not found' });
    }
    
    res.json({ success: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
