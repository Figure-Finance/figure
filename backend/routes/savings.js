const path = require('path')

const express = require('express')

const savingsController = require('../controllers/savings')

const router = express.Router()

router.get('/savings', savingsController.getBankSavings)

router.post('/savings', savingsController.postBankSavings)

module.exports = router
