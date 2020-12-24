const ItemGoal = require('../models/itemGoal')
const Savings = require('../models/savings')
const User = require('../models/user')

exports.postItemGoals = (req, res, next) => {
  const name = req.body.name
  const amount = req.body.amount
  const description = req.body.description
  const user = User.findOne()
    .then(user => {
      console.log(`User from post route: ${user.firstName}`)
      ItemGoal.find()
        .then(itemGoals => {
          const newGoal = new ItemGoal({
            name: name,
            amount: amount,
            description: description,
            userId: user._id
          })
          newGoal.save(err => console.log(err))
          return res.status(201).json(newGoal)
        })
    })
    .catch(err => console.log(err))
}

exports.getItemGoalDetails = (req, res, next) => {
  const itemGoalId = req.params.id
  ItemGoal.findOne({ _id: itemGoalId })
    .then(itemGoal => {
      console.log(`Item goal: ${itemGoal}`)
      res.status(200).json(itemGoal)
    })
    .catch(err => console.log(err))
}

exports.deleteItemGoal = (req, res, next) => {
  const itemGoalId = req.params.id
  ItemGoal.findByIdAndDelete(itemGoalId, err => {
    console.log(err)
  })
  return res.status(200).json({ msg: 'Goal deleted successfully!' })
}

exports.editItemGoal = (req, res, next) => {
  const itemGoalId = req.params.id
  const newName = req.body.name
  const newAmount = req.body.amount
  const newDescription = req.body.description
  ItemGoal.findOne({ _id: itemGoalId })
    .then(itemGoal => {
      itemGoal.name = newName
      itemGoal.amount = newAmount
      itemGoal.description = newDescription
      itemGoal.save()
      return res.status(200).json(itemGoal)
    })
    .catch(err => console.log(err))
}

exports.allocateGoalFunds = (req, res, next) => {
  // TODO: when we have users, find this savings doc by current user
  const itemGoalId = req.params.id
  const allocateAmount = req.body.allocateAmount
  Savings.findOne()
    .then(totalSavings => {
      if (totalSavings.totalSavingsProgress < allocateAmount) {
        throw new Error("You don't have enough saved yet to allocate that much to this goal!")
      }
      totalSavings.totalSavingsProgress -= allocateAmount
      totalSavings.save(err => console.log(err))
      ItemGoal.findOne({ _id: itemGoalId })
        .then(itemGoal => {
          console.log(itemGoal)
          if (itemGoal.progress >= itemGoal.amount) {
            throw new Error('This goal has been reached.')
          } else if (itemGoal.progress + allocateAmount > itemGoal.amount) {
            throw new Error('This allocation will put you over goal.')
          } else {
            itemGoal.progress += allocateAmount
            itemGoal.save(err => console.log(err))
            console.log(itemGoal)
          }
        })
        .catch(err => console.log(err))
      return res.status(200).json(totalSavings)
    })
    .catch(err => console.log(err))
}
