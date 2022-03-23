const httpErrors = require('http-errors');

async function userSettings(user, req, res, next) {
  try {
    return res.status(200).json({
      ok: true,
      displayName: user.displayName,
      email: user.email,
    });
  } catch (error) {
    return next(httpErrors.InternalServerError('Something went wrong.'));
  }
}

module.exports = userSettings;
