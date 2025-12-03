const express = require('express');
const router = express.Router();

// Mock data for payslip analysis
const mockPayslipData = {
  hours: 86,
  hourly_rate: 29,
  overtime_hours: 4,
  overtime_pay: 174,
  bonuses: 200,
  deductions: 120,
  gross_salary: 2794,
  net_salary: 2500,
  period: "נובמבר 2024"
};

// POST /api/payslip/analyze
router.post('/analyze', (req, res) => {
  // In a real app, you would process the uploaded file here
  // For prototype, we return mock data

  setTimeout(() => {
    res.json({
      success: true,
      data: mockPayslipData,
      breakdown: [
        {
          title: "עבדת החודש",
          value: `${mockPayslipData.hours} שעות`,
          emoji: "🔥",
          color: "purple"
        },
        {
          title: "שכר לשעה",
          value: `${mockPayslipData.hourly_rate} ש״ח`,
          emoji: "💰",
          color: "blue"
        },
        {
          title: "שעות נוספות",
          value: `${mockPayslipData.overtime_hours} שעות`,
          emoji: "⏰",
          color: "green"
        },
        {
          title: "תשלום שעות נוספות",
          value: `${mockPayslipData.overtime_pay} ש״ח`,
          emoji: "💸",
          color: "green"
        },
        {
          title: "בונוסים",
          value: `${mockPayslipData.bonuses} ש״ח`,
          emoji: "🎁",
          color: "yellow"
        },
        {
          title: "ניכויים",
          value: `${mockPayslipData.deductions} ש״ח`,
          emoji: "📉",
          color: "red"
        },
        {
          title: "שכר נטו",
          value: `${mockPayslipData.net_salary} ש״ח`,
          emoji: "💵",
          color: "purple",
          highlight: true
        }
      ]
    });
  }, 1500); // Simulate processing time
});

module.exports = router;
