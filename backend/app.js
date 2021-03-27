const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/user')
const Finance = require('./models/finances')

const app = express()

const weeklyRoutes = require('./routes/weekly')
const monthlyRoutes = require('./routes/monthly')
const yearlyRoutes = require('./routes/yearly')
const savingsRoutes = require('./routes/savings')
const userRoutes = require('./routes/user')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use(bodyParser.json())

app.use('/api/weekly', weeklyRoutes)
app.use('/api/monthly', monthlyRoutes)
app.use('/api/yearly', yearlyRoutes)
app.use('/api/savings', savingsRoutes)
app.use('/api/user', userRoutes)

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((result) => {
    console.log('CONNECTED')
    const finances = Finance.findOne()
    User.findOne()
      .then((user) => {
        if (!user) {
          const user = new User({
            email: 'sid@test.com',
            firstName: 'Sid',
            lastName: 'Arci',
            password: 'test',
            finances: [
              {
                financeId: finances._id,
                date: '12-26-2020'
              }
            ]
          })
          user.save((err) => console.log(err))
        }
      })
      .catch((err) => console.log(err))
    app.listen(5000)
  })
  .catch((err) => {
    console.log(err)
  })
