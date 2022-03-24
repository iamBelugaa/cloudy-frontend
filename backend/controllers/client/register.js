const httpErrors = require('http-errors');
const { registrationValidation } = require('../../helpers/checkUserInput');
const { checkEmail } = require('../../helpers/findUserDetails');
const hashPassword = require('../../helpers/hashPassword');
const User = require('../../models/user');

async function registerUser(req, res, next) {
  try {
    const userDetails = {
      email: req.body.email,
      displayName: req.body.displayName,
      password: req.body.password,
    };

    if (userDetails.email !== userDetails.email.toLowerCase())
      return next(httpErrors.BadRequest(`Email must be in Lowercase.`));

    const isValidRegistrationDetails = await registrationValidation(
      userDetails,
      next
    );

    if (isValidRegistrationDetails) {
      const existEmail = await checkEmail(isValidRegistrationDetails.email);

      if (existEmail)
        return next(
          httpErrors.Conflict(
            `"${isValidRegistrationDetails.email}" is already registered.`
          )
        );

      const hashedPassword = await hashPassword(
        isValidRegistrationDetails.password
      );

      const user = new User({
        email: isValidRegistrationDetails.email,
        displayName: isValidRegistrationDetails.displayName,
        password: hashedPassword,
      });

      await user.save();
      return res.status(200).json({
        status: 'ok',
        message: 'Account Registered.',
      });
    }
  } catch (error) {
    return next(error);
  }
}

module.exports = registerUser;
