const { formatBytes } = require('../../helpers/formatFile');
const httpErrors = require('http-errors');

async function userDashboardController(user, req, res, next) {
  try {
    const date = new Date(user.createdAt);

    return res.status(200).json({
      displayName: user.displayName,
      email: user.email,
      ip: req.ip,
      totalLogins: user.totalLogins,
      activeFiles: user.activeFiles,
      activeStorage: formatBytes(user.activeStorage),
      totalEmailsSent: user.totalEmailsSent,
      createdAt: date.toDateString(),
    });
  } catch (error) {
    return next(
      httpErrors.InternalServerError(
        'Something went wrong on our end. We apologize for the inconvenience 😢.'
      )
    );
  }
}

module.exports = userDashboardController;
