const express = require('express')

const userRouter = require('./user.routes')
const roleRouter = require('./role.routes')
const authRouter = require('./auth.routes')

function RouterApi (app) {
  const router = express.Router()
  app.use('/api/v1', router)

  router.use('/users', userRouter)
  router.use('/roles', roleRouter)
  router.use('/auth', authRouter)
}

module.exports = RouterApi
