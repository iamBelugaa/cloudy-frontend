const JWT = require('jsonwebtoken');
const User = require('../models/user');
const Session = require('../models/session');
const { allowLogUserIn } = require('../helpers/logUserIn');
const { clearUserAccessAndRefreshTokens } = require('../helpers/clearCookies');

const unautorizeMessage = { ok: false, message: 'Login to access this route.' };
const forbiddenMessage = {
  ok: false,
  message: "You don't have permission to access this route.",
};

async function authorizeUser(req, res, next) {
  try {
    if (req?.cookies?.uidAccessToken) {
      const { uidAccessToken } = req.cookies;
      const { sessionToken, userId } = JWT.verify(
        uidAccessToken,
        process.env.JWT_SIGNATURE
      );

      if (sessionToken && userId) {
        const userSession = await Session.findOne({ sessionToken });
        if (userSession) {
          const user = await User.findOne({ _id: userId });
          if (!user) {
            await clearUserAccessAndRefreshTokens(res);
            await userSession.remove();
            return res.status(401).json(unautorizeMessage);
          }

          if (user.role === 'User') return next(user, req, res, next);
          else {
            clearUserAccessAndRefreshTokens(res);
            return res.status(403).json(forbiddenMessage);
          }
        }
        await clearUserAccessAndRefreshTokens(res);
        return res.status(401).json(unautorizeMessage);
      }
    }

    if (req?.cookies?.uidRefreshToken) {
      const { uidRefreshToken } = req.cookies;
      const { sessionToken } = JWT.verify(
        uidRefreshToken,
        process.env.JWT_SIGNATURE
      );

      if (sessionToken) {
        const userSession = await Session.findOneAndDelete({ sessionToken });
        if (userSession) {
          const user = await User.findOne({ _id: userSession.userId });
          if (!user) {
            await clearUserAccessAndRefreshTokens(res);
            await userSession.remove();
            return res.status(401).json(unautorizeMessage);
          }

          if (user.role === 'User') {
            await allowLogUserIn(user._id, req, res);
            return next(user, req, res, next);
          } else {
            clearUserAccessAndRefreshTokens(res);
            return res.status(403).json(forbiddenMessage);
          }
        }
        await clearUserAccessAndRefreshTokens(res);
        return res.status(401).json(unautorizeMessage);
      }
    }
    return res.status(401).json(unautorizeMessage);
  } catch (error) {
    await clearUserAccessAndRefreshTokens(res);
    return res.status(401).json(unautorizeMessage);
  }
}

module.exports = authorizeUser;
