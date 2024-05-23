const mongoose = require('mongoose');
const { Schema } = mongoose;
const crypto = require('crypto')
const { isEmail } = require('validator')
const CartSchema = require('./cart.js').schema;
const privateUser = new Schema({
    firstName: {
        type: String,
        required: [true, 'Please enter your first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please enter your last name']
    },
    phoneNumber: {
        type: String,
        required: [true, 'Please enter your phone number']
    },
    eMail: {
        type: String,
        required: [true, 'Please enter your email'],
        validate: [isEmail, 'Please enter a valid email'],
    },
    streetName: {
        type: String,
        required: [true, 'Please enter your street name']
    },
    streetNumber: {
        type: Number,
        required: [true, 'Please enter your street number']
    },
    postalCode: {
        type: Number,
        required: [true, 'Please enter your postal code']
    },
    city: {
        type: String,
        required: [true, 'Please enter your city']
    },
    userName: {
        type: String,
        required: [true, 'Please enter your username']
    },
    cart: {
        type: [CartSchema],
    },
    hash: String,
    salt: String

})
privateUser.methods.setPassword = function (password) {
    try {
        this.salt = crypto.randomBytes(16).toString('hex')
        this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    }
    catch (err) {
        console.log(err, 'greska')
    }
}

privateUser.methods.validPassword = function (password) {

    try {
        var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
        return this.hash === hash
    }
    catch (err) {
        console.log(err)
    }
}




privateUser.post('save', (doc, next) => {
    console.log('new user has been created and saved', doc);
    next();
})
privateUser.pre('save', function (next) {
    console.log('user about to be created and saved', this);
    next();
})
// privateUser.methods.userNameInUse = async (username) => {

//     try {
//         const user = await this.findOne({ username })
//         if (user) {
//             return false;
//         }
//         return true
//     }
//     catch (err) {
//         console.log('Static username error', err)
//         return false;
//     }
// }
module.exports = mongoose.model('privateUser', privateUser);
