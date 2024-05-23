const express = require('express')
const router = express.Router()
const e = require('express')
const secret = process.env.SESSION_SECRET
const privateUserController = require('../controller/privateUserController')




router.get(`/login/:id`, privateUserController.privateUser_getLogin)

router.post(`/login`, privateUserController.privateUser_postLogin)

router.post('/signup', privateUserController.privateUser_postSignup)

router.get('/signup', privateUserController.privateUser_getSignup)

router.get('/logout', privateUserController.privateUser_getLogout)


module.exports = router 
