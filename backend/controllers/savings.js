const { validationResult } = require('express-validator')

const User = require('../models/user')
const Savings = require('../models/savings')
const ItemGoal = require('../models/itemGoal')

const timeFrameUtils = require('../util/savingsByTimeFrame')

const startOfToday = require('date-fns/startOfToday')
const startOfWeek = require('date-fns/startOfWeek')
const startOfMonth = require('date-fns/startOfMonth')
const startOfQuarter = require('date-fns/startOfQuarter')
const sub = require('date-fns/sub')

const isWithinInterval = require('date-fns/isWithinInterval')

const { filterByTimeFrame, filterSavingsData } = timeFrameUtils
// TOTAL SAVINGS ROUTES

exports.getSavings = (req, res, next) => {
  // TODO: findOne by current user's id
  let savings
  let itemGoals
  Savings.findOne()
    .then(savingsDoc => {
      return savings = {
        id: savingsDoc._id,
        totalSavingsGoal: savingsDoc.totalSavingsGoal,
        totalSavingsProgress: savingsDoc.totalSavingsProgress,
        progressUpdates: savingsDoc.progressUpdates.map(update => {
          return { id: update._id, date: update.date, curTotal: update.curTotal }
        })
      }
      next()
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
  ItemGoal.find()
    .then(itemGoalArray => {
      itemGoals = itemGoalArray.map(i => {
        return { id: i._id, progress: i.progress, name: i.name, amount: i.amount, description: i.description }
      })
      return res.status(200).json({ ...savings, itemGoals })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.postTotalSavings = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const totalSavingsGoal = req.body.totalSavingsGoal
  // TODO: bankProgress will auto update and is just received through here for testing
  const totalSavingsProgress = req.body.totalSavingsProgress
  let newSavings
  // TODO: find user by current authorized user id
  User.findOne()
    .then(user => {
      newSavings = new Savings({
        totalSavingsGoal: totalSavingsGoal, // { name: 'New Bike', amount: 450 }
        totalSavingsProgress: totalSavingsProgress,
        userId: user._id
      })
      newSavings.progressUpdates.push({ date: startOfToday(), progressAmount: totalSavingsProgress })
      return newSavings.save()
    })
    .then(result => {
      return res.status(201).json({ id: newSavings._id })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.editTotalSavings = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const newTotalSavingsGoal = req.body.totalSavingsGoal
  // TODO: find by user
  Savings.findOne()
    .then(savingsItem => {
      savingsItem.totalSavingsGoal = newTotalSavingsGoal
      return savingsItem.save()
    })
    .then(result => {
      return res.status(200).json({ message: 'Savings goal successfully updated.' })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.updateTotalSavingsProgress = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  // TODO: get this by user
  Savings.findOne()
    .then(savingsItem => {
      const last = savingsItem.progressUpdates[savingsItem.progressUpdates.length - 1]
      const curTotal = savingsItem.totalSavingsProgress + req.body.progressAmount
      if (!last) {
        savingsItem.progressUpdates = [{ date: startOfToday(), curTotal: curTotal }]
      } else if (last.date.toString() === startOfToday().toString()) {
	       last.curTotal = curTotal
      } else {
	       savingsItem.progressUpdates.push({ date: startOfToday(), curTotal: curTotal })
      }
      savingsItem.totalSavingsProgress += req.body.progressAmount
      return savingsItem.save()
    })
    .then(result => {
      return res.status(200).json({ message: 'Total savings progress successfully updated.' })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.getByTimeFrame = (req, res, next) => {
  const timeFrame = req.params.timeFrame
  const savings = []
  User.findOne()
    .then(user => {
      if (timeFrame === 'week') {
        Savings.aggregate([
          {
            $match: {
              userId: user._id
            }
          },
          { $unwind: { path: '$progressUpdates' } },
          { $group: { _id: '$progressUpdates.date', amount: { $sum: '$progressUpdates.curTotal' } } }
        ])
          .exec((err, result) => {
            if (err) {
              console.log(err)
            }
            if (result) {
              console.log(result)
              result.map(r => {
                if (isWithinInterval(new Date(r._id), {
                  start: sub(startOfToday(), {
                    days: 7
                  }),
                  end: startOfToday()
                })) {
                  return savings.push({ period: r._id, amount: r.amount })
                }
              })
              return res.status(200).json(savings)
            }
          })
      } else if (timeFrame === 'month') {
        Savings.aggregate([
          {
            $match: {
              userId: user._id
            }
          },
          { $unwind: { path: '$progressUpdates' } },
          { $group: { _id: '$progressUpdates.date', amount: { $sum: '$progressUpdates.curTotal' } } }
        ])
          .exec((err, result) => {
            if (err) {
              console.log(err)
            }
            if (result) {
              console.log(result)
              result.map(r => {
                if (isWithinInterval(new Date(r._id), {
                  start: sub(startOfToday(), {
                    months: 1
                  }),
                  end: startOfToday()
                })) {
                  return savings.push({ period: r._id, amount: r.amount })
                }
              })
              return res.status(200).json(savings)
            }
          })
      } else if (timeFrame === 'quarter') {
        Savings.aggregate([
          {
            $match: {
              userId: user._id
            }
          },
          { $unwind: { path: '$progressUpdates' } },
          { $group: { _id: { $dateToString: { format: '%U', date: '$progressUpdates.date' } }, amount: { $sum: '$progressUpdates.curTotal' }, date: { $first: '$progressUpdates.date' } } }
        ])
          .exec((err, result) => {
            if (err) {
              console.log(err)
            }
            if (result) {
              console.log(result)
              result.map(r => {
                if (isWithinInterval(new Date(r.date), {
                  start: sub(startOfToday(), {
                    days: 120
                  }),
                  end: startOfToday()
                })) {
                  return savings.push({ period: startOfWeek(r.date), amount: r.amount })
                }
              })
              return res.status(200).json(savings)
            }
          })
      } else if (timeFrame === 'year') {
        Savings.aggregate([
          {
            $match: {
              userId: user._id
            }
          },
          { $unwind: { path: '$progressUpdates' } },
          { $group: { _id: { $dateToString: { format: '%m', date: '$progressUpdates.date' } }, amount: { $sum: '$progressUpdates.curTotal' }, date: { $first: '$progressUpdates.date' } } }
        ])
          .exec((err, result) => {
            if (err) {
              console.log(err)
            }
            if (result) {
              result.map(r => {
                if (isWithinInterval(new Date(r.date), {
                  start: sub(startOfToday(), {
                    days: 365
                  }),
                  end: startOfToday()
                })) {
                  return savings.push({ period: startOfMonth(r.date), amount: r.amount })
                }
              })
              return res.status(200).json(savings)
            }
          })
      } else if (timeFrame === 'all') {
        Savings.aggregate([
          {
            $match: {
              userId: user._id
            }
          },
          { $unwind: { path: '$progressUpdates' } },
          { $group: { _id: { $dateToString: { format: '%m', date: '$progressUpdates.date' } }, amount: { $sum: '$progressUpdates.curTotal' }, date: { $first: '$progressUpdates.date' } } }
        ])
          .exec((err, result) => {
            if (err) {
              console.log(err)
            }
            if (result) {
              result.map(r => {
                if (isWithinInterval(new Date(r.date), {
                  start: user.createdAt,
                  end: startOfToday()
                })) {
                  return savings.push({ period: startOfMonth(r.date), amount: r.amount })
                }
              })
              return res.status(200).json(savings)
            }
          })
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
