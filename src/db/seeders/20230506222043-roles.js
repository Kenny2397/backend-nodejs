'use strict'

const { ROLE_TABLE } = require('./../models/role.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, sequelize) {
    const roles = [
      { name: 'Administrador', description: 'El rol de Administrador', created_at: new Date() },
      { name: 'Propietario', description: 'El rol Propietario', created_at: new Date() },
      { name: 'Empleado', description: 'El rol Empleado', created_at: new Date() }
    ]
    await queryInterface.bulkInsert(ROLE_TABLE, roles, {})
  },

  async down (queryInterface, Sequelize) {
  }
}
