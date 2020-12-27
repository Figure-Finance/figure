const User = require('../models/user')
const Savings = require('../models/savings')
const ItemGoal = require('../models/itemGoal')

const timeFrameUtils = require('../util/savingsByTimeFrame')

const startOfToday = require('date-fns/startOfToday')

const isWithinInterval = require('date-fns/isWithinInterval')

const eachDayOfInterval = require('date-fns/eachDayOfInterval')
const startOfWeek = require('date-fns/startOfWeek')
const lastDayOfWeek = require('date-fns/lastDayOfWeek')

const eachMonthOfInterval = require('date-fns/eachMonthOfInterval')
const startOfYear = require('date-fns/startOfYear')
const lastDayOfYear = require('date-fns/lastDayOfYear')

const eachQuarterOfInterval = require('date-fns/eachQuarterOfInterval')
const startOfQuarter = require('date-fns/startOfQuarter')
const lastDayOfQuarter = require('date-fns/lastDayOfQuarter')

const eachWeekOfInterval = require('date-fns/eachWeekOfInterval')
const startOfMonth = require('date-fns/startOfMonth')
const lastDayOfMonth = require('date-fns/lastDayOfMonth')

const { filterByTimeFrame, filterSavingsData } = timeFrameUtils
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
  // TODO: get this by user
  Savings.findOne()
    .then(savingsItem => {
      const last = savingsItem.progressUpdates[savingsItem.progressUpdates.length - 1]
      let curTotal = savingsItem.totalSavingsProgress + req.body.progressAmount
      if (!last) {
        savingsItem.progressUpdates = [{date: startOfToday(), curTotal: curTotal }]
      } else if (last.date.toString() === startOfToday().toString()) {
         console.log(`Adding: ${savingsItem.totalSavingsProgress + req.body.progressAmount}`)
	       last.curTotal = curTotal
         console.log(`Progress updates from else if ${savingsItem.progressUpdates}`)
      } else {
	       savingsItem.progressUpdates.push({ date: startOfToday(), curTotal: curTotal })
      }
      savingsItem.totalSavingsProgress += req.body.progressAmount
      savingsItem.save(err => console.log(err))
      return res.status(200).json(savingsItem.totalSavingsProgress)
    })
    .catch(err => console.log(err))
}

exports.getByTimeFrame = (req, res, next) => {
  const timeFrame = req.params.timeFrame
  let interval
  let savings
  let savingsToReturn = []
  // TODO: find by current user id
  Savings.findOne()
    .then(savingsItem => {
      if (timeFrame === 'month') {
        // If user clicks monthly view, filter to show their progress data by week
        savings = filterByTimeFrame('month', savingsItem.progressUpdates, startOfMonth, lastDayOfMonth)
        if (savings) {
          // Use each week of interval as a helper
          weeks = eachWeekOfInterval({
            start: savings[0].date,
            end: savings[savings.length - 1].date
          })
        }
        // Use filterSavingsData from utils to return data in correct format for FE
        savingsToReturn = filterSavingsData(savings, 'Week ', weeks.length, lastDayOfWeek, savingsToReturn, weeks, 0)
      } else if (timeFrame === 'year') {
        // If user clicks yearly view, filter to show their progress data by month
        savings = filterByTimeFrame('year', savingsItem.progressUpdates, startOfYear, lastDayOfYear)
        if (savings) {
          // Use each month of interval as a helper
          months = eachMonthOfInterval({
            start: savings[0].date,
            end: savings[savings.length - 1].date
          })
        }
        // Use filterSavingsData from utils to return data in correct format for FE
        savingsToReturn = filterSavingsData(savings, 'Month ', months.length, lastDayOfMonth, savingsToReturn, months, 0)
      } else if (timeFrame === 'week') {
        // If user clicks weekly view, filter to show their progress data by day
        console.log(savingsItem)
        savings = filterByTimeFrame('week', savingsItem.progressUpdates, startOfWeek, lastDayOfWeek)
        console.log(savings)
        if (savings) {
          // Use each week of interval as a helper
          days = eachDayOfInterval({
            start: savings[0].date,
            end: savings[savings.length - 1].date
          })
        }
        // Use filterSavingsData from utils to return data in correct format for FE
        savingsToReturn = filterSavingsData(savings, 'Day ', days.length, lastDayOfWeek, savingsToReturn, days, 0)
      } else if (timeFrame === 'all') {
        // If user clicks all view, filter to show their progress data by quarter
        savings = savingsItem.progressUpdates.filter(i => {
          return isWithinInterval(new Date(i.date), {
            // TODO: make start date based on user creation date
            start: new Date(2019, 01, 01),
            end: startOfToday()
          })
        })
        if (savings) {
          // Use each week of interval as a helper
          quarters = eachQuarterOfInterval({
            start: savings[0].date,
            end: savings[savings.length - 1].date
          })
        }
        // Use filterSavingsData from utils to return data in correct format for FE
        savingsToReturn = filterSavingsData(savings, 'Quarter ', quarters.length, lastDayOfQuarter, savingsToReturn, quarters, 0)
      } else if (timeFrame === 'quarter') {
        // If user clicks quarterly view, filter to show their progress data by week
        savings = timeFrameUtils.filterByTimeFrame('quarter', savingsItem.progressUpdates, startOfQuarter, lastDayOfQuarter)
        if (savings) {
          // Use each week of interval as a helper
          weeks = eachWeekOfInterval({
            start: savings[0].date,
            end: savings[savings.length - 1].date
          })
        }
        // Use filterSavingsData from utils to return data in correct format for FE
        savingsToReturn = filterSavingsData(savings, 'Week ', weeks.length, lastDayOfWeek, savingsToReturn, weeks, 0)
      }
      return res.status(200).json(savingsToReturn)
    })
}
