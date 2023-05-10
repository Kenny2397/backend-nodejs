const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')

class RestaurantService {
  // eslint-disable-next-line no-useless-constructor
  constructor () { }

  async create (data) {
    const restaurantAlreadyExist = await models.Restaurant.findOne({
      where: { nit: data.nit }
    })

    if (restaurantAlreadyExist !== null) {
      throw boom.conflict('Restaurant with nit is already exist!')
    }

    const owner = await models.User.findByPk(data.ownerId)
    const rolePk = owner.roleId
    if (rolePk !== 2) {
      throw boom.conflict('user is not Owner')
    }
    const newRestaurant = await models.Restaurant.create(data)

    return newRestaurant
  }
}

module.exports = RestaurantService
