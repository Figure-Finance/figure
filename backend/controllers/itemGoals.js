// Require validationResult from express-validator to check form validation
const { validationResult } = require('express-validator')

// Require models
const ItemGoal = require('../models/itemGoal')
const Savings = require('../models/savings')
const User = require('../models/user')

// Create a new savings item goal
exports.postItemGoals = (req, res, next) => {
  // Check for validation errors, fail with status 422 if val. errors found
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    res.status(422).send(error)
  }
  // Create our new ItemGoal object
  const newGoal = new ItemGoal(req.body)
  // Ensure our ItemGoal is associated with our current signed in user
  newGoal.userId = req.userId
  newGoal.save()
    .then((result) => {
      // On successful save, set status 201 for 'resource successfully created'
      // Return our newGoal id
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
  // Find our itemGoal based on the id passed through our query params.
  ItemGoal.findOne({ _id: req.params.id })
    .then((itemGoal) => {
      // On successfully finding goal, return fields.
      res.status(200).json({
        name: itemGoal.name,
        amount: itemGoal.amount,
        description: itemGoal.description,
        progress: itemGoal.progress
      })
    })
    .catch((err) => {
      if (!err.statusCode) {
        // If there is an unspecified error, set 404 for 'resource not found'
        err.statusCode = 404
      }
      next(err)
    })
}

exports.deleteItemGoal = (req, res, next) => {
  ItemGoal.findOne({ _id: req.params.id })
    .then((itemGoal) => {
      // To update the totals correctly, we need to query our user's total Savings
      // Then, before we delete our item goal, we want to return the "allocated funds" to our savings amount
      // TODO: add a check to ask the user if they've 'spent' the money, or if they've decided not to save for this item
      return Savings.findOne({ userId: itemGoal.userId })
        .then((savings) => {
          // Adjust our totalSavingsProgress to include the itemGoal progress $ amount
          savings.totalSavingsProgress =
            savings.totalSavingsProgress + itemGoal.progress
          return savings.save()
        })
        .then((result) => {
          // Once we've updated our savings, find and delete our itemGoal
          ItemGoal.findByIdAndDelete(itemGoalId, (err) => {
            // Send error and set status to 500 to avoid crashing app on deletion failure
            res.status(500).send(err.message)
          })
          // If resource is successfully deleted, return status code 200 and message to confirm deletion
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
    // Send status code 422 on validation failure
    res.status(422).send(error)
  }
  ItemGoal.findOne({ _id: req.body.id })
    .then((itemGoal) => {
      if (!itemGoal) {
        const error = new Error('Goal not found.')
        // If goal does not exist, send 404 for 'resource not found'
        res.status(404).send(error)
      }
      // Update itemGoal fields accordingly
      itemGoal.name = req.body.name
      itemGoal.amount = req.body.amount
      itemGoal.description = req.body.description
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
  const allocateAmount = req.body.allocateAmount
  // Find our user's savings to update allocated & remaining savings amounts
  Savings.findOne({ userId: req.userId })
    .then((totalSavings) => {
      // Check if user has saved enough money to allocate the specified amount to this goal
      if (totalSavings.totalSavingsProgress < allocateAmount) {
        const error = new Error(
          "You don't have enough saved yet to allocate that much to this goal!"
        )
        // Set status 304 'not modified' with the error if there aren't adequate funds
        res.status(304).send(error)
      }
      // If there are adequate funds, allocate to the goal
      totalSavings.totalSavingsProgress -= allocateAmount
      return totalSavings.save()
    })
    .then((result) => {
      console.log(req.body.id)
      return ItemGoal.findOne({ _id: req.body.id })
    })
    .then((itemGoal) => {
      // Check if we've already saved enough for this goal
      if (!itemGoal) {
        const error = new Error('Goal not found. Please be sure to pass the ID.')
        res.status(404).send(error)
      }
      if (itemGoal.progress >= itemGoal.amount) {
        const error = new Error('This goal has been reached.')
        // Set status 304 'not modified' if the goal has been reached
        res.status(304).send(error)
      } else if (itemGoal.progress + allocateAmount > itemGoal.amount) {
        const error = new Error('This allocation will put you over goal.')
        // If the allocateAmount will overshoot the goal, send 304 'not modified'
        res.status(304).send(error)
      } else {
        // If everything is correct, update itemGoal progress
        itemGoal.progress += allocateAmount
        return itemGoal.save()
      }
    })
    .then((result) => {
      // Confirm funds allocated
      return res.status(200).json({ message: 'Funds successfully allocated!' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
