'use strict'
const bcrypt = require('bcrypt')

const { ROLE_TABLE } = require('./../models/role.model')
const { CATEGORY_TABLE } = require('./../models/category.model')
const { USER_TABLE } = require('./../models/user.model')
const { RESTAURANT_TABLE } = require('./../models/restaurant.model')
const { DISH_TABLE } = require('./../models/dish.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, sequelize) {
    const roles = [
      { name: 'Administrador', description: 'El rol de Administrador', created_at: new Date() },
      { name: 'Propietario', description: 'El rol Propietario', created_at: new Date() },
      { name: 'Empleado', description: 'El rol Empleado', created_at: new Date() },
      { name: 'Cliente', description: 'El rol cliente', created_at: new Date() }
    ]
    const categories = [
      { name: 'LOS PLATOS', description: 'Platos de fondo', created_at: new Date() },
      { name: 'PASTAS', description: 'Seleccion de pastas italianas', created_at: new Date() },
      { name: 'ENTRADAS Y PIQUEOS', description: 'Seleccionde pastas y piqueos', created_at: new Date() },
      { name: 'ENSALADAS', description: 'Seleccion de ensaladas', created_at: new Date() }
    ]

    const users = [
      {
        name: 'kenny Admin',
        last_name: 'luque',
        identifier: '7475445955',
        phone: '+234234564',
        email: 'kenny1@pragma.com',
        password: await bcrypt.hash('kennyluquegaaa', 10),
        role_id: 1,
        created_at: new Date()
      },
      {
        name: 'kenny Owner',
        last_name: 'luque',
        identifier: '124564529',
        phone: '+234234563',
        email: 'kenny2@pragma.com',
        password: await bcrypt.hash('kennyluquegaaa', 10),
        role_id: 2,
        created_at: new Date()
      },
      {
        name: 'kenny Employee',
        last_name: 'luque',
        identifier: '2345569456',
        phone: '+2342344556',
        email: 'ke3nny3@pragma.com',
        password: await bcrypt.hash('kennyluquegaaa', 10),
        role_id: 3,
        created_at: new Date()
      },
      {
        name: 'kenny client',
        last_name: 'luque',
        identifier: '23499869456',
        phone: '+23423444556',
        email: 'kewnny343@pragma.com',
        password: await bcrypt.hash('kennyluquegaaa', 10),
        role_id: 4,
        created_at: new Date()
      }
    ]

    const restaurants = [
      {
        name: 'tanta',
        address: 'jiron ica 123 lince',
        phone: '712344529',
        url_logo: 'https://random.io',
        nit: 12134324,
        owner_id: '2',
        created_at: new Date()
      },
      {
        name: 'Mayta',
        address: 'Av. La Mar 1285, Miraflores',
        phone: '936765456',
        url_logo: 'https://random.io',
        nit: 4534563,
        owner_id: '2',
        created_at: new Date()
      }
    ]

    const dishes = [
      {
        name: 'lomo saltado',
        description: 'El lomo saltdo es un plato tipico de Perú',
        price: 50,
        url_image: 'https://lomo.png',
        category_id: 1,
        restaurant_id: 1,
        created_at: new Date()
      },
      {
        name: 'Tallarines verdes',
        description: 'El tallarin verde es un plato tipico de Perú',
        price: 45,
        url_image: 'https://tallarinesverdes.png',
        category_id: 2,
        restaurant_id: 2,
        created_at: new Date()
      }
    ]
    await queryInterface.bulkInsert(ROLE_TABLE, roles, {})
    await queryInterface.bulkInsert(CATEGORY_TABLE, categories, {})
    await queryInterface.bulkInsert(USER_TABLE, users, {})
    await queryInterface.bulkInsert(RESTAURANT_TABLE, restaurants, {})
    await queryInterface.bulkInsert(DISH_TABLE, dishes, {})
  },

  async down (queryInterface, Sequelize) {

  }
}
