const { Schema, model } = require('mongoose')
const {encryptPassword} = require('./../utils/bcrypt')

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
        const hast = await encryptPassword(this.temporal_password)
        this.password = hash
    }catch(err){
        console.log("TCL: err", err)
        throw err
    }
})



module.exports = model('User',UserSchema)


