const User = require('../models/user')
const dashboardFunc = require('../util/dashboard')

// TODO: talk to FE - what data is needed for yrly graph?
// Get income/expenses for each month

exports.getUserYearlyFinances = (req, res, next) => {
  const startDate = req.params.startDate
  const endDate = req.params.endDate
  let financeData
  User.findOne()
    .then(user => {
      financeData = dashboardFunc(startDate, endDate, user, res)
      return financeData
    })
    .catch(err => {
      console.log(err)
    })
}
