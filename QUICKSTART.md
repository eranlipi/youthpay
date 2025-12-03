# YouthPay - Quick Start Guide

Get YouthPay running in 5 minutes!

## Local Development

```bash
# 1. Install dependencies (root - backend)
npm install

# 2. Install dependencies (client - frontend)
cd client
npm install
cd ..

# 3. Build the frontend
npm run build

# 4. Start the server
npm start

# 5. Open browser
# Visit: http://localhost:3000
```

That's it! The app is now running locally.

## Deploy to Render.com

```bash
# 1. Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit"

# 2. Create GitHub repo and push
git remote add origin https://github.com/YOUR_USERNAME/youthpay.git
git push -u origin main

# 3. Go to Render.com
# - Sign up/login
# - New + → Blueprint
# - Select your youthpay repo
# - Click Apply

# Done! Wait 3-5 minutes for deployment
```

## Project Structure

```
youthpay/
├── server/           # Backend (Express API)
│   ├── index.js
│   └── routes/
│       ├── payslip.js
│       ├── contract.js
│       └── rights.js
└── client/           # Frontend (React + Vite)
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── components/
        └── pages/
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install backend dependencies |
| `npm run install-client` | Install frontend dependencies |
| `npm run build-client` | Build React app |
| `npm run build` | Install all + build frontend |
| `npm start` | Start Express server |

## Key Files

- `server/index.js` - Express server entry point
- `client/src/App.jsx` - React app with routing
- `render.yaml` - Render deployment config
- `README.md` - Full documentation
- `DEPLOYMENT.md` - Detailed deployment guide

## Testing Features

### 1. Payslip Analyzer
- Go to: `/upload-payslip`
- Upload any image/PDF
- See mock salary breakdown

### 2. Contract Analyzer
- Go to: `/contract-analyzer`
- Upload any file
- See contract issues

### 3. Rights Checker
- Go to: `/rights-checker`
- Complete 4-step form
- Check wage legality

### 4. Chatbot
- Click 💬 button (bottom-left)
- Ask predefined questions
- Get instant answers

## API Endpoints

All endpoints return JSON:

- `POST /api/payslip/analyze` - Analyze payslip
- `POST /api/contract/analyze` - Check contract
- `POST /api/rights/check` - Verify wage rights

## Need Help?

- See `README.md` for full docs
- See `DEPLOYMENT.md` for deployment help
- Check Render logs if deployed

## Common Issues

**Q: Port 3000 already in use?**
A: Set PORT environment variable:
```bash
PORT=3001 npm start
```

**Q: Frontend not updating?**
A: Rebuild frontend:
```bash
npm run build
```

**Q: Hebrew text looks wrong?**
A: Clear browser cache (Ctrl+Shift+R)

---

Happy coding! 🚀
