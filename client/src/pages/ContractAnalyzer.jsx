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
          bg: 'from-red-600 to-red-800',
          border: 'border-red-500',
          icon: '🚨'
        }
      case 'warning':
        return {
          bg: 'from-yellow-600 to-yellow-800',
          border: 'border-yellow-500',
          icon: '⚠️'
        }
      case 'info':
        return {
          bg: 'from-blue-600 to-blue-800',
          border: 'border-blue-500',
          icon: '✅'
        }
      default:
        return {
          bg: 'from-gray-600 to-gray-800',
          border: 'border-gray-500',
          icon: 'ℹ️'
        }
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 gradient-text">
          📄 בדיקת חוזה עבודה
        </h2>
        <p className="text-purple-200">
          נבדוק את החוזה שלך ונמצא בעיות אם יש
        </p>
      </div>

      {/* Upload Section */}
      {!results && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-8 border-2 border-purple-500/30 text-center">
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
              <div className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-block">
                {file ? 'שנה קובץ' : 'בחר חוזה'}
              </div>
            </label>

            {file && (
              <div className="mt-4">
                <p className="text-sm text-purple-300">
                  קובץ נבחר: {file.name}
                </p>
              </div>
            )}
          </div>

          {file && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed neon-glow"
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
        <div className="space-y-4">
          {/* Summary */}
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-6 border-2 border-purple-500/30 text-center">
            <h3 className="text-2xl font-bold mb-4">סיכום הבדיקה</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-3xl font-bold text-red-400">
                  {results.summary.danger}
                </div>
                <div className="text-xs text-red-300">בעיות חמורות</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">
                  {results.summary.warning}
                </div>
                <div className="text-xs text-yellow-300">אזהרות</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">
                  {results.summary.info}
                </div>
                <div className="text-xs text-blue-300">מידע</div>
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
                    bg-gradient-to-br ${styles.bg}
                    border-2 ${styles.border}
                    rounded-2xl p-5
                    card-shadow
                    animate-slide-up
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-3xl">{issue.emoji}</span>
                    <div className="flex-1">
                      <h4 className="font-bold text-lg mb-2">
                        {issue.text}
                      </h4>
                      <p className="text-sm text-white/90 leading-relaxed">
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
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 mt-6"
          >
            🔄 בדוק חוזה נוסף
          </button>
        </div>
      )}

      {/* Info Box */}
      {!results && (
        <div className="p-4 bg-indigo-900/30 rounded-xl border border-indigo-500/30">
          <div className="flex items-start gap-2">
            <span className="text-xl">💡</span>
            <div className="text-sm text-purple-200">
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
