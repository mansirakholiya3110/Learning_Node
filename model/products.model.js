const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    Title: {
        type: String
    },
    Description: {
        type: String
    },
    Price: {
        type: String
    },
    ProductImage: [{
        type: String
    }],
    Category: [{
        type: String
    }],
    isDelete: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('products', productSchema);