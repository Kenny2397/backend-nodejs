'use strict'

const { USER_TABLE } = require('../models/user.model')
const { ROLE_TABLE } = require('../models/role.model')
const { RESTAURANT_TABLE } = require('../models/restaurant.model')
const { RESTAURANT_EMPLOYEE_TABLE } = require('../models/restaurant-employee.model')
const { ORDER_TABLE } = require('../models/order.model')
const { ORDER_DISH_TABLE } = require('../models/order-dish.model')
const { DISH_TABLE } = require('../models/dish.model')
const { CATEGORY_TABLE } = require('../models/category.model')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
        validate: {
          is: /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/
        }
      },
      lastName: {
        field: 'last_name',
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false
      },
      identifier: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        validate: {
          isNumeric: true
        }
      },
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        validate: {
          is: /^(\+)?\d{1,13}$/
        }
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
        validate: {
          isEmail: {
            msg: 'Invalid email format'
          }
        }
      },
      password: {
        type: Sequelize.DataTypes.STRING
      },
      roleId: {
        field: 'role_id',
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 1
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(ROLE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true
      },
      description: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(RESTAURANT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false
      },
      address: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        validate: {
          is: /^(\+)?\d{1,13}$/
        }
      },
      urlLogo: {
        field: 'url_logo',
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      nit: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        validate: {
          isNumeric: true
        }
      },
      ownerId: {
        field: 'owner_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(RESTAURANT_EMPLOYEE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      restaurantId: {
        field: 'restaurant_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: RESTAURANT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      personId: {
        field: 'person_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: USER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      status: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'pendiente'
      },
      restaurantId: {
        field: 'restaurant_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      chefId: {
        field: 'chef_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      clientId: {
        field: 'client_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(ORDER_DISH_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER
      },
      orderId: {
        field: 'order_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: ORDER_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      dishId: {
        field: 'dish_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: DISH_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(DISH_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      price: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        validate: {
          isInt: true
        }
      },
      urlImage: {
        field: 'url_image',
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      active: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      },
      categoryId: {
        field: 'category_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      restaurantId: {
        field: 'restaurant_id',
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: RESTAURANT_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    })

    await queryInterface.createTable(CATEGORY_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      createdAt: {
        field: 'created_at',
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(USER_TABLE)
    await queryInterface.dropTable(ROLE_TABLE)
    await queryInterface.dropTable(RESTAURANT_TABLE)
    await queryInterface.dropTable(RESTAURANT_EMPLOYEE_TABLE)
    await queryInterface.dropTable(ORDER_TABLE)
    await queryInterface.dropTable(ORDER_DISH_TABLE)
    await queryInterface.dropTable(DISH_TABLE)
    await queryInterface.dropTable(CATEGORY_TABLE)
  }
}
