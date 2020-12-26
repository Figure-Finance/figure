const User = require('../models/user')
const Savings = require('../models/savings')
const ItemGoal = require('../models/itemGoal')

const filterByTimeFrame = require('../util/savingsByTimeFrame')

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
  let savingsToReturn
  // TODO: find by current user id
  Savings.findOne()
    .then(savingsItem => {
      if (timeFrame === 'month') {
        savings = filterByTimeFrame('month', savingsItem.progressUpdates, startOfMonth, lastDayOfMonth)
          // return lastDayOfWeek() for each week, if lastDayOfWeek already present in filtered list, override that with new (to get latest)
        console.log('Each week of interval: ' + eachWeekOfInterval({
          start: savings[0].date,
          end: savings[savings.length - 1].date
        }))
        if (savings) {
          weeks = eachWeekOfInterval({
            start: savings[0].date,
            end: savings[savings.length - 1].date
          })
          // for (let i in savings) {
          //   if (i.date.toString() === )
          // }
        }
        // for each week of interval
        // if last day of week
        // create object & add to array of objets
        // else if only entry
        // create array of objects and return that
        // else section monthly results by 4, return last item of each array (then optimize this later)

        // Get weeks in interval, return dates within those weeks?
        // [{period: week1, amount: cumTotal}, ...]
        // So we could use the cumulative total from the last day of each week, but how do we figure out
        // What the last day in the accurate weeks are?
      } else if (timeFrame === 'year') {
        savings = filterByTimeFrame('year', savingsItem.progressUpdates, startOfYear, lastDayOfYear)
      } else if (timeFrame === 'week') {
        savings = filterByTimeFrame('week', savingsItem.progressUpdates, startOfWeek, lastDayOfWeek)
      } else if (timeFrame === 'all') {
        // TODO: edit this to make sense for 'all's arbitrary start date
        savings = updatesList.filter(i => {
          return isWithinInterval(new Date(i.date), {
            // TODO: make start date based on user creation date
            start: new Date(2019, 01, 01),
            end: startOfToday()
          })
        })
      } else if (timeFrame === 'quarter') {
        savings = filterByTimeFrame('quarter', savingsItem.progressUpdates, startOfQuarter, lastDayOfQuarter)
      }
      return res.status(200).json(savings)
    })

// By week: display each day
// By month: display each week
// By 3 month: display each week
// By year: display each month
// By all time: display quarterly
}
