const { Sequelize } = require('sequelize')

const { config } = require('../config/config')
const setupModels = require('./../db/models')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DATABASE = encodeURIComponent(config.database)
const URI = `${DATABASE}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

const sequelize = new Sequelize(URI, {
  // dialect: 'postgres',
  host: 'localhost',
  dialect: DATABASE,
  logging: (msg) => console.log(`Sequelize: ${msg}`)
})

setupModels(sequelize)

module.exports = sequelize
