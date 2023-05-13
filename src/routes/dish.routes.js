const express = require('express')
const router = express.Router()
const passport = require('passport')

const { validatorHandler } = require('../middlewares/validator.handler')

const {
  createDishSchema,
  getDishSchema,
  updateDishSchema,
  updateActiveDishSchema
} = require('../schemas/dish.schema')

const DishService = require('../services/dish.services')
const dishService = new DishService()

/**
 * @openapi
 * /api/v1/users/dishes:
 *    post:
 *      tags:
 *        - Dish
 *      summary: "Create a new dish"
 *      description: Create a dish by validating in Owner profile
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/Dish"
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Dish"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/Dish'
 *        '400':
 *          description: "Error: Bad Request"
 *        '401':
 *          description: "Error: Unauthorized"
 *        '403':
 *          description: "Error: Forbidden"
 *        '409':
 *          description: "Error: Conflict"
 *      security:
 *        - bearerAuth: []
 */
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createDishSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newDish = await dishService.create(body)

      res.status(200).json({
        response: newDish
      })
    } catch (error) {
      next(error)
    }
  })

/**
 * @openapi
 * /api/v1/users/dishes/{id}:
 *    get:
 *      tags:
 *        - Dish
 *      summary: "Get a dish by id"
 *      description: Get a Dish by id verify auth and role
 *      parameters:
 *        - name: DishId
 *          in: path
 *          description: ID of dish to return
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
 *                $ref: "#/components/schemas/Dish"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/Dish'
 *        '400':
 *          description: "Error: Bad Request"
 *        '401':
 *          description: "Error: Unauthorized"
 *        '403':
 *          description: "Error: Forbidden"
 *        '409':
 *          description: "Error: Conflict"
 *      security:
 *        - bearerAuth: []
 */
router.get('/:id',
  validatorHandler(getDishSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params

      const dish = await dishService.findOne(id)
      res.status(200).json({
        response: dish
      })
    } catch (error) {
      next(error)
    }
  })

/**
 * @openapi
 * /api/v1/users/dishes:
 *    patch:
 *      tags:
 *        - Dish
 *      summary: "Update dish"
 *      description: Update a dish by validating in Owner profile
 *      parameters:
 *        - name: DishId
 *          in: path
 *          description: ID of dish to return
 *          required: true
 *          schema:
 *            type: integer
 *            format: int64
 *      requestBody:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: "#/components/schemas/Dish"
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Dish"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/Dish'
 *        '400':
 *          description: "Error: Bad Request"
 *        '401':
 *          description: "Error: Unauthorized"
 *        '403':
 *          description: "Error: Forbidden"
 *        '409':
 *          description: "Error: Conflict"
 *      security:
 *        - bearerAuth: []
 */
router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getDishSchema, 'params'),
  validatorHandler(updateDishSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params

      const updatedDish = await dishService.update(id, req.body)
      res.status(200).json(updatedDish)
    } catch (error) {
      next(error)
    }
  })

router.patch('/:id/active',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getDishSchema, 'params'),
  validatorHandler(updateActiveDishSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params

      const updatedDish = await dishService.update(id, req.body)
      res.status(200).json(updatedDish)
    } catch (error) {
      next(error)
    }
  })

module.exports = router
