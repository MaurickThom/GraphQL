const UserModel = require('./../models/user')

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
            
            try{
                const newUser = new UserModel(input)
                console.log("TCL: signUp -> newUser", newUser)
                await newUser.save()
                return newUser
            }catch(err_message){
                return {
                    err:true,
                    err_message
                }
            }
            
        }
    }
}


module.exports = {
    userResolver
}