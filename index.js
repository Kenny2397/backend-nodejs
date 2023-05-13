const { swaggerDocs: V1SwaggerDocs } = require('./src/utils/docs/swagger')

/**
 * SERVER
 */
const sequelize = require('./src/libs/sequelize')

const app = require('./app')
const PORT = process.env.PORT || 0

app.listen(PORT, async (err) => {
  if (err) {
    console.info('Could not establish a connection to the server')
    console.error(err.message)
  }

  await sequelize.authenticate()
    .then(async () => {
      await sequelize.sync({ force: true })

      console.info('-------------- 🚀 Server running  --------------------')
      console.info(`INFO:     http://localhost:${PORT} (Press CTRL+C to quit)`)
      console.info('INFO:     Waiting for application startup ...')
      console.info('INFO:     Sequelize Connected.')
      V1SwaggerDocs(app, PORT)
      console.info('INFO:     Application startup complete.')
    }).catch(error => {
      console.error('INFO:     Cannot connect to database.', error)
    })
})

module.exports = app
