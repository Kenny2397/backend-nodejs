const express = require('express')
const router = express.Router()
const passport = require('./../utils/auth/index')

const { validatorHandler } = require('../middlewares/validator.handler')

const {
  createUserSchema,
  createUserOwnerSchema,
  createUserEmployeeSchema,
  getUserSchema
} = require('../schemas/user.schema')

const UserService = require('../services/user.services')
const userService = new UserService()

/**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   */
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

/** CREATE EMPLOYEE */
router.post('/employee',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createUserEmployeeSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req?.body
      console.log('--------*****' + body)
      const newUser = await userService.createEmployee(body)

      res.status(200).json({
        response: newUser
      })
    } catch (error) {
      next(error)
    }
  })

/**
   * GET USER
   */
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const newUser = await userService.findOne(id)

      res.status(200).json({
        response: newUser
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router
