const mongoose = require('mongoose')

const Schema = mongoose.Schema

const savingsSchema = new Schema({
  totalSavingsGoal: {
    type: Number,
    required: true
  },
  totalSavingsProgress: {
    type: Number,
    required: false
  },
  progressUpdates: [{
    date: { type: Date },
    curTotal: { type: Number }
  }],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Savings', savingsSchema)
