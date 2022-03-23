const { logUserOut } = require('../../helpers/logoutUser');
const {
  clearUserAccessAndRefreshTokens,
} = require('../../helpers/clearCookies');
const Session = require('../../models/session');

async function logOutUser(user, req, res, next) {
  try {
    await logUserOut(req, res);
    return res.status(200).json({
      ok: true,
      message: 'Logged Out. Redirecting To Login Page.',
    });
  } catch (error) {
    await clearUserAccessAndRefreshTokens(res);
    return res.status(200).json({
      ok: false,
      message: 'Something went wrong. Logging Out.',
    });
  }
}

async function logoutFromAll(user, req, res, next) {
  try {
    await Session.deleteMany({ userId: user._id });
    clearUserAccessAndRefreshTokens(res);
    return res.status(200).json({
      ok: true,
      message: 'Logged Out. Redirecting To Login Page.',
    });
  } catch (error) {
    await clearUserAccessAndRefreshTokens(res);
    return res.status(200).json({
      ok: false,
      message: 'Something went wrong. Logout failed.',
    });
  }
}

module.exports = { logOutUser, logoutFromAll };
