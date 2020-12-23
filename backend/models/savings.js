const mongoose = require('mongoose')

const Schema = mongoose.Schema

const savingsSchema = new Schema({
  totalSavingsGoal: {
    type: Number,
    required: true
  },
  itemGoals: [{
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    progress: { type: Number, required: false }
  }],
  totalSavingsProgress: {
    type: Number,
    required: false
  }
})

module.exports = mongoose.model('Savings', savingsSchema)
