const { Model, DataTypes, Sequelize } = require('sequelize')
const { CATEGORY_TABLE } = require('./category.model')
const { RESTAURANT_TABLE } = require('./restaurant.model')

const DISH_TABLE = 'dishes'

const DishSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
    validate: {
      isInt: true
    }
  },
  urlImage: {
    field: 'url_image',
    allowNull: false,
    type: DataTypes.STRING
  },
  active: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  categoryId: {
    field: 'category_id',
    allowNull: false,
    type: DataTypes.INTEGER,
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
    type: DataTypes.INTEGER,
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
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
}

class Dish extends Model {
  static associate (models) {
    this.belongsToMany(models.Order, {
      through: 'OrderDish'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: DISH_TABLE,
      modelName: 'Dish',
      timestamps: false
    }
  }
}

module.exports = { DISH_TABLE, DishSchema, Dish }