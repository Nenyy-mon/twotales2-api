const express = require('express')
const router = express.Router()
const productController = require('../controller/productController')
router.get(`/`, productController.product_get)
router.post(`/`, productController.product_post);

router.post(`/single`, productController.produgtSingle_post);

module.exports = router
