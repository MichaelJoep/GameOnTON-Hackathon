import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnectUI } from "@tonconnect/ui-react";
import axios from "../../services/api";
import avatarIcon from '../../assets/thedevil-btn.png'; // Avatar image
import marketplaceBackground from '../../assets/visit-marketplace.jfif'; // Marketplace button background
import characterImage from '../../assets/earn-image.png'; // Character image
import gameToken from "../../assets/game-token.png";
import "./Earn.css";


const Earn = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [ghostsCaptured, setGhostsCaptured] = useState(0);
  const [tokensEarned, setTokensEarned] = useState(0);
  const [nftsEarned, setNftsEarned] = useState(0);
  const [avatar, setAvatar] = useState(avatarIcon);
  const [nickname, setNickname] = useState("Thedevil");
  const [tonConnectUI] = useTonConnectUI();
  const navigate = useNavigate();

  // Load wallet address from localStorage if previously connected
  useEffect(() => {
    const savedWallet = localStorage.getItem('walletAddress');
    if(savedWallet) {
      setWalletAddress(savedWallet);
      fetchBalance(savedWallet); // Fetch balance on page load
    }

    const savedAvatar = localStorage.getItem('avatar') || avatarIcon;
    const savedNickname = localStorage.getItem('nickname') || "Thedevil";
    setAvatar(savedAvatar);
    setNickname(savedNickname)
  }, []);


  // Fetch wallet balance from backend
  const fetchBalance = async (wallet) => {
    try {
      const response = await axios.get(`/api/ton/create-wallet/balance/${wallet}`);
      setTokenEarned(response.data.balance);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

   // Function to connect wallet
   const connectWallet = async () => {
    try {
      const wallet = await tonConnectUI.connectWallet();
      if(wallet) {
        setWalletAddress(wallet.account.address);
        localStorage.setItem('walletAddress', wallet.account.address); // Store wallet for persistence
        fetchBalance(wallet.account.address); // Fetch balance after connecting wallet
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
   };

  
   // Function to fetch data from backend (mocked for demonstration)
  useEffect(() => {
    // Mock data fetching
    setGhostsCaptured(ghostsCaptured);  
    setTokensEarned(tokensEarned);    
    setNftsEarned(nftsEarned);       
  }, []);

  const handleWithdraw = async () => {
    try {
      const response = await axios.post("/api/ton/token/withdraw", {
        wallet: walletAddress,
        keyPair,
        recipientAddress,
        amount,
      });
      console.log("Withdrawal successful:", response.data);
    } catch (error) {
      console.error("Error during withdrawal:", error);
    }
  };


  const handleDeposit = async () => {
    try {
      const response = await axios.post("/api/token/deposit", {
        wallet: walletAddress,
        keyPair,
        gameWalletAddress: "gameWalletAddress", 
        amount,
      });
      console.log("Deposit successful:", response.data);
    } catch (error) {
      console.error("Error during deposit:", error);
    }
  };

  const initiateAeonPurchase = async () => {
    try {
      const response = await axios.post("/api/token/send-ton", {
        senderWallet: walletAddress,
        senderKeyPair: "keyPair", // Replace with actual keyPair
        recipientAddress: "recipientAddress", // Replace with the recipient address
        amount
      });
      console.log("Aeon purchase successful:", response.data);
    } catch (error) {
      console.error("Error purchasing Aeon tokens:", error);
    }
  };


  const navigateToMarketplace = () => {
    navigate('/marketplace-page');
  };


  return (
    <div className="earn-container">
      <div className="earn-background">
        <div className="earn-header">
          <div className="earn-header-button">
          <button className="earn-button avatar">
            <img src={avatar} alt="avatar" /> {nickname}
          </button>
          <button className="earn-button connect-wallet" onClick={connectWallet}>
            {walletAddress ? walletAddress : "Connect Wallet"}
          </button>
          </div>
          <div className="earn-header-item">
            <img src={gameToken} alt="gameToken" />
            <span>{tokensEarned}</span>
          </div>
        </div>
        <div className="earn-info-top">
          <div className="info-box">Ghosts captured <span>{ghostsCaptured}</span></div>
          <div className="info-box">Token Earned <span>{tokensEarned} ght</span></div>
        </div>
        <div className="earn-info-bottom">
        <div className="info-box" onClick={handleWithdraw}>Withdraw Coin</div>
        <div className="info-box nft-btn">NFTs Earned <span>{nftsEarned}</span></div>
        </div>
        <div className="marketplace-button" onClick={navigateToMarketplace}>
          <img src={marketplaceBackground} alt="Marketplace" />
          <span>Visit Marketplace</span>
        </div>
        <div className="character">
          <img src={characterImage} alt="Character" />
        </div>
      </div>
    </div>
 
  )
}

export default Earn