const path = require('path')

const express = require('express')

const dashYearlyController = require('../controllers/dashboard-yearly')

const router = express.Router()

router.get('/:startDate/:endDate', dashYearlyController.getUserYearlyFinances)

router.get('/graph/:startDate/:endDate', dashYearlyController.getUserYearlyGraph)

module.exports = router
