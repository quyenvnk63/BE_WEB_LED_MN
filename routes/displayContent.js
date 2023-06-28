const express = require('express');
const router = express.Router();
const displayContentController = require('../controllers/displayContentController');

router.get('/presigned-url', displayContentController.getPresignedUrl);


//display
router.get('/', displayContentController.getAllDisplayContents);
router.get('/:id', displayContentController.getDisplayContentById);
router.post('/:ledpanelId', displayContentController.createDisplayContent);
router.put('/:id', displayContentController.updateDisplayContent);
router.delete('/:id', displayContentController.deleteDisplayContent);
router.post('/:displayContentId/led-panel',displayContentController.setDisplayedContentForLedPanel);
router.get('/led-panels/:ledPanelId',displayContentController.getContentbyLedPanel);
module.exports = router;
