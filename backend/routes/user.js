const path = require('path')

const express = require('express')

const userController = require('../controllers/user')
const isAuth = require('../middleware/is-auth')

const router = express.Router()

router.get('/', isAuth, userController.getUserProfile)

router.patch('/', userController.updateUserProfile)

router.post('/signup', userController.signup)

router.post('/signin', userController.signin)

router.patch('/category', userController.addUserCategory)

router.delete('/category/:id', userController.deleteUserCategory)

module.exports = router
