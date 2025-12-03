const express = require('express');
const router = express.Router();

// Minimum wage data (mock - as of 2024)
const MINIMUM_WAGE_DATA = {
  adult: 30.0,        // 18+
  youth_16_18: 24.54, // 16-18
  youth_under_16: 21.2 // Under 16
};

// Calculate minimum wage based on age
function getMinimumWage(age) {
  if (age >= 18) return MINIMUM_WAGE_DATA.adult;
  if (age >= 16) return MINIMUM_WAGE_DATA.youth_16_18;
  return MINIMUM_WAGE_DATA.youth_under_16;
}

// Calculate expected pay
function calculateExpectedPay(hourlyWage, hours, workType) {
  let multiplier = 1.0;

  switch(workType) {
    case 'weekend':
      multiplier = 1.5; // 150%
      break;
    case 'holiday':
      multiplier = 2.0; // 200%
      break;
    case 'night':
      multiplier = 1.25; // 125%
      break;
    default:
      multiplier = 1.0;
  }

  return hourlyWage * hours * multiplier;
}

// POST /api/rights/check
router.post('/check', (req, res) => {
  const { age, hourlyWage, workType, hours } = req.body;

  // Validate input
  if (!age || !hourlyWage || !workType || !hours) {
    return res.status(400).json({
      success: false,
      error: 'חסרים נתונים. אנא מלא את כל השדות'
    });
  }

  const legalMinWage = getMinimumWage(parseInt(age));
  const expectedPay = calculateExpectedPay(parseFloat(hourlyWage), parseFloat(hours), workType);
  const isBelowMinimum = parseFloat(hourlyWage) < legalMinWage;

  let messages = [];
  let status = 'ok';

  if (isBelowMinimum) {
    status = 'danger';
    messages.push({
      type: 'danger',
      text: `השכר שלך נמוך משכר המינימום!`,
      emoji: '🚨',
      detail: `שכר המינימום לגילך הוא ${legalMinWage} ש״ח לשעה, ואתה מקבל רק ${hourlyWage} ש״ח`
    });
    messages.push({
      type: 'info',
      text: 'מה אפשר לעשות?',
      emoji: '💪',
      detail: 'דבר עם המעסיק שלך ובקש להתאים את השכר לחוק. אם הוא מסרב, אפשר לפנות למשרד העבודה'
    });
  } else {
    messages.push({
      type: 'success',
      text: 'השכר שלך תקין!',
      emoji: '✅',
      detail: `אתה מקבל ${hourlyWage} ש״ח לשעה, שזה מעל שכר המינימום של ${legalMinWage} ש״ח`
    });
  }

  // Add work type specific messages
  if (workType === 'weekend') {
    messages.push({
      type: 'info',
      text: 'עבודה בסופ״ש',
      emoji: '📅',
      detail: 'עבודה בשבת או יום מנוחה שבועי מזכה ב-150% שכר (שעה וחצי)'
    });
  } else if (workType === 'holiday') {
    messages.push({
      type: 'info',
      text: 'עבודה בחג',
      emoji: '🎉',
      detail: 'עבודה בחג מזכה ב-200% שכר (שכר כפול)!'
    });
  }

  // Age-specific messages
  if (parseInt(age) < 16) {
    messages.push({
      type: 'warning',
      text: 'מגבלות גיל',
      emoji: '⚠️',
      detail: 'מתחת לגיל 16 יש מגבלות על שעות העבודה. מותר לעבוד עד 8 שעות ביום ו-40 שעות בשבוע'
    });
  }

  res.json({
    success: true,
    status,
    legal_min_wage: legalMinWage,
    your_wage: parseFloat(hourlyWage),
    is_below_minimum: isBelowMinimum,
    expected_pay: expectedPay.toFixed(2),
    messages
  });
});

module.exports = router;
