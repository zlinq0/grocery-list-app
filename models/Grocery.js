const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GrocerySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1
  },
  unit: {
    type: String,
    default: 'item'
  },
  category: {
    type: String,
    default: 'general'
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekend', 'monthly'],
    default: 'daily'
  },
  purchased: {
    type: Boolean,
    default: false
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('grocery', GrocerySchema);
