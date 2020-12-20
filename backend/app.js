const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoConnect = require('./util/database').mongoConnect
const User = require('./models/user')

const app = express()

const dashWeeklyRoutes = require('./routes/dashboard-weekly')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next) => {
  User.findById('5fdfc2c73dc690b6ad0e56a2')
    .then(user => {
      console.log(`User from database: ${user}`)
      req.user = new User(user.email, user.firstName, user.lastName, user.password)
      req.user.finances.push(user.finances)
      next()
    })
    .catch(err => console.log(err))
})

app.use('/api', dashWeeklyRoutes)

mongoConnect(() => {
  app.listen(80)
})
