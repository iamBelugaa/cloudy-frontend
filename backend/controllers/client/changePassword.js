const httpErrors = require('http-errors');
const {
  PasswordVerificationSchema,
} = require('../../services/userInputValidation');
const generateTokens = require('../../services/generateTokens');
const hashPassword = require('../../helpers/hashPassword');

async function changePassword(user, req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return next(httpErrors.BadRequest("Password Fields Cann't Be Empty."));
    }

    if (currentPassword === newPassword) {
      return next(httpErrors.BadRequest('New password must be differnt.'));
    }

    const validNewPassword = await PasswordVerificationSchema.validateAsync({
      newPassword,
    });

    if (validNewPassword) {
      const isValidPassword = await user.checkPassword(currentPassword);

      if (!isValidPassword)
        return next(httpErrors.BadRequest('Invalid password.'));

      user.password = await hashPassword(validNewPassword.newPassword);
      await user.save();
      return res.status(200).json({
        ok: true,
        token: await generateTokens({ id: user._id, email: user.email }),
      });
    }
  } catch (error) {
    if (error.isJoi) {
      error.status = 422;
      return next(error);
    }

    return next(
      httpErrors.InternalServerError(
        error.message || 'Something Went Wrong. Please Try Again Later.'
      )
    );
  }
}

module.exports = changePassword;
