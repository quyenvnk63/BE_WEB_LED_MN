// routes/auth.js
const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
// Định tuyến GET /roles để lấy tất cả các vai trò
router.get('/', roleController.getAllRoles);

// Định tuyến GET /roles/:id để lấy thông tin của một vai trò cụ thể
router.get('/:id', roleController.getRoleById);

// Định tuyến POST /roles để tạo mới một vai trò
router.post('/', roleController.createRole);

// Định tuyến PUT /roles/:id để cập nhật thông tin của một vai trò cụ thể
router.put('/:id', roleController.updateRole);

// Định tuyến DELETE /roles/:id để xóa một vai trò cụ thể
router.delete('/:id', roleController.deleteRole);

module.exports = router;
