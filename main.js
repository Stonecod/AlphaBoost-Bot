require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

if (!config.BOT_TOKEN) {
  console.error('Error: BOT_TOKEN is missing.');
  process.exit(1);
}

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });

// --- Keyboards ---
const keyboards = {
  main: {
    inline_keyboard: [
      [{ text: '🚀 Trending Services', callback_data: 'trending' }],
      [{ text: '📈 Volume Boost', callback_data: 'volume' }],
      [{ text: '📞 Contact Admin', callback_data: 'contact' }]
    ]
  },
  trending: {
    inline_keyboard: [
      [{ text: '💰 Pricing', callback_data: 'pricing' }],
      [{ text: '📞 Contact Admin', callback_data: 'contact' }],
      [{ text: '⬅️ Back', callback_data: 'menu' }]
    ]
  },
  pricing: {
    inline_keyboard: [
      [{ text: '💳 Payment', callback_data: 'payment' }],
      [{ text: '⬅️ Back', callback_data: 'trending' }]
    ]
  },
  payment: {
    inline_keyboard: [
      [{ text: 'Done ✅', callback_data: 'done_payment' }],
      [{ text: '⬅️ Back', callback_data: 'pricing' }]
    ]
  },
  backOnly: {
    inline_keyboard: [[{ text: '⬅️ Back', callback_data: 'menu' }]]
  }
};

// --- Navigation Helper ---
async function nav(chatId, messageId, text, kb) {
  try {
    await bot.editMessageText(text, {
      chat_id: chatId,
      message_id: messageId,
      reply_markup: kb,
      parse_mode: 'Markdown'
    });
  } catch (e) {
    // Catching "message is not modified" or other edit errors
    if (!e.message.includes("message is not modified")) {
      bot.sendMessage(chatId, text, { reply_markup: kb, parse_mode: 'Markdown' });
    }
  }
}

// --- Commands ---
bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, config.WELCOME_TEXT, { 
    reply_markup: keyboards.main, 
    parse_mode: 'Markdown' 
  });
});

bot.onText(/\/contact_admin/, (msg) => {
  bot.sendMessage(msg.chat.id, config.CONTACT_TEXT, { 
    reply_markup: keyboards.backOnly, 
    parse_mode: 'Markdown' 
  });
});

// Set the command menu
bot.setMyCommands([
  { command: 'start', description: '🚀 Open Main Menu' },
  { command: 'contact_admin', description: '📞 Contact Admin' }
]);

// --- Interaction Logic ---
bot.on('callback_query', async (query) => {
  const { data, message } = query;
  const chatId = message.chat.id;
  const msgId = message.message_id;

  switch (data) {
    case 'menu':
      await nav(chatId, msgId, config.WELCOME_TEXT, keyboards.main);
      break;
    case 'trending':
      await nav(chatId, msgId, config.TRENDING_TEXT, keyboards.trending);
      break;
    case 'volume':
      await nav(chatId, msgId, config.VOLUME_TEXT, keyboards.backOnly);
      break;
    case 'pricing':
      await nav(chatId, msgId, config.PRICING_TEXT, keyboards.pricing);
      break;
    case 'payment':
      await nav(chatId, msgId, config.PAYMENT_TEXT, keyboards.payment);
      break;
    case 'contact':
      await nav(chatId, msgId, config.CONTACT_TEXT, keyboards.backOnly);
      break;
    case 'done_payment':
      // 1. User sees confirmation
      const confirmMsg = await bot.sendMessage(chatId, "_wait for confirmation..._", { parse_mode: 'Markdown' });
      
      // 2. Message disappears after 60s
      setTimeout(() => {
        bot.deleteMessage(chatId, confirmMsg.message_id).catch(() => {});
      }, 60000);

      // 3. Admin is alerted
      if (config.ADMIN_ID) {
        const user = query.from.username ? `@${query.from.username}` : query.from.first_name;
        bot.sendMessage(config.ADMIN_ID, `🔔 *Payment Alert*\nUser: ${user}\nID: ${query.from.id}\nAction: Clicked Done ✅`, { parse_mode: 'Markdown' });
      }
      break;
  }
  
  bot.answerCallbackQuery(query.id).catch(() => {});
});

console.log('AlphaBoost Bot is 100% verified and running...');