# AlphaBoost Bot (Node.js)

Minimal Telegram bot that replies with preset service information, pricing and wallet addresses. Built with Node.js and `node-telegram-bot-api`. Uses polling so no webhook or external backend is required.

Files:
- [main.js](main.js) - bot logic and polling startup
- [config.js](config.js) - editable wallets, pricing, and message constants
- [package.json](package.json) - Node dependencies and start script

Setup (local)

1. Install Node.js 16+ and Git if needed.

2. Install dependencies:

```bash
npm install
```

3. Set environment variables (Windows PowerShell example):

```powershell
$env:BOT_TOKEN = "123456:ABC-DEF"
$env:ADMIN_USERNAME = "YourAdminUsername"
```

4. Edit `config.js` to update wallet addresses and pricing as needed.

5. Run the bot:

```bash
npm start
```

Deployment notes

- Railway / Render: set environment variables `BOT_TOKEN` and `ADMIN_USERNAME` in the platform's settings and use `npm start` as the start command.
- This bot uses long polling; for production, ensure the service restarts on failure and the `BOT_TOKEN` is kept secret.

Extending

- All message text, wallets and pricing are stored in `config.js` for easy edits.
- No database or automatic payment verification is included; payments are handled manually via the admin contact.

**Deploy via GitHub + Railway**

1. Create a GitHub repository and push this project:

```bash
git init
git add .
git commit -m "Initial AlphaBoost Bot"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo>.git
git push -u origin main
```

2. Connect to Railway

- Go to https://railway.app and sign in.
- Create a new project and select "Deploy from GitHub" (authorize Railway to access your repo if prompted).
- Select your repo and the `main` branch.

3. Set environment variables in Railway

- In your Railway project, open Settings → Variables and add:
	- `BOT_TOKEN` = your bot token
	- `ADMIN_USERNAME` = M19_yrs

Railway will detect the Node.js app and run `npm install` then `npm start`. If needed, set the Start Command to `npm start`.

4. (Optional) Use Docker

- If you prefer deploying via Docker, Railway supports Dockerfile-based deployments. The included `Dockerfile` provides a minimal production image.

5. Verify

- After deployment, open the project logs in Railway to confirm the bot started and shows `AlphaBoost Bot started (polling)...`.
- Test the bot in Telegram with `/start` and the inline buttons.

If you want, I can create the GitHub repo for you (you'll need to provide GitHub access/permission), or guide you through pushing and connecting to Railway step-by-step.
