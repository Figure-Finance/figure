const path = require('path')

const express = require('express')

const dashYearlyController = require('../controllers/dashboard-yearly')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/:startDate/:endDate', isAuth, dashYearlyController.getUserYearlyFinances)

router.get('/graph/:startDate/:endDate', isAuth, dashYearlyController.getUserYearlyGraph)

module.exports = router
