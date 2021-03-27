const express = require('express')

const dashYearlyController = require('../controllers/yearly')

const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get(
  '/:startDate/:endDate',
  isAuth,
  dashYearlyController.getUserYearlyFinances
)

router.get(
  '/graph/:startDate/:endDate',
  isAuth,
  dashYearlyController.getUserYearlyGraph
)

module.exports = router
