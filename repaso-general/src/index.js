/**
 * Helmet te ayuda a proteger tus aplicaciones Express configurando varios encabezados HTTP
 * https://expressjs.com/es/advanced/best-practice-security.html
 */

const { ENV } = require('./config/config'),
    { NODE_PORT } = ENV,
    express = require('express'),
    app = express(),
    { looger } = require('./utils/logger'),
    helmet = require('helmet')


app.use(helmet())
app.use(express.json())
app.use('port',NODE_PORT)


app.listen(app.get('port'),()=>console.log(`Listening on port ${app.get('port')}`))
