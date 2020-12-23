const mongoose = require('mongoose')

const Schema = mongoose.Schema

const savingsSchema = new Schema({
  bankGoal: {
    type: Number,
    required: true
  },
  itemGoals: [{
    item: { type: String, required: true },
    amount: { type: Number, required: true },
    progress: { type: Number, required: false }
  }],
  bankProgress: {
    type: Number,
    required: false
  }
})

module.exports = mongoose.model('Savings', savingsSchema)
