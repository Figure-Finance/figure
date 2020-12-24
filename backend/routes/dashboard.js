const path = require('path')

const express = require('express')

const dashWeeklyController = require('../controllers/dashboard')

const router = express.Router()

router.get('/', dashWeeklyController.getUserFinances)

router.post('/', dashWeeklyController.postUserFinances)

router.get('/:id', dashWeeklyController.getFinanceDetailsById)

router.delete('/delete/:id', dashWeeklyController.deleteFinanceEntryById)

router.patch('/edit/:id', dashWeeklyController.editFinanceEntryById)

module.exports = router
