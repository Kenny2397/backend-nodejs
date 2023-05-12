const express = require('express')
const router = express.Router()

const passport = require('./../utils/auth/index')
const { validatorHandler } = require('../middlewares/validator.handler')
const {
  createUserSchema,
  createUserByRoleSchema,
  getUserSchema
} = require('../schemas/user.schema')
const { checkRoles } = require('./../middlewares/auth.handler')
const {
  ADMIN,
  OWNER,
  EMPLOYEE,
  CLIENT
} = require('./../utils/roles')
const UserService = require('./../services/user.services')
const userService = new UserService()

/**
 * @openapi
 * /api/v1/users:
 *    post:
 *      tags:
 *        - User
 *      summary: "Create a new User"
 *      description: Crear un nuevo usuario
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/Usermaster"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/Usermaster'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/Usermaster'
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Usermaster"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/Usermaster'
 *        '400':
 *          description: "Error: Bad Request"
 *        '401':
 *          description: "Error: Unauthorized"
 *        '409':
 *          description: "Error: Conflict"
 *      security:
 *        - bearerAuth: []
 */
router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ADMIN),
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await userService.create(body)

      res.status(200).json({
        newUser
      })
    } catch (error) {
      next(error)
    }
  })

/**
 * @openapi
 * /api/v1/users/owner:
 *    post:
 *      tags:
 *        - User
 *      summary: "Create a new owner user"
 *      description: Create an owner user by validating in Administrator profile
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/User"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        '400':
 *          description: "Error: Bad Request"
 *        '401':
 *          description: "Error: Unauthorized"
 *        '409':
 *          description: "Error: Conflict"
 *      security:
 *        - bearerAuth: []
 */
router.post('/owner',
  passport.authenticate('jwt', { session: false }),
  checkRoles(ADMIN),
  validatorHandler(createUserByRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await userService.createUserByRole(body, OWNER)
      res.status(200).json({
        newUser
      })
    } catch (error) {
      next(error)
    }
  })

/**
 * @openapi
 * /api/v1/users/employee:
 *    post:
 *      tags:
 *        - User
 *      summary: "Create a new employee user"
 *      description: Create an employee user by validating in Owner profile
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/User"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        '400':
 *          description: "Error: Bad Request"
 *        '401':
 *          description: "Error: Unauthorized"
 *        '409':
 *          description: "Error: Conflict"
 *      security:
 *        - bearerAuth: []
 */
router.post('/employee',
  passport.authenticate('jwt', { session: false }),
  checkRoles(OWNER),
  validatorHandler(createUserByRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await userService.createUserByRole(body, EMPLOYEE)

      res.status(200).json({
        newUser
      })
    } catch (error) {
      next(error)
    }
  })

/**
 * @openapi
 * /api/v1/users/client:
 *    post:
 *      tags:
 *        - User
 *      summary: "Create a new client user"
 *      description: Create an client user without validations
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/User"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *            application/x-www-form-urlencoded:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/User"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        '400':
 *          description: "Error: Bad Request"
 *        '401':
 *          description: "Error: Unauthorized"
 *        '409':
 *          description: "Error: Conflict"
 */
router.post('/client',
  validatorHandler(createUserByRoleSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await userService.createUserByRole(body, CLIENT)

      res.status(200).json({
        newUser
      })
    } catch (error) {
      next(error)
    }
  })

/**
 * @openapi
 * /api/v1/users/{id}:
 *    get:
 *      tags:
 *        - User
 *      summary: Find user by ID
 *      description: Returns a single user
 *      parameters:
 *        - name: UserId
 *          in: path
 *          description: ID of user to return
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/UserGet"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/UserGet'
 *        '400':
 *          description: "Error: Bad Request"
 *        '401':
 *          description: "Error: Unauthorized"
 *        '409':
 *          description: "Error: Conflict"
 *      security:
 *        - bearerAuth: []
 */
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params
      const newUser = await userService.findOne(id)
      res.status(200).json({
        newUser
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router
