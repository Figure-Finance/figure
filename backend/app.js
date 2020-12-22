const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/user')

const app = express()

const dashWeeklyRoutes = require('./routes/dashboard-weekly')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', dashWeeklyRoutes)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('CONNECTED')
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          email: 'sid@test.com',
          firstName: 'Sid',
          lastName: 'Arci',
          password: 'test'
        })
      }
      user.save()
    })
    app.listen(80)
  })
  .catch(err => {
    console.log(err)
  })
