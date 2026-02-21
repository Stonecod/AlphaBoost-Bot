const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

if (!config.BOT_TOKEN) {
  console.error('Error: BOT_TOKEN environment variable is not set.');
  process.exit(1);
}

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

function mainMenuKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: '🚀 Trending Services', callback_data: 'trending' }],
        [{ text: '📈 Volume Boost', callback_data: 'volume' }],
        [{ text: '💰 Pricing', callback_data: 'pricing' }],
        [{ text: '💳 Payment', callback_data: 'payment' }],
        [{ text: '📞 Contact Admin', callback_data: 'contact' }],
      ],
    },
  };
}

function paymentKeyboard() {
  return {
    reply_markup: {
      inline_keyboard: [
        [{ text: 'Import Wallet (paste public address)', callback_data: 'import_wallet' }],
        [{ text: 'Back to Menu', callback_data: 'menu' }],
      ],
    },
  };
}

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, config.WELCOME_TEXT, mainMenuKeyboard());
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, config.HELP_TEXT, mainMenuKeyboard());
});

const awaitingWallets = new Map(); // chatId -> true while waiting for public address

bot.on('callback_query', (callbackQuery) => {
  const data = callbackQuery.data;
  const msg = callbackQuery.message;
  const chatId = msg.chat.id;

  if (data === 'trending') {
    bot.sendMessage(chatId, config.TRENDING_TEXT);
  } else if (data === 'volume') {
    bot.sendMessage(chatId, config.VOLUME_TEXT);
  } else if (data === 'pricing') {
    bot.sendMessage(chatId, config.PRICING_TEXT);
  } else if (data === 'payment') {
    bot.sendMessage(chatId, config.PAYMENT_TEXT, paymentKeyboard());
  } else if (data === 'import_wallet') {
    awaitingWallets.set(chatId, true);
    bot.sendMessage(
      chatId,
      `Please send your wallet PUBLIC ADDRESS to import. Do NOT send private keys or seed phrases.\n\nAfter sending your public address, it will be forwarded to ${config.ADMIN_HANDLE} for manual verification.`,
    );
  } else if (data === 'contact') {
    bot.sendMessage(chatId, config.CONTACT_TEXT);
  } else if (data === 'menu') {
    bot.sendMessage(chatId, config.WELCOME_TEXT, mainMenuKeyboard());
  } else {
    bot.sendMessage(chatId, config.UNKNOWN_TEXT, mainMenuKeyboard());
  }

  bot.answerCallbackQuery(callbackQuery.id).catch(() => {});
});

// Graceful fallback for unknown messages (non-command)
bot.on('message', (msg) => {
  const text = msg.text || '';
  const chatId = msg.chat.id;

  // If this chat is awaiting a wallet public address, treat the incoming text as the address
  if (awaitingWallets.has(chatId)) {
    const walletAddress = text.trim();
    // Basic safety check: don't accept obvious private-key phrases
    const lowered = walletAddress.toLowerCase();
    if (lowered.includes('private') || lowered.includes('seed') || lowered.length < 10) {
      bot.sendMessage(chatId, 'Invalid address detected. Do NOT send private keys or seed phrases. Please send only your PUBLIC wallet address.');
      return;
    }

    // Forward the public address to admin with user info
    const user = msg.from;
    const sender = user.username ? `@${user.username}` : `${user.first_name || ''} ${user.last_name || ''}`;
    const forwardText = `Wallet import request:\nUser: ${sender} (id: ${user.id})\nChat: ${chatId}\nAddress: ${walletAddress}`;

    bot.sendMessage(config.ADMIN_HANDLE, forwardText).catch((err) => {
      // If sending to @username fails, try sending to ADMIN_USERNAME directly
      bot.sendMessage(config.ADMIN_USERNAME, forwardText).catch(() => {});
    });

    bot.sendMessage(chatId, `Thanks — your public address has been sent to ${config.ADMIN_HANDLE} for verification.`);
    awaitingWallets.delete(chatId);
    return;
  }

  // ignore commands handled above
  if (text.startsWith('/start') || text.startsWith('/help')) return;
  // If message was a callback reply or has no text, ignore
  if (msg?.reply_to_message) return;

  // Otherwise send unknown help text with menu
  bot.sendMessage(chatId, config.UNKNOWN_TEXT, mainMenuKeyboard());
});

console.log('AlphaBoost Bot started (polling)...');
