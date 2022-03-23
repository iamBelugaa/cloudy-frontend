const httpErrors = require('http-errors');
const {
  PasswordVerificationSchema,
} = require('../../services/userInputValidation');
const hashPassword = require('../../helpers/hashPassword');
const generateAccessAndRefreshTokens = require('../../services/generateTokens');

async function resetPassword(user, req, res, next) {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword)
      return next(httpErrors.BadRequest("Password Fields Cann't Be Empty."));

    if (currentPassword === newPassword)
      return next(httpErrors.BadRequest('New password must be differnt.'));

    const validNewPassword = await PasswordVerificationSchema.validateAsync({
      newPassword,
    });

    if (validNewPassword) {
      const isValidPassword = await user.checkPassword(currentPassword);
      if (!isValidPassword) {
        return next(httpErrors.BadRequest("Password Doesn't Match."));
      }

      user.password = await hashPassword(validNewPassword.newPassword);
      await user.save();

      return res.status(200).json({
        ok: true,
        token: await generateAccessAndRefreshTokens({
          id: user._id,
          email: user.email,
        }),
      });
    }
  } catch (error) {
    if (error.isJoi) return next(httpErrors.BadRequest(error.message));

    return next(
      httpErrors.InternalServerError(
        'Something Went Wrong. Please Try Again Later...!!!'
      )
    );
  }
}

module.exports = resetPassword;
