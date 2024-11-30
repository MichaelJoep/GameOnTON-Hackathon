import React, {useState} from 'react';
import axios from "axios"
import logoIcon from "../../assets/thedevil-btn.png";
import "./EditProfile.css";


const EditProfile = () => {
    // const navigate = useNavigate();
    const [profileImage, setProfileImage] = useState(logoIcon);
    const [nickname, setNickname] = useState("");
    const [showEditProfileImage, setShowEditProfileImage] = useState(false);
    const [showEditNickname, setShowEditNickname] = useState(false);

    //function to change avatar
    const handleAvatarChange = (event) => {
        const file = event.target.file[0];
        setProfileImage(URL.createObjectURL(file));
    }

    //function to change nickname
    const handleNickNameChange = (event) => {
        setNickname(event.target.value);
    }

  // Handle save function for updating profile
  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("profileImage", profileImage);
      formData.append("nickname", nickname);

      await axios.post("/api/profile/update", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile", error);
    }
  };


  return (
    <div className='profile-container'>
      <div className="profileEdit-background-image"></div>
      <div className="profile-content">
        <div className="button-group">
          <button className="profile-button backgroundColor-basic">BASIC</button>
          <button className="profile-button">ACHIEVEMENT</button>
          <button className="profile-button">COLLECTION</button>
          <button className="profile-button">EARNING</button>
        </div>
        <div className="button-connect">
          <button className="profile-button edit-profile" onClick={()=> setShowEditProfileImage(!showEditProfileImage)}>
              <span className='icon-logo'><img src={logoIcon} alt="thedevil" /></span>
              Change logo
          </button>
          {showEditProfileImage && (
            <div className="edit-form">
                <input type="file" onChange={handleAvatarChange} />
                <button onClick={handleSave}  className="save-button">Save Avatar</button>
            </div>
          )}
          {/* Edit nickname logic*/}
          <button className="profile-button nickname-btn" onClick={()=> setShowEditNickname(!showEditNickname)}>
            Nickname
          </button>
          {showEditNickname && (
            <div className="edit-form">
                <input type="text"
                placeholder='Enter new nickname'
                value={nickname} 
                onChange={handleNickNameChange}
                />
            <button onClick={handleSave} className="save-button">Save Nickname</button>
            </div>
          )}
        </div>
        <div className="character-image"></div>
      </div>
    </div>
  )
}

export default EditProfile