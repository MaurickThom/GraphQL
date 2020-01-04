const passport = require('passport'),
{ Strategy : JwtStrategy ,ExtractJwt } = require('passport-jwt'),
{ Strategy : LocalStrategy} = require('passport-local'),
{ MongoLib } = require('./../lib/mongo'),
{ encryptPassword,matchPassword } = require('./../utils/helpers/bcrypt'),
boom = require('@hapi/boom'),
{ ENV : { AUTH_JWT_SECRET } } = require('./config')

const mongo = new MongoLib() 

passport.use(new LocalStrategy({
    usernameField:"username",
    passwordField:"password"
},async(username,password,done)=>{
    try{
        const [user] = await mongo.get('users',{username})
        if(!user) return done(boom.unauthorized(),false)
        if(!(await matchPassword(password,user.password)))
            return done(boom.unauthorized(),false)
        return done(null,user)
    }catch(err){
        done(err,false)
    }
}))


passport.use(new JwtStrategy({
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: AUTH_JWT_SECRET
},async( payload,done )=>{
    try{
        const [user] = await mongo.getById('users',payload.sub)
        if(!user) return done(boom.unauthorized(),false)
        return done(null,data)
    }catch(err){
        return done(err,false)
    }
}))

module.exports = {
    mongo
}