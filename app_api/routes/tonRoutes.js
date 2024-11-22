const express = require("express");
const { connectWallet, 
    createWallet, 
    sendTon, 
    getBalance, 
    withdrawTokens, 
    depositTokens, 
    updateGameProgress } = require("../controllers/tonController");
const router = express.Router();



router.post("/create-wallet", createWallet);



router.post("/connect-wallet", connectWallet);


router.get("/create-wallet/balance/:walletAddress", getBalance);

// Token transaction routes
router.post("/token/send-ton", sendTon);

router.post("/token/withdraw", withdrawTokens);

router.post("/token/deposit", depositTokens);

// Game progress routes
router.post("/game/progress", updateGameProgress);


module.exports = router;