const express = require('express')

const dashMonthlyController = require('../controllers/monthly')

const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get(
  '/:startDate/:endDate',
  isAuth,
  dashMonthlyController.getUserMonthlyFinances
)

module.exports = router
