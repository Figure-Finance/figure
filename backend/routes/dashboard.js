const path = require('path')

const express = require('express')

const dashWeeklyController = require('../controllers/dashboard')

const router = express.Router()

router.get('/', dashWeeklyController.getUserFinances)

router.post('/', dashWeeklyController.postUserFinances)

module.exports = router
