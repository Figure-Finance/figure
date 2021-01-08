if (timeFrame === 'month') {
  // If user clicks monthly view, filter to show their progress data by week
  filterByTimeFrame('month', savingsItem.progressUpdates, startOfMonth, lastDayOfMonth)
    .then(filteredSavings => {
      savings = filteredSavings
      // Use each week of interval as a helper
      return eachWeekOfInterval({
        start: savings[0].date,
        end: savings[savings.length - 1].date
      })
    })
    .then(weeks => {
    // Use filterSavingsData from utils to return data in correct format for FE
      savingsToReturn = filterSavingsData(savings, 'Week ', weeks.length, lastDayOfWeek, savingsToReturn, weeks, 0)
      return res.status(200).json(savingsToReturn)
    })
    .catch(err => console.log(err))
} else if (timeFrame === 'year') {
  // If user clicks yearly view, filter to show their progress data by month
  filterByTimeFrame('year', savingsItem.progressUpdates, startOfYear, lastDayOfYear)
    .then(filteredSavings => {
      savings = filteredSavings
      // Use each week of interval as a helper
      return eachMonthOfInterval({
        start: savings[0].date,
        end: savings[savings.length - 1].date
      })
    })
    .then(months => {
    // Use filterSavingsData from utils to return data in correct format for FE
      savingsToReturn = filterSavingsData(savings, 'Month ', months.length, lastDayOfMonth, savingsToReturn, months, 0)
      return res.status(200).json(savingsToReturn)
    })
    .catch(err => console.log(err))
} else if (timeFrame === 'week') {
  // If user clicks weekly view, filter to show their progress data by day
  filterByTimeFrame('week', savingsItem.progressUpdates, startOfWeek, lastDayOfWeek)
    .then(filteredSavings => {
      savings = filteredSavings
      // Use each week of interval as a helper
      return eachDayOfInterval({
        start: savings[0].date,
        end: savings[savings.length - 1].date
      })
    })
    .then(days => {
    // Use filterSavingsData from utils to return data in correct format for FE
      savingsToReturn = filterSavingsData(savings, 'Day ', days.length, lastDayOfWeek, savingsToReturn, days, 0)
      return res.status(200).json(savingsToReturn)
    })
    .catch(err => console.log(err))
} else if (timeFrame === 'all') {
  // If user clicks all view, filter to show their progress data by quarter
  savings = savingsItem.progressUpdates.filter(i => {
    return isWithinInterval(new Date(i.date), {
      // TODO: make start date based on user creation date
      start: new Date(2019, 01, 01),
      end: startOfToday()
    })
  })
  if (savings) {
    // Use each week of interval as a helper
    quarters = eachQuarterOfInterval({
      start: savings[0].date,
      end: savings[savings.length - 1].date
    })
  }
  // Use filterSavingsData from utils to return data in correct format for FE
  savingsToReturn = filterSavingsData(savings, 'Quarter ', quarters.length, lastDayOfQuarter, savingsToReturn, quarters, 0)
  return res.status(200).json(savingsToReturn)
} else if (timeFrame === 'quarter') {
  // If user clicks quarterly view, filter to show their progress data by week
  filterByTimeFrame('quarter', savingsItem.progressUpdates, startOfQuarter, lastDayOfQuarter)
    .then(filteredSavings => {
      savings = filteredSavings
      // Use each week of interval as a helper
      return eachWeekOfInterval({
        start: savings[0].date,
        end: savings[savings.length - 1].date
      })
    })
    .then(weeks => {
    // Use filterSavingsData from utils to return data in correct format for FE
      savingsToReturn = filterSavingsData(savings, 'Week ', weeks.length, lastDayOfQuarter, savingsToReturn, weeks, 0)
      return res.status(200).json(savingsToReturn)
    })
    .catch(err => console.log(err))
}
})
