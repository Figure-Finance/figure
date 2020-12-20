const mongodb = require('mongodb')
const getDb = require('../util/database').getDb

const ObjectId = mongodb.ObjectId

class Finances {
  constructor (type, amount, location, description, isIncome, date) {
    this.type = type
    this.amount = amount
    this.location = location
    this.description = description
    this.isIncome = isIncome
    this.date = date
  }
}

module.exports = Finances
