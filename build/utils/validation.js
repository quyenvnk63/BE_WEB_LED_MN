"use strict";
var body = require('express-validator').body;
exports.loginValidator = [
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
];
