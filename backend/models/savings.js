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
  progressUpdates: [
    {
      date: { type: Date },
      curTotal: { type: Number }
    }
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

savingsSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Savings', savingsSchema)
