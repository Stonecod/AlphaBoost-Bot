require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

if (!config.BOT_TOKEN) {
  console.error('Error: BOT_TOKEN environment variable is not set.');
  process.exit(1);
}

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

// --- Keyboards ---

function mainMenuKeyboard() {
  return {
    inline_keyboard: [
      [{ text: '🚀 Trending Services', callback_data: 'trending' }],
      [{ text: '📈 Volume Boost', callback_data: 'volume' }],
      [{ text: '💰 Pricing', callback_data: 'pricing' }],
      [{ text: '💳 Payment', callback_data: 'payment' }],
      [{ text: '📞 Contact Admin', callback_data: 'contact' }],
    ],
  };
}

function backButton() {
  return {
    inline_keyboard: [
      [{ text: '⬅️ Back to Main Menu', callback_data: 'menu' }],
    ],
  };
}

function paymentKeyboard() {
  return {
    inline_keyboard: [
      [{ text: '📥 Import Wallet', callback_data: 'import_wallet' }],
      [{ text: '⬅️ Back to Main Menu', callback_data: 'menu' }],
    ],
  };
}

// --- Helper for "Disappearing" messages ---
// This edits the existing message instead of sending a new one
async function updateMenu(chatId, messageId, text, keyboard) {
  try {
    await bot.editMessageText(text, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: keyboard,
      parse_mode: 'Markdown'
    });
  } catch (e) {
    // If edit fails (e.g. same text), just send a new one
    bot.sendMessage(chatId, text, { reply_markup: keyboard, parse_mode: 'Markdown' });
  }
}

// --- Command Handlers ---

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, config.WELCOME_TEXT, { reply_markup: mainMenuKeyboard() });
});

bot.onText(/\/help/, (msg) => {
  bot.sendMessage(msg.chat.id, config.HELP_TEXT, { reply_markup: backButton() });
});

// Note: Telegram commands cannot have spaces. We use underscore.
bot.onText(/\/volume_boost/, (msg) => {
  bot.sendMessage(msg.chat.id, config.VOLUME_TEXT, { reply_markup: backButton() });
});

bot.onText(/\/contact_admin/, (msg) => {
  bot.sendMessage(msg.chat.id, config.CONTACT_TEXT, { reply_markup: backButton() });
});

// --- Callback Query Handler (Buttons) ---

const awaitingWallets = new Map();

bot.on('callback_query', async (callbackQuery) => {
  const data = callbackQuery.data;
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;
  const messageId = msg.message_id;

  if (data === 'menu') {
    await updateMenu(chatId, messageId, config.WELCOME_TEXT, mainMenuKeyboard());
  } else if (data === 'trending') {
    await updateMenu(chatId, messageId, config.TRENDING_TEXT, backButton());
  } else if (data === 'volume') {
    await updateMenu(chatId, messageId, config.VOLUME_TEXT, backButton());
  } else if (data === 'pricing') {
    await updateMenu(chatId, messageId, config.PRICING_TEXT, backButton());
  } else if (data === 'payment') {
    await updateMenu(chatId, messageId, config.PAYMENT_TEXT, paymentKeyboard());
  } else if (data === 'contact') {
    await updateMenu(chatId, messageId, config.CONTACT_TEXT, backButton());
  } else if (data === 'import_wallet') {
    awaitingWallets.set(chatId, true);
    // Delete the menu so the user can type their address clearly
    bot.deleteMessage(chatId, messageId); 
    bot.sendMessage(chatId, `Please send your wallet PUBLIC ADDRESS.\n\nAfter sending, it will be forwarded to Admin.`);
  }

  bot.answerCallbackQuery(callbackQuery.id).catch(() => {});
});

// --- Message Handler (Wallet logic remains same) ---

bot.on('message', (msg) => {
  const text = msg.text || '';
  const chatId = msg.chat.id;

  if (text.startsWith('/')) return; // Ignore commands

  if (awaitingWallets.has(chatId)) {
    const walletAddress = text.trim();
    if (walletAddress.length < 10) {
      bot.sendMessage(chatId, 'Invalid address. Please try again.');
      return;
    }

    const user = msg.from;
    const sender = user.username ? `@${user.username}` : `${user.first_name}`;
    const forwardText = `Wallet Request:\nUser: ${sender}\nAddress: ${walletAddress}`;

    bot.sendMessage(config.ADMIN_HANDLE, forwardText).catch(() => {});
    
    bot.sendMessage(chatId, `Success! Sent to admin.`, { reply_markup: mainMenuKeyboard() });
    awaitingWallets.delete(chatId);
  }
});

console.log('AlphaBoost Bot updated and running...');