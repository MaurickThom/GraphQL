const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: String,
    password: {
        type: String,
        required: true
    },
    token: String
})

module.exports = model('User',UserSchema)


