const path = require('path')

const express = require('express')

const dashWeeklyController = require('../controllers/dashboard-weekly')
const dashMonthlyController = require('../controllers/dashboard-monthly')

const router = express.Router()

router.get('/:startDate/:endDate', dashWeeklyController.getUserFinances)

router.post('/', dashWeeklyController.postUserFinances)

router.get('/:date/:id', dashWeeklyController.getFinanceDetailsById)

router.delete('/delete/:id', dashWeeklyController.deleteFinanceEntryById)

router.patch('/edit/:id', dashWeeklyController.editFinanceEntryById)

module.exports = router
