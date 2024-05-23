const mongoose = require('mongoose')
const { Schema } = mongoose;

const Category = new Schema({
    name: {
        type: String,
        required: true
    },
    icon: {
        type: string
    },
    color: {
        type: String,
    },
})