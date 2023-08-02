const express = require('express');
const router = express.Router();
const { checkPermission } = require('../middlewares/checkPermission');
const displayContentController = require('../controllers/scheduleController');
const authenticateToken = require('../middlewares/authenticateToken');


// Tạo lịch trình cho nội dung
router.post('/',authenticateToken, checkPermission('create_schedule'),displayContentController.scheduleDisplayContent);

// Xóa lịch trình dựa trên ID
router.delete('/:id',authenticateToken, checkPermission('delete_schedule'),displayContentController.deleteScheduledContent);

// Lấy danh sách lịch trình dựa trên ledpanelId
router.get('/led-panel/:ledpanelId',authenticateToken, checkPermission('get_schedule'),displayContentController.getScheduledContentsByLedPanel);



module.exports = router;