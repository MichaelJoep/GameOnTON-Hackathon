import React from 'react';
import "./LandingPage.css";
import { Link } from 'react-router-dom';


const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Background Image with character */}
      <div className="background-image">
        {/* Left Side Buttons */}
        <div className="button-container left">
          <button className="menu-button" id="event">
            <Link to="/event-page" className='link'>Event</Link>
          </button>
          <button className="menu-button" id="marketplace">
            <Link to="/marketplace-page" className='link'>Marketplace</Link>
          </button>
          <button className="menu-button" id="earn">
            <Link to="/earn-page" className='link'>Earn</Link>
          </button>
        </div>

        {/* Right Side Buttons */}
        <div className="button-container right">
          <button className="menu-button" id="battle">
            <Link to="/battle-ground-page" className='link'>Battle</Link>
          </button>
          <button className="menu-button" id="multiplayer">
            <Link to="/multiplayer-page" className='link'>Multiplayer</Link>
          </button>
          <button className="menu-button" id="leaderboard">
            <Link to="/leaderboard-page" className='link'>Leaderboard</Link>
          </button>
        </div>

        {/* Bottom Buttons */}
        <div className="button-container bottom">
          <button className="menu-button" id="store">
            <Link to="/store-page" className='link'>Store</Link>
          </button>
          <button className="menu-button" id="profile">
            <Link to="/profile-page" className='link'>Profile</Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage