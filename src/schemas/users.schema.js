const Joi = require('joi')

const id = Joi.number().integer()
const name = Joi.string()
const lastName = Joi.string()
const identifier = Joi.string().regex(/^\d+$/)
const phone = Joi.string().pattern(/^(\+)?\d{1,13}$/)
const email = Joi.string().email()
const password = Joi.string().min(3)
const roleId = Joi.string().min(4)

const createUserSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  identifier: identifier.required(),
  phone: phone.required(),
  email: email.required()
})

const updateUserSchema = Joi.object({
  email: email.optional(),
  password: password.optional(),

})

const getUserSchema = Joi.object({
  id: id.required()
})

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema
}