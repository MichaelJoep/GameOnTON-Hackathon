const TelegramBot = require("node-telegram-bot-api");
require("dotenv").config(); // Ensure environment variables are loaded

const botToken = process.env.TELEGRAM_BOT_TOKEN;

// Validate bot token
if (!botToken) {
  console.error("Error: TELEGRAM_BOT_TOKEN is not set in the environment variables.");
  process.exit(1);
}

// Web app URL
const webAppUrl = "https://ghost-hunters-ui.vercel.app/";

// Retry delay in milliseconds
const RETRY_DELAY = 5000;

// Initialize the bot with optional proxy settings
const initializeBot = () => {
  try {
    const bot = new TelegramBot(botToken, { polling: true });

    console.log("Telegram bot is running...");

    // Welcome message with button
    const sendWelcomeMessage = (chatId) => {
      bot.sendMessage(chatId, "Welcome to Ghost Hunter Bot! Let's begin the adventure.", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Open Ghost Hunter App", url: webAppUrl }],
          ],
        },
      });
    };

    // Handle commands
    bot.onText(/\/start/, (msg) => {
      const chatId = msg.chat.id;
      sendWelcomeMessage(chatId);
    });

    bot.onText(/\/help/, (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(
        chatId,
        "Here are some commands you can use:\n" +
          "/start - Start the bot\n" +
          "/help - Get help\n" +
          "/profile - Link your profile\n" +
          "/openapp - Open the Ghost Hunter web app"
      );
    });

    bot.onText(/\/profile/, (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(
        chatId,
        `Please use this unique token to authenticate your profile: \n\n*${chatId}*`,
        { parse_mode: "Markdown" }
      );
    });

    bot.onText(/\/openapp/, (msg) => {
      const chatId = msg.chat.id;
      bot.sendMessage(chatId, "Click below to open the Ghost Hunter web app:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: "Open Ghost Hunter App", url: webAppUrl }],
          ],
        },
      });
    });

    // Generic message handler
    bot.on("message", (msg) => {
      const chatId = msg.chat.id;
      const text = msg.text.toLowerCase();

      // Handle non-command messages
      if (!text.startsWith("/")) {
        bot.sendMessage(chatId, `You said: ${text}`);
      }
    });

    // Handle polling errors
    bot.on("polling_error", (error) => {
      console.error("Polling error occurred:", error.message);

      // Retry polling after a delay for EFATAL errors
      if (error.code === "EFATAL" || error.code === "ETIMEOUT") {
        console.log(`Retrying connection in ${RETRY_DELAY / 1000} seconds...`);
        setTimeout(() => {
          bot.stopPolling()
            .then(() => {
              console.log("Stopped polling. Restarting...");
              initializeBot();
            })
            .catch((err) => {
              console.error("Error stopping polling:", err.message);
              console.log(`Retrying in ${RETRY_DELAY / 1000} seconds...`);
              setTimeout(initializeBot, RETRY_DELAY);
            });
        }, RETRY_DELAY);
      }
    });

    return bot;
  } catch (error) {
    console.error("Unexpected error occurred:", error.message);
    console.log(`Retrying initialization in ${RETRY_DELAY / 1000} seconds...`);
    setTimeout(initializeBot, RETRY_DELAY);
  }
};

// Start the bot
initializeBot();
