const express = require('express')
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
  const allowedOrigins = [
    'http://127.0.0.1:8080',
    'http://localhost:8080',
    'http://figurefinance.tk',
    'https://figurefinance.tk'
  ]
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, PATCH, DELETE')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  next()
})

app.use(express.json())

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
    app.listen(5000)
  })
  .catch((err) => {
    res.status(500).send(err.message)
  })
