"use strict";
var Sequelize = require('sequelize').Sequelize;
// import { Sequelize } from 'sequelize';
require('dotenv').config();
// Cấu hình kết nối cơ sở dữ liệu
var sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306
});
// Kiểm tra kết nối cơ sở dữ liệu
sequelize
    .authenticate()
    .then(function () {
    console.log('Kết nối cơ sở dữ liệu thành công');
})
    .catch(function (error) {
    console.error('Không thể kết nối cơ sở dữ liệu:', error);
});
module.exports = sequelize;
// global.sequelize = sequelize;
