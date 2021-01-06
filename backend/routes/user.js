const path = require('path')

const express = require('express')

const userController = require('../controllers/user')

const router = express.Router()

router.get('/', userController.getUserProfile)

router.post('/signup', userController.postUser)

router.patch('/category', userController.addUserCategory)

module.exports = router
