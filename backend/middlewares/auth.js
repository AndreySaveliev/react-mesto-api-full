const jwt = require('jsonwebtoken');
const Error401 = require('../Errors/Error401');

const { JWT_SECRET = 'Andrey' } = process.env;

module.exports = (req, res, next) => {
  const cookie = req.cookies.bearer;
  if (!cookie) {
    throw new Error401('Необходимо авторизироваться');
  }
  let payload;
  try {
    payload = jwt.verify(cookie, JWT_SECRET);
  } catch (err) {
    next(new Error401('Необходимо авторизироваться'));
  }
  req.user = payload;
  next();
};
