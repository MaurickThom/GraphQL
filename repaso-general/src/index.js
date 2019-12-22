const { ENV } = require('./config/config'),
    { DB_PORT } = ENV,
    express = require('express'),
    app = express()


app.use(express.json())
app.use('port',DB_PORT)


app.listen(app.get('port'),()=>console.log(`Listening on port ${app.get('port')}`))
