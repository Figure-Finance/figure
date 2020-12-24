const mongoose = require('mongoose')
const User = require('../models/user')
const Savings = require('../models/savings')
const ItemGoal = require('../models/itemGoal')

// TOTAL SAVINGS ROUTES

exports.getSavings = (req, res, next) => {
  // TODO: findOne by current user's id
  let savings
  let itemGoals
  Savings.findOne()
    .then(savingsDoc => {
      return savings = savingsDoc
      next()
    })
    .catch(err => console.log(err))
  ItemGoal.find()
    .then(itemGoalArray => {
      itemGoals = itemGoalArray
      return res.status(200).json({ ...savings._doc, itemGoals })
    })
    .catch(err => console.log(err))
}

exports.postTotalSavings = (req, res, next) => {
  const totalSavingsGoal = req.body.totalSavingsGoal
  // TODO: bankProgress will auto update and is just received through here for testing
  const totalSavingsProgress = req.body.totalSavingsProgress
  const user = User.findOne()
    .then(user => {
      Savings.find()
        .then(savings => {
          const bankSavings = new Savings({
            totalSavingsGoal: totalSavingsGoal, // { name: 'New Bike', amount: 450 }
            totalSavingsProgress: totalSavingsProgress,
            userId: user._id
          })
          bankSavings.save(err => console.log(err))
          return res.status(201).json(bankSavings)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

// ITEMS GOALS ROUTES

exports.postItemGoals = (req, res, next) => {
  const name = req.body.name
  const amount = req.body.amount
  const description = req.body.description
  const user = User.findOne()
    .then(user => {
      console.log(`User from post route: ${user.firstName}`)
      ItemGoal.find()
        .then(itemGoals => {
          const newGoal = new ItemGoal({
            name: name,
            amount: amount,
            description: description,
            userId: user._id
          })
          newGoal.save(err => console.log(err))
          return res.status(201).json(newGoal)
        })
    })
    .catch(err => console.log(err))
}

exports.getItemGoalDetails = (req, res, next) => {
  const itemGoalId = req.params.id
  ItemGoal.findOne({ _id: itemGoalId })
    .then(itemGoal => {
      console.log(`Item goal: ${itemGoal}`)
      res.status(200).json(itemGoal)
    })
    .catch(err => console.log(err))
}

exports.deleteItemGoal = (req, res, next) => {
  const itemGoalId = req.params.id
  ItemGoal.findByIdAndDelete(itemGoalId, err => {
    console.log(err)
  })
  return res.status(200).json({ msg: 'Goal deleted successfully!' })
}

exports.editItemGoal = (req, res, next) => {
  const itemGoalId = req.params.id
  const newName = req.body.name
  const newAmount = req.body.amount
  const newDescription = req.body.description
  ItemGoal.findOne({ _id: itemGoalId })
    .then(itemGoal => {
      itemGoal.name = newName
      itemGoal.amount = newAmount
      itemGoal.description = newDescription
      itemGoal.save()
      return res.status(200).json(itemGoal)
    })
    .catch(err => console.log(err))
}

exports.allocateGoalFunds = (req, res, next) => {
  // TODO: when we have users, find this savings doc by current user
  const itemGoalId = req.params.id
  const allocateAmount = req.body.allocateAmount
  Savings.findOne()
    .then(totalSavings => {
      // console.log(totalSavings.totalSavingsProgress)
      totalSavings.totalSavingsProgress -= allocateAmount
      totalSavings.save(err => console.log(err))
      ItemGoal.findOne({ _id: itemGoalId })
        .then(itemGoal => {
          console.log(itemGoal)
          itemGoal.progress += allocateAmount
          itemGoal.save(err => console.log(err))
          console.log(itemGoal)
        })
        .catch(err => console.log(err))
      return res.status(200).json(totalSavings)
    })
    .catch(err => console.log(err))
}
