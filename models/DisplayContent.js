
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DisplayContent = sequelize.define('DisplayContent', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    path: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }, {
    sequelize,
    tableName: 'display_contents',
    timestamps: false,
  });

module.exports = DisplayContent;
