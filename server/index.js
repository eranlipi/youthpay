const express = require('express');
const path = require('path');
const cors = require('cors');

const payslipRouter = require('./routes/payslip');
const contractRouter = require('./routes/contract');
const rightsRouter = require('./routes/rights');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/payslip', payslipRouter);
app.use('/api/contract', contractRouter);
app.use('/api/rights', rightsRouter);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/dist')));

// Catch-all handler: serve index.html for any request that doesn't match an API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 YouthPay server running on port ${PORT}`);
  console.log(`📱 API available at http://localhost:${PORT}/api`);
  console.log(`🌐 Frontend available at http://localhost:${PORT}`);
});
