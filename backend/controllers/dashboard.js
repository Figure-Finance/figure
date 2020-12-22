const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserFinances = (req, res, next) => {
  console.log('RUNNING ROUTE')
  User.findOne()
    .populate('finances.financeId')
    .exec(finances => {
      console.log('IN THEN BLOCK')
      console.log(finances)
      res.json(finances)
    })
    // .catch(err => {
    //   console.log('IN CATCH BLOCK')
    //   console.log(err)
    // })
  next()
}

// TODO: Get fields from FE - add some dummy data to BE

exports.postUserFinances = (req, res, next) => {
  const financeData = req.data
  console.log(`Finance Data from POST user finances: ${financeData}`)
  const user = User.findOne()
    .then(user => {
      finances = new Finance({
        category: 'Groceries',
        amount: 45.49,
        location: 'Sprouts',
        description: 'Weekly groceries',
        isIncome: false,
        date: '12-26-2020',
        userId: user._id
      })
      console.log('POSTING')
      finances.save()
      res.json({ user: user, finances: finances })
    })
    .catch(err => console.log(err))
}
