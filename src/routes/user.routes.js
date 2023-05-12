const express = require('express')
const router = express.Router()

const passport = require('./../utils/auth/index')
const { validatorHandler } = require('../middlewares/validator.handler')
const {
  createUserSchema,
  createUserOwnerSchema,
  getUserSchema
} = require('../schemas/user.schema')
const models = require('./../libs/sequelize')
const { checkRoles } = require('./../middlewares/auth.handler')
const {
  ADMIN,
  OWNER
} = require('./../utils/roles')

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
 *                 $ref: "#/components/schemas/usermaster"
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/usermaster"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/usermaster'
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
      const newUser = await models.User.create(body)

      res.status(200).json({
        response: newUser
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
 *                 $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/user'
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
  validatorHandler(createUserOwnerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await models.User.createOwner(body)
      res.status(200).json({
        response: newUser
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
 *                 $ref: "#/components/schemas/user"
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/user"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/user'
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
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newUser = await models.User.createEmployee(body)

      res.status(200).json({
        response: newUser
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
 *        - name: petId
 *          in: path
 *          description: ID of pet to return
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
 *                $ref: "#/components/schemas/employee"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/employee'
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
      const newUser = await models.User.findOne(id)

      res.status(200).json({
        response: newUser
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router
