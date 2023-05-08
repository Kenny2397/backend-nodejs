const express = require('express')
const router = express.Router()

const { validatorHandler } = require('../middlewares/validator.handler')

const {
  createRestaurantSchema
} = require('../schemas/restaurant.schema')

const RestaurantService = require('../services/restaurant.services')
const restaurantService = new RestaurantService()

/** CREATE RESTAURANT */
router.post('/',
  validatorHandler(createRestaurantSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body
      console.log(body)
      const newRestaurant = await restaurantService.create(body)

      res.status(200).json({
        response: newRestaurant
      })
    } catch (error) {
      next(error)
    }
  })

module.exports = router