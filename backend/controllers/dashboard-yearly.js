// TODO: break this and the monthly/weekly routes up into a utility function
const isWithinInterval = require('date-fns/isWithinInterval')
const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserYearlyFinances = (req, res, next) => {
  const startDate = req.params.startDate
  const endDate = req.params.endDate
  User.findOne()
    .then(user => {
      Finance.find({ userId: user._id })
        .then(finances => {
          const yearlyFinances = finances.filter(i => {
            return isWithinInterval(new Date(i.date), {
              start: new Date(startDate),
              end: new Date(endDate)
            })
          })
          const financeData = yearlyFinances.map(entry => {
            return { id: entry._id, category: entry.category, amount: entry.amount, isIncome: entry.isIncome }
          })
          return res.status(200).json(financeData)
        })
        .catch(err => {
          console.log(err)
        })
    })
}
