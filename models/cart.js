const mongoose = require('mongoose');
const { Schema } = mongoose;
const CartSchema = new Schema({
    id: {
        type: Number,
        ref: 'Product'
    },
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    count: {
        type: Number,
    }

})


module.exports.CartSchema = mongoose.model('CartSchema', CartSchema)
