const path = require('path')

const express = require('express')

const dashWeeklyController = require('../controllers/dashboard')

const router = express.Router()

router.get('/dash-weekly', dashWeeklyController.getUserFinances)

router.post('/post-finances', dashWeeklyController.postUserFinances)

module.exports = router
