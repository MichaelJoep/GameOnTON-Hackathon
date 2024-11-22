const tonService = require("../services/tonService");
const TonWeb = require("tonweb");
const User = require("../models/User");


exports.createWallet = async (req, res) => {
    try {
      const tonweb = new TonWeb();
      const keyPair = TonWeb.utils.newKeyPair();
      const walletAddress = await tonweb.wallet.create({ publicKey: keyPair.publicKey }).getAddress();
      res.status(201).json({ message: "Wallet created successfully", walletAddress, keyPair });
    } catch (error) {
      res.status(500).json({ error: "Error creating wallet", details: error.message });
    }
  };
  
  exports.sendTon = async (req, res) => {
    const { senderWallet, senderKeyPair, recipientAddress, amount } = req.body;
  
    try {
      const transaction = await tonService.sendTon(senderWallet, senderKeyPair, recipientAddress, amount);
      res.status(200).json({ message: "Transaction successful", transaction });
    } catch (error) {
      res.status(500).json({ error: "Transaction failed", details: error.message });
    }
  };

  exports.connectWallet = async (req, res) => {
    try {
      const { walletAddress, telegramId } = req.body;
  
      if (!walletAddress || !telegramId) {
        return res.status(400).json({ message: "Invalid wallet or Telegram ID" });
      }
  
      const user = await User.findOne({ telegramId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      user.walletAddress = walletAddress;
      await user.save();
  
      res.status(200).json({
        message: "Wallet connected successfully",
        user: {
          telegramId: user.telegramId,
          walletAddress: user.walletAddress,
        },
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to connect wallet", error: error.message });
    }
  };

  /**
 * Get Wallet Balance
 */
exports.getBalance = async (req, res) => {
  try {
      const { walletAddress } = req.params;
      if(!walletAddress) {
        return res.status(400).json({meesage: " Wallet is required"})
      }
      const balance = await tonService.getBalance(walletAddress);
      res.status(200).json({ message: "Balance fetched successfully", balance });
  } catch (error) {
      res.status(500).json({ message: "Failed to fetch balance", details: error.message });
  }
};

/**
* Withdraw Tokens
*/
exports.withdrawTokens = async (req, res) => {
  try {
      const { wallet, keyPair, recipientAddress, amount } = req.body;
      const result = await tonService.withdrawTokens(wallet, keyPair, recipientAddress, amount);
      res.status(200).json({ message: "Withdrawal successful", result });
  } catch (error) {
      res.status(500).json({ message: "Withdrawal failed", details: error.message });
  }
};

/**
* Deposit Tokens
*/
exports.depositTokens = async (req, res) => {
  try {
      const { wallet, keyPair, gameWalletAddress, amount } = req.body;
      const result = await tonService.depositTokens(wallet, keyPair, gameWalletAddress, amount);
      res.status(200).json({ message: "Deposit successful", result });
  } catch (error) {
      res.status(500).json({ message: "Deposit failed", details: error.message });
  }
};

/**
* Update Game Progress (Ghost Capture, Tokens Earned, NFTs Earned)
*/
exports.updateGameProgress = async (req, res) => {
  try {
    const { level, currentGhostsCaptured, telegramId } = req.body;
    const user = await User.findOne({ telegramId });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const { tokensEarned, nftsEarned, levelCompleted } =
        tonService.updateGameProgress(level, currentGhostsCaptured);

    // Update user stats
    user.tokensEarned = (user.tokensEarned || 0) + tokensEarned;
    user.nftsEarned = (user.nftsEarned || 0) + nftsEarned;

    await user.save();

    // Emit real-time event
    io.emit("game-progress", {
        telegramId,
        tokensEarned,
        nftsEarned,
        levelCompleted,
        totalGhostsCaptured: currentGhostsCaptured,
    });

    res.status(200).json({
        message: "Game progress updated successfully",
        tokensEarned,
        nftsEarned,
        levelCompleted,
        user,
    });
} catch (error) {
    res.status(500).json({
        message: "Failed to update game progress",
        details: error.message,
    });
}
};
exports.mintRewardNFT = async (req, res) => {
  try {
      const { wallet, keyPair, nftMetadata } = req.body;
      const result = await tonService.mintNFT(wallet, keyPair, nftMetadata);
      res.status(201).json(result);
  } catch (error) {
      res.status(500).json({
          message: "Failed to mint NFT",
          details: error.message,
      });
  }
};