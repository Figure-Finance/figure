const isWithinInterval = require('date-fns/isWithinInterval')
const add = require('date-fns/add')
const startOfToday = require('date-fns/startOfToday')

const User = require('../models/user')
const Finance = require('../models/finances')

exports.getUserFinances = (req, res, next) => {
  // TODO: uncomment this when date is passed through front end
  // const startDate = new Date(req.params.date)
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
