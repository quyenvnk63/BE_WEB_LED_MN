"use strict";
var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');
router.post('/', userController.createUser);
router.get('/:id', userController.getUserById);
router.get('/', userController.getAllUsers);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.post('/:id/assign-role', userController.assignRoleToUser);
router.delete('/:id/remove-role', userController.removeRoleFromUser);
// Lấy danh sách phòng ban của một người dùng theo userId
router.get('/:userId/departments', userController.getDepartmentsByUserId);
module.exports = router;
