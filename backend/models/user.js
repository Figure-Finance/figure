const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  finances: [{
    financeId: { type: Schema.Types.ObjectId, ref: 'Finance', required: true },
    date: { type: String, required: true },
    required: false
  }]
})

module.exports = mongoose.model('User', userSchema)
