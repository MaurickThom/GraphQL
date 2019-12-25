const { compare,genSalt,hash } = require('bcrypt')

exports const encryptPassword = async password=>{
    const salt = await genSalt(10)
    const _hash = await hash(password,salt)
    return _hash
}
exports const matchPassword = async (password,savePassword)=>{
    try{
        const result = await compare(password,savePassword)
        return result
    }catch{
        return false
    }
}