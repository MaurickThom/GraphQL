const { ENV } = require('./config/config'),
    { NODE_PORT } = ENV,
    express = require('express'),
    app = express()


app.use(express.json())
app.use('port',NODE_PORT)


app.listen(app.get('port'),()=>console.log(`Listening on port ${app.get('port')}`))
