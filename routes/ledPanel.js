const express = require('express');
const router = express.Router();
const ledPanelController = require('../controllers/ledPanelController');
const authenticateToken = require('../middlewares/authenticateToken');

// GET /led-panels
router.get('/',authenticateToken, ledPanelController.getAllLedPanels);

// POST /led-panels
router.post('/',authenticateToken, ledPanelController.createLedPanel);

// PUT /led-panels/:id
router.put('/:id',authenticateToken,  ledPanelController.updateLedPanel);

// DELETE /led-panels/:id
router.delete('/:id',authenticateToken, ledPanelController.deleteLedPanel);

// Other routes
router.get('/:departmentId',authenticateToken,ledPanelController.getLedPanelsByDepartmentId);

module.exports = router;


module.exports = router;