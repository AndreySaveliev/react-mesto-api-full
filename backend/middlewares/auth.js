const jwt = require('jsonwebtoken');
const Error401 = require('../Errors/Error401');

const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  console.log('auth');
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer')) {
    throw new Error401('Необходимо авторизироваться');
  }
  const token = authorization.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new Error401('Необходимо авторизироваться'));
  }
  req.user = payload;
  next();
};
