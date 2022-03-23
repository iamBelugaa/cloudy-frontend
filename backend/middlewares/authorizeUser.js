const JWT = require('jsonwebtoken');
const User = require('../models/user');

const unautorizeMessage = { ok: false, message: 'Login to access this route.' };
const forbiddenMessage = {
  ok: false,
  message: "You don't have permission to access this route.",
};

async function authorizeAdmin(req, res, next) {
  const token = req.header('x-authorization').split(' ')[0];
  console.log(token);
  try {
    if (token) {
      const userData = JWT.verify(token, process.env.JWT_SECRET);
      console.log(userData);
    } else return res.status(401).json(unautorizeMessage);
  } catch (error) {
    return res
      .status(401)
      .json({ ok: false, message: 'Something went wrong.' });
  }
}

module.exports = authorizeAdmin;
