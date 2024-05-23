const { json } = require('body-parser');
const privateUser = require('../models/privateUser.js')
const jwt = require('jsonwebtoken')
const crypto = require('crypto');



const handleErrorsSignup = (err) => {
    console.log(err)
    let error = {
        firstName: '',
        lastName: '',
        eMail: '',
        phoneNumber: '',
        streetName: '',
        streetNumber: '',
        postalCode: '',
        city: '',
        password: ''
    };
    if (err.message.includes('validation failed')) {
        Object.values(err.errors).forEach(({ properties }) => {
            error[properties.path] = properties.message
        })
    }
    if (err.code == 11000) {
        const msg = 'There is already an email like that, please use another email'
        const newErr = new Error(msg);
        newErr.message = msg;
        newErr.statusCode = 400
        error[Object.keys(err['keyValue'])] = msg
    }
    return error;
}


const handleErrorsLogin = (err) => {
    let errors = {
        eMail: '',
        password: ''
    };
    if (err.message.includes('')) {
        errors['eMail'] = err.message
    } else {
        errors['password'] = err.message
    }

    return errors;
}

const maxAge = 3 * 24 * 60 * 60

const createToken = (userId, eMail) => {
    return jwt.sign({ userId, eMail }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}



module.exports.privateUser_getLogin = (req, res) => {
    const id = req.params.id;
    const idCheck = () => {
        if (id.includes(':')) {
            return id.slice(1)
        } else {
            return id
        }
    }
    privateUser.findById(
        idCheck()
    ).then((profile) => {
        res.send(profile)
    })
        .catch((err) => {
            handleErrorsLogin(err)
        })


}

module.exports.privateUser_postLogin = async (req, res) => {
    try {
        const { eMail, password } = req.body
        if (!(eMail && password)) {
            res.status(400).send("All input is required")
        }
        else {
            const user = await privateUser.findOne({ eMail });
            const hashedPassword = crypto.pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString('hex');
            if (user && (hashedPassword === user.hash)) {
                const token = createToken(user._id, eMail)
                const id = user._id
                return res.status(200).json({ token, id })
            } else {
                // Passwords don't match
                return res.status(401).send("Invalid password");
            }

        }
    } catch (err) {
        const error = handleErrorsLogin(err)
        res.status(400).json({ error })
    }








    // privateUser.findOne({ eMail: eMail })
    //     .then(user => {
    //         if (user === null) {
    //             return res.status(400).send({
    //                 message: "Wrong email."
    //             })
    //         }
    //         else {
    //             if (user.validPassword(password)) {
    //                 res.status(201).send({
    //                     user: eMail,
    //                     id: user.id,
    //                     userName: user.userName,
    //                     message: 'User logged in',
    //                 })


    //             }
    //             else {
    //                 return res.status(400).send({
    //                     message: "Wrong password"
    //                 })
    //             }
    //         }
    //     })
    //     .catch((err) => {
    //         const errors = handleErrorsLogin(err)
    //         res.status(400).send({ errors })
    //     })
}

module.exports.privateUser_postSignup = async (req, res, next) => {
    try {
        const { userName, firstName, lastName, phoneNumber, eMail, streetName, streetNumber, postalCode, city, password } = req.body;

        const user = new privateUser({
            firstName,
            lastName,
            phoneNumber,
            eMail: eMail.toLowerCase(),
            streetName,
            streetNumber,
            postalCode,
            city,
            userName: userName.toLowerCase(),
        })
        user.setPassword(password)
        user.save()

        res.status(201).send({ message: 'User successfully registered.', user: user })
    }
    catch (err) {
        const errors = handleErrorsSignup(err)
        res.status(400).json({
            errors
        })
        return;

    }

}


module.exports.privateUser_getLogout = (req, res) => {

}

module.exports.privateUser_getSignup = (req, res) => {
    res.json(privateUser)
}
