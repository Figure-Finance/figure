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
      return savings = {
        id: savingsDoc._id,
        totalSavingsGoal: savingsDoc.totalSavingsGoal,
        totalSavingsProgress: savingsDoc.totalSavingsProgress,
        progressUpdates: savingsDoc.progressUpdates.map(update => {
          return { id: update._id, date: update.date, curTotal: update.curTotal }
        })
      }
      next()
    })
    .catch(err => console.log(err))
  ItemGoal.find()
    .then(itemGoalArray => {
      itemGoals = itemGoalArray.map(i => {
        return { id: i._id, progress: i.progress, name: i.name, amount: i.amount, description: i.description }
      })
      return res.status(200).json({ ...savings, itemGoals })
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
          return res.status(201).json({ id: totalSavings._id })
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
      return res.status(200).json({ message: "Savings goal successfully updated."})
    })
    .catch(err => console.log(err))
}

exports.updateTotalSavingsProgress = (req, res, next) => {
  // TODO: get this by user
  Savings.findOne()
    .then(savingsItem => {
      const last = savingsItem.progressUpdates[savingsItem.progressUpdates.length - 1]
      const curTotal = savingsItem.totalSavingsProgress + req.body.progressAmount
      if (!last) {
        savingsItem.progressUpdates = [{ date: startOfToday(), curTotal: curTotal }]
      } else if (last.date.toString() === startOfToday().toString()) {
	       last.curTotal = curTotal
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
        filterByTimeFrame('month', savingsItem.progressUpdates, startOfMonth, lastDayOfMonth)
          .then(filteredSavings => {
            savings = filteredSavings
            // Use each week of interval as a helper
            return eachWeekOfInterval({
              start: savings[0].date,
              end: savings[savings.length - 1].date
            })
          })
          .then(weeks => {
          // Use filterSavingsData from utils to return data in correct format for FE
            savingsToReturn = filterSavingsData(savings, 'Week ', weeks.length, lastDayOfWeek, savingsToReturn, weeks, 0)
            return res.status(200).json(savingsToReturn)
          })
          .catch(err => console.log(err))
      } else if (timeFrame === 'year') {
        // If user clicks yearly view, filter to show their progress data by month
        filterByTimeFrame('year', savingsItem.progressUpdates, startOfYear, lastDayOfYear)
          .then(filteredSavings => {
            savings = filteredSavings
            // Use each week of interval as a helper
            return eachMonthOfInterval({
              start: savings[0].date,
              end: savings[savings.length - 1].date
            })
          })
          .then(months => {
          // Use filterSavingsData from utils to return data in correct format for FE
            savingsToReturn = filterSavingsData(savings, 'Month ', months.length, lastDayOfMonth, savingsToReturn, months, 0)
            return res.status(200).json(savingsToReturn)
          })
          .catch(err => console.log(err))
      } else if (timeFrame === 'week') {
        // If user clicks weekly view, filter to show their progress data by day
        filterByTimeFrame('week', savingsItem.progressUpdates, startOfWeek, lastDayOfWeek)
          .then(filteredSavings => {
            savings = filteredSavings
            // Use each week of interval as a helper
            return eachDayOfInterval({
              start: savings[0].date,
              end: savings[savings.length - 1].date
            })
          })
          .then(days => {
          // Use filterSavingsData from utils to return data in correct format for FE
            savingsToReturn = filterSavingsData(savings, 'Day ', days.length, lastDayOfWeek, savingsToReturn, days, 0)
            console.log(`Savings to return amount line 165: ${savingsToReturn.amount}`)
            return res.status(200).json(savingsToReturn)
          })
          .catch(err => console.log(err))
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
        return res.status(200).json(savingsToReturn)
      } else if (timeFrame === 'quarter') {
        // If user clicks quarterly view, filter to show their progress data by week
        filterByTimeFrame('quarter', savingsItem.progressUpdates, startOfQuarter, lastDayOfQuarter)
          .then(filteredSavings => {
            savings = filteredSavings
            // Use each week of interval as a helper
            return eachWeekOfInterval({
              start: savings[0].date,
              end: savings[savings.length - 1].date
            })
          })
          .then(weeks => {
          // Use filterSavingsData from utils to return data in correct format for FE
            savingsToReturn = filterSavingsData(savings, 'Week ', weeks.length, lastDayOfQuarter, savingsToReturn, weeks, 0)
            return res.status(200).json(savingsToReturn)
          })
          .catch(err => console.log(err))
      }
    })
}
