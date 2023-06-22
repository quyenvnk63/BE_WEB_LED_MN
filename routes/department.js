const express = require('express');
const router = express.Router();
const departmentController = require('../controllers/departmentController');
// create a new department
router.post('/',departmentController.createDepartment);



// Lấy thông tin phòng ban bằng departmentId
router.get('/:departmentId', departmentController.getDepartmentById);

// Lấy danh sách tất cả phòng ban
router.get('/', departmentController.getAllDepartments);

// Cập nhật thông tin phòng ban
router.put('/:departmentId', departmentController.updateDepartment);

// Xóa phòng ban
router.delete('/:departmentId', departmentController.deleteDepartment);

router.post('/:id/users',departmentController.assignDepartmentToUser);

module.exports = router;