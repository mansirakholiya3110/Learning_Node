const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    profileImage: {
        type: String
    },
    mobileNo: {
        type: String
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
}, {
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);