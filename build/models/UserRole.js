"use strict";
var DataTypes = require('sequelize').DataTypes;
var sequelize = require('../config/database');
var UserRole = sequelize.define('UserRole', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
}, {
    tableName: 'user_roles',
    timestamps: false,
});
module.exports = UserRole;
