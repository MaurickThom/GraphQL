require('dotenv').config()

const ENV = {
    DB_PORT         : process.env.DB_PORT,
    DB_HOST         : process.env.DB_HOST,
    DB_NAME         : process.env.DB_NAME,
    NODE_PORT       : process.env.NODE_PORT,
    AUTH_JWT_SECRET : process.env.AUTH_JWT_SECRET
}


module.exports = {
    ENV
}