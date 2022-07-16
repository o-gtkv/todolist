const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: [true, 'Please provide a username']
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    }
})

module.exports = mongoose.model('User', userSchema)