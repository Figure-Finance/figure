const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/user')
const Finance = require('./models/finances')

const app = express()

const dashWeeklyRoutes = require('./routes/dashboard')
const dashMonthlyRoutes = require('./routes/dashboard-monthly')
const dashYearlyRoutes = require('./routes/dashboard-yearly')
const savingsRoutes = require('./routes/savings')
const userRoutes = require('./routes/user')
const isAuth = require('./middleware/is-auth')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
  next()
})

app.use(bodyParser.json())

app.use('/api/weekly', dashWeeklyRoutes)
app.use('/api/monthly', dashMonthlyRoutes)
app.use('/api/yearly', dashYearlyRoutes)
app.use('/api/savings', savingsRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('CONNECTED')
    const finances = Finance.findOne()
    User.findOne()
      .then(user => {
        if (!user) {
          const user = new User({
            email: 'sid@test.com',
            firstName: 'Sid',
            lastName: 'Arci',
            password: 'test',
            finances: [{
              financeId: finances._id,
              date: '12-26-2020'
            }]
          })
          user.save(err => console.log(err))
        }
      })
      .catch(err => console.log(err))
    app.listen(80)
  })
  .catch(err => {
    console.log(err)
  })
