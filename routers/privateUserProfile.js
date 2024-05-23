const express = require('express')
const router = express.Router()
const userProfile = require('../controller/userProfileController')
router.get(`/:id`, userProfile.userProfile_getLogin);


module.exports = router



// if (!user) {
//     return res.status(404).json({ message: "User not found" })
// }

// res.status(200).json({ user })

// } catch (err) {
// console.log(err, 'this is error on line 19')
// res.status(500).json({
//     error: err.message,
//     success: false
// })
// }
