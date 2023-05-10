const { models } = require('../libs/sequelize')
const boom = require('@hapi/boom')

class RoleService {
  // eslint-disable-next-line no-useless-constructor
  constructor () { }

  async create (data) {
    const newRole = await models.Role.create(data)
    return newRole
  }

  async finOne (roleId) {
    const role = await models.Role.findByPk(roleId)
    if (!role) {
      throw boom.conflict('role not found!')
    }
    return role
  }
}

module.exports = RoleService
