const isWithinInterval = require('date-fns/isWithinInterval')
const startOfToday = require('date-fns/startOfToday')

exports.filterByTimeFrame = (timeFrame, updatesList, startOfTimeFrameFunc, endOfTimeFrameFunc) => {
  savings = updatesList.filter(i => {
    return isWithinInterval(new Date(i.date), {
      start: startOfTimeFrameFunc(startOfToday()),
      end: endOfTimeFrameFunc(startOfToday())
    })
  })
  return savings
}

exports.filterSavingsData = (savings, timeFrame, indeces, lastDayFunc, returnList, periodList, iterator) => {
  let cursor
  const i = [...savings][iterator]
  // console.log(`i from before base if: ${i}`)
  // console.log(`period list: ${periodList}`)
  // console.log(`Indeces before base case if statement: ${indeces}`)
  if (iterator === indeces) {
    console.log(`Base case iterator: ${iterator}`)
    console.log(`Return list: ${returnList}`)
    return returnList
  }
  if (periodList.length > 1 && periodList[iterator].includes(i.date.toString()) ||
      periodList.length === 1 && periodList[0] === i.date.toString()) {
    if (i.date.toString() === periodList[iterator].lastDayFunc().toString()) {
      returnList.push({ period: 'timeFrame' + (iterator + 1), amount: i.curTotal })
      iterator++
      return filterSavingsData(savings, timeFrame, indeces, lastDayFunc, returnList, periodList, iterator)
    } else {
      // TODO: These are making the recursion exit too early - figure it out
      cursor = i.date
      iterator++
      console.log('iterator from first else')
      console.log(`Cursor from first else ${cursor}`)
      if (i.date > cursor) {
        cursor = i.date
        iterator++
        console.log(`Cursor from if (i.date is greater than): ${cursor}`)
      } else {
        returnList.push({ period: 'timeFrame' + (iterator + 1), amount: cursor.curTotal })
        iterator++
        console.log(`Return list from last else: ${returnList}`)
        console.log(`Iterator from last else: ${iterator}`)
        return filterSavingsData(savings, timeFrame, indeces, lastDayFunc, returnList, periodList, iterator)
      }
    }
  }
}
