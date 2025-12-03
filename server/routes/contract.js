const express = require('express');
const router = express.Router();

// Mock contract analysis results
const mockContractIssues = [
  {
    type: "danger",
    text: "ניכוי קנסות ללא הסכמה מפורשת - זה לא חוקי!",
    emoji: "🚨",
    explanation: "המעסיק לא יכול לנכות קנסות משכרך ללא הסכמה בכתב"
  },
  {
    type: "warning",
    text: "אין ימי חופשה מוגדרים בחוזה",
    emoji: "⚠️",
    explanation: "לפי חוק, מגיעים לך ימי חופשה. חשוב שזה יצוין בחוזה"
  },
  {
    type: "warning",
    text: "לא צוין זכאות לדמי הבראה",
    emoji: "🏖️",
    explanation: "דמי הבראה הם זכות חוקית - וודא שהם נכללים בתנאי העבודה"
  },
  {
    type: "info",
    text: "שעות נוספות ישולמו לפי חוק",
    emoji: "✅",
    explanation: "החוזה מציין ששעות נוספות ישולמו ב-125% או 150% לפי החוק"
  },
  {
    type: "info",
    text: "תקופת ניסיון: 3 חודשים",
    emoji: "📋",
    explanation: "זה תקין - תקופת ניסיון סטנדרטית היא עד 3 חודשים"
  }
];

// POST /api/contract/analyze
router.post('/analyze', (req, res) => {
  // In a real app, you would process the uploaded contract file here
  // For prototype, we return mock data

  setTimeout(() => {
    res.json({
      success: true,
      issues: mockContractIssues,
      summary: {
        total: mockContractIssues.length,
        danger: mockContractIssues.filter(i => i.type === 'danger').length,
        warning: mockContractIssues.filter(i => i.type === 'warning').length,
        info: mockContractIssues.filter(i => i.type === 'info').length
      }
    });
  }, 2000); // Simulate processing time
});

module.exports = router;
