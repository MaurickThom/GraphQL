const JWT = require('jsonwebtoken')
const UserModel = require('./../models/user')
require('dotenv').config()

module.exports = async function({ req }){
    let token = null,
        currentUser = null
    token.req.headers['authorization']
    if (!token) return {}
    const decodedInfo = JWT.verify(token,process.env.SECRET_KEY)
    if(token && decodedInfo){
        currentUser = await UserModel.findById(decodedInfo.id)
        if(!currentUser) throw new Error('Invalid Token')
    }
    return {
        token,
        currentUser
    } // este objeto se convierte en el contexto

}
