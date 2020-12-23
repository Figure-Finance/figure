const mongoose = require('mongoose')
const User = require('../models/user')
const Savings = require('../models/savings')

exports.getBankSavings = (req, res, next) => {
  Savings.findOne()
    .then(savings => {
      console.log(savings)
      return res.status(200).json(savings)
    })
    .catch(err => console.log(err))
}

exports.postBankSavings = (req, res, next) => {
  const totalSavingsGoal = req.body.totalSavingsGoal
  const itemGoals = req.body.itemGoals
  // TODO: bankProgress will auto update and is just received through here for testing
  const totalSavingsProgress = req.body.totalSavingsProgress
  Savings.find()
    .then(savings => {
      const bankSavings = new Savings({
        totalSavingsGoal: totalSavingsGoal,
        itemGoals: itemGoals, // { name: 'New Bike', amount: 450 }
        totalSavingsProgress: totalSavingsProgress
      })
      bankSavings.save(err => console.log(err))
      return res.status(201).json(bankSavings)
    })
    .catch(err => console.log(err))
}

exports.getItemGoalDetails = (req, res, next) => {
  const itemGoalId = req.params.id
  Savings.findOne({ 'itemGoals._id': itemGoalId })
    .then(savingsItem => {
      const itemGoal = savingsItem.itemGoals.filter(item => {
        return item._id.toString() === itemGoalId.toString()
      })
      return res.status(200).json(itemGoal)
    })
    .catch(err => console.log(err))
}

exports.deleteItemGoal = (req, res, next) => {
  const itemGoalId = req.params.id
  Savings.findOne({ 'itemGoals._id': itemGoalId })
    .then(savingsItem => {
      newSavingsItemGoals = savingsItem.itemGoals.filter(item => {
        return item._id.toString() !== itemGoalId.toString()
      })
      savingsItem.itemGoals = newSavingsItemGoals
      savingsItem.save()
      return res.status(200).json({ msg: 'Successfully deleted goal!' })
    })
    .catch(err => console.log(err))
}
