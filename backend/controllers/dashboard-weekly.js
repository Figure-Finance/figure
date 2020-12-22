const User = require('../models/user')
const Finances = require('../models/finances')

exports.getUserFinances = (req, res, next) => {
  console.log('RUNNING ROUTE')
  User.findOne()
    .populate('user.finances')
    .execPopulate()
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

// TODO: Get fields from FE - add some dummy data to BE

// exports.postUserFinances = (req, res, next) => {
//   console.log(req)
//   console.log('POSTING')
// }
