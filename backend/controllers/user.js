const User = require('../models/user')

exports.postUser = (req, res, next) => {
  const email = req.body.email
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const password = req.body.password
  const user = new User({
    email: email,
    firstName: firstName,
    lastName: lastName,
    password: password
  })
  user.save(err => console.log(err))
  res.status(201).json({ msg: 'User successfully created!', user: user })
}

exports.postUserCategories = (req, res, next) => {
  const categories = req.body.categories
  User.findOne()
    .then(user => {
      user.categories.push(...categories)
      user.save(err => console.log(err))
      res.status(201).json({ msg: 'User categories created!' })
    })
    .catch(err => console.log(err))
}
