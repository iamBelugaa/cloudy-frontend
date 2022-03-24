const JWT = require('jsonwebtoken');
const Admin = require('../models/admin');
const httpErrors = require('http-errors');

const unautorizeMessage = {
  status: 'error',
  statusCode: 401,
  message: 'Login to access this route.',
};

async function authorizeAdmin(req, res, next) {
  const token = req.header('x-authorization').split(' ')[1];

  try {
    if (token) {
      let decodedUser;

      JWT.verify(token, process.env.JWT_SECRET, (err, admin) => {
        if (err) {
          const error =
            err.name === 'TokenExpiredError'
              ? 'Session Expired. Please Login Again.'
              : 'Unauthorized.';
          return next(httpErrors.BadRequest(error));
        }
        decodedUser = admin.user;
      });

      const admin = await Admin.findOne({ email: decodedUser.email });
      if (!admin) return next(httpErrors.Unauthorized('Unauthorized.'));

      if (admin.role !== 'Admin')
        return next(
          httpErrors.Forbidden(
            "You don't have permission to access this route."
          )
        );

      return next(admin);
    } else return res.status(401).json(unautorizeMessage);
  } catch (error) {
    return next(error);
  }
}

module.exports = authorizeAdmin;
