const { validationResult } = require('express-validator');
// const { isString } = require('validator');

async function checkValidationResult(data) {
    const errors = validationResult(data);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
}

function validateLedPanelData(data) {
  const errors = [];

  if (typeof data.name !== 'string') {
    errors.push('Name must be a string');
  }

  if (typeof data.address !== 'string') {
    errors.push('Address must be a string');
  }

  if (typeof data.department_id !== 'number') {
    errors.push('Department ID must be a number');
  }

  if (typeof data.device_code !== 'string') {
    errors.push('Device code must be a string');
  }

  // Các quy tắc kiểm tra hợp lệ bổ sung cho các thuộc tính khác

  if (errors.length > 0) {
    throw new Error(`Invalid LED panel data: ${errors.join(', ')}`);
  }
}


function validateUserData(data) {
  const errors = [];

  if (!isEmail(data.email)) {
    errors.push('Email must be a valid email address');
  }

  if (!isString(data.name)) {
    errors.push('Name must be a string');
  }

  if (!isStrongPassword(data.password)) {
    errors.push('Password must be a strong password');
  }

  // Additional validation rules for other properties

  if (errors.length > 0) {
    throw new Error(`Invalid user data: ${errors.join(', ')}`);
  }
}


module.exports ={
    checkValidationResult,
    validateLedPanelData,
    validateUserData
}