const TelegramBot = require("node-telegram-bot-api");
const botToken = process.env.TELEGRAM_BOT_TOKEN;

// Initialize the bot
const bot = new TelegramBot(botToken, { polling: true });

// Listen for messages
bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text.toLowerCase();

  if (text === "/start") {
    bot.sendMessage(chatId, "Welcome to Ghost Shooter Bot! Let's begin the adventure.");
  } else if (text === "help") {
    bot.sendMessage(
      chatId,
      "Here are some commands you can use:\n/start - Start the bot\n/help - Get help\n/profile - Link your profile"
    );
  } else if (text === "profile") {
    bot.sendMessage(
      chatId,
      `Please use this unique token to authenticate your profile: \n\n*${chatId}*`,
      { parse_mode: "Markdown" }
    );
  } else {
    bot.sendMessage(chatId, `You said: ${text}`);
  }
});

console.log("Telegram bot is running...");
