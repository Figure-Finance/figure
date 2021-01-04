const User = require('../models/user')
const Finance = require('../models/finances')

const { filterByTimeFrame, filterSavingsData } = require('../util/savingsByTimeFrame')
const eachMonthOfInterval = require('date-fns/eachMonthOfInterval')
const startOfYear = require('date-fns/startOfYear')
const lastDayOfYear = require('date-fns/lastDayOfYear')
const lastDayOfMonth = require('date-fns/lastDayOfMonth')

// TODO: talk to FE - what data is needed for yrly graph?
// Get income/expenses for each month

exports.getUserYearlyFinances = (req, res, next) => {
  // This route needs to return finance data by month for graph
  const startDate = req.params.startDate
  const endDate = req.params.endDate
  let finances
  let financesToReturn
  // TODO: find user by authenticated/current user
  User.findOne()
    .then(user => {
      const financeData = Finance.find({ userId: user._id })
      filterByTimeFrame('year', financeData, startOfYear, lastDayOfYear)
        .then(filteredFinances => {
        // Use each week of interval as a helper
          return eachMonthOfInterval({
            start: filteredFinances[0].date,
            end: filteredFinances[filteredFinances.length - 1].date
          })
        })
        .then(months => {
          // Use filterSavingsData from utils to return data in correct format for FE
          financesToReturn = filterSavingsData(filteredFinances, 'Month ', months.length, lastDayOfMonth, financesToReturn, months, 0)
          return res.status(200).json(financesToReturn)
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err)
    })
}
