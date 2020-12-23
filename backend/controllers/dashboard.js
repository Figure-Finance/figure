const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserFinances = (req, res, next) => {
  User.findOne()
    .then(user => {
      Finance.find({ userId: user._id })
        .then(finances => {
          return res.status(200).json({ msg: 'Getting user finances', finances: finances })
        })
        .catch(err => {
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
      finances.save()
      // Needs category and amount as response only
      return res.status(201).json({ user: user, finances: finances })
    })
    .catch(err => console.log(err))
}
