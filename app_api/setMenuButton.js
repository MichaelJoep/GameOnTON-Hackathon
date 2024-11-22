const axios = require('axios');
const dotenv = require("dotenv");
dotenv.config();

// Replace with your bot token
const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/setMenuButton`;

// Replace with your frontend URL
const FRONTEND_URL = 'http://localhost:3005';

const setMenuButton = async () => {
    try {
        const response = await axios.post(TELEGRAM_API_URL, {
            type: "web_app",
            text: "Ghost Hunter",
            web_app: {
                url: FRONTEND_URL,
            },
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        console.log("Menu button set successfully:", response.data);
    } catch (error) {
        console.error("Error setting menu button:", error.response?.data || error.message);
    }
};

setMenuButton();