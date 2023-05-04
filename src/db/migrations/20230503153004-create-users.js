'use strict'
const { DataTypes } = require('sequelize')
const { USER_TABLE } = require('./../models/users.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      lastName: {
        field: 'last_name',
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      identifier: {
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING(15),
        unique: false
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: false
      },
      password: {
        type: DataTypes.STRING
      },
      roleId: {
        field: 'role_id',
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE)
  }
}
