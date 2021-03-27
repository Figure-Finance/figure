const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserMonthlyFinances = (req, res, next) => {
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
          console.log(result)
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
