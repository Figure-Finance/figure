// Require Savings model
const Savings = require('../models/savings')

const { validationResult } = require('express-validator')

// Require date-fns startOfToday to update progress
const startOfToday = require('date-fns/startOfToday')

const postSavings = (totalSavingsGoal, totalSavingsProgress, userId) => {
  const newSavings = new Savings({
    totalSavingsGoal: totalSavingsGoal, // { totalSavingsGoal: 10000, totalSavingsProgress: 450 }
    totalSavingsProgress: totalSavingsProgress,
    userId: userId
  })
  newSavings.progressUpdates.push({ date: startOfToday(), progressAmount: totalSavingsProgress })
  return newSavings.save()
    .then(result => {
      return new Promise((resolve, reject) => {
        result ? resolve(newSavings) : reject('Unable to create new savings entry.')
      })
    })
    .catch(err => console.log(err))
}

module.exports = postSavings
