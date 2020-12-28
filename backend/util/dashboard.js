const Finance = require('../models/finances')
const isWithinInterval = require('date-fns/isWithinInterval')

const dashboard = (startDate, endDate, user, response) => {
  Finance.find({ userId: user._id })
    .then(f => {
      const finances = f.filter(i => {
        return isWithinInterval(new Date(i.date), {
          start: new Date(startDate),
          end: new Date(endDate)
        })
      })
      const financeData = finances.map(entry => {
        return { id: entry._id, category: entry.category, amount: entry.amount, isIncome: entry.isIncome }
      })
      return response.status(200).json(financeData)
    })
    .catch(err => console.log(err))
}

module.exports = dashboard
