const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkPermission } = require('../middlewares/checkPermission');
const authenticateToken = require('../middlewares/authenticateToken');
const { resetForgotPasswordController, resetPasswordController } = require('../controllers/resetPasswordController');

router.post('/',checkPermission('create_user'),userController.createUser);
router.get('/:id',authenticateToken,userController.getUserById);
router.get('/',userController.getAllUsers);
router.put('/:id',authenticateToken,checkPermission('update_user'), userController.updateUser);
router.delete('/:id',checkPermission('delete_user'), userController.deleteUser);

router.post('/:id/assign-role', checkPermission('assign_role'),userController.assignRoleToUser);
router.delete('/:id/remove-role', checkPermission('remove-role'),userController.removeRoleFromUser);

// Lấy danh sách phòng ban của một người dùng theo userId
router.get('/:userId/departments', userController.getDepartmentsByUserId);





// Định tuyến cho Reset Forgot Password
router.post('/forgot-password', resetForgotPasswordController);

// Định tuyến cho Reset Password
router.post('/reset-password', resetPasswordController);


module.exports = router;


// , checkPermission('read_all_user')