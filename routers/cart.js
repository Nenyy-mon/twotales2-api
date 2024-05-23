const express = require('express')
const router = express.Router()
const cartController = require('../controller/cartController.js')


router.get(`/redirect`, cartController.cart_get_redirect)

router.patch('/decrement/:id', cartController.cart_patchDeleteOne)

router.post(`/:id`, cartController.cart_post)

router.patch(`/:id`, cartController.cart_patch)


module.exports = router
