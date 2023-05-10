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

/** CREATE DISH */
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
