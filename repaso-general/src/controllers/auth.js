const express = require('express'),
    passport = require('passport'),
    boom = require('@hapi/boom'),
    jwt = require('jsonwebtoken'),
    router = express.Router(),
    { ENV } = require('./../config/config'),
    { AUTH_JWT_SECRET } = ENV

router.post('/token',async (req,res,next)=>{
    passport.authenticate( AUTH_JWT_SECRET ,(err,user)=>{
        try{
            if(err || !user)
                return next(boom.unauthorized())
            req.login(user,{
                session:false
            },async error =>{
                if(error) return next(error)
                const payload = {
                    username:user.username,
                    email:user.email
                }
                const token = jwt.sign(payload,AUTH_JWT_SECRET,{
                    expiresIn:'15m'
                })}
                return res.status(200).json({
                    access_token:token
                })
            )
        }catch(error){
            next(error)
        }
    })(req,res,next)
})

module.exports = {
    router
}