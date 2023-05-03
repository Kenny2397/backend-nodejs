const express = require('express')
const app = express()

/**
 * CONFIGS
*/
const PORT = process.env.PORT || 3000
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
 * ROUTES
*/
const RouterApi = require('./src/routes')
app.get('/', (req, res) => {
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

/**
 * SERVER
 */
app.listen(PORT, (err) => {
  if (err) {
    console.info('Could not establish a connection to the server')
    console.error(err.message)
  }
  console.info('-------------- 🚀 Server running on ------------------')
  console.info(`INFO:     http://localhost:${PORT} (Press CTRL+C to quit)`)
  console.info('INFO:     Waiting for application startup.')
  console.info('INFO:     Application startup complete.')
})