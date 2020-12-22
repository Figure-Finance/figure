const User = require('../models/user')
const Finances = require('../models/finances')

exports.getUserFinances = (req, res, next) => {
  console.log('RUNNING ROUTE')
  User.findOne()
    .populate('finances')
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

// exports.postUserFinances = (req, res, next) => {
//   console.log('POSTING')
// }
