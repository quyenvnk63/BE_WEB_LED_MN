const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
const authenticateToken = require('../middlewares/authenticateToken');
// create a new department
router.post('/',departmentController.createDepartment);



// Lấy thông tin phòng ban bằng departmentId
router.get('/:departmentId', authenticateToken,departmentController.getDepartmentById);

// Lấy danh sách tất cả phòng ban
router.get('/',authenticateToken, departmentController.getAllDepartments);

// Cập nhật thông tin phòng ban
router.put('/:departmentId',authenticateToken, departmentController.updateDepartment);

// Xóa phòng ban
router.delete('/:departmentId',authenticateToken, departmentController.deleteDepartment);

router.post('/:id/users',authenticateToken,departmentController.assignDepartmentToUser);

module.exports = router;