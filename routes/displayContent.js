const express = require('express');
const router = express.Router();
const displayContentController = require('../controllers/displayContentController');
const authenticateToken = require('../middlewares/authenticateToken');

router.get('/presigned-url',authenticateToken, displayContentController.getPresignedUrl);
router.get('/geturlContent/:key',authenticateToken,displayContentController.getUrlContent);


//display
router.get('/',authenticateToken, displayContentController.getAllDisplayContents);
router.get('/:id',authenticateToken, displayContentController.getDisplayContentById);
router.post('/:ledpanelId',authenticateToken, displayContentController.createDisplayContent);
router.put('/:id',authenticateToken, displayContentController.updateDisplayContent);
router.delete('/:id', displayContentController.deleteDisplayContent);
router.post('/:displayContentId/led-panel',authenticateToken,displayContentController.setDisplayedContentForLedPanel);
router.get('/led-panels/:ledPanelId',authenticateToken,displayContentController.getContentbyLedPanel);

module.exports = router;
