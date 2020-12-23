const User = require('../models/user')
const Savings = require('../models/savings')

exports.getBankSavings = (req, res, next) => {
  Savings.findOne()
    .then(savings => {
      console.log(savings)
      return res.status(200).json(savings)
    })
    .catch(err => console.log(err))
}

exports.postBankSavings = (req, res, next) => {
  const bankGoal = req.body.bankGoal
  const itemGoals = req.body.itemGoals
  // TODO: bankProgress will auto update and is just received through here for testing
  const bankProgress = req.body.bankProgress
  Savings.find()
    .then(savings => {
      const bankSavings = new Savings({
        bankGoal: bankGoal,
        itemGoals: itemGoals, // { item: 'New Bike', amount: 450 }
        bankProgress: bankProgress
      })
      bankSavings.save(err => console.log(err))
      return res.status(201).json(bankSavings)
    })
    .catch(err => console.log(err))
}
