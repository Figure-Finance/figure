const express = require('express')

const { body } = require('express-validator')

const userController = require('../controllers/user')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/', isAuth, userController.getUserProfile)

router.patch(
  '/',
  isAuth,
  [
    body('firstName').isLength({ min: 1, max: 25 }).not().isEmpty(),
    body('lastName').isLength({ min: 1, max: 25 }).not().isEmpty(),
    body('email').isEmail().normalizeEmail().not().isEmpty()
  ],
  userController.updateUserProfile
)

router.post(
  '/signup',
  [
    body('firstName').isLength({ min: 1, max: 25 }).not().isEmpty(),
    body('lastName').isLength({ min: 1, max: 25 }).not().isEmpty(),
    body('email').isEmail().normalizeEmail().not().isEmpty(),
    body(
      'password',
      'Please make sure your password is between 8 and 25 characters and contains no special characters.'
    )
      .isLength({ min: 8, max: 25 })
      .escape()
      .not()
      .isEmpty()
  ],
  userController.signup
)

router.post(
  '/signin',
  [
    body('email').isEmail().normalizeEmail().not().isEmpty(),
    body('password').not().isEmpty()
  ],
  userController.signin
)

router.patch(
  '/category',
  isAuth,
  [
    body('category')
      .isLength({ min: 1, max: 25 })
      .trim()
      .escape()
      .not()
      .isEmpty()
  ],
  userController.addUserCategory
)

router.delete('/category/:id', isAuth, userController.deleteUserCategory)

module.exports = router
