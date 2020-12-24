const path = require('path')

const express = require('express')

const savingsController = require('../controllers/savings')

const router = express.Router()

router.get('/', savingsController.getSavings)

router.post('/', savingsController.postTotalSavings)

router.post('/goal/add', savingsController.postItemGoals)

router.get('/goal/:id', savingsController.getItemGoalDetails)

router.delete('/goal/delete/:id', savingsController.deleteItemGoal)

router.patch('/goal/edit/:id', savingsController.editItemGoal)

module.exports = router
