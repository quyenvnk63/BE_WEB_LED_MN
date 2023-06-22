"use strict";
// Import Express module
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
var sequelize = require('./config/database');
// const { createExampleDepartments } = require('./config/seeders/createData');
//routers 
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var departmentRouter = require('./routes/department');
var roleRouter = require('./routes/role');
var ledPanelRouter = require('./routes/ledPanel');
require('dotenv').config();
// Create Express app
var app = express();
//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
//seeder 
// createExampleDepartments();
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/departments', departmentRouter);
app.use('/api/roles', roleRouter);
app.use('/api/led-panels', ledPanelRouter);
// Set up a basic route
// Start the server
app.listen(3000, function () {
    console.log('Server started on port 3000');
});
