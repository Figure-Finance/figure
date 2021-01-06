const User = require('../models/user')

// TODO: GET user, DELETE categories, PATCH user, POST sign in user

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

exports.postUser = (req, res, next) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password
  const categories = [{ category: 'Groceries', isIncome: false }]
  const user = new User({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password,
    categories: categories
  })
  user.save(err => console.log(err))
  res.status(201).json({ msg: 'User successfully created!', user: user })
}

exports.addUserCategory = (req, res, next) => {
  const category = req.body.category
  const isIncome = req.body.isIncome
  User.findOne()
    .then(user => {
      user.categories.push({ category: category, isIncome: isIncome })
      user.save(err => console.log(err))
      res.status(201).json({ msg: 'User categories created!' })
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
