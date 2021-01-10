const path = require('path')

const express = require('express')

const dashMonthlyController = require('../controllers/dashboard-monthly')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/:startDate/:endDate', isAuth, dashMonthlyController.getUserMonthlyFinances)

module.exports = router
