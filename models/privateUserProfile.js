const mongoose = require('mongoose');
const { Schema } = mongoose;

const privateUserProfile = new Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    eMail: {
        type: String,
        required: true
    },
    streetName: {
        type: String,
        required: true
    },
    streetNumber: {
        type: Number,
        required: true
    },
    postalCode: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
})