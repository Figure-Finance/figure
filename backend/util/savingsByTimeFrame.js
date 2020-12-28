const isWithinInterval = require('date-fns/isWithinInterval')
const startOfToday = require('date-fns/startOfToday')
const isAfter = require('date-fns/isAfter')

const filterByTimeFrame = (timeFrame, updatesList, startOfTimeFrameFunc, endOfTimeFrameFunc) => {
  // Take updates list and return a filtered list
  savings = updatesList.filter(i => {
    // isWithinInterval returns a boolean
    // Check if each item is within the interval (between the start and end dates provided)
    // Return if true
    return isWithinInterval(new Date(i.date), {
      start: startOfTimeFrameFunc(startOfToday()),
      end: endOfTimeFrameFunc(startOfToday())
    })
  })
  return savings
}

const filterSavingsData = (savings, period, indeces, lastDayFunc, returnList, periodList, iterator) => {
  // Create a helper cursor variable
  let cursor
  // Create helper i variable that begins at the index of iterator (parameter passed in initially as zero)
  const i = [...savings][iterator]
  // Use our indeces (number of periods) as a base case to end the loop
  while (iterator <= indeces) {
    if (periodList[iterator]) {
      // If item.date.toString (to be able to truly check equality) = the last day in the given period, we want that date's total
      // So we append it to our returnList
      if (i.date.toString() === lastDayFunc(periodList[iterator]).toString()) {
        returnList.push({ period: period + (iterator + 1), amount: i.curTotal })
        return filterSavingsData(savings, period, indeces, lastDayFunc, returnList, periodList, iterator + 1)
      // If it isn't exactly the last day of the week, month, etc. we need to find out what the latest date in that period is
      } else if (i.date.toString() !== lastDayFunc(periodList[iterator]).toString()) {
        // Set the cursor variable to the item's date
        cursor = i.date
        if (isAfter(new Date(i.date), new Date(cursor))) {
          // If this re-executes and the new item's date is after the current cursor, we make that new date the cursor
          cursor = i.date
        } else {
          // Eventually, when we have the latest date we can, we append this date and total to the returnList
          returnList.push({ period: period + (iterator + 1), amount: cursor.curTotal })
          return filterSavingsData(savings, period, indeces, lastDayFunc, returnList, periodList, iterator + 1)
        }
      }
    }
    // Increment the iterator so we don't end up in an infinite loop
    iterator++
  }
  return returnList
}

module.exports.filterSavingsData = filterSavingsData
module.exports.filterByTimeFrame = filterByTimeFrame
