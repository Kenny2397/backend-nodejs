const { Model, DataTypes } = require('sequelize')

const RESTAURANT_TABLE = 'restaurants'

const RestaurantSchema = {
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
  address: {
    allowNull: false,
    type: DataTypes.STRING
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      is: /^(\+)?\d{1,13}$/
    }
  },
  urlLogo: {
    field: 'url_logo',
    allowNull: false,
    type: DataTypes.STRING
  },
  nit: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      isNumeric: true
    }
  },
  ownerId: {
    field: 'owner_id',
    allowNull: false,
    type: DataTypes.INTEGER
  }
}

class Restaurant extends Model {
  static associate (models) {
    // associate
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: RESTAURANT_TABLE,
      modelName: 'Restaurant',
      timestamps: false
    }
  }
}

module.exports = { RESTAURANT_TABLE, RestaurantSchema, Restaurant }
