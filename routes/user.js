const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkPermission } = require('../middlewares/checkPermission');

router.post('/',checkPermission('create_user'),userController.createUser);
router.get('/:id', checkPermission,userController.getUserById);
router.get('/', checkPermission('read_all_user'),userController.getAllUsers);
router.put('/:id',checkPermission('update_user'), userController.updateUser);
router.delete('/:id',checkPermission('delete_user'), userController.deleteUser);

router.post('/:id/assign-role', checkPermission('assign_role'),userController.assignRoleToUser);
router.delete('/:id/remove-role', checkPermission('remove-role'),userController.removeRoleFromUser);

// Lấy danh sách phòng ban của một người dùng theo userId
router.get('/:userId/departments', userController.getDepartmentsByUserId);



module.exports = router;