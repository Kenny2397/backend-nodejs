const express = require('express')
const app = express()

/**
 * CONFIGS
*/

app.use(express.json(true), express.urlencoded({ extended: true }))

/**
 * MIDDLEWARES
*/
const {
  LogErrors,
  ErrorHandler,
  BoomErrorHandler,
  OrmErrorHandler
} = require('./src/middlewares/error.handler')

/**
 * AUTH
 */
require('./src/utils/auth/index')

/**
 * ROUTES
*/
const RouterApi = require('./src/routes')

app.get('/home', (req, res) => {
  res.send('Hola mi server en Express')
})

RouterApi(app)

/**
 * ERRORS MIDDLEWARES
 */
app.use(LogErrors)
app.use(BoomErrorHandler)
app.use(OrmErrorHandler)
app.use(ErrorHandler)

module.exports = app
