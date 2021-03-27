const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserYearlyGraph = async (req, res, next) => {
  // Return finances for YTD by month for FE graph
  const startDate = new Date(req.params.startDate)
  const endDate = new Date(req.params.endDate)
  const user = await User.findById(req.userId)
  const incomeResult = await Finance.aggregate([
    {
      $match: {
        userId: user._id,
        date: {
          $gte: startDate,
          $lte: endDate
        },
        isIncome: true
      }
    },
    {
      $group: {
        _id: { $month: '$date' },
        amount: { $sum: '$amount' },
        isIncome: { $first: '$isIncome' }
      }
    }
  ]).exec()

  const expensesResult = await Finance.aggregate([
    {
      $match: {
        userId: user._id,
        date: {
          $gte: startDate,
          $lte: endDate
        },
        isIncome: false
      }
    },
    {
      $group: {
        _id: { $month: '$date' },
        amount: { $sum: '$amount' },
        isIncome: { $first: '$isIncome' }
      }
    }
  ]).exec()

  const income = incomeResult.map((r) => {
    return { month: r._id, amount: r.amount, isIncome: r.isIncome }
  })
  const expenses = expensesResult.map((r) => {
    return { month: r._id, amount: r.amount, isIncome: r.isIncome }
  })
  return res.status(200).json({ income, expenses })
}

exports.getUserYearlyFinances = (req, res, next) => {
  const startDate = new Date(req.params.startDate)
  const endDate = new Date(req.params.endDate)
  let finances
  User.findById(req.userId)
    .then((user) => {
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
        {
          $group: {
            _id: '$category',
            amount: { $sum: '$amount' },
            isIncome: { $first: '$isIncome' }
          }
        }
      ]).exec((err, result) => {
        if (err) {
          console.log(err)
        }
        if (result) {
          finances = result.map((r) => {
            return { category: r._id, amount: r.amount, isIncome: r.isIncome }
          })
          return res.status(200).json(finances)
        }
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
