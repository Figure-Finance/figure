const path = require('path')

const express = require('express')

const dashMonthlyController = require('../controllers/dashboard-monthly')

const router = express.Router()

router.get('/:startDate/:endDate', dashMonthlyController.getUserMonthlyFinances)

module.exports = router
