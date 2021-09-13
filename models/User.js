const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    googleId: {
        type: String,
        reuired: true
    },
    displayName: {
        type: String,
        reuired: true
    },
    firstName: {
        type: String,
        reuired: true
    },
    lastName: {
        type: String,
        reuired: true
    },
    image: {
        type: String
    },
    createAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', UserSchema)