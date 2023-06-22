"use strict";
var DataTypes = require('sequelize').DataTypes;
var sequelize = require('../config/database');
var LedPanel = sequelize.define('LedPanel', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    active: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    department_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    device_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    size: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    sequelize: sequelize,
    tableName: 'led_panels',
    timestamps: false,
});
module.exports = LedPanel;
