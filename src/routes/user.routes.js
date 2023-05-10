const express = require('express')
const router = express.Router()
const passport = require('passport')

const { validatorHandler } = require('../middlewares/validator.handler')

const {
  createUserSchema,
  createUserOwnerSchema
} = require('../schemas/user.schema')

const UserService = require('../services/user.services')
const userService = new UserService()

/** CREATE USER */
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      console.log(body)
      const newUser = await userService.create(body)

      res.status(200).json({
        response: newUser
      })
    } catch (error) {
      next(error)
    }
  })

/** CREATE OWNER */
router.post('/owner',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createUserOwnerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      console.log(body)
      const newUser = await userService.createOwner(body)

      res.status(200).json({
        response: newUser
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router
