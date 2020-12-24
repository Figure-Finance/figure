const path = require('path')

const express = require('express')

const savingsController = require('../controllers/savings')
const itemGoalController = require('../controllers/itemGoals')

const router = express.Router()

router.get('/', savingsController.getSavings)

router.post('/', savingsController.postTotalSavings)

router.patch('/edit', savingsController.editTotalSavings)

router.patch('/update', savingsController.updateTotalSavingsProgress)

// router.get('/savings/:timeFrame', savingsController.getByTimeFrame)

router.post('/goal/add', itemGoalController.postItemGoals)

router.get('/goal/:id', itemGoalController.getItemGoalDetails)

router.delete('/goal/delete/:id', itemGoalController.deleteItemGoal)

router.patch('/goal/edit/:id', itemGoalController.editItemGoal)

router.patch('/goal/allocate/:id', itemGoalController.allocateGoalFunds)

module.exports = router
