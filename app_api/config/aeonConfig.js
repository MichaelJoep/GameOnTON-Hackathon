const dotenv = require("dotenv");
dotenv.config();

module.exports = {
    appId: process.env.APP_ID,
    secretKey: process.env.SECRET_KEY,
    merchantAccount: process.env.MERCHANT_ACCOUNT,
    merchantPassword: process.env.MERCHANT_PASSWORD,
    baseUrl: process.env.AEON_API_BASE_URL, // AEON Sandbox API endpoint
  };