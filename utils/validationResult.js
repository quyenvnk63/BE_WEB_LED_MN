const { validationResult } = require('express-validator');

async function checkValidationResult(data) {
    const errors = validationResult(data);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
}

module.exports ={
    checkValidationResult,
}