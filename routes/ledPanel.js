const express = require('express');
const router = express.Router();
const ledPanelController = require('../controllers/ledPanelController');

// GET /led-panels
router.get('/', ledPanelController.getAllLedPanels);

// POST /led-panels
router.post('/', ledPanelController.createLedPanel);

// PUT /led-panels/:id
router.put('/:id',  ledPanelController.updateLedPanel);

// DELETE /led-panels/:id
router.delete('/:id', ledPanelController.deleteLedPanel);

// Other routes

module.exports = router;


module.exports = router;