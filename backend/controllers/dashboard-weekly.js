const User = require('../models/user')
const Finances = require('../models/finances')

exports.getFinances = (req, res, next) => {
  console.log('RUNNING ROUTE')
  req.user
    .getUserFinances()
    .then(finances => {
      console.log('IN THEN BLOCK')
      console.log(finances)
      res.json(finances)
    })
    .catch(err => {
      console.log('IN CATCH BLOCK')
      console.log(err)
    })
}
