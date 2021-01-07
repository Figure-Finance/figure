const path = require('path')
const { body } = require('express-validator')

const express = require('express')

const savingsController = require('../controllers/savings')
const itemGoalController = require('../controllers/itemGoals')

const router = express.Router()

router.get('/', savingsController.getSavings)

router.post('/', [
  body('totalSavingsGoal')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty(),
  body('totalSavingsProgress')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty()
],
savingsController.postTotalSavings
)

router.patch('/total', [
  body('totalSavingsGoal')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty()
],
savingsController.editTotalSavings
)

router.patch('/progress', [
  body('progressAmount')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty()
],
savingsController.updateTotalSavingsProgress
)

router.get('/progress/:timeFrame', savingsController.getByTimeFrame)

router.post('/goal', [
  body('name')
    .isLength({ min: 5, max: 25 })
    .withMessage('Name must be between 5 and 25 characters'),
  body('amount')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty(),
  body('description')
    .isLength({ min: 10, max: 100 })
    .withMessage('Description must be between 10 and 100 characters.')
],
itemGoalController.postItemGoals
)

router.get('/goal/:id', itemGoalController.getItemGoalDetails)

router.delete('/goal/:id', itemGoalController.deleteItemGoal)

router.patch('/goal/allocate', itemGoalController.allocateGoalFunds)

router.patch('/goal', [
  body('id')
    .isLength({ min: 16, max: 24 })
    .withMessage('ID must be string between 16 and 24 characters.'),
  body('name')
    .isLength({ min: 5, max: 25 })
    .withMessage('Name must be between 5 and 25 characters'),
  body('amount')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty(),
  body('description')
    .isLength({ min: 10, max: 100 })
    .withMessage('Description must be between 10 and 100 characters.')
],
itemGoalController.editItemGoal
)

module.exports = router
