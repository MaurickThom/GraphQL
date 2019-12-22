const winston = require('winston')

require('winston-daily-rotate-file')

const looger = winston.createLogger({
    transports:[
        new (winston.transports.DailyRotateFile)({
            filename: `${__dirname}/../../logs/%DATE%.log`,
            datePattern: 'YYYY-MM-DD',
            zippedArchive: true,
            maxSize: '20m',
            maxFiles: '14d'
        })
    ]
})