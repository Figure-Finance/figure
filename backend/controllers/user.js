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
