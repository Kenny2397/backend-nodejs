require('dotenv').config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,

  jwtSecret: process.env.JWT_SECRET,

  postgresDbUser: process.env.POSTGRES_DB_USER,
  postgresDbPassword: process.env.POSTGRES_DB_PASSWORD,
  postgresDbHost: process.env.POSTGRES_DB_HOST,
  postgresDbName: process.env.POSTGRES_DB_NAME,
  postgresDbPort: process.env.POSTGRES_DB_PORT,

  mysqlDbUser: process.env.MYSQL_DB_USER,
  mysqlDbPassword: process.env.MYSQL_DB_PASSWORD,
  mysqlDbHost: process.env.MYSQL_DB_HOST,
  mysqlDbName: process.env.MYSQL_DB_NAME,
  mysqlDbPort: process.env.MYSQL_DB_PORT
}

module.exports = { config }
