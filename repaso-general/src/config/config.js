require('dotenv').config()

const ENV = {
    DB_PORT             : process.env.DB_PORT,
    DB_HOST             : process.env.DB_HOST,
    DB_USER             : process.env.DB_USER,
    DB_PASSWORD         : process.env.DB_PASSWORD,
    DB_NAME             : process.env.DB_NAME,
    NODE_SERVER_PORT    : process.env.PORT,
    AUTH_JWT_SECRET     : process.env.AUTH_JWT_SECRET,
}


module.exports = {
    ENV
}