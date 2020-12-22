const User = require('../models/user')
const Savings = require('../models/savings')

exports.getBankSavings = (req, res, next) => {
  Savings.find()
    .then(savings => {
      console.log(savings)
      res.json(savings)
    })
    .catch(err => console.log(err))
}

exports.postBankSavings = (req, res, next) => {
  Savings.find()
    .then(savings => {
      bankSavings = new Savings({
        bankGoal: 15000,
        itemGoals: { item: 'New Bike', cost: 450 }
      })
      bankSavings.save(err => console.log(err))
      res.json(bankSavings)
    })
    .catch(err => console.log(err))
}
