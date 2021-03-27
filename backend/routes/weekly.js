const { body } = require('express-validator')

const express = require('express')

const dashWeeklyController = require('../controllers/weekly')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/:startDate/:endDate', isAuth, dashWeeklyController.getUserFinances)

router.post(
  '/',
  isAuth,
  [
    // TODO: set up custom validator to ensure category is one of user's categories
    body(
      'amount',
      'Please make sure amount is a valid number greater than zero.'
    )
      .isDecimal()
      .custom((value, { req }) => value > 0)
      .not()
      .isEmpty(),
    body(
      'description',
      'Please ensure description is between 1 and 100 characters.'
    )
      .isLength({ min: 1, max: 100 })
      .escape()
      .not()
      .isEmpty(),
    body('location')
      .isLength({ min: 1, max: 25 })
      .withMessage('Please ensure location is between 1 and 25 characters.')
      .escape()
      .not()
      .isEmpty(),
    body('isIncome').isBoolean(),
    body('date').not().isEmpty()
  ],
  dashWeeklyController.postUserFinances
)

router.patch(
  '/',
  isAuth,
  [
    body('id')
      .isLength({ min: 16, max: 24 })
      .withMessage('ID must be string between 16 and 24 characters.'),
    // TODO: set up custom validator to ensure category is one of user's categories
    body(
      'amount',
      'Please make sure amount is a valid number greater than zero.'
    )
      .isDecimal()
      .custom((value, { req }) => value > 0)
      .not()
      .isEmpty(),
    body('description')
      .isLength({ min: 1, max: 100 })
      .withMessage('Please ensure description is between 1 and 100 characters.')
      .escape()
      .not()
      .isEmpty(),
    body('location')
      .isLength({ min: 1, max: 25 })
      .withMessage('Please ensure location is between 1 and 25 characters.')
      .escape()
      .not()
      .isEmpty()
  ],
  dashWeeklyController.editFinanceEntryById
)

router.get('/:id', isAuth, dashWeeklyController.getFinanceDetailsById)

router.delete('/:id', isAuth, dashWeeklyController.deleteFinanceEntryById)

module.exports = router
