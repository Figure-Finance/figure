const User = require('../models/user')
const dashboardFunc = require('../util/dashboard')

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
