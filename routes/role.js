// routes/auth.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const authenticateToken = require('../middlewares/authenticateToken');
// Định tuyến GET /roles để lấy tất cả các vai trò
router.get('/',authenticateToken, roleController.getAllRoles);

// Định tuyến GET /roles/:id để lấy thông tin của một vai trò cụ thể
router.get('/:id',authenticateToken, roleController.getRoleById);

// Định tuyến POST /roles để tạo mới một vai trò
router.post('/',authenticateToken, roleController.createRole);

// Định tuyến PUT /roles/:id để cập nhật thông tin của một vai trò cụ thể
router.put('/:id',authenticateToken, roleController.updateRole);

// Định tuyến DELETE /roles/:id để xóa một vai trò cụ thể
router.delete('/:id',authenticateToken, roleController.deleteRole);

module.exports = router;
