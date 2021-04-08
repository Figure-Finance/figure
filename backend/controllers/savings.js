const { validationResult } = require('express-validator')

const User = require('../models/user')
const Savings = require('../models/savings')
const ItemGoal = require('../models/itemGoal')

const timeFrameUtils = require('../util/savingsByTimeFrame')

const startOfToday = require('date-fns/startOfToday')
const startOfDay = require('date-fns/startOfDay')
const startOfWeek = require('date-fns/startOfWeek')
const startOfMonth = require('date-fns/startOfMonth')

const isWithinInterval = require('date-fns/isWithinInterval')

const { filterSavingsData } = timeFrameUtils

// TOTAL SAVINGS ROUTES

exports.getSavings = (req, res, next) => {
  let savings
  Savings.findOne({ userId: req.userId }).populate('progressUpdates')
    .then((savingsDoc) => {
      if (!savingsDoc) {
        // If this savings item does not exist, send 404 'resource not found'
        const error = new Error('Cannot find any savings for this user.')
        res.status(404).send(error)
      }
      // Once we have our savingsDoc, query for our user's savings item goals
      // Call toClient on our savingsDoc to return correct format
      savings = savingsDoc.toClient()
      return ItemGoal.find({ userId: req.userId })
    })
    .then((itemGoalArray) => {
      // Ensure we return both savings and our itemGoalArray
      // to display graphs and goals dashboard
      return res.status(200).json({ savings, itemGoalArray })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.postTotalSavings = (req, res, next) => {
  // Create a new Savings document in savings collection
  // TODO: totalSavingsProgress will auto update and is just received through here for testing
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    // If validation fails, send status 422 and our error
    res.status(422).send(error)
  }
  // Create our new Savings object
  const newSavings = new Savings(req.body)
  newSavings.userId = req.userId
  // Ensure that we create a progressUpdate for the initial Savings
  newSavings.progressUpdates.push({ date: startOfToday(), progressAmount: req.body.totalSavingsProgress })
  newSavings.save()
    .then((newSavings) => {
      // Send status 201 for 'resource created successfully'
      return res.status(201).json({ id: newSavings._id })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.editTotalSavings = (req, res, next) => {
  // Edit the user's savings document: change totalSavingsGoal
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const newTotalSavingsGoal = req.body.totalSavingsGoal
  Savings.findOne({ userId: req.userId })
    .then((savingsItem) => {
      savingsItem.totalSavingsGoal = newTotalSavingsGoal
      return savingsItem.save()
    })
    .then((result) => {
      return res
        .status(200)
        .json({ message: 'Savings goal successfully updated.' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.updateTotalSavingsProgress = (req, res, next) => {
  // Update totalSavingsProgress: increase $ amount user has saved
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  Savings.findOne({ userId: req.userId })
    .then((savingsItem) => {
      const last =
        savingsItem.progressUpdates[savingsItem.progressUpdates.length - 1]
      const curTotal =
        savingsItem.totalSavingsProgress + req.body.progressAmount
      if (!last) {
        savingsItem.progressUpdates = [
          { date: startOfToday(), curTotal: curTotal }
        ]
      } else if (last.date.toString() === startOfToday().toString()) {
        last.curTotal = curTotal
      } else {
        savingsItem.progressUpdates.push({
          date: startOfToday(),
          curTotal: curTotal
        })
      }
      savingsItem.totalSavingsProgress += req.body.progressAmount
      return savingsItem.save()
    })
    .then((result) => {
      return res
        .status(200)
        .json({ message: 'Total savings progress successfully updated.' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.getByTimeFrame = (req, res, next) => {
  // Get savings documents by specified time frame for graphs
  const timeFrame = req.params.timeFrame
  const savings = []
  User.findById(req.userId)
    .then((user) => {
      if (timeFrame === 'week') {
        filterSavingsData(user, startOfDay, '%d', 7)
          .then((result) => {
            console.log(result)
            return res.status(200).json(result)
          })
          .catch((err) => console.log(err))
      } else if (timeFrame === 'month') {
        filterSavingsData(user, startOfDay, '%d', 30)
          .then((result) => {
            console.log(result)
            return res.status(200).json(result)
          })
          .catch((err) => console.log(err))
      } else if (timeFrame === 'quarter') {
        filterSavingsData(user, startOfWeek, '%U', 120)
          .then((result) => {
            console.log(result)
            return res.status(200).json(result)
          })
          .catch((err) => console.log(err))
      } else if (timeFrame === 'year') {
        filterSavingsData(user, startOfMonth, '%m', 365)
          .then((result) => {
            console.log(result)
            return res.status(200).json(result)
          })
          .catch((err) => console.log(err))
      } else if (timeFrame === 'all') {
        Savings.aggregate([
          {
            $match: {
              userId: user._id
            }
          },
          { $unwind: { path: '$progressUpdates' } },
          {
            $group: {
              _id: {
                $dateToString: { format: '%m', date: '$progressUpdates.date' }
              },
              amount: { $sum: '$progressUpdates.curTotal' },
              date: { $first: '$progressUpdates.date' }
            }
          }
        ]).exec((err, result) => {
          if (err) {
            console.log(err)
          }
          if (result) {
            result.map((r) => {
              if (
                isWithinInterval(new Date(r.date), {
                  start: user.createdAt,
                  end: startOfToday()
                })
              ) {
                return savings.push({
                  period: startOfMonth(r.date),
                  amount: r.amount
                })
              }
              return savings
            })
            return res.status(200).json(savings)
          }
        })
      }
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
