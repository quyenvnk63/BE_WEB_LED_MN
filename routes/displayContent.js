const express = require('express');
const router = express.Router();
const displayContentController = require('../controllers/displayContentController');

router.get('/presigned-url', displayContentController.getPresignedUrl);

module.exports = router;
