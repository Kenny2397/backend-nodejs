const Joi = require('joi')

// const id = Joi.number().integer()
const name = Joi.string()
const address = Joi.string()
const phone = Joi.string().pattern(/^(\+)?\d{1,13}$/)
const urlLogo = Joi.string()
const nit = Joi.number().integer()
const ownerId = Joi.string()

const createRestaurantSchema = Joi.object({
  name: name.required(),
  address: address.required(),
  phone: phone.required(),
  urlLogo: urlLogo.required(),
  nit: nit.required(),
  ownerId: ownerId.required()
})

module.exports = {
  createRestaurantSchema
}
