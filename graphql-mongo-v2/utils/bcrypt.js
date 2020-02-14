const {genSalt,hash,compare} = require('bcrypt')



exports.encryptPassword = async (password)=>{
    const salt = await genSalt(10)
    const hash = await hash(password,salt)
    return hash
}

exports.matchPassword = async (password,savePassword)=>{
    try{
        const result = await compare(password,savePassword)
        return true
    }catch{
        return false
    }
}