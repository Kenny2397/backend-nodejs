const { Model, DataTypes, Sequelize } = require('sequelize')
const { ROLE_TABLE } = require('./role.model')

const USER_TABLE = 'users'

const UserSchema = {
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
  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING
  },
  identifier: {
    type: DataTypes.BIGINT(15),
    allowNull: false
  },
  phone: {
    allowNull: false,
    type: DataTypes.STRING,
    validate: {
      is: /^(\+)?\d{1,13}$/
    }
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  roleId: {
    field: 'role_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: ROLE_TABLE,
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

class User extends Model {
  static associate (models) {
    // associate
    this.belongsTo(models.Role, {
      as: 'role'
    })

    // this.hasMany(models.RestaurantEmployee, {
    //   as: 'restaurants_employees'
    // })

    // this.hasOne(models.Order, {
    //   as: 'order'
    // })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: USER_TABLE,
      modelName: 'User',
      timestamps: false
    }
  }
}

module.exports = { USER_TABLE, UserSchema, User }
