const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: String,
    password: {
        type: String,
        required: true
    },
    token: String,
    courses:[
        {
            type:Schema.Types.ObjectId,
            ref: "Course"
        }        
    ]
})

module.exports = model('User',UserSchema)


