const TonWeb = require("tonweb");

const { tonApiKey, tonNetwork } = require("../config/tonConfig");

if (!tonApiKey || !tonNetwork) {
    throw new Error("TON network configuration is missing in environment variables.");
};


// Initialize TonWeb with the network provider
const tonweb = new TonWeb(new TonWeb.HttpProvider(`${tonNetwork}?api_key=${tonApiKey}`));

/**
 * Generate a new mnemonic seed and derive a key pair.
 */
exports.generateMnemonic = async () => {
   try {
     // Generate a random seed (256-bit)
     const seed = TonWeb.utils.newSeed();

     // Convert the seed to Base64 (optional, for readability or storage)
     const base64Mnemonic = TonWeb.utils.bytesToBase64(seed);
 
     // Derive the key pair from the seed
     const keyPair = await TonWeb.utils.keyPairFromSeed(seed);
 
     return {
         mnemonic: base64Mnemonic, // Human-readable mnemonic representation
         keyPair,
     };
   } catch (error) {
    throw new Error(`Failed to generate mnemonic: ${error.message}`);
   }
};

/**
 * Generate a new TON wallet using a random seed.
 */
exports.createWallet = async () => {
    try {
      const { mnemonic, keyPair } = await this.generateMnemonic();
      const wallet = tonweb.wallet.create({
        publicKey: keyPair.publicKey,
        wc: 0,
      });
  
      const walletAddress = await wallet.getAddress();
      return {
        mnemonic,
        walletAddress: walletAddress.toString(true, true, true),
        wallet,
        keyPair,
      };
    } catch (error) {
      throw new Error(`Error creating wallet: ${error.message}`);
    }
  };

/**
 * Send TON tokens to a wallet.
 */
exports.sendTon = async (senderWallet, senderKeyPair, recipientAddress, amount) => {
    try {
        // Prepare and execute the transfer
        const transfer = await senderWallet.methods.transfer({
            secretKey: senderKeyPair.secretKey,
            toAddress: recipientAddress,
            amount: TonWeb.utils.toNano(amount), // Convert amount to nanoTON
        });

        // Send the transaction
        await transfer.send();

        return {
            message: "Transaction successful",
            transaction: transfer,
        };
    } catch (error) {
        throw new Error(`Transaction failed: ${error.message}`);
    }
};

/**
 * Get the balance of a wallet.
 */
exports.getBalance = async (walletAddress) => {
    try {
        const balanceNano = await tonweb.getBalance(walletAddress);
        const balance = TonWeb.utils.fromNano(balanceNano); // Convert nanoTON to TON
        return balance;
    } catch (error) {
        throw new Error(`Failed to fetch balance: ${error.message}`);
    }
};

/**
 * Update ghost captures, token earned, and NFT rewards.
 */
exports.updateGameProgress = (level, currentGhostsCaptured) => {
    const levelGhostThresholds = [45, 35, 25]; // Ghosts required per level
    const tokenPerGhost = 10; // Example token rate per ghost
    const nftsPerLevel = [1, 1, 1]; // NFTs earned per level completion

    if (currentGhostsCaptured >= levelGhostThresholds[level - 1]) {
        const tokensEarned = currentGhostsCaptured * tokenPerGhost;
        const nftsEarned = nftsPerLevel[level - 1];
        return { tokensEarned, nftsEarned, levelCompleted: true };
    } else {
        const tokensEarned = currentGhostsCaptured * tokenPerGhost;
        return { tokensEarned, nftsEarned: 0, levelCompleted: false };
    }
};

/**
 * Withdraw earned tokens.
 */
exports.withdrawTokens = async (wallet, keyPair, recipientAddress, amount) => {
    try {
        const transfer = await wallet.methods.transfer({
            secretKey: keyPair.secretKey,
            toAddress: recipientAddress,
            amount: TonWeb.utils.toNano(amount),
        });
        await transfer.send();
        return {
            message: "Withdraw successful",
            amount,
        };
    } catch (error) {
        throw new Error(`Withdraw failed: ${error.message}`);
    }
};

/**
 * Deposit tokens into the game.
 */
exports.depositTokens = async (wallet, keyPair, gameWalletAddress, amount) => {
    try {
        const transfer = await wallet.methods.transfer({
            secretKey: keyPair.secretKey,
            toAddress: gameWalletAddress,
            amount: TonWeb.utils.toNano(amount),
        });
        await transfer.send();
        return {
            message: "Deposit successful",
            amount,
        };
    } catch (error) {
        throw new Error(`Deposit failed: ${error.message}`);
    }
};
exports.mintNFT = async (wallet, keyPair, nftMetadata) => {
    try {
        const nft = await tonweb.nft.create({
            ownerAddress: wallet.getAddress(),
            metadata: nftMetadata, // e.g., zombie kill metadata
        });

        await nft.deploy({ secretKey: keyPair.secretKey });

        return {
            message: "NFT minted successfully",
            nftAddress: nft.address,
        };
    } catch (error) {
        throw new Error(`Failed to mint NFT: ${error.message}`);
    }
};