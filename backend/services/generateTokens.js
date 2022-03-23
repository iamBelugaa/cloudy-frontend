const JWT = require('jsonwebtoken');

async function generateAccessAndRefreshTokens(user) {
  try {
    const JWT_SIGNATURE = process.env.JWT_SIGNATURE;
    const accessToken = JWT.sign({ user }, JWT_SIGNATURE);
    return accessToken;
  } catch (error) {
    throw new Error('Somehting Went Wrong. Please Try Again Later.');
  }
}

module.exports = generateAccessAndRefreshTokens;
