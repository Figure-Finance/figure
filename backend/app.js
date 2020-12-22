const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/user')
const Finance = require('./models/finances')

const app = express()

const dashWeeklyRoutes = require('./routes/dashboard')
const savingsRoutes = require('./routes/savings')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', dashWeeklyRoutes)
app.use('/api', savingsRoutes)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('CONNECTED')
    const finances = Finance.findOne()
    User.findOne().then(user => {
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
        console.log(`User from if block app.js: ${user}`)
        user.save(err => console.log(err))
      } else {
        console.log('IN ELSE BLOCK APP.JS')
        console.log(`User from else block app.js: ${user}`)
      }
    })
    app.listen(80)
  })
  .catch(err => {
    console.log(err)
  })
