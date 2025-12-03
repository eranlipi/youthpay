import { useState } from 'react'

function ContractAnalyzer() {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState(null)

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setResults(null)
    }
  }

  const handleAnalyze = async () => {
    if (!file) {
      alert('אנא בחר קובץ תחילה')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/contract/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename: file.name }),
      })

      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error('Error:', error)
      alert('אופס! משהו השתבש. נסה שוב.')
    } finally {
      setLoading(false)
    }
  }

  const getTypeStyles = (type) => {
    switch (type) {
      case 'danger':
        return {
          bg: 'bg-red-50',
          border: 'border-red-300',
          text: 'text-red-800',
          icon: '🚨'
        }
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-300',
          text: 'text-yellow-800',
          icon: '⚠️'
        }
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-300',
          text: 'text-blue-800',
          icon: '✅'
        }
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-300',
          text: 'text-gray-800',
          icon: 'ℹ️'
        }
    }
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          📄 בדיקת חוזה עבודה
        </h2>
        <p className="text-gray-600">
          נבדוק את החוזה שלך ונמצא בעיות אם יש
        </p>
      </div>

      {/* Upload Section */}
      {!results && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-8 border-2 border-dashed border-gray-300 text-center hover:border-blue-400 transition-colors">
            <div className="mb-6">
              <span className="text-6xl">📑</span>
            </div>

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 active:scale-95 inline-block">
                {file ? 'שנה קובץ' : 'בחר חוזה'}
              </div>
            </label>

            {file && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 bg-gray-50 inline-block px-4 py-2 rounded-lg">
                  📎 {file.name}
                </p>
              </div>
            )}
          </div>

          {file && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full gradient-pink text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-soft"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-spin">⚙️</span>
                  בודק את החוזה...
                </span>
              ) : (
                '🔍 בדוק את החוזה'
              )}
            </button>
          )}
        </div>
      )}

      {/* Results Section */}
      {results && results.issues && (
        <div className="space-y-3">
          {/* Summary */}
          <div className="bg-white rounded-2xl p-5 border-2 border-gray-200 shadow-card">
            <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">סיכום הבדיקה</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">
                  {results.summary.danger}
                </div>
                <div className="text-xs text-red-600">בעיות חמורות</div>
              </div>
              <div className="text-center p-3 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">
                  {results.summary.warning}
                </div>
                <div className="text-xs text-yellow-600">אזהרות</div>
              </div>
              <div className="text-center p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {results.summary.info}
                </div>
                <div className="text-xs text-blue-600">מידע</div>
              </div>
            </div>
          </div>

          {/* Issues */}
          <div className="space-y-3">
            {results.issues.map((issue, index) => {
              const styles = getTypeStyles(issue.type)
              return (
                <div
                  key={index}
                  className={`
                    ${styles.bg} border-2 ${styles.border}
                    rounded-2xl p-5 ${styles.text}
                    animate-slide-up shadow-card
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{issue.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-base mb-2">
                        {issue.text}
                      </h4>
                      <p className="text-sm opacity-80 leading-relaxed">
                        {issue.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <button
            onClick={() => {
              setFile(null)
              setResults(null)
            }}
            className="w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-primary-400 transition-all duration-200 active:scale-95 mt-6"
          >
            🔄 בדוק חוזה נוסף
          </button>
        </div>
      )}

      {/* Info Box */}
      {!results && (
        <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <div className="text-sm text-blue-800">
              <p className="font-bold mb-1">טיפ:</p>
              <p>
                המערכת תבדוק סעיפים חשובים כמו: זכאות לחופשה, ניכויים לא חוקיים,
                תשלום שעות נוספות, תקופת ניסיון ועוד. זה אורך כ-2-3 שניות!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ContractAnalyzer
