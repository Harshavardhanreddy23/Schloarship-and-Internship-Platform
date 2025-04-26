const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }
  try {
    const verified = jwt.verify(token, 'your_jwt_secret');
    req.admin = verified;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token.' });
  }
};
module.exports = auth;