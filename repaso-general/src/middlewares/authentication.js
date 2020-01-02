const { ENV } = require('./../config/config')
const { AUTH_JWT_SECRET } = ENV
const passport = require('passport')
const { Strategy, ExtractJwt } = require("passport-jwt")
const { MongoLib } = require('./../lib/mongo')

const boom = require('@hapi/boom')

passport.use(
    new Strategy(
        {
            secretOrKey:AUTH_JWT_SECRET,
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken()
        },
        async (tokenPayload,callback)=>{
            const mongo = new MongoLib()
            try{
                const [user] = await mongo.getAll('users',{
                    username:tokenPayload.username
                })
                if(!user) return callback(
                    boom.unauthorized(),false
                )
                return callback(null,user)
            }catch(err){
                return callback(err)
            }
        }
    )
)

/**
 * Las estrategias en passport
 * 
 * La estrategia local de Passport es un modulo de Node.js
 * que te permite implementar un mecanismo de autentificacion usuario/password. 
 */