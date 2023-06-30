const jwt = require('jsonwebtoken');
const User = require('../models/User');
 
require('dotenv').config();

async function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const decoded = jwt.verify(token, '8hEnPGeoBqGUT6zksxt4G95gW+uMdzwe7EVaRnp0xRI=');
    const user = await User.findByPk(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}


module.exports = authenticateToken;

