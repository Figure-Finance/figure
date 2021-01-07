const User = require('../models/user')
const Finance = require('../models/finances')

const { filterByTimeFrame, filterSavingsData } = require('../util/savingsByTimeFrame')
const getMonth = require('date-fns/getMonth')
const isWithinInterval = require('date-fns/isWithinInterval')

exports.getUserYearlyFinances = (req, res, next) => {
  // Return finances for YTD by month for FE graph
  const startDate = new Date(req.params.startDate)
  const endDate = new Date(req.params.endDate)
  let dates
  let cursor
  const index = 0
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
          // cursor = # of month finance belongs to for each month in interval between start and end date
          dates = financeData.map(i => {
            cursor = getMonth(new Date(i.date))
            return {
              month: cursor + 1,
              category: i.category,
              amount: i.amount,
              isIncome: i.isIncome
            }
          })
          return res.status(200).json(dates)
        })
        .catch(err => console.log(err))
    })
    .catch(err => {
      console.log(err)
    })
}
