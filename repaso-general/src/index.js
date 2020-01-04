/**
 * Helmet te ayuda a proteger tus aplicaciones Express configurando varios encabezados HTTP
 * https://expressjs.com/es/advanced/best-practice-security.html
 */

const { ENV :{ NODE_PORT}} = require('./config/config'),
    express = require('express'),
    app = express(),
    { looger } = require('./utils/logger'),
    helmet = require('helmet'),
    logger = require('./utils/logger'),
    cors = require('cors'),
    passport = require('passport')

// require('./config/passport')

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(passport.initialize())
app.set('port',NODE_PORT)


app.listen(app.get('port'),()=>console.log(`Listening on port ${app.get('port')}`))
