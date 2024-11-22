const express = require("express");
const router = express.Router();
const {telegramAuth, updateUserProfile} = require("../controllers/authController");
const upload = require("../middleware/upload");


//telegram auth route
router.post("/telegram", telegramAuth);

//update user profile
router.put("/profile/update",   upload.single('profileImage'), updateUserProfile);



module.exports = router;