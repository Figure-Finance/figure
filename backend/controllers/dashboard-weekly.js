const isWithinInterval = require('date-fns/isWithinInterval')

const { validationResult } = require('express-validator')

const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserFinances = (req, res, next) => {
  const startDate = req.params.startDate
  const endDate = req.params.endDate
  User.findOne()
    .then(user => {
      Finance.find({ userId: user._id })
        .then(finances => {
          const weeklyFinances = finances.filter(i => {
            return isWithinInterval(new Date(i.date), {
              start: new Date(startDate),
              end: new Date(endDate)
            })
          })
          const financeData = weeklyFinances.map(entry => {
            return { id: entry._id, category: entry.category, amount: entry.amount, isIncome: entry.isIncome }
          })
          return res.status(200).json(financeData)
        })
        .catch(err => {
          console.log(err)
        })
    })
}

exports.postUserFinances = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  console.log(errors)
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
      user.finances.push(finances)
      user.save()
      finances.save()
      return res.status(201).json({
        id: finances._id
      })
    })
    .catch(err => console.log(err))
}

exports.getFinanceDetailsById = (req, res, next) => {
  const financeId = req.params.id
  Finance.findOne({ _id: financeId })
    .then(financeEntry => {
      const finance = {
        id: financeEntry._id,
        category: financeEntry.category,
        amount: financeEntry.amount,
        description: financeEntry.description,
        location: financeEntry.location,
        date: financeEntry.date
      }
      return res.status(200).json({
        category: finance.category,
        amount: finance.amount,
        description: finance.description,
        location: finance.location,
        data: finance.date
      })
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
  const financeId = req.body.id
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
      return res.status(200).json({ message: 'Finance entry successfully updated.' })
    })
    .catch(err => console.log(err))
}
