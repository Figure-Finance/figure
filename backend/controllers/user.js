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
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  let user
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password
  const categories = [{ category: 'Groceries', isIncome: false }]
  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        categories: categories
      })
      return user.save()
    })
    .then((result) => {
      return postSavings(0, 0, user._id)
    })
    .then((result) => {
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
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const email = req.body.email
  const password = req.body.password
  let loadedUser
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        const error = new Error(
          'We could not find a user with that email address.'
        )
        error.statusCode = 401
        throw error
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error('Incorrect password')
        error.statusCode = 401
        throw error
      }
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
        throw new Error('User not found.')
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
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  const newFirstName = req.body.firstName
  const newLastName = req.body.lastName
  const newEmail = req.body.email

  User.findById(req.userId)
    .then((user) => {
      user.firstName = newFirstName
      user.lastName = newLastName
      user.email = newEmail
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
