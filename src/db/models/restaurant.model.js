const { Model, DataTypes, Sequelize } = require('sequelize')

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
    unique: true,
    type: DataTypes.INTEGER
  },
  ownerId: {
    field: 'owner_id',
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Restaurant extends Model {
  static associate (models) {
    // this.belongsToMany(models.Category, {
    //   through: 'Dish'
    // })

    this.hasMany(models.Dish, {
      as: 'dishes',
      foreignKey: {
        name: 'restaurantId',
        field: 'restaurant_id'
      }
    })

    // this.belongsTo(models.Order)
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
