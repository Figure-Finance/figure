const isWithinInterval = require('date-fns/isWithinInterval')
const add = require('date-fns/add')
const startOfToday = require('date-fns/startOfToday')

const User = require('../models/user')
const Finance = require('../models/finances')

const dashboardFunc = require('../util/dashboard')

exports.getUserFinances = (req, res, next) => {
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
      return res.status(201).json(finances)
    })
    .catch(err => console.log(err))
}

exports.getFinanceDetailsById = (req, res, next) => {
  const financeId = req.params.id
  Finance.findOne({ _id: financeId })
    .then(financeEntry => {
      console.log(financeEntry)
      return res.status(200).json(financeEntry)
    })
    .catch(err => console.log(err))
}

exports.deleteFinanceEntryById = (req, res, next) => {
  const financeId = req.params.id
  Finance.findByIdAndDelete(financeId, err => {
    console.log(err)
  })
  return res.status(200).json({ msg: 'Finance entry deleted successfully!' })
}

exports.editFinanceEntryById = (req, res, next) => {
  const financeId = req.params.id
  const newCategory = req.body.category
  const newAmount = req.body.amount
  const newDescription = req.body.description
  const newLocation = req.body.location
  const newDate = req.body.date
  Finance.findOne({ _id: financeId })
    .then(financeEntry => {
      financeEntry.category = newCategory
      financeEntry.amount = newAmount
      financeEntry.description = newDescription
      financeEntry.location = newLocation
      financeEntry.date = newDate
      financeEntry.save(err => console.log(err))
      return res.status(200).json(financeEntry)
    })
    .catch(err => console.log(err))
}
