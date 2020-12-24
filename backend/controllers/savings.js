const User = require('../models/user')
const Savings = require('../models/savings')
const ItemGoal = require('../models/itemGoal')

const startOfToday = require('date-fns/startOfToday')

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
          const totalSavings = new Savings({
            totalSavingsGoal: totalSavingsGoal, // { name: 'New Bike', amount: 450 }
            totalSavingsProgress: totalSavingsProgress,
            userId: user._id
          })
          totalSavings.progressUpdates.push({ date: startOfToday(), progressAmount: totalSavingsProgress })
          totalSavings.save(err => console.log(err))
          return res.status(201).json(totalSavings)
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

exports.editTotalSavings = (req, res, next) => {
  const newTotalSavingsGoal = req.body.totalSavingsGoal
  // TODO: find by user
  Savings.findOne()
    .then(savingsItem => {
      savingsItem.totalSavingsGoal = newTotalSavingsGoal
      savingsItem.save(err => console.log(err))
      return res.status(200).json(savingsItem)
    })
    .catch(err => console.log(err))
}

exports.updateTotalSavingsProgress = (req, res, next) => {
  const newProgressAmount = req.body.progressAmount
  // TODO: get this by user
  Savings.findOne()
    .then(savingsItem => {
      savingsItem.progressUpdates.push({ date: startOfToday(), progressAmount: newProgressAmount })
      savingsItem.totalSavingsProgress += newProgressAmount
      savingsItem.save(err => console.log(err))
      return res.status(200).json(savingsItem)
    })
    .catch(err => console.log(err))
}

exports.getByTimeFrame = (req, res, next) => {
  const timeFrameAsDays = req.params.timeFrame

// By week: display each day
// By month: display each week
// By 3 month: display each week
// By year: display each month
// By all time: display quarterly
}
