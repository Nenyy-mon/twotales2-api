const express = require('express')
const router = express.Router()
const { companyUser } = require('../models/companyUser.js')

router.get(`/`, function (req, res) {
    console.log(req.body)
    res.send('company user')
})


router.post(`/`, (req, res) => {

})


module.exports = router