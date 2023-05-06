const { Model, DataTypes, Sequelize } = require('sequelize')

const ROLE_TABLE = 'roles'

const RoleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  description: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  }
}

class Role extends Model {
  static associate (models) {
    // associate
    this.hasMany(models.User, {
      as: 'users',
      foreignKey: 'roleId'
    })
  }

  static config (sequelize) {
    return {
      sequelize,
      tableName: ROLE_TABLE,
      modelName: 'Role',
      timestamps: false
    }
  }
}

module.exports = { ROLE_TABLE, RoleSchema, Role }
