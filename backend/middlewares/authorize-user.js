const JWT = require('jsonwebtoken');
const User = require('../models/user');

const unautorizeMessage = {
  status: 'error',
  message: 'Login to access this route.',
  statusCode: 401,
};

async function authorizeAdmin(req, res, next) {
  if (!req.headers['x-authorization'])
    return res.status(401).json(unautorizeMessage);

  const token = req.headers['x-authorization'].split(' ')[1];
  if (!token) return res.status(401).json(unautorizeMessage);

  try {
    let decodedUser;

    JWT.verify(token, process.env.JWT_SIGNATURE, (err, data) => {
      if (err) {
        const error =
          err.name === 'TokenExpiredError'
            ? 'Session Expired. Please Login Again.'
            : 'Unauthorized.';

        return res
          .status(400)
          .json({ status: 'error', error, statusCode: 400 });
      } else decodedUser = data.user;
    });

    if (!decodedUser) return res.status(400).json(unautorizeMessage);
    const user = await User.findOne({ email: decodedUser.email });

    if (!user)
      return res.status(400).json({
        status: 'error',
        error: "User doesn't exist.",
        statusCode: 400,
      });

    if (user.role !== 'User')
      return res.status(403).json({
        status: 'error',
        error: "You don't have permission to access this route.",
        statusCode: 403,
      });

    next(user);
  } catch (error) {
    return next(error);
  }
}

module.exports = authorizeAdmin;
