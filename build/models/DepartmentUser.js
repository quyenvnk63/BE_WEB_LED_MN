"use strict";
var DataTypes = require('sequelize').DataTypes;
var sequelize = require('../config/database');
var User = require('./User');
var Department = require('./Department');
var DepartmentUser = sequelize.define('DepartmentUser', {
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
    sequelize: sequelize,
    tableName: 'department_users',
    timestamps: false,
});
module.exports = DepartmentUser;
