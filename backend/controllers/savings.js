const User = require('../models/user')
const Savings = require('../models/savings')
const ItemGoal = require('../models/itemGoal')

const startOfToday = require('date-fns/startOfToday')

const startOfWeek = require('date-fns/startOfWeek')
const lastDayOfWeek = require('date-fns/lastDayOfWeek')

const startOfYear = require('date-fns/startOfYear')
const lastDayOfYear = require('date-fns/lastDayOfYear')

const startOfQuarter = require('date-fns/startOfQuarter')
const lastDayOfQuarter = require('date-fns/lastDayOfQuarter')

const eachWeekOfInterval = require('date-fns/eachWeekOfInterval')
const startOfMonth = require('date-fns/startOfMonth')
const lastDayOfMonth = require('date-fns/lastDayOfMonth')

const isWithinInterval = require('date-fns/isWithinInterval')

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
      return res.status(200).json(savingsItem.totalSavingsGoal)
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
      return res.status(200).json(savingsItem.totalSavingsProgress)
    })
    .catch(err => console.log(err))
}

exports.getByTimeFrame = (req, res, next) => {
  const timeFrame = req.params.timeFrame
  let interval
  let savings
  // TODO: find by current user id
  Savings.findOne()
    .then(savingsItem => {
      if (timeFrame === 'month') {
        savings = savingsItem.progressUpdates.filter(i => {
          return isWithinInterval(new Date(i.date), {
            start: startOfMonth(startOfToday()),
            end: lastDayOfMonth(startOfToday())
        })
      })
        console.log(`savings after filtering: ${savings}`)
      } else if (timeFrame === 'year') {
        savings = savingsItem.progressUpdates.filter(i => {
          return isWithinInterval(new Date(i.date), {
            start: startOfYear(startOfToday()),
            end: lastDayOfYear(startOfToday())
          })
        })
      } else if (timeFrame === 'week') {
        savings = savingsItem.progressUpdates.filter(i => {
          return isWithinInterval(new Date(i.date), {
            start: startOfWeek(startOfToday()),
            end: lastDayOfWeek(startOfToday())
          })
        })
      } else if (timeFrame === 'all') {
        savings = savingsItem.progressUpdates.filter(i => {
          return isWithinInterval(new Date(i.date), {
            start: new Date(2019, 01, 01),
            end: startOfToday()
          })
        })
      } else if (timeFrame === 'quarter') {
        savings = savingsItem.progressUpdates.filter(i => {
          return isWithinInterval(new Date(i.date), {
            start: startOfQuarter(startOfToday()),
            end: lastDayOfQuarter(startOfToday())
          })
        })
      }
      return res.status(200).json(savings)
    })

// By week: display each day
// By month: display each week
// By 3 month: display each week
// By year: display each month
// By all time: display quarterly
}
