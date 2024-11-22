import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useTonConnectUI } from "@tonconnect/ui-react";
import profileImg from "../../assets/thedevil-btn.png";
import axios from "../../services/api";
import "./Profile.css";


const Profile = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [userData, setUserData] = useState(null);
  const [tonConnectUI] = useTonConnectUI();
  const navigate = useNavigate();


  // Connect Wallet Function
  const connectWallet = async () => {
    try {
      const wallet = await tonConnectUI.connectWallet();
      console.log("Wallet connection response:", wallet);
  
      if (!wallet?.account?.address) {
        throw new Error("Invalid wallet address.");
      }
  
      // Ensure wallet address is valid and save
      const walletAddress = wallet.account.address;
      setWalletAddress(walletAddress);
  
       // Save the wallet address to the backend
      const response = await axios.post("/api/ton/connect-wallet", {
        walletAddress,
        telegramId: userData?.telegramId,
      });
  
      console.log("Backend response:", response);
    } catch (error) {
      console.error("Wallet connection error:", error);
    }
  };

  // Fetch Telegram User Details
  const authenticateTelegramUser = async () => {
    try {
      if (window.Telegram || window.Telegram.WebApp) {
        const telegramData = window.Telegram.WebApp.initDataUnsafe?.user;
        if (telegramData) {
          const { id, username, photo_url } = telegramData;
          const response = await axios.post("/api/auth/telegram", {
            telegramId: id,
            username,
            profileImage: photo_url,
          });
          setUserData(response?.data?.user);
        } else {
          console.warn("Telegram WebApp user data not found.");
        }
      } else {
        console.warn("Telegram WebApp is not initialized.");
      }
    } catch (error) {
      console.error("Error authenticating Telegram user:", error.message);
    }
  };


  useEffect(() => {
    try {
      authenticateTelegramUser();
    } catch (error) {
      console.error("Error authenticating Telegram user:", error);
    }
  }, []);



  const handleEditClick = () => {
    navigate("/profile-page/edit-profile");
  };


  return (
    <div className='profile-container'>
      <div className="profile-background-image"></div>
      <div className="profile-content">
        <div className="button-group">
          <button className="profile-button backgroundColor-basic">BASIC</button>
          <button className="profile-button">ACHIEVEMENT</button>
          <button className="profile-button">COLLECTION</button>
          <button className="profile-button">EARNING</button>
        </div>
        <div className="button-connect">
          <button className="profile-button edit-profile" onClick={handleEditClick}>
              <span className='icon-logo'><img src={profileImg} alt="thedevil" /></span>
              Edit Profile
          </button>
          <button className="profile-button connect-wallet" onClick={connectWallet}>
            {walletAddress ? walletAddress : "CONNECT WALLET"}
          </button>
        </div>
        <div className="character-image"></div>
      </div>
    </div>
  )
}

export default Profile