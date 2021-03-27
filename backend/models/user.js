const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema(
  {
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
    categories: [
      {
        category: { type: String, required: true },
        isIncome: { type: Boolean, required: true }
      }
    ],
    finances: [
      {
        id: { type: Schema.Types.ObjectId, ref: 'Finance' }
      }
    ]
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
