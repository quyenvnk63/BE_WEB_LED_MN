"use strict";
var DataTypes = require('sequelize').DataTypes;
var sequelize = require('../config/database');
var RoleDetail = sequelize.define('RoleDetail', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    action_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    action_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    check: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: sequelize,
    tableName: 'role_detail',
    timestamps: false,
});
module.exports = RoleDetail;
