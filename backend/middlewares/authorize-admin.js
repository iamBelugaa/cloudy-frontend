const JWT = require('jsonwebtoken');
const Admin = require('../models/admin');

const unautorizeMessage = {
  status: 'error',
  statusCode: 401,
  message: 'Login to access this route.',
};

async function authorizeAdmin(req, res, next) {
  if (!req.headers['x-authorization'])
    return res.status(401).json(unautorizeMessage);

  const token = req.header('x-authorization').split(' ')[1];
  if (!token) return res.status(401).json(unautorizeMessage);

  try {
    let decodedAdmin;

    JWT.verify(token, process.env.JWT_SECRET, (err, admin) => {
      if (err) {
        const error =
          err.name === 'TokenExpiredError'
            ? 'Session Expired. Please Login Again.'
            : 'Unauthorized.';

        return res
          .status(400)
          .json({ status: 'error', error, statusCode: 400 });
      } else decodedAdmin = admin.user;
    });

    if (!decodedAdmin) return res.status(400).json(unautorizeMessage);
    const admin = await Admin.findOne({ email: decodedAdmin.email });

    if (!admin)
      return res.status(400).json({
        status: 'error',
        error: "Admin doesn't exist.",
        statusCode: 400,
      });

    if (admin.role !== 'Admin')
      return res.status(400).json({
        status: 'error',
        error: "You don't have permission to access this route.",
        statusCode: 400,
      });

    next(admin);
  } catch (error) {
    return next(error);
  }
}

module.exports = authorizeAdmin;
