const isWithinInterval = require('date-fns/isWithinInterval')
const startOfToday = require('date-fns/startOfToday')
const sub = require('date-fns/sub')

const Savings = require('../models/savings')

// returnList is the empty list we create in our middleware and return to FE once filled
// interval relates to timeFrame. (ex: for year, we want data by month, so interval would be month.)

const filterSavingsData = async (user, startOfIntervalFunc, formatString, numOfDays) => {
  // {period:Date, amount:Number}
  const result = await Savings.aggregate([
    {
      $match: {
        userId: user._id
      }
    },
    { $unwind: { path: '$progressUpdates' } },
    { $group: { _id: { $dateToString: { format: formatString, date: '$progressUpdates.date' } }, amount: { $sum: '$progressUpdates.curTotal' }, date: { $first: '$progressUpdates.date' } } }
  ])
    .exec()
  return result.map(r => {
    if (isWithinInterval(new Date(r.date), {
      start: sub(startOfToday(), {
        days: numOfDays
      }),
      end: startOfToday()
    })) {
      return { period: startOfIntervalFunc(r.date), amount: r.amount }
    }
  })
}

module.exports.filterSavingsData = filterSavingsData
