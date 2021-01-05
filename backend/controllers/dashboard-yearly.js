const User = require('../models/user')
const Finance = require('../models/finances')

const { filterByTimeFrame, filterSavingsData } = require('../util/savingsByTimeFrame')
const eachMonthOfInterval = require('date-fns/eachMonthOfInterval')
const startOfYear = require('date-fns/startOfYear')
const lastDayOfYear = require('date-fns/lastDayOfYear')
const lastDayOfMonth = require('date-fns/lastDayOfMonth')

const min = require('date-fns/min')
const max = require('date-fns/max')

// TODO: Figure out why this is throwing an error on the last recursive function call

exports.getUserYearlyFinances = (req, res, next) => {
  // This route needs to return finance data by month for graph
  const startDate = req.params.startDate
  const endDate = req.params.endDate
  let finances
  let financesToReturn = []
  // TODO: find user by authenticated/current user
  User.findOne()
    .then(user => {
      Finance.find({
        userId: user._id,
        date: {
          $gte: startDate,
          $lte: endDate
        }
      })
        .then(financeData => {
          // Use each week of interval as a helper
          finances = financeData
          dates = finances.map(i => {
            return i.date
          })
          const months = eachMonthOfInterval({
            start: min(dates),
            end: max(dates)
          })
          financesToReturn = filterSavingsData(finances, 'Month ', months.length, lastDayOfMonth, financesToReturn, months, 0)
          return res.status(200).json(financesToReturn)
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err)
    })
}
