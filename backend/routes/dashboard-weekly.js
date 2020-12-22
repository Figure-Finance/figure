const path = require('path')

const express = require('express')

const dashWeeklyController = require('../controllers/dashboard-weekly')

const router = express.Router()

router.get('/dash-weekly', dashWeeklyController.getUser)

module.exports = router
