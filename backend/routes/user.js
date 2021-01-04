const path = require('path')

const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.get('/', userController.getUserProfile)

router.post('/signup', userController.postUser)

router.post('/categories', userController.postUserCategories)

module.exports = router
