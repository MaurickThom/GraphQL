const { compare,genSalt,hash } = require('bcrypt')

exports.encryptPassword = async password=>{
    const salt = await genSalt(10)
    const _hash = await hash(password,salt)
    return _hash
}
exports.matchPassword = async (password,savePassword)=>{
    try{
        const result = await compare(password,savePassword)
        return result
    }catch{
        return false
    }
}