const { logAdminOut } = require('../../helpers/logoutUser');
const {
  clearAdminAccessAndRefreshTokens,
} = require('../../helpers/clearCookies');
const Session = require('../../models/session');

async function logOutAdmin(user, req, res, next) {
  try {
    await logAdminOut(req, res, next);
    return res.status(200).json({
      ok: true,
      message: 'Logged Out. Redirecting To Login Page.',
    });
  } catch (error) {
    await clearAdminAccessAndRefreshTokens(res);
    return res.status(200).json({
      ok: false,
      message: 'Something went wrong. Logging Out.',
    });
  }
}

async function logoutFromAll(user, req, res, next) {
  try {
    await Session.deleteMany({ userId: user._id });
    clearAdminAccessAndRefreshTokens(res);

    return res.status(200).json({
      ok: true,
      message: 'Logged Out. Redirecting To Login Page.',
    });
  } catch (error) {
    await clearAdminAccessAndRefreshTokens(res);
    return res.status(200).json({
      ok: false,
      message: 'Something went wrong. Logging Out.',
    });
  }
}

module.exports = { logOutAdmin, logoutFromAll };
