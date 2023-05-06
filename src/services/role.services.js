const { models } = require('../libs/sequelize')

class RoleService {
  // eslint-disable-next-line no-useless-constructor
  constructor () { }

  async create (data) {
    const newRole = await models.Role.create(data)
    return newRole
  }
}

module.exports = RoleService
