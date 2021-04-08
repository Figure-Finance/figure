const { validationResult } = require('express-validator')

const ItemGoal = require('../models/itemGoal')
const Savings = require('../models/savings')
const User = require('../models/user')

exports.postItemGoals = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    res.status(422).send(error)
  }
  const name = req.body.name
  const amount = req.body.amount
  const description = req.body.description
  let newGoal
  let loadedUser
  User.findById(req.userId)
    .then((user) => {
      loadedUser = user
      return ItemGoal.find({ userId: loadedUser._id })
    })
    .then((itemGoals) => {
      newGoal = new ItemGoal({
        name: name,
        amount: amount,
        description: description,
        userId: loadedUser._id
      })
      return newGoal.save()
    })
    .then((result) => {
      return res.status(201).json({ id: newGoal._id })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.getItemGoalDetails = (req, res, next) => {
  const itemGoalId = req.params.id
  ItemGoal.findOne({ _id: itemGoalId })
    .then((itemGoal) => {
      res.status(200).json({
        name: itemGoal.name,
        amount: itemGoal.amount,
        description: itemGoal.description,
        progress: itemGoal.progress
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.deleteItemGoal = (req, res, next) => {
  const itemGoalId = req.params.id
  ItemGoal.findOne({ _id: itemGoalId })
    .then((itemGoal) => {
      return Savings.findOne({ userId: itemGoal.userId })
        .then((savings) => {
          savings.totalSavingsProgress =
            savings.totalSavingsProgress + itemGoal.progress
          return savings.save()
        })
        .then((result) => {
          ItemGoal.findByIdAndDelete(itemGoalId, (err) => {
            console.log(err)
          })
          return res.status(200).json({ message: 'Goal successfully deleted.' })
        })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.editItemGoal = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const itemGoalId = req.body.id
  const newName = req.body.name
  const newAmount = req.body.amount
  const newDescription = req.body.description
  ItemGoal.findOne({ _id: itemGoalId })
    .then((itemGoal) => {
      if (!itemGoal) {
        const error = new Error('Goal not found.')
        error.statusCode = 500
        throw error
      }
      itemGoal.name = newName
      itemGoal.amount = newAmount
      itemGoal.description = newDescription
      itemGoal.save()
      return res
        .status(200)
        .json({ message: 'Item goal successfully updated!' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.allocateGoalFunds = (req, res, next) => {
  const itemGoalId = req.body.id
  const allocateAmount = req.body.allocateAmount
  Savings.findOne({ userId: req.userId })
    .then((totalSavings) => {
      if (totalSavings.totalSavingsProgress < allocateAmount) {
        throw new Error(
          "You don't have enough saved yet to allocate that much to this goal!"
        )
      }
      totalSavings.totalSavingsProgress -= allocateAmount
      return totalSavings.save()
    })
    .then((result) => {
      return ItemGoal.findOne({ _id: itemGoalId })
    })
    .then((itemGoal) => {
      console.log(itemGoal)
      if (itemGoal.progress >= itemGoal.amount) {
        throw new Error('This goal has been reached.')
      } else if (itemGoal.progress + allocateAmount > itemGoal.amount) {
        throw new Error('This allocation will put you over goal.')
      } else {
        itemGoal.progress += allocateAmount
        return itemGoal.save()
      }
    })
    .then((result) => {
      return res.status(200).json({ message: 'Funds successfully allocated!' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
