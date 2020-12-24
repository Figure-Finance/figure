const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemGoalSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('ItemGoal', itemGoalSchema)
