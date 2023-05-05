const { Model, DataTypes, Sequelize } = require('sequelize')

const { ORDER_TABLE } = require('./order.model')
const { DISH_TABLE } = require('./dish.model')

const ORDER_DISH_TABLE = 'orders_dishes'

const OrderDishSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
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
    type: DataTypes.INTEGER,
    references: {
      model: DISH_TABLE,
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

class OrderDish extends Model {
  static associate (models) {
    //
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: ORDER_DISH_TABLE,
      modelName: 'OrderDish',
      timestamps: false
    }
  }
}

module.exports = { ORDER_DISH_TABLE, OrderDishSchema, OrderDish }
