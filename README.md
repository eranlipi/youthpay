# YouthPay 💼

**YouthPay** is a web-based prototype that helps teenagers understand payslips, employment contracts, and their labor rights using a TikTok/Instagram-style interface.

## 🎯 Features

- **📊 Payslip Analyzer**: Upload your payslip and get a simple, visual breakdown of all components
- **📄 Contract Analyzer**: Check your employment contract for potential issues and rights violations
- **🔍 Rights Checker**: Step-by-step wizard to verify if your wage meets legal minimum requirements
- **💬 Chatbot Widget**: Quick Q&A for common labor rights questions

## 🛠️ Tech Stack

### Backend
- Node.js + Express
- REST API with mock data
- Serves static frontend files

### Frontend
- React 18
- Vite (build tool)
- TailwindCSS (styling)
- React Router (navigation)
- RTL (Right-to-Left) support for Hebrew

## 📁 Project Structure

```
youthpay/
├── package.json              # Root package.json (backend)
├── render.yaml               # Render deployment config
├── .gitignore
├── README.md
├── server/
│   ├── index.js             # Express server entry point
│   └── routes/
│       ├── payslip.js       # Payslip analysis API
│       ├── contract.js      # Contract analysis API
│       └── rights.js        # Rights checker API
└── client/
    ├── package.json         # Frontend dependencies
    ├── vite.config.js       # Vite configuration
    ├── tailwind.config.js   # TailwindCSS configuration
    ├── postcss.config.js
    ├── index.html
    └── src/
        ├── main.jsx         # React entry point
        ├── App.jsx          # Main app with routing
        ├── styles/
        │   └── index.css    # Global styles + Tailwind
        ├── components/
        │   ├── Layout.jsx   # Main layout wrapper
        │   ├── Card.jsx     # Reusable card component
        │   ├── Stepper.jsx  # Step indicator
        │   └── ChatbotWidget.jsx  # Floating chatbot
        └── pages/
            ├── Home.jsx              # Landing page
            ├── UploadPayslip.jsx     # Payslip upload & analysis
            ├── ContractAnalyzer.jsx  # Contract checker
            └── RightsChecker.jsx     # Rights verification wizard
```

## 🚀 Local Development

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation & Running

1. **Install root dependencies** (backend):
   ```bash
   npm install
   ```

2. **Install client dependencies**:
   ```bash
   cd client
   npm install
   cd ..
   ```

3. **Build the client** (creates `client/dist/`):
   ```bash
   npm run build
   ```

4. **Start the server**:
   ```bash
   npm start
   ```

5. **Open your browser**:
   ```
   http://localhost:3000
   ```

The server will serve both:
- API endpoints at `/api/*`
- Frontend React app at `/`

### Development Mode (Optional)

For frontend development with hot reload:

```bash
# Terminal 1 - Run backend
npm start

# Terminal 2 - Run Vite dev server
cd client
npm run dev
```

This runs frontend on `http://localhost:5173` with proxy to backend on port 3000.

## 🌐 Deployment to Render.com

### Option 1: Using render.yaml (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - YouthPay prototype"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/youthpay.git
   git push -u origin main
   ```

2. **Deploy on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Blueprint"**
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml` and configure everything
   - Click **"Apply"**

3. **Done!** Your app will be live at `https://youthpay.onrender.com` (or similar)

### Option 2: Manual Web Service Setup

1. **Push to GitHub** (same as above)

2. **Create Web Service on Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Configure:
     - **Name**: `youthpay`
     - **Environment**: `Node`
     - **Build Command**: `npm install && npm run build`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Environment Variables** (optional):
   - `NODE_ENV`: `production`

4. **Deploy**: Click **"Create Web Service"**

5. **Wait**: First build takes 2-5 minutes

6. **Access**: Your app will be live at the provided Render URL!

## 📝 API Endpoints

### POST `/api/payslip/analyze`
Analyzes a payslip and returns breakdown data.

**Request Body**:
```json
{
  "filename": "payslip.pdf"
}
```

**Response**:
```json
{
  "success": true,
  "data": { ... },
  "breakdown": [
    {
      "title": "עבדת החודש",
      "value": "86 שעות",
      "emoji": "🔥",
      "color": "purple"
    },
    ...
  ]
}
```

### POST `/api/contract/analyze`
Analyzes an employment contract for issues.

**Response**:
```json
{
  "success": true,
  "issues": [
    {
      "type": "danger",
      "text": "ניכוי קנסות ללא הסכמה מפורשת",
      "emoji": "🚨",
      "explanation": "..."
    },
    ...
  ],
  "summary": {
    "total": 5,
    "danger": 1,
    "warning": 2,
    "info": 2
  }
}
```

### POST `/api/rights/check`
Checks if wage meets legal requirements.

**Request Body**:
```json
{
  "age": 17,
  "hourlyWage": 28,
  "workType": "weekday",
  "hours": 86
}
```

**Response**:
```json
{
  "success": true,
  "status": "ok",
  "legal_min_wage": 24.54,
  "your_wage": 28,
  "is_below_minimum": false,
  "messages": [...]
}
```

## 🎨 UI/UX Design

- **RTL (Right-to-Left)**: Full Hebrew support
- **Mobile-First**: Optimized for phones (375px base)
- **Dark Theme**: Purple/indigo gradient background
- **Social Media Style**: Card-based layout with emojis and animations
- **Responsive**: Works on all screen sizes

## 📱 Features in Detail

### 1. Payslip Analyzer
- Upload PDF, PNG, or JPG files
- Simulated analysis (mock data for prototype)
- Visual breakdown with colored cards
- Shows: hours worked, hourly rate, overtime, bonuses, deductions, net salary

### 2. Contract Analyzer
- Upload contract files
- Identifies issues categorized as:
  - 🚨 **Danger**: Serious legal violations
  - ⚠️ **Warning**: Potential issues
  - ✅ **Info**: Informational items
- Provides explanations in simple Hebrew

### 3. Rights Checker
- 4-step wizard:
  1. Enter age
  2. Enter hourly wage
  3. Select work type (weekday/weekend/holiday/night)
  4. Enter hours worked
- Compares against legal minimum wage
- Shows personalized results with actionable advice

### 4. Chatbot Widget
- Floating button (bottom-left)
- Pre-programmed Q&A pairs
- Common questions about:
  - Deductions
  - Overtime
  - Minimum wage
  - Firing rules
  - Benefits (דמי הבראה)

## 🔒 Important Notes

- This is a **prototype** with mock data
- No real file processing or AI analysis
- All data is hardcoded for demonstration
- **Do not use for actual legal advice**
- Educational purposes only

## 🚧 Future Enhancements

- Real PDF/OCR processing
- Database for user history
- Real AI-powered contract analysis
- User authentication
- Multi-language support
- Export reports as PDF
- Integration with labor law APIs

## 📄 License

MIT License - Free to use and modify

## 🤝 Contributing

This is a prototype/demo. Feel free to fork and enhance!

## 📞 Support

For issues or questions, please open an issue on GitHub.

---

**Made with ❤️ for teenagers learning about their rights**

🔗 **YouthPay** - זכויות עובדים לנוער
