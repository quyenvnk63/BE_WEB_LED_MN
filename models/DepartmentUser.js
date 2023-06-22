
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Department = require('./Department');

const DepartmentUser = sequelize.define('DepartmentUser', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  department_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Department,
      key: 'id',
    },
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  }, {
    sequelize,
    tableName: 'department_users',
    timestamps: false,
  });

module.exports = DepartmentUser;
