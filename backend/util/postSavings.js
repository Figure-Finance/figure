const Savings = require('../models/savings')
const User = require('../models/user')

const { validationResult } = require('express-validator')

const startOfToday = require('date-fns/startOfToday')

const postSavings = (totalSavingsGoal, totalSavingsProgress, userId) => {
  let newSavings
  return User.findById(userId)
    .then(user => {
      newSavings = new Savings({
        totalSavingsGoal: totalSavingsGoal, // { totalSavingsGoal: 10000, totalSavingsProgress: 450 }
        totalSavingsProgress: totalSavingsProgress,
        userId: user._id
      })
      newSavings.progressUpdates.push({ date: startOfToday(), progressAmount: totalSavingsProgress })
      return newSavings.save()
    })
    .then(result => {
      return new Promise((resolve, reject) => {
        result ? resolve(newSavings) : reject('Unable to create new savings entry.')
      })
    })
    .catch(err => console.log(err))
}

module.exports = postSavings
