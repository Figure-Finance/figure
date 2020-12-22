const mongoose = require('mongoose')

const Schema = mongoose.Schema

const financeSchema = new Schema({
  category: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isIncome: {
    type: Boolean,
    required: true
  },
  date: {
    type: String,
    require: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  }
})

module.exports = mongoose.model('Finance', financeSchema)
