import { useState } from 'react'
import Stepper from '../components/Stepper'
import Card from '../components/Card'

const STEPS = ['גיל', 'שכר', 'סוג עבודה', 'שעות', 'תוצאות']

function RightsChecker() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    age: '',
    hourlyWage: '',
    workType: '',
    hours: '',
  })
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleNext = () => {
    // Validation
    if (currentStep === 0 && !formData.age) {
      alert('אנא הזן את הגיל שלך')
      return
    }
    if (currentStep === 1 && !formData.hourlyWage) {
      alert('אנא הזן את שכר השעה שלך')
      return
    }
    if (currentStep === 2 && !formData.workType) {
      alert('אנא בחר את סוג העבודה')
      return
    }
    if (currentStep === 3 && !formData.hours) {
      alert('אנא הזן את מספר השעות')
      return
    }

    if (currentStep === 3) {
      // Last step - check rights
      checkRights()
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setResults(null)
    }
  }

  const handleReset = () => {
    setCurrentStep(0)
    setFormData({
      age: '',
      hourlyWage: '',
      workType: '',
      hours: '',
    })
    setResults(null)
  }

  const checkRights = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/rights/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setResults(data)
      setCurrentStep(4) // Move to results step
    } catch (error) {
      console.error('Error:', error)
      alert('אופס! משהו השתבש. נסה שוב.')
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-6xl mb-4 block">🎂</span>
              <h3 className="text-2xl font-bold mb-2">כמה אתה בן/בת?</h3>
              <p className="text-sm text-purple-300">
                הגיל משפיע על שכר המינימום
              </p>
            </div>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="הזן גיל (למשל: 17)"
              className="w-full px-6 py-4 text-xl text-center bg-purple-900/50 border-2 border-purple-500/50 rounded-xl focus:outline-none focus:border-purple-400 text-white placeholder-purple-400"
              min="14"
              max="25"
            />
          </div>
        )

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-6xl mb-4 block">💰</span>
              <h3 className="text-2xl font-bold mb-2">כמה אתה מקבל לשעה?</h3>
              <p className="text-sm text-purple-300">
                שכר השעה ברוטו (לפני ניכויים)
              </p>
            </div>
            <input
              type="number"
              value={formData.hourlyWage}
              onChange={(e) => setFormData({ ...formData, hourlyWage: e.target.value })}
              placeholder="הזן שכר לשעה (למשל: 28)"
              className="w-full px-6 py-4 text-xl text-center bg-purple-900/50 border-2 border-purple-500/50 rounded-xl focus:outline-none focus:border-purple-400 text-white placeholder-purple-400"
              step="0.1"
            />
            <div className="text-center text-xs text-purple-300">
              ₪ לשעה
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-6xl mb-4 block">📅</span>
              <h3 className="text-2xl font-bold mb-2">איזה סוג עבודה?</h3>
              <p className="text-sm text-purple-300">
                בחר את סוג העבודה שלך
              </p>
            </div>
            <div className="space-y-3">
              {[
                { value: 'weekday', label: 'ימי חול רגילים', emoji: '📆' },
                { value: 'weekend', label: 'סופי שבוע / שבת', emoji: '🎉' },
                { value: 'holiday', label: 'חגים', emoji: '🎊' },
                { value: 'night', label: 'משמרת לילה', emoji: '🌙' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFormData({ ...formData, workType: option.value })}
                  className={`
                    w-full px-6 py-4 rounded-xl text-right font-bold
                    transition-all duration-300 transform hover:scale-105
                    flex items-center gap-3
                    ${
                      formData.workType === option.value
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-2 border-purple-400 neon-glow'
                        : 'bg-purple-900/30 border-2 border-purple-500/30 hover:bg-purple-800/40'
                    }
                  `}
                >
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="flex-1">{option.label}</span>
                  {formData.workType === option.value && <span>✓</span>}
                </button>
              ))}
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-6xl mb-4 block">⏰</span>
              <h3 className="text-2xl font-bold mb-2">כמה שעות עבדת?</h3>
              <p className="text-sm text-purple-300">
                מספר השעות בתקופה שאתה בודק
              </p>
            </div>
            <input
              type="number"
              value={formData.hours}
              onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
              placeholder="הזן מספר שעות (למשל: 86)"
              className="w-full px-6 py-4 text-xl text-center bg-purple-900/50 border-2 border-purple-500/50 rounded-xl focus:outline-none focus:border-purple-400 text-white placeholder-purple-400"
              step="0.5"
            />
            <div className="text-center text-xs text-purple-300">
              שעות עבודה
            </div>
          </div>
        )

      case 4:
        if (!results) return null

        return (
          <div className="space-y-4">
            {/* Main Status Card */}
            <div
              className={`
                rounded-2xl p-8 text-center card-shadow border-4
                ${
                  results.status === 'ok'
                    ? 'bg-gradient-to-br from-green-600 to-green-800 border-green-400'
                    : 'bg-gradient-to-br from-red-600 to-red-800 border-red-400'
                }
              `}
            >
              <div className="text-7xl mb-4">
                {results.status === 'ok' ? '✅' : '🚨'}
              </div>
              <h3 className="text-3xl font-bold mb-2">
                {results.status === 'ok' ? 'הכל תקין!' : 'יש בעיה!'}
              </h3>
              <p className="text-lg">
                {results.status === 'ok'
                  ? 'השכר שלך מעל שכר המינימום החוקי'
                  : 'השכר שלך נמוך משכר המינימום'}
              </p>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-purple-900/50 rounded-xl p-4 border-2 border-purple-500/30">
                <div className="text-xs text-purple-300 mb-1">שכר המינימום</div>
                <div className="text-2xl font-bold">
                  ₪{results.legal_min_wage}
                </div>
              </div>
              <div className="bg-purple-900/50 rounded-xl p-4 border-2 border-purple-500/30">
                <div className="text-xs text-purple-300 mb-1">השכר שלך</div>
                <div className="text-2xl font-bold">
                  ₪{results.your_wage}
                </div>
              </div>
            </div>

            {/* Messages */}
            {results.messages && results.messages.map((msg, idx) => {
              const bgColor = msg.type === 'danger' ? 'from-red-600 to-red-800' :
                             msg.type === 'warning' ? 'from-yellow-600 to-yellow-800' :
                             msg.type === 'success' ? 'from-green-600 to-green-800' :
                             'from-blue-600 to-blue-800'

              return (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${bgColor} rounded-xl p-5 border-2 border-white/20`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{msg.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-bold mb-1">{msg.text}</h4>
                      <p className="text-sm text-white/90">{msg.detail}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 gradient-text">
          🔍 בדיקת זכויות
        </h2>
        <p className="text-purple-200">
          בוא נבדוק אם מה שמגיע לך תקין
        </p>
      </div>

      {/* Stepper */}
      <Stepper steps={STEPS} currentStep={currentStep} />

      {/* Content */}
      <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-6 border-2 border-purple-500/30 min-h-[400px] flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 4 && (
          <div className="flex gap-3 mt-6">
            {currentStep > 0 && (
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300"
              >
                ← חזור
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 neon-glow"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  בודק...
                </span>
              ) : currentStep === 3 ? (
                '✓ בדוק'
              ) : (
                'המשך →'
              )}
            </button>
          </div>
        )}

        {currentStep === 4 && (
          <button
            onClick={handleReset}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 mt-6"
          >
            🔄 בדיקה חדשה
          </button>
        )}
      </div>
    </div>
  )
}

export default RightsChecker
