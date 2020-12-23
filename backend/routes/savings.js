const path = require('path')

const express = require('express')

const savingsController = require('../controllers/savings')

const router = express.Router()

router.get('/', savingsController.getBankSavings)

router.post('/', savingsController.postBankSavings)

router.get('/goal/:id', savingsController.getItemGoalDetails)

module.exports = router
