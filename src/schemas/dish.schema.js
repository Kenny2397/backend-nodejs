const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const description = Joi.string()
const price = Joi.number().integer()
const urlImage = Joi.string()
const categoryId = Joi.number().integer()
const restaurantId = Joi.number().integer()

const createDishSchema = Joi.object({
  name: name.required(),
  description: description.required(),
  price: price.required(),
  urlImage: urlImage.required(),
  categoryId: categoryId.required(),
  restaurantId: restaurantId.required()
})

const getDishSchema = Joi.object({
  id: id.required()
})

const updateDishSchema = Joi.object({
  description: description.required(),
  price: price.required()
})

module.exports = {
  createDishSchema,
  updateDishSchema,
  getDishSchema
}
