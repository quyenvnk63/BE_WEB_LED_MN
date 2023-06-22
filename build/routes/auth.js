"use strict";
// routes/auth.js
var express = require('express');
var router = express.Router();
var authController = require('../controllers/authController');
// Đăng nhập
router.post('/login', authController.login);
module.exports = router;
