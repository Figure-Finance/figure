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

// savingsSchema.set('toJSON', {
//   transform: function (doc, ret, options) {
//     ret.id = ret._id
//     delete ret._id
//     delete ret.__v
//   }
// })

savingsSchema.method('toClient', function () {
  const obj = this.toObject()
  const updates = this.progressUpdates

  updates.filter(u => {
    u.id = u._id
    delete u._id

    return u.id
  })
  // Rename fields
  obj.id = obj._id
  delete obj._id
  delete obj.__v

  return obj
})

module.exports = mongoose.model('Savings', savingsSchema)
