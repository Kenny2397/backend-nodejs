const express = require('express')
const router = express.Router()

const { validatorHandler } = require('../middlewares/validator.handler')

const {
  createUserSchema
} = require('../schemas/user.schema')

const UserService = require('../services/user.services')
const userService = new UserService()

/** CREATE USER */
router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await userService.create(body)

      res.status(200).json({
        response: newUser
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router
