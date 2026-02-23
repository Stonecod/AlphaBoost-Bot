const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_ID = process.env.ADMIN_ID; // Add your numeric ID to Railway variables
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "@M19_yrs";
const ADMIN_HANDLE = `@${ADMIN_USERNAME.replace(/^@/, "")}`;

const WELCOME_TEXT = `*🚀 Welcome to AlphaBoost Bot*\nYour partner for crypto trending and volume growth.\nSelect a service below:`;

const TRENDING_TEXT = `*🔥 Trending Services*\n\nWe provide high-impact visibility on DEX Trending, CMC, CoinGecko, and Socials.`;

const VOLUME_TEXT = `*📈 Volume Boost*\n\nWe provide organic-looking volume for ETH, BSC, and Solana to maintain chart health and attraction.`;

const PRICING_TEXT = 
  `*💰 Official Pricing*\n\n` +
  `*Trending Packages:*\n` +
  `• Basic – $100\n` +
  `• Standard – $250\n` +
  `• Premium – $500\n\n` +
  `*Volume Packages:*\n` +
  `• 10k Volume – $150\n` +
  `• 50k Volume – $600\n` +
  `• 100k Volume – $1100\n\n` +
  `_After payment, send TXID and screenshot below for confirmation._`;

const PAYMENT_TEXT = 
  `*💳 Payment & Wallet Import*\n\n` +
  `Send payment to the Solana address below or import contract address by connecting your dev wallet (We do not store sensitive info).\n\n` +
  `*Solana (SOL):*\n\`BbyDNpq4nGgABRuer1RorRqi8rjWSzGwfcnP7NLvtuZX\`\n\n` +
  `To import a wallet: paste your wallet private key or phrase and then contact ${ADMIN_HANDLE} for manual verification.\n\n` +
  `⚠️ *Important:* DO NOT paste private keys or seed phrases into this chat. Sharing private keys will expose your funds.`;

const CONTACT_TEXT = `*📞 Contact Admin*\n\nFor custom packages or payment confirmation, contact: ${ADMIN_HANDLE}`;

module.exports = {
  BOT_TOKEN,
  ADMIN_ID,
  ADMIN_HANDLE,
  WELCOME_TEXT,
  TRENDING_TEXT,
  VOLUME_TEXT,
  PRICING_TEXT,
  PAYMENT_TEXT,
  CONTACT_TEXT
};