require('dotenv').config();

module.exports = {
    tonApiKey: process.env.TON_API_KEY,
    tonNetwork: process.env.TON_NETWORK_TESTNET || 'https://testnet.toncenter.com/api/v2/jsonRPC',
  };