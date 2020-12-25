const path = require('path')

const express = require('express')

const savingsController = require('../controllers/savings')
const itemGoalController = require('../controllers/itemGoals')

const router = express.Router()

router.get('/', savingsController.getSavings)

router.post('/', savingsController.postTotalSavings)

router.patch('/total', savingsController.editTotalSavings)

router.patch('/progress', savingsController.updateTotalSavingsProgress)

router.get('/:timeFrame', savingsController.getByTimeFrame)

router.post('/goal', itemGoalController.postItemGoals)

router.get('/goal/:id', itemGoalController.getItemGoalDetails)

router.delete('/goal/:id', itemGoalController.deleteItemGoal)

router.patch('/goal/:id', itemGoalController.editItemGoal)

router.patch('/goal/allocate/:id', itemGoalController.allocateGoalFunds)

module.exports = router
