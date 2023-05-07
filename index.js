/**
 * SERVER
 */
const sequelize = require('./src/libs/sequelize')

const app = require('./app')
const PORT = process.env.PORT || 3000

app.listen(PORT, async (err) => {
  if (err) {
    console.info('Could not establish a connection to the server')
    console.error(err.message)
  }

  console.info('-------------- 🚀 Server running on ------------------')
  console.info(`INFO:     http://localhost:${PORT} (Press CTRL+C to quit)`)
  console.info('INFO:     Waiting for application startup.')
  console.info('INFO:     Application startup complete.')

  sequelize.authenticate()
    .then(() => {
      console.info('INFO:     Sequelize Connected.')

      // sequelize.sync({ force: false })
    }).catch(error => {
      console.error('INFO:     Cannot connect to database.', error)
    })

  sequelize.sync({ force: false })
})

module.exports = app
