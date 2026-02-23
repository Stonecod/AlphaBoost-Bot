const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "@M19_yrs";

// Clean admin handle (removes extra @ if added)
const ADMIN_HANDLE = `@${ADMIN_USERNAME.replace(/^@/, "")}`;

// Wallet addresses
const WALLETS = {
  SOLANA: "BbyDNpq4nGgABRuer1RorRqi8rjWSzGwfcnP7NLvtuZX",
};

// Pricing
const PRICING = {
  trending: { Basic: 100, Standard: 250, Premium: 500 },
  volume: { "10k": 150, "50k": 600, "100k": 1100 },
};

// --- PRESET TEXTS (With Markdown Formatting) ---

const WELCOME_TEXT = 
  `*🚀 Welcome to AlphaBoost Bot*\n\n` +
  `Your premier partner for *Crypto Trending* and *Volume Growth*.\n\n` +
  `Select a service from the menu below to get started:`;

const HELP_TEXT = 
  `*ℹ️ AlphaBoost Support*\n\n` +
  `• Use /start to refresh the menu.\n` +
  `• Click buttons to navigate services.\n` +
  `• Contact ${ADMIN_HANDLE} for custom requests.\n\n` +
  `_Navigate using the buttons below:_`;

const TRENDING_TEXT = 
  `*🔥 Trending Services*\n\n` +
  `We provide high-impact visibility on:\n` +
  `• *DEX Trending* (DexScreener, DEXTools)\n` +
  `• *CMC & CoinGecko* Top Lists\n` +
  `• *X (Twitter)* Engagement Boosts\n` +
  `• *Telegram* Community Growth\n\n` +
  `_Select Pricing or Contact Admin to order._`;

const VOLUME_TEXT = 
  `*📈 Volume Boost Services*\n\n` +
  `Organic-looking volume for your token:\n` +
  `• *Networks:* ETH, BSC, SOL\n` +
  `• *Duration:* 24h – 72h Managed Cycles\n\n` +
  `_Custom algorithmic trading to maintain chart health._`;

const PRICING_TEXT = 
  `*💰 Service Pricing*\n\n` +
  `*Trending Packages:*\n` +
  `• Basic: $${PRICING.trending.Basic}\n` +
  `• Standard: $${PRICING.trending.Standard}\n` +
  `• Premium: $${PRICING.trending.Premium}\n\n` +
  `*Volume Packages:*\n` +
  `• 10k Volume: $${PRICING.volume['10k']}\n` +
  `• 50k Volume: $${PRICING.volume['50k']}\n` +
  `• 100k Volume: $${PRICING.volume['100k']}\n\n` +
  `_After payment, send TXID and screenshot to ${ADMIN_HANDLE}_`;

const PAYMENT_TEXT = 
  `*💳 Secure Payment*\n\n` +
  `Send payment to the *Solana (SOL)* address below:\n\n` +
  `\`${WALLETS.SOLANA}\` \n\n` +
  `*(Tap the address above to copy)*\n\n` +
  `⚠️ *IMPORTANT:* Do NOT send private keys or seed phrases. We only require your *Public Address* for verification.\n\n` +
  `Contact ${ADMIN_HANDLE} after sending.`;

const CONTACT_TEXT = 
  `*📞 Contact Administration*\n\n` +
  `Need a custom package or have questions?\n\n` +
  `Click the handle below to message our team:\n` +
  `👉 ${ADMIN_HANDLE}`;

const UNKNOWN_TEXT = 
  `*❓ Unknown Command*\n\n` +
  `I didn't quite catch that. Please use the menu buttons or type /start to reset.`;

module.exports = {
  BOT_TOKEN,
  ADMIN_USERNAME,
  ADMIN_HANDLE,
  WALLETS,
  PRICING,
  WELCOME_TEXT,
  HELP_TEXT,
  TRENDING_TEXT,
  VOLUME_TEXT,
  PRICING_TEXT,
  PAYMENT_TEXT,
  CONTACT_TEXT,
  UNKNOWN_TEXT,
};