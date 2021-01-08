const { validationResult } = require('express-validator')

const User = require('../models/user')
const Savings = require('../models/savings')
const ItemGoal = require('../models/itemGoal')

const timeFrameUtils = require('../util/savingsByTimeFrame')

const startOfToday = require('date-fns/startOfToday')
const sub = require('date-fns/sub')

// May not need the rest of these
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
    .catch(err => console.log(err))
  ItemGoal.find()
    .then(itemGoalArray => {
      itemGoals = itemGoalArray.map(i => {
        return { id: i._id, progress: i.progress, name: i.name, amount: i.amount, description: i.description }
      })
      return res.status(200).json({ ...savings, itemGoals })
    })
    .catch(err => console.log(err))
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
  const user = User.findOne()
    .then(user => {
      Savings.find()
        .then(savings => {
          const totalSavings = new Savings({
            totalSavingsGoal: totalSavingsGoal, // { name: 'New Bike', amount: 450 }
            totalSavingsProgress: totalSavingsProgress,
            userId: user._id
          })
          totalSavings.progressUpdates.push({ date: startOfToday(), progressAmount: totalSavingsProgress })
          totalSavings.save(err => console.log(err))
          return res.status(201).json({ id: totalSavings._id })
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
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
      savingsItem.save(err => console.log(err))
      return res.status(200).json({ message: 'Savings goal successfully updated.' })
    })
    .catch(err => console.log(err))
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
      savingsItem.save(err => console.log(err))
      return res.status(200).json({ message: 'Total savings progress successfully updated.' })
    })
    .catch(err => console.log(err))
}

exports.getByTimeFrame = (req, res, next) => {
  // TODO: Work on getting by past year, month, etc. rather than calendar
  // libraries to help with the heavy lifting?
  // mongo aggregate to clean some of this up?
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
          { $unwind: '$progressUpdates' },
          { $group: { _id: '$progressUpdates.date', amount: { $sum: '$progressUpdates.curTotal' } } }
        ])
          .exec((err, result) => {
            if (err) {
              console.log(err)
            }
            if (result) {
              console.log(result)
              return result.map(r => {
                if (isWithinInterval(r._id, {
                  start: sub(startOfToday(), {
                    days: 7
                  }),
                  end: startOfToday()
                })) {
                  savings.push({ period: r._id, amount: r.amount })
                  console.log(`Savings after push: ${savings}`)
                }
              })
            }
          })
      }
      // } else if (timeFrame === 'month') {
      //   const result = filterSavingsData('month')
      //   result.map(r => {
      //     if (isWithinInterval(r._id, {
      //       start: sub(startOfToday(), {
      //         months: 1
      //       }),
      //       end: startOfToday()
      //     })) {
      //       savings.push({ period: r._id, amount: r.amount })
      //     }
      //   })
      // } else if (timeFrame === 'quarter') {
      //   const result = filterSavingsData('quarter')
      //   result.map(r => {
      //     if (isWithinInterval(r._id, {
      //       start: sub(startOfToday(), {
      //         months: 3
      //       }),
      //       end: startOfToday()
      //     })) {
      //       savings.push({ period: r._id, amount: r.amount })
      //     }
      //   })
      // } else if (timeFrame === 'year') {
      //   const result = filterSavingsData('year')
      //   result.map(r => {
      //     if (isWithinInterval(r._id, {
      //       start: sub(startOfToday(), {
      //         years: 1
      //       }),
      //       end: startOfToday()
      //     })) {
      //       savings.push({ period: r._id, amount: r.amount })
      //     }
      //   })
      // } else if (timeFrame === 'all') {
      //   // TODO: Update interval based on user's "life" on the app
      //   const result = filterSavingsData('year')
      //   result.map(r => {
      //     if (isWithinInterval(r._id, {
      //       start: sub(startOfToday(), {
      //         years: 1
      //       }),
      //       end: startOfToday()
      //     })) {
      //       savings.push({ period: r._id, amount: r.amount })
      //     }
      //   })
      // }
      console.log(`savings before return: ${savings}`)
      return res.status(200).json(savings)
    })
    .catch(err => console.log(err))
}

// } else if (timeFrame === 'month') {
//   // Show values by day
// } else if (timeFrame === 'year') {
//   // Show values by month (full months)
// } else if (timeFrame === 'quarter') {
//   // Show values by week
// } else if (timeFrame === 'all') {
//   // Show values by quarter
// }
