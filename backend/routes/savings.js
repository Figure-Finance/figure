const path = require('path')
const { body } = require('express-validator')

const express = require('express')

const savingsController = require('../controllers/savings')
const itemGoalController = require('../controllers/itemGoals')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/', isAuth, savingsController.getSavings)

router.post('/', isAuth, [
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

router.patch('/total', isAuth, [
  body('totalSavingsGoal')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty()
],
savingsController.editTotalSavings
)

router.patch('/progress', isAuth, [
  body('progressAmount')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty()
],
savingsController.updateTotalSavingsProgress
)

router.get('/progress/:timeFrame', isAuth, savingsController.getByTimeFrame)

router.post('/goal', isAuth, [
  body('name')
    .isLength({ min: 1, max: 25 })
    .withMessage('Name must be between 1 and 25 characters'),
  body('amount')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty(),
  body('description')
    .isLength({ min: 1, max: 100 })
    .withMessage('Description must be between 1 and 100 characters.')
],
itemGoalController.postItemGoals
)

router.get('/goal/:id', isAuth, itemGoalController.getItemGoalDetails)

router.delete('/goal/:id', isAuth, itemGoalController.deleteItemGoal)

router.patch('/goal/allocate', isAuth, itemGoalController.allocateGoalFunds)

router.patch('/goal', isAuth, [
  body('id')
    .isLength({ min: 16, max: 24 })
    .withMessage('ID must be string between 16 and 24 characters.'),
  body('name')
    .isLength({ min: 1, max: 25 })
    .withMessage('Name must be between 1 and 25 characters'),
  body('amount')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty(),
  body('description')
    .isLength({ min: 1, max: 100 })
    .withMessage('Description must be between 1 and 100 characters.')
],
itemGoalController.editItemGoal
)

module.exports = router
