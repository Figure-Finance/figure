const isWithinInterval = require('date-fns/isWithinInterval')
const startOfToday = require('date-fns/startOfToday')

const filterByTimeFrame = (timeFrame, updatesList, startOfTimeFrameFunc, endOfTimeFrameFunc) => {
  savings = updatesList.filter(i => {
    return isWithinInterval(new Date(i.date), {
      start: startOfTimeFrameFunc(startOfToday()),
      end: endOfTimeFrameFunc(startOfToday())
    })
  })
  return savings
}

module.exports = filterByTimeFrame
