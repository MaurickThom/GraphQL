const winston = require('winston')
const { getIp } = require('./helpers/getIp')
const { ENV } = require('./../config/config')
const { LOG_LEVEL } = ENV
require('winston-daily-rotate-file')

const looger = winston.createLogger({
    transports:[
        new (winston.transports.DailyRotateFile)({
            filename: `${__dirname}/../../logs/%DATE%.log`,
            datePattern: 'DD-MM-YYYY',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ],
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD-MM-YYYY HH:mm:ss'
        }),
        winston.format.printf(info=>{
            let ret = {}
            ret.message = info.message || ''
            ret.ip = info.req ? getIp(info.req) : ''
            ret.timestamp = info.timestamp || ''
            ret.status = info.status || ''
            ret.level = info.level || ''
            ret.method = info.req? info.req.method : ''
            ret.stack = info.stack? info.stack : '';
            ret.path = info.req? info.req.originalUrl : ''
            return (`[${ret.timestamp}] ${ret.ip} {${ret.level}} ${ret.method}//${ret.status}//${ret.path} - ${ret.message} ${ret.stack}`)
        })
    ),
    level:LOG_LEVEL || 'info',
    exitOnError:false
})

module.exports = {
    looger
}