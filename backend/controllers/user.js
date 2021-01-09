const User = require('../models/user')
const process = require('process')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Going to need this soon
const { validationResult } = require('express-validator')

exports.signup = (req, res, next) => {
  let user
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const categories = [{ category: 'Groceries', isIncome: false }]
  const password = req.body.password
  bcrypt.hash(password, 12)
    .then(hashedPassword => {
      user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: hashedPassword,
        categories: categories
      })
      return user.save()
    })
    .then(result => {
      const token = jwt.sign({
        email: user.email,
        userId: user._id.toString()
      }, process.env.SECRET_KEY, {
        expiresIn: '1h'
      })
      res.status(201).json({ msg: 'User successfully created!', user: user, token: token })
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500
      }
      next(err)
    })
}

exports.signin = (req, res, next) => {
  const email = req.body.email
  const password = req.body.password
  let loadedUser
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        const error = new Error('We could not find a user with that email address.')
        error.statusCode = 401
        throw error
      }
      loadedUser = user
      return bcrypt.compare(password, user.password)
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Incorrect password')
        error.statusCode = 401
        throw error
      }
      const token = jwt.sign({
        email: user.email,
        userId: user._id.toString()
      }, process.env.SECRET_KEY, {
        expiresIn: '1h'
      })
      res.status(200).json({ token: token, id: loadedUser._id.toString() })
    })
}

exports.getUserProfile = (req, res, next) => {
  User.findOne()
    .then(user => {
      returnUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        categories: user.categories.map(category => {
          return { id: category._id, category: category.category, isIncome: category.isIncome }
        })
      }
      return res.status(200).json(returnUser)
    })
    .catch(err => {
      console.log(err)
    })
}

exports.updateUserProfile = (req, res, next) => {
  const newFirstName = req.body.firstName
  const newLastName = req.body.lastName
  const newEmail = req.body.email

  // TODO: get this by auth token
  User.findOne()
    .then(user => {
      user.firstName = newFirstName
      user.lastName = newLastName
      user.email = newEmail
      return user.save()
    })
    .then(result => {
      return res.status(200).json({ message: 'User updated successfully!' })
    })
    .catch(err => {
      console.log(err)
    })
}

exports.addUserCategory = (req, res, next) => {
  const category = req.body.category
  const isIncome = req.body.isIncome
  User.findOne()
    .then(user => {
      user.categories.push({ category: category, isIncome: isIncome })
      user.save(err => console.log(err))
      res.status(201).json({ id: user.categories[user.categories.length - 1]._id })
    })
    .catch(err => console.log(err))
}

exports.deleteUserCategory = (req, res, next) => {
  const categoryId = req.params.id
  // TODO: find user based on logged in user (JWT)
  User.findOne()
    .then(user => {
      user.categories = user.categories.filter(category => {
        return category._id.toString() !== categoryId.toString()
      })
      user.save(err => console.log(err))
      return res.status(200).json({ message: 'Category successfully deleted.' })
    })
    .catch(err => {
      console.log(err)
    })
}
