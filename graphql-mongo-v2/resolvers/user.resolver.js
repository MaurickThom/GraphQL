const UserModel = require('./../models/user')
const CourseModel = require('./course.resolver')

const { encryptPassword,matchPassword } = require('./../utils/bcrypt')

const userResolver = {
    Query:{
        async getAllUsers(obj){
            const users = await UserModel.find().populate('courses')
            return users
        },
        async getUserById(obj,{id}){
            const user = await UserModel.findById(id).populate('courses')
            return user
        }
    },
    Mutation:{
        async signUp(obj,{input}){
            console.log("TCL: signUp -> input", input)
            const { email,password } = input
            if(!email || !password) return {
                err:true,
                message: 'Missign fields'
            }
            // input.password = await encryptPassword(input.password)
            try{
                // const newUser = new UserModel(input)
                const newUser = new UserModel({
                    email,
                    temporal_password:password
                })
                console.log("TCL: signUp -> newUser", newUser)
                await newUser.save()
                return newUser
            }catch(err_message){
                return {
                    err:true,
                    err_message
                }
            }
            
        },
        async logIn(obj,{input}){
            const { email,password } = input
            if(!email || !password) return {
                err:true,
                message: 'Missign fields'
            }
            // const user = await UserModel.find({email})
            // if(!user) return {
            //     err:true,
            //     message: "User not found"
            // }
            // if(!(await matchPassword(password,user.password)))
            //     return {
            //         err:true,
            //         message: 'contraseña incorrecta'
            //     }
            // enviar el token
            try{
                const result = await UserModel.authenticate({email,password})
                console.log("TCL: logIn -> result", result)
                return result
            }catch(err){
                console.log("TCL: logIn -> err", err)
                return err
            }
        }
    },
    User:{
        async courses(parentUser){
            return CourseModel.find({user:parentUser.id})
        }
    }
}


module.exports = {
    userResolver
}