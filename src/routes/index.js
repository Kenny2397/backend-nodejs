const express = require('express')

const userRouter = require('./users.routes')

function RouterApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use('/users', userRouter)
}

module.exports = RouterApi