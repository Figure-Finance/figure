const User = require('../models/user')
const Finances = require('../models/finances')

exports.getUser = (req, res, next) => {
  console.log('RUNNING ROUTE')
  User.find()
    .then(users => {
      console.log('IN THEN BLOCK')
      console.log(users)
      res.json(users)
    })
    .catch(err => {
      console.log('IN CATCH BLOCK')
      console.log(err)
    })
}
