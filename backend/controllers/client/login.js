const httpErrors = require('http-errors');
const generateTokens = require('../../services/generateTokens');
const { checkEmail } = require('../../helpers/findUserDetails');
const { loginValidation } = require('../../helpers/checkUserInput');

async function loginUser(req, res, next) {
  try {
    const isValidLoginDeatils = await loginValidation(
      { email: req.body.email },
      next
    );

    if (isValidLoginDeatils) {
      const user = await checkEmail(isValidLoginDeatils.email, next);
      if (!user) {
        return next(httpErrors.Unauthorized('Invalid Login Details.'));
      }

      const isValidPassword = await user.checkPassword(req.body.password);
      if (!isValidPassword) {
        return next(httpErrors.Unauthorized('Invalid Login Details.'));
      }

      if (user.role === 'User') {
        await user.updateLoginsCount();

        return res.status(200).json({
          ok: true,
          token: await generateTokens({
            id: user._id,
            email: user.email,
          }),
        });
      } else
        return res.status(403).json({
          ok: false,
          message: "You don't have the permission to access this route.",
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

module.exports = loginUser;
