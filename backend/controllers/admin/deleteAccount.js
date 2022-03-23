const httpErrors = require('http-errors');
const Admin = require('../../models/admin');

async function deleteUserAccount(user, req, res, next) {
  try {
    const adminCount = await Admin.find({}).count().exec();
    if (adminCount < 2) {
      return res.status(400).json({
        ok: false,
        message:
          "You cann't delete your account since you are the only Admin left.",
      });
    }
    await user.remove();

    return res.status(200).json({
      ok: true,
      message: 'Account Deleted. Thank you for using our service.',
    });
  } catch (error) {
    return next(
      httpErrors.InternalServerError(
        error.message || 'Something Went Wrong. Please Try Again Later.'
      )
    );
  }
}

module.exports = deleteUserAccount;
