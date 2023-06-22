"use strict";
var DataTypes = require('sequelize').DataTypes;
var sequelize = require('../config/database');
var LedPanelContent = sequelize.define('LedPanelContent', {
    led_panel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    display_content_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    is_displayed: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
}, {
    sequelize: sequelize,
    tableName: 'led_panel_content',
    timestamps: false,
});
module.exports = LedPanelContent;
