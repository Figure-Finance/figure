const process = require('process')

const User = require('../models/user')

const postSavings = require('../util/postSavings')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const { validationResult } = require('express-validator')

exports.signup = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    // Send status 422 for 'validation failed' and send our error
    res.status(422).send(error)
  }
  // Initialize user for .then() scope access
  let user
  bcrypt
    .hash(req.body.password, 12)
    .then((hashedPassword) => {
      // Create our new user
      user = new User(req.body)
      // All users currently receive category "Groceries"
      user.categories = [{ category: 'Groceries', isIncome: false }]
      return user.save()
    })
    .then((result) => {
      // Initialize empty 'total savings' for new user
      return postSavings(0, 0, user._id)
    })
    .then((result) => {
      // Send our token
      const token = jwt.sign(
        {
          email: user.email,
          userId: user._id.toString()
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '1h'
        }
      )
      // Send 201: 'resource successfully created'
      res.status(201).json({ token: token })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.signin = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    // Send status 422 for 'validation failed' and send our error
    res.status(422).send(error)
  }
  // Initialize loadedUser for .then() scope access
  let loadedUser
  User.findOne({ email: req.body.email })
    .then((user) => {
      // If a user does not exist for this email address:
      if (!user) {
        const error = new Error(
          'We could not find a user with that email address.'
        )
        // Set status 401 for 'unauthorized' if user does not exist.
        res.status(401).send(error)
      }
      loadedUser = user
      // Check our hashed password against the input password
      return bcrypt.compare(req.body.password, user.password)
    })
    .then((isEqual) => {
      // If our passwords do not match:
      if (!isEqual) {
        const error = new Error('Incorrect password')
        // Send status 401 'unauthorized'
        res.status(401).send(error)
      }
      // Send our JWT
      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        process.env.SECRET_KEY,
        {
          expiresIn: '1h'
        }
      )
      res.status(200).json({ token: token })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.getUserProfile = (req, res, next) => {
  User.findById(req.userId)
    .then((user) => {
      if (!user) {
        const error = new Error('User not found.')
        // If this user is not found, set 404 'resource not found'
        res.status(404).send(error)
      }
      const returnUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        categories: user.categories.map((category) => {
          return {
            id: category._id,
            category: category.category,
            isIncome: category.isIncome
          }
        })
      }
      return res.status(200).json(returnUser)
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.updateUserProfile = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    // Send status 422 for 'validation failed' and send our error
    res.status(422).send(error)
  }

  User.findById(req.userId)
    .then((user) => {
      user.firstName = req.body.firstName
      user.lastName = req.body.lastName
      user.email = req.body.email
      return user.save()
    })
    .then((result) => {
      return res.status(200).json({ message: 'User updated successfully!' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.addUserCategory = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.')
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const category = req.body.category
  const isIncome = req.body.isIncome
  User.findById(req.userId)
    .then((user) => {
      user.categories.push({ category: category, isIncome: isIncome })
      user.save((err) => console.log(err))
      res
        .status(201)
        .json({ id: user.categories[user.categories.length - 1]._id })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.deleteUserCategory = (req, res, next) => {
  const categoryId = req.params.id
  User.findById(req.userId)
    .then((user) => {
      user.categories = user.categories.filter((category) => {
        return category._id.toString() !== categoryId.toString()
      })
      user.save((err) => console.log(err))
      return res.status(200).json({ message: 'Category successfully deleted.' })
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}
