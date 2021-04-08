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
    // If validation fails, send status 422 and our error
    res.status(422).send(error)
  }
  // Find our user's savings object
  Savings.findOne({ userId: req.userId })
    .then((savingsItem) => {
      // Update goal amount
      savingsItem.totalSavingsGoal = req.body.totalSavingsGoal
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
    // If validation fails, send status 422 and our error
    res.status(422).send(error)
  }
  Savings.findOne({ userId: req.userId })
    .then((savingsItem) => {
      // Find our last progress update
      const last =
        savingsItem.progressUpdates[savingsItem.progressUpdates.length - 1]
      // Find our current progress total
      const curTotal =
        savingsItem.totalSavingsProgress + req.body.progressAmount
      if (!last) {
        // If we haven't updated our progress yet -
        savingsItem.progressUpdates = [
          { date: startOfToday(), curTotal: curTotal }
        ]
      } else if (last.date.toString() === startOfToday().toString()) {
        // Else, if the last time we updated was today
        last.curTotal = curTotal
      } else {
        // If we've updated before, but not today, push a new update object
        savingsItem.progressUpdates.push({
          date: startOfToday(),
          curTotal: curTotal
        })
      }
      // Increment total progress by amount
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
  // Time frame is going to be one of:
  // ['week', 'month', 'year', 'quarter', 'all']
  const timeFrame = req.params.timeFrame
  const savings = []
  // Find our user
  User.findById(req.userId)
    .then((user) => {
      if (timeFrame === 'week') {
        // Call utility function
        filterSavingsData(user, startOfDay, '%d', 7)
          .then((result) => {
            console.log(result)
            return res.status(200).json(result)
          })
          .catch((err) => res.status(500).send(err))
      } else if (timeFrame === 'month') {
        // Call utility function
        filterSavingsData(user, startOfDay, '%d', 30)
          .then((result) => {
            console.log(result)
            return res.status(200).json(result)
          })
          .catch((err) => res.status(500).send(err))
      } else if (timeFrame === 'quarter') {
        // Call utility function
        filterSavingsData(user, startOfWeek, '%U', 120)
          .then((result) => {
            console.log(result)
            return res.status(200).json(result)
          })
          .catch((err) => res.status(500).send(err))
      } else if (timeFrame === 'year') {
        // Call utility function
        filterSavingsData(user, startOfMonth, '%m', 365)
          .then((result) => {
            console.log(result)
            return res.status(200).json(result)
          })
          .catch((err) => res.status(500).send(err))
      } else if (timeFrame === 'all') {
        // For time frame == 'all', we have a slightly different case
        // Here we aggregate by the dates our savings progress was updated,
        // For the amount of time the user has existed in our database
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
