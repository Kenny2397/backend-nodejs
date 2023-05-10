const express = require('express')
const router = express.Router()
const passport = require('passport')

const { validatorHandler } = require('../middlewares/validator.handler')

const {
  createRestaurantSchema
} = require('../schemas/restaurant.schema')

const RestaurantService = require('../services/restaurant.services')
const restaurantService = new RestaurantService()

/** CREATE RESTAURANT */
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createRestaurantSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      const newRestaurant = await restaurantService.create(body)

      res.status(200).json({
        response: newRestaurant
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router
