const path = require('path')
const { body } = require('express-validator')

const express = require('express')

const dashWeeklyController = require('../controllers/dashboard-weekly')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/:startDate/:endDate', isAuth, dashWeeklyController.getUserFinances)

router.post('/', isAuth, [
  // body('category')
  // TODO: set up custom validator to ensure category is one of the user's categories
  // .custom((value, { req }) => {
  //   // TODO find this by current user
  //   return User.findOne()
  //     .then(user => {
  //       console.log('In then block')
  //       console.log(`Is it in there? ${user.categories.values.indexOf(value)}`)
  //       console.log(`User.categories.values: ${user.categories.values}`)
  //       if (!user.categories.values.indexOf(value)) {
  //         console.log('false')
  //         console.log(user.categories.values.indexOf(value))
  //         return Promise.reject('Please add a category for this item first.')
  //       }
  //     })
  // }),
  body('amount')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty(),
  body('description')
    .isLength({ min: 1, max: 100 })
    .withMessage('Please ensure description is between 1 and 100 characters.')
    .not()
    .isEmpty(),
  body('location')
    .isLength({ min: 1, max: 25 })
    .withMessage('Please ensure location is between 1 and 25 characters.')
    .not()
    .isEmpty(),
  body('isIncome')
    .isBoolean()
],
dashWeeklyController.postUserFinances
)

router.patch('/', isAuth, [
  body('id')
    .isLength({ min: 16, max: 24 })
    .withMessage('ID must be string between 16 and 24 characters.'),
  // TODO: set up custom validator to ensure category is one of user's categories
  // body('category')
  //   .custom((value, { req }) => {
  //     // TODO find this by current user
  //     return User.findOne()
  //       .then(user => {
  //         if (!user.categories.category.indexOf(value)) {
  //           return Promise.reject('Please add a category for this item first.')
  //         }
  //       })
  //   }),
  body('amount')
    .isDecimal()
    .withMessage('Please enter a valid number.')
    .not()
    .isEmpty(),
  body('description')
    .isLength({ min: 1, max: 100 })
    .withMessage('Please ensure description is between 1 and 100 characters.')
    .not()
    .isEmpty(),
  body('location')
    .isLength({ min: 1, max: 25 })
    .withMessage('Please ensure location is between 1 and 25 characters.')
    .not()
    .isEmpty()
],
dashWeeklyController.editFinanceEntryById
)

router.get('/:id', isAuth, dashWeeklyController.getFinanceDetailsById)

router.delete('/:id', isAuth, dashWeeklyController.deleteFinanceEntryById)

module.exports = router
