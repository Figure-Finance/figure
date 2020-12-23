const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserFinances = (req, res, next) => {
  console.log('RUNNING ROUTE')
  User.findOne()
    .then(user => {
      console.log(`User: ${user} User password: ${user.finances}`)
      Finance.find({ userId: user._id })
        .then(finances => {
          console.log(`Finances from then block: ${finances}`)
          return res.status(200).json({ msg: 'Getting user finances', finances: finances })
        })
        .catch(err => {
          console.log('IN CATCH BLOCK')
          console.log(err)
        })
    })
}

// TODO: Get fields from FE - add some dummy data to BE

exports.postUserFinances = (req, res, next) => {
  const category = req.body.category
  const amount = req.body.amount
  const location = req.body.location
  const description = req.body.description
  const isIncome = req.body.isIncome
  const date = req.body.date
  console.log(`Finance Data from POST user finances: ${category}`)
  const user = User.findOne()
    .then(user => {
      const finances = new Finance({
        category: category,
        amount: amount,
        location: location,
        description: description,
        isIncome: isIncome,
        date: date,
        userId: user._id
      })
      console.log('POSTING')
      finances.save()
      // Needs category and amount as response only
      return res.status(201).json({ user: user, finances: finances })
    })
    .catch(err => console.log(err))
}
