const JWT = require('jsonwebtoken');
const User = require('../models/user');
const httpErrors = require('http-errors');

const unautorizeMessage = {
  status: 'error',
  message: 'Login to access this route.',
  statusCode: 401,
};

async function authorizeAdmin(req, res, next) {
  const token = req.headers['x-authorizaton'].split(' ')[1];

  try {
    let decodedUser;

    if (token) {
      JWT.verify(token, process.env.JWT_SIGNATURE, (err, data) => {
        if (err) {
          const error =
            err.name === 'TokenExpiredError'
              ? 'Session Expired. Please Login Again.'
              : 'Unauthorized.';

          return next(httpErrors.BadRequest(error));
        }
        decodedUser = data.user;
      });

      const user = await User.findOne({ email: decodedUser.email });
      if (!user) return next(httpErrors.Unauthorized('Unauthorized.'));

      if (user.role !== 'User')
        return next(
          httpErrors.Forbidden(
            "You don't have permission to access this route."
          )
        );
      return next(user);
    } else return res.status(401).json(unautorizeMessage);
  } catch (error) {
    return next(error);
  }
}

module.exports = authorizeAdmin;
