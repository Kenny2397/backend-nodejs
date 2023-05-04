const { Model, DataTypes, Sequelize } = require('sequelize')

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
    type: DataTypes.STRING,
    unique: false,
    validate: {
      is: /^(?=.*[a-zA-Z])[a-zA-Z0-9\s]+$/
    }
  },
  lastName: {
    field: 'last_name',
    allowNull: false,
    type: DataTypes.STRING,
    unique: false
  },
  identifier: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: {
        args: true,
        msg: 'Identifier must be numeric'
      }
    }
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
      isEmail: {
        msg: 'Invalid email format'
      }
    }
  },
  password: {
    type: DataTypes.STRING
  },
  roleId: {
    field: 'role_id',
    type: DataTypes.INTEGER,
    defaultValue: 1
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
