require('dotenv').config()
const express = require('express')
const cors = require('cors')
const dbConnectNoSql = require('./config/mongo')
const app = express()
const morganBody = require('morgan-body')
const loggerStream = require('./utils/handleLogger')
const { dbConnectMySql } = require('./config/mysql')
const ENGINE_DB = process.env.ENGINE_DB

app.use(cors())
app.use(express.json())
app.use(express.static('storage'))



morganBody(app, {
    noColors: true,
    stream: loggerStream,
    skip: function(req, res) {
        return res.statusCode < 400

    }

})

const port = process.env.PORT || 3000


/**
 * Aqui invocamos las rutas.
 */
app.use('/api', require('./routes'))

app.listen(port, () => {
    console.log(`Tu app está lista por http://localhost:${port}`);
});

(ENGINE_DB === 'nosql') ? dbConnectNoSql() : dbConnectMySql()
