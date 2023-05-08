const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class DishService {
  // eslint-disable-next-line no-useless-constructor
  constructor () { }

  async create (data) {
    const newDish = await models.Dish.create(data)

    return newDish
  }

  async findOne (id) {
    const dish = await models.Dish.findByPk(id)

    if (!dish) {
      throw boom.notFound('dish not found!')
    }

    return dish
  }

  async update (id, data) {
    const dish = await this.findOne(id)
    const updatedDish = await dish.update(data)
    return updatedDish
  }
}

module.exports = DishService
