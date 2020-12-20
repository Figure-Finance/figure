const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')
const mongoConnect = require('./util/database').mongoConnect

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

mongoConnect(() => {
  app.listen(80)
})
