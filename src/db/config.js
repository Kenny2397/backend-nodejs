const { config } = require('./../config/config')

const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DATABASE = encodeURIComponent(config.database)
const URI = `${DATABASE}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`

module.exports = {
  development: {
    url: URI,
    dialect: DATABASE
  },
  production: {
    url: URI,
    dialect: DATABASE
  }
}
