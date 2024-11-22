const NFT = require("../models/NFT");


exports.mintNFT = async (req, res) => {
    try {
      const { userId, name, image } = req.body;
      const nft = new NFT({ name, image, owner: userId });
      await nft.save();
  
      res.status(201).json({ message: 'NFT minted successfully', nft });
    } catch (error) {
      res.status(500).json({ error: 'Error minting NFT', details: error.message });
    }
  };