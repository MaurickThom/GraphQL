const passport = require('passport'),
    { BasicStrategy } = require('passport-http'),
    boom = require('@hapi/boom'),
    { encryptPassword,matchPassword } = require('./../utils/helpers/bcrypt'),
    { MongoLib } = require('./../lib/mongo')


passport.use(
    new BasicStrategy(async (username,password,callback)=>{
        const mongoDB = new MongoLib()
        try{
            const [user] = await mongoDB.getAll('users',{username})

        }catch(err){
            
        }
    })
)