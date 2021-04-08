const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserMonthlyFinances = (req, res, next) => {
  // Start and end date calculated to ensure time periods are accurate
  // across calendar years. Create Date object and store variable to use with
  // aggregation
  const startDate = new Date(req.params.startDate)
  const endDate = new Date(req.params.endDate)
  // Initialize finances for in-exec scope
  let finances
  // Perform aggregation of categorical finances based on dates and category
  Finance.aggregate([
    {
      $match: {
        userId: req.userId,
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
      // If the aggregation or query fails, send our error
      res.status(500).send(err.message)
    }
    if (result) {
      // Map finance objects resulting from aggregation to proper format for FE
      // Here, r._id refers to the '_id' by which we grouped documents, i.e: category
      finances = result.map((r) => {
        return { category: r._id, amount: r.amount, isIncome: r.isIncome }
      })
      return res.status(200).json(finances)
    }
  })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
