const { Model, DataTypes, Sequelize } = require('sequelize')

const ORDER_TABLE = 'orders'

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  status: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'pendiente'
  },
  restaurantId: {
    field: 'restaurant_id',
    allowNull: false,
    type: DataTypes.INTEGER
  },
  chefId: {
    field: 'chef_id',
    allowNull: false,
    type: DataTypes.INTEGER
  },
  clientId: {
    field: 'client_id',
    type: DataTypes.INTEGER
  },
  createdAt: {
    field: 'created_at',
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Order extends Model {
  static associate (models) {
    this.belongsToMany(models.Dish, {
      through: 'OrderDish'
    })

    this.hasOne(models.Restaurant, {
      foreignKey: {
        name: 'restaurantId',
        field: 'restaurant_id'
      }
    })

    this.belongsTo(models.User, {
      as: 'client',
      foreignKey: {
        name: 'clientId',
        field: 'client_id'
      }
    })

    this.hasOne(models.RestaurantEmployee, {
      as: 'restaurants_employees',
      foreignKey: {
        name: 'chefId',
        field: 'chef_id'
      }
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}

module.exports = { ORDER_TABLE, OrderSchema, Order }
