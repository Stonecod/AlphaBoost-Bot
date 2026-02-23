const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "@M19_yrs";

// Clean admin handle (removes extra @ if added)
const ADMIN_HANDLE = `@${ADMIN_USERNAME.replace(/^@/, "")}`;
// Wallet addresses (edit here) - only Solana is used by default
const WALLETS = {
  SOLANA: "BbyDNpq4nGgABRuer1RorRqi8rjWSzGwfcnP7NLvtuZX",
};

// Pricing (editable)
const PRICING = {
  trending: {
    Basic: 100,
    Standard: 250,
    Premium: 500,
  },
  volume: {
    "10k Volume": 150,
    "50k Volume": 600,
    "100k Volume": 1100,
  },
};

// Preset texts (constants)
const WELCOME_TEXT = `Welcome to AlphaBoost Bot 🚀\nYour partner for crypto trending and volume growth.\nSelect a service below.`;

const HELP_TEXT = `Use /start to open the main menu.\nSelect a service using the buttons.`;

const TRENDING_TEXT = `We offer trending services for:\n\n• DEX Trending\n• CoinMarketCap Trending\n• CoinGecko Trending\n• X (Twitter) Engagement Boost\n• Telegram Growth`;

const VOLUME_TEXT = `We provide volume services for:\n\n• Ethereum\n• BSC\n• Solana\n\nDuration: 24h – 72h\nCustom packages available.`;

const PRICING_TEXT = `Trending Packages:\n` +
  `• Basic – $${PRICING.trending.Basic}\n` +
  `• Standard – $${PRICING.trending.Standard}\n` +
  `• Premium – $${PRICING.trending.Premium}\n\n` +
  `Volume Packages:\n` +
  `• 10k Volume – $${PRICING.volume['10k Volume']}\n` +
  `• 50k Volume – $${PRICING.volume['50k Volume']}\n` +
  `• 100k Volume – $${PRICING.volume['100k Volume']}\n\n` +
  `After payment, send TXID and screenshot to ${ADMIN_HANDLE}`;

const PAYMENT_TEXT = `Send payment to the Solana address below or import your wallet by pasting your public wallet address to the admin.\n\n` +
  `Solana (SOL):\n${WALLETS.SOLANA}\n\n` +
  `To import a wallet: paste your wallet PUBLIC ADDRESS (NOT your private key) and then contact ${ADMIN_HANDLE} with the TXID and screenshot for manual verification.\n\n` +
  `Important: DO NOT paste private keys or seed phrases into this chat. Sharing private keys will expose your funds.`;

const CONTACT_TEXT = `For custom packages or confirmation:\nContact ${ADMIN_HANDLE}`;

const UNKNOWN_TEXT = `Sorry, I didn't understand that.\nUse /start to open the menu or press a button.`;

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
