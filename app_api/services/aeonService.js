const axios = require("axios");


const { appId, secretKey, merchantAccount, merchantPassword, baseUrl } = require("../config/aeonConfig");

exports.createPayment = async (userId, amount) => {
    try {
      const response = await axios.post(`${baseUrl}/payments`, {
        appId,
        secretKey,
        merchantAccount,
        merchantPassword,
        userId,
        amount,
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error creating payment");
    }
  };

  exports.verifyPayment = async (transactionId) => {
    try {
      const response = await axios.get(`${baseUrl}/payments/${transactionId}/verify`, {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || "Error verifying payment");
    }
  };