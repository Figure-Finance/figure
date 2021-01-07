const User = require('../models/user')
const Finance = require('../models/finances')

const { filterByTimeFrame, filterSavingsData } = require('../util/savingsByTimeFrame')
const getMonth = require('date-fns/getMonth')
const isWithinInterval = require('date-fns/isWithinInterval')

exports.getUserYearlyGraph = (req, res, next) => {
  // Return finances for YTD by month for FE graph
  const startDate = new Date(req.params.startDate)
  const endDate = new Date(req.params.endDate)
  let dates
  // TODO: find user by authenticated/current user
  User.findOne()
    .then(user => {
      Finance.aggregate([
        {
          $match: {
            userId: user._id,
            date: {
              $gte: startDate,
              $lte: endDate
            }
          }
        },
        { $group: { _id: { $month: '$date' }, amount: { $sum: '$amount' }, isIncome: { $first: '$isIncome' } } }
      ])
        .exec((err, result) => {
          if (err) {
            console.log(err)
          }
          if (result) {
            console.log(result)
            dates = result.map(r => {
              return { month: r._id, amount: r.amount, isIncome: r.isIncome }
            })
            return res.status(200).json(dates)
          }
        })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.getUserYearlyFinances = (req, res, next) => {
  const startDate = new Date(req.params.startDate)
  const endDate = new Date(req.params.endDate)
  let finances
  User.findOne()
    .then(user => {
      Finance.aggregate([
        {
          $match: {
            userId: user._id,
            date: {
              $gte: startDate,
              $lte: endDate
            }
          }
        },
        { $group: { _id: '$category', amount: { $sum: '$amount' }, isIncome: { $first: '$isIncome' } } }
      ])
        .exec((err, result) => {
          if (err) {
            console.log(err)
          }
          if (result) {
            console.log(result)
            finances = result.map(r => {
              return { id: r._id, amount: r.amount, isIncome: r.isIncome }
            })
            return res.status(200).json(finances)
          }
        })
    })
    .catch(err => {
      console.log(err)
    })
}
