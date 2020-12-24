const mongoose = require('mongoose')
const User = require('../models/user')
const Savings = require('../models/savings')
const ItemGoal = require('../models/itemGoal')

// TOTAL SAVINGS ROUTES

//
exports.getSavings = (req, res, next) => {
  // TODO: findOne by current user's id
  let savings
  let itemGoals
  Savings.findOne()
    .then(savingsDoc => {
      savings = savingsDoc
      console.log(savings)
      // TODO: findOne by current user's id
      ItemGoal.findOne()
        .then(itemGoalDoc => {
          itemGoals = itemGoalDoc
          console.log(itemGoals)
        })
        .catch(err => console.log(err))
      return res.status(200).json({ totalSavings: savings, itemGoals: itemGoals })
    })
    .catch(err => console.log(err))
}

exports.postTotalSavings = (req, res, next) => {
  const totalSavingsGoal = req.body.totalSavingsGoal
  const itemGoals = req.body.itemGoals
  // TODO: bankProgress will auto update and is just received through here for testing
  const totalSavingsProgress = req.body.totalSavingsProgress
  Savings.find()
    .then(savings => {
      const bankSavings = new Savings({
        totalSavingsGoal: totalSavingsGoal, // { name: 'New Bike', amount: 450 }
        totalSavingsProgress: totalSavingsProgress
      })
      bankSavings.save(err => console.log(err))
      return res.status(201).json(bankSavings)
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

// exports.deleteItemGoal = (req, res, next) => {
//   const itemGoalId = req.params.id
//   Savings.findOne({ 'itemGoals._id': itemGoalId })
//     .then(savingsItem => {
//       const newSavingsItemGoals = savingsItem.itemGoals.filter(item => {
//         return item._id.toString() !== itemGoalId.toString()
//       })
//       savingsItem.itemGoals = newSavingsItemGoals
//       savingsItem.save()
//       return res.status(200).json({ msg: 'Successfully deleted goal!' })
//     })
//     .catch(err => console.log(err))
// }

// exports.editItemGoal = (req, res, next) => {
//   const itemGoalId = req.params.id
//   const newName = req.body.name
//   const newAmount = req.body.amount
//   const newDescription = req.body.description
//   console.log(`request body: ${req.body.name}`)
//   Savings.findOne({ 'itemGoals._id': itemGoalId })
//     .then(savingsItem => {
//       const itemGoal = savingsItem.itemGoals.filter(item => {
//         return item._id.toString() === itemGoalId.toString()
//       })
//       console.log(`Item Goal after filter: ${itemGoal}`)
//
//       itemGoal.name = newName
//       itemGoal.amount = newAmount
//       itemGoal.description = newDescription
//
//       savingsItem.save()
//       console.log(`Item goal after changing: ${itemGoal}`)
//
//       return res.status(200).json({ savingsItem })
//     })
//     .catch(err => console.log(err))
// }
