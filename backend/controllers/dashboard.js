const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserFinances = (req, res, next) => {
  console.log('RUNNING ROUTE')
  User.findOne()
    .populate('finance._id')
    // .execPopulate()
    .exec(finances => {
      console.log('IN EXEC BLOCK')
      console.log(finances)
    })
  return res.status(200).json({ msg: 'Getting user finances' })
  // .then(finances => {
  //   console.log(`Finances from then block: ${finances}`)
  // // res.json({ msg: 'Getting user finances' })
  // })
  // .catch(err => {
  //   console.log('IN CATCH BLOCK')
  //   console.log(err)
  // })
  next()
}

// TODO: Get fields from FE - add some dummy data to BE

exports.postUserFinances = (req, res, next) => {
  const financeData = req.body
  console.log(`Finance Data from POST user finances: ${financeData}`)
  const user = User.findOne()
    .then(user => {
      const finances = new Finance({
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
      // Needs category and amount as response only
      return res.status(201).json({ user: user, finances: finances })
    })
    .catch(err => console.log(err))
}
