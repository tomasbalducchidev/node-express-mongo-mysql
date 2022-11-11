const { Sequelize } = require('sequelize')

const database = process.env.MYSQL_DB
const username = process.env.MYSQL_USER
const password = process.env.MYSQL_PASSWORD
const host = process.env.MYSQL_HOST

const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect: 'mysql'
    }
)

const dbConnectMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log('MYSQL Conexión correcta');
    } catch (e) {
        console.log('MYSQL Error de Conexión', e);
        
    }
}

module.exports = { sequelize, dbConnectMySql }