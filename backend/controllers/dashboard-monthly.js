const User = require('../models/user')
const dashboardFunc = require('../util/dashboard')

exports.getUserMonthlyFinances = (req, res, next) => {
  const startDate = req.params.startDate
  const endDate = req.params.endDate
  User.findOne()
    .then(user => {
      const financeData = dashboardFunc(startDate, endDate, user)
      return res.status(200).json(financeData)
    })
    .catch(err => {
      console.log(err)
    })
}
