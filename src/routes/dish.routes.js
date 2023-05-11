const express = require('express')
const router = express.Router()
const passport = require('passport')

const { validatorHandler } = require('../middlewares/validator.handler')

const {
  createDishSchema,
  getDishSchema,
  updateDishSchema
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
 *                 $ref: "#/components/schemas/dish"
 *      responses:
 *        '200':
 *          description: Successful operation
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/dish"
 *            application/xml:
 *              schema:
 *                $ref: '#/components/schemas/dish'
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

module.exports = router
