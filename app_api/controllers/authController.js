const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.telegramAuth = async(req, res) => {
    const { telegramId, username, profileImage } = req.body;

    try {
        let user = await User.findOne({ telegramId });

        if(!user) {
            user = new User({ telegramId, username, profileImage });
            await user.save();
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ user, token })
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

//update user's profile
exports.updateUserProfile = async (req, res) => {
    try {
      const { nickname, walletAddress } = req.body;
      const profileImage = req.file ? req.file.path : null;
  
      const profileData = { nickname, walletAddress };
      if (profileImage) profileData.profileImage = profileImage;
  
      const updatedProfile = await User.findByIdAndUpdate(req.user.id, profileData, { new: true });
      res.status(200).json({ message: "Profile updated", updatedProfile });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error updating profile", error: error.message });
    }
  };
  

