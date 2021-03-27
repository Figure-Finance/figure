const { body } = require('express-validator')

const express = require('express')

const savingsController = require('../controllers/savings')

const itemGoalController = require('../controllers/itemGoals')

const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/', isAuth, savingsController.getSavings)

router.post(
  '/',
  isAuth,
  [
    body('totalSavingsGoal', 'Please enter a valid number greater than 0.')
      .isDecimal()
      .custom((value, { req }) => value > 0)
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

router.patch(
  '/total',
  isAuth,
  [
    body('totalSavingsGoal', 'Please enter a valid number.')
      .isDecimal()
      .custom((value, { req }) => value > 0)
      .not()
      .isEmpty()
  ],
  savingsController.editTotalSavings
)

router.patch(
  '/progress',
  isAuth,
  [
    body('progressAmount', 'Please enter a valid number.')
      .isDecimal()
      .custom((value, { req }) => value > 0)
      .not()
      .isEmpty()
  ],
  savingsController.updateTotalSavingsProgress
)

router.get('/progress/:timeFrame', isAuth, savingsController.getByTimeFrame)

router.post(
  '/goal',
  isAuth,
  [
    body('name', 'Name must be between 1 and 25 characters.')
      .isLength({ min: 1, max: 25 })
      .escape(),
    body('amount')
      .isDecimal()
      .custom((value, { req }) => value > 0)
      .not()
      .isEmpty(),
    body('description', 'Description must be between 1 and 100 characters.')
      .isLength({ min: 1, max: 100 })
      .escape()
  ],
  itemGoalController.postItemGoals
)

router.get('/goal/:id', isAuth, itemGoalController.getItemGoalDetails)

router.delete('/goal/:id', isAuth, itemGoalController.deleteItemGoal)

router.patch(
  '/goal/allocate',
  isAuth,
  [
    body(
      'allocateAmount',
      'Please make sure amount is valid number greater than zero.'
    )
      .isDecimal()
      .custom((value, { req }) => value > 0)
      .not()
      .isEmpty()
  ],
  itemGoalController.allocateGoalFunds
)

router.patch(
  '/goal',
  isAuth,
  [
    body('id')
      .isLength({ min: 16, max: 24 })
      .withMessage('ID must be string between 16 and 24 characters.'),
    body('name', 'Name must be between 1 and 25 characters.')
      .isLength({ min: 1, max: 25 })
      .escape(),
    body('amount')
      .isDecimal()
      .custom((value, { req }) => value > 0)
      .not()
      .isEmpty(),
    body('description', 'Description must be between 1 and 100 characters.')
      .isLength({ min: 1, max: 100 })
      .escape()
  ],
  itemGoalController.editItemGoal
)

module.exports = router
