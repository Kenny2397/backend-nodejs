const { Model, DataTypes } = require('sequelize')

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
      isInt: {
        args: [1],
        msg: 'price must be a number'
      }
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
    allowNull: false,
    type: DataTypes.INTEGER
  },
  // this field is not in body, is in
  restaurantId: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}

class Dish extends Model {
  static associate (models) {
    // associate
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
