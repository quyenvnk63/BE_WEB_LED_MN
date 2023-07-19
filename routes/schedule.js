const express = require('express');
const router = express.Router();
const displayContentController = require('../controllers/scheduleController');
const authenticateToken = require('../middlewares/authenticateToken');


// Tạo lịch trình cho nội dung
router.post('/',authenticateToken, displayContentController.scheduleDisplayContent);

// Xóa lịch trình dựa trên ID
router.delete('/:id',authenticateToken, displayContentController.deleteScheduledContent);

// Lấy danh sách lịch trình dựa trên ledpanelId
router.get('/led-panel/:ledpanelId',authenticateToken, displayContentController.getScheduledContentsByLedPanel);



module.exports = router;