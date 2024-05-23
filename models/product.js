const mongoose = require('mongoose');
const { Schema } = mongoose;
const Product = new Schema({
    "id": {
        type: Number,
        required: true
    },
    "name": {
        type: String,
        required: true
    },
    "img": {
        type: String,
        required: true
    },

    // "onDiscount": Boolean,
    "price": {
        type: Number,
        required: true
    },
    // "discountAmount": Number,
    // "discountedPrice": Number,
    // "actions": String,
    // category: {
    //     // type: mongoose.Schema.type.ObjectId,
    //     ref: "Category",
    //     required: true
    // },
    // "countInStock": {
    //     type: Number,
    //     required: true,
    //     min: 0,
    //     max: 300,
    // },
    // "count": {
    //     type: Number,
    //     required: true
    // }
})


exports.Product = mongoose.model('Product', Product)
