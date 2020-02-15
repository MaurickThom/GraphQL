const { Schema, model } = require('mongoose')
const { encryptPassword,matchPassword } = require('./../utils/bcrypt')
const JWT = require('jsonwebtoken')
require('dotenv').config()



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

UserSchema.virtual('temporal_password') // esta variable debe existir a la hora de guardar en el resolver
/**
 * input : { email:"blabla",temporal_password:"blabla" }
 */

UserSchema.pre('validate',async function (){
    if(this.temporal_password == undefined)
        return
    try{
        // const hash = await bcrypt.hash(this.temporal_password,10)
        const hash = await encryptPassword(this.temporal_password)
        this.password = hash
    }catch(err){
        console.log("TCL: err", err)
        throw err
    }
})

UserSchema.statics.authenticate = async function ({email,password}){
    try{
        const user = await this.findOne({email})
        if(!user) return {
                err:true,
                message: "User not found"
            }
        const result = await matchPassword(password,user.password)

        // jwt

        user.token = JWT.sign({ id:user.id ,email:user.email},process.env.SECRET_KEY)
        await user.save()
        return user

    }catch(err){
        throw new Error(err)
    }

}

module.exports = model('User',UserSchema)


