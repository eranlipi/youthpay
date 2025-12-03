# YouthPay - Deployment Guide

Complete step-by-step guide to deploy YouthPay to Render.com

## Prerequisites

- GitHub account
- Render.com account (free tier available)
- Git installed locally
- Node.js 18+ installed

## Step 1: Prepare Your Code

### 1.1 Initialize Git Repository

```bash
cd C:\dev\youthpay
git init
```

### 1.2 Add All Files

```bash
git add .
```

### 1.3 Create Initial Commit

```bash
git commit -m "Initial commit: YouthPay prototype with React + Express"
```

### 1.4 Set Main Branch

```bash
git branch -M main
```

## Step 2: Push to GitHub

### 2.1 Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon (top-right) → **"New repository"**
3. Repository name: `youthpay`
4. Description: "YouthPay - Labor rights education for teenagers"
5. Select **Public** or **Private**
6. **DO NOT** initialize with README (we already have one)
7. Click **"Create repository"**

### 2.2 Connect Local to GitHub

Copy the commands from GitHub's "push an existing repository" section:

```bash
git remote add origin https://github.com/YOUR_USERNAME/youthpay.git
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

### 2.3 Verify Upload

- Refresh your GitHub repository page
- You should see all files uploaded

## Step 3: Deploy to Render (Method 1 - Blueprint)

This is the easiest method using `render.yaml`.

### 3.1 Sign Up / Log In to Render

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub (recommended) or email
3. Authorize Render to access your GitHub repositories

### 3.2 Create Blueprint

1. From Render Dashboard, click **"New +"**
2. Select **"Blueprint"**
3. Connect your GitHub account if not already connected
4. Select the **`youthpay`** repository
5. Render will detect `render.yaml` automatically
6. Click **"Apply"**

### 3.3 Wait for Deployment

- Build process starts automatically
- Watch the logs in real-time
- First deployment takes ~3-5 minutes
- Logs will show:
  - Installing dependencies
  - Building React frontend
  - Starting Express server

### 3.4 Access Your App

- Once deployed, Render provides a URL like:
  ```
  https://youthpay.onrender.com
  ```
- Click the URL to open your app!

## Step 4: Deploy to Render (Method 2 - Manual)

Alternative method if you prefer manual setup.

### 4.1 Create Web Service

1. From Render Dashboard, click **"New +"**
2. Select **"Web Service"**
3. Connect your GitHub repository
4. Select **`youthpay`** from the list

### 4.2 Configure Service

Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `youthpay` |
| **Environment** | `Node` |
| **Region** | Choose closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm start` |
| **Plan** | `Free` |

### 4.3 Environment Variables (Optional)

Click **"Advanced"** and add:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |

### 4.4 Deploy

1. Click **"Create Web Service"**
2. Deployment starts automatically
3. Monitor logs in the Render dashboard

### 4.5 Access Your App

- Once "Live" indicator shows green
- Click the provided URL
- Your app is now live! 🎉

## Step 5: Verify Deployment

### 5.1 Test Homepage

- Visit your Render URL
- You should see the YouthPay landing page
- Check that Hebrew text displays correctly (RTL)

### 5.2 Test Features

1. **Upload Payslip**:
   - Click "תלוש שכר"
   - Upload any image/PDF
   - Verify mock data displays as cards

2. **Contract Analyzer**:
   - Click "בדיקת חוזה"
   - Upload any file
   - Verify issue cards display

3. **Rights Checker**:
   - Click "מה מגיע לי?"
   - Complete all 4 steps
   - Verify results display correctly

4. **Chatbot**:
   - Click the floating 💬 button (bottom-left)
   - Select a question
   - Verify response displays

### 5.3 Check API Endpoints

Test directly in browser or with curl:

```bash
# Test payslip endpoint
curl -X POST https://youthpay.onrender.com/api/payslip/analyze \
  -H "Content-Type: application/json" \
  -d '{"filename":"test.pdf"}'

# Test rights endpoint
curl -X POST https://youthpay.onrender.com/api/rights/check \
  -H "Content-Type: application/json" \
  -d '{"age":17,"hourlyWage":28,"workType":"weekday","hours":86}'
```

## Step 6: Updating Your App

### 6.1 Make Changes Locally

Edit any files in your project:
```bash
# Example: edit README
notepad README.md
```

### 6.2 Commit and Push

```bash
git add .
git commit -m "Update: description of changes"
git push origin main
```

### 6.3 Auto-Deploy

- Render automatically detects the push
- Triggers a new build and deployment
- Monitor in the Render dashboard
- Takes ~2-3 minutes for updates

## Troubleshooting

### Build Fails

**Error**: `npm install failed`

**Solution**:
- Check that `package.json` exists in root
- Verify all dependencies are listed
- Check Render logs for specific error

### App Not Loading

**Error**: Blank page or 404

**Solution**:
1. Check build logs - did `npm run build` succeed?
2. Verify `client/dist/` was created during build
3. Check `server/index.js` serves static files correctly
4. Open browser console (F12) for errors

### API Endpoints 404

**Error**: `/api/...` returns 404

**Solution**:
- Verify routes are registered in `server/index.js`
- Check route files exist in `server/routes/`
- Ensure Express is running (check Render logs)

### Hebrew Text Not Displaying

**Solution**:
- Check `<html lang="he" dir="rtl">` in `client/index.html`
- Verify TailwindCSS is loading
- Clear browser cache and reload

## Performance Notes

### Free Tier Limitations

- Apps spin down after 15 minutes of inactivity
- First request after spin-down takes ~30 seconds
- 750 hours/month of runtime (restarts each month)

### Upgrade Options

For production use, consider:
- **Starter Plan ($7/month)**: No spin-down, better performance
- **Custom Domain**: Add your own domain name
- **SSL**: Free SSL certificates included

## Custom Domain Setup

### Add Custom Domain

1. Go to Render Dashboard
2. Select your `youthpay` service
3. Go to **"Settings"** → **"Custom Domain"**
4. Add your domain (e.g., `youthpay.com`)
5. Update DNS records as instructed by Render
6. Wait for SSL certificate (automatic, ~5 minutes)

## Monitoring

### View Logs

1. Go to Render Dashboard
2. Select `youthpay` service
3. Click **"Logs"** tab
4. Real-time logs show:
   - HTTP requests
   - Errors
   - Server starts/stops

### Metrics

- View CPU and memory usage
- Request counts
- Response times
- All available in Render Dashboard

## Useful Commands

```bash
# Local development
npm install           # Install backend deps
npm run build        # Build frontend
npm start            # Start server

# Frontend development
cd client
npm install          # Install frontend deps
npm run dev          # Start Vite dev server

# Git operations
git status           # Check changes
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub

# Check what will be deployed
git log -1           # View last commit
```

## Resources

- [Render Documentation](https://render.com/docs)
- [Express.js Guide](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [Vite Guide](https://vitejs.dev/guide/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

## Support

If you encounter issues:
1. Check Render logs first
2. Review this guide
3. Search Render Community Forum
4. Open issue on GitHub repository

---

**Congratulations! Your YouthPay app is now live! 🚀**
