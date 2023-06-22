"use strict";
var DataTypes = require('sequelize').DataTypes;
var sequelize = require('../config/database');
var DisplayContent = sequelize.define('DisplayContent', {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
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
    sequelize: sequelize,
    tableName: 'display_contents',
    timestamps: false,
});
module.exports = DisplayContent;
