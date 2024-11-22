import React from 'react';
import "./ProfileInfoBox.css";



const ProfileInfoBox = ({label, value}) => {
  return (
    <div className="profile-info-box">
    <p>{label}</p>
    <h2>{value}</h2>
  </div>
  )
}

export default ProfileInfoBox