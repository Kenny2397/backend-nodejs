const { Model, DataTypes, Sequelize } = require('sequelize')

const { RESTAURANT_TABLE } = require('./restaurant.model')
const { USER_TABLE } = require('./user.model')

const RESTAURANT_EMPLOYEE_TABLE = 'restaurants_employees'

const RestaurantEmployeeSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  restaurantId: {
    field: 'restaurant_id',
    type: DataTypes.INTEGER,
    references: {
      model: RESTAURANT_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  personId: {
    field: 'person_id',
    type: DataTypes.INTEGER,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class RestaurantEmployee extends Model {
  static associate (models) {
    this.belongsTo(models.User, {
      as: 'person',
      foreignKey: {
        name: 'personId',
        field: 'person_id'
      }
    })

    this.belongsTo(models.Order, {
      as: 'order'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: RESTAURANT_EMPLOYEE_TABLE,
      modelName: 'RestaurantEmployee',
      timestamps: false
    }
  }
}

module.exports = { RESTAURANT_EMPLOYEE_TABLE, RestaurantEmployeeSchema, RestaurantEmployee }
