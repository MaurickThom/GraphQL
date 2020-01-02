/**
 * Helmet te ayuda a proteger tus aplicaciones Express configurando varios encabezados HTTP
 * https://expressjs.com/es/advanced/best-practice-security.html
 */

const { ENV } = require('./config/config'),
    { NODE_PORT } = ENV,
    express = require('express'),
    app = express(),
    { looger } = require('./utils/logger'),
    helmet = require('helmet'),
    logger = require('./utils/logger'),
    { router } = require('./routes/auth')



app.use(helmet())
app.use(express.json())
app.set('port',NODE_PORT)


app.use('/api/auth',router)


app.listen(app.get('port'),()=>console.log(`Listening on port ${app.get('port')}`))
