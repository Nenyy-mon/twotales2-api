const privateUser = require('../models/privateUser.js')

const handleErrors = (err) => {
    console.log(err.message, err.code)
    console.log(err, 'err')
}


module.exports.userProfile_getLogin = async (req, res) => {
    try {
        const id = req.params.id
        const user = await privateUser.findById(
            id
        )
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        } else {
            res.status(200).json({ user })
        }
    }
    catch (err) {
        handleErrors(err)
    }
}
