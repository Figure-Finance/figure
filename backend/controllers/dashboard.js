const isWithinInterval = require('date-fns/isWithinInterval')
const add = require('date-fns/add')
const startOfToday = require('date-fns/startOfToday')

const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserFinances = (req, res, next) => {
  // TODO: uncomment this when date is passed through front end
  // TODO: only return category and amount? Create details route? Or did we decide not to do this?
  // const startDate = new Date(req.params.date)
  const startDate = startOfToday()
  User.findOne()
    .then(user => {
      Finance.find({ userId: user._id })
        .then(finances => {
          const weeklyFinances = finances.filter(i => {
            return isWithinInterval(new Date(i.date), {
              start: new Date(startDate),
              end: new Date(add(startDate, {
                days: 7
              }))
            })
          })
          const financeData = weeklyFinances.map(entry => {
            return { id: entry._id, category: entry.category, amount: entry.amount }
          })
          return res.status(200).json(financeData)
        })
        .catch(err => {
          console.log(err)
        })
    })
}

exports.postUserFinances = (req, res, next) => {
  const category = req.body.category
  const amount = req.body.amount
  const location = req.body.location
  const description = req.body.description
  const isIncome = req.body.isIncome
  const date = req.body.date // YYYY-mm-dd
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
