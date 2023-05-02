const express = require('express')
const app = express()

// Port
const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hola mi server en Express')
  })

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