const { encryptPassword } = require('./../utils/helpers/bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken'),
{ ENV :{AUTH_JWT_SECRET} } = require('./../config/config')
const {looger} = require('./../utils/logger');

const register = async(req,res,next)=>{
    try{
        logger.log( 'info',{message:'intento de registro de usuario'}, JSON.stringify(req) );
        const {username,password,firstname,lastname,email} = req.body
        const [data] = await req.mongo.get('users',{username})
        if(data) return res.json({
            err:true
        })
        const user = await req.mongo.create('users',{
            username,
            lastname,
            firstname,
            email,
            password : await encryptPassword(password)
        })
        res.json(user)
    }catch(err){
        console.log("TCL: register -> err", err)
        return res.json({
            err
        })
    }

}
const login = async(req,res,next)=>{
    looger.log('info',{message:'Intento de login'},req)
    // logger.log({message:'Intento de login', level:'info', req });
    passport.authenticate('local',{
        session:false
    },(error,user)=>{
        if(error || !user)
            return res.json({
                err:true
            })
        const payload = {
            sub: user._id,
            exp: Date.now() + 82000,
            username:user.username
        }
        const token = jwt.sign(JSON.stringify(payload),AUTH_JWT_SECRET)
        res.json({ data: { token} });
    })(req,res)
}

const refresh = async (req,res,next)=>{
    const payload = {
        sub: user._id,
        exp: Date.now() + 82000,
        username:req.user.username
    }
    const token = jwt.sign(JSON.stringify(payload),AUTH_JWT_SECRET)
    res.json({ data: { token} });
}

module.exports = {
    register,
    login
}