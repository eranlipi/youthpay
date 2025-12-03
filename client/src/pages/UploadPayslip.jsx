import { useState } from 'react'
import Card from '../components/Card'

function UploadPayslip() {
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
      // In prototype, we don't actually send the file
      // Just call the API to get mock data
      const response = await fetch('/api/payslip/analyze', {
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

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-3 gradient-text">
          📊 ניתוח תלוש שכר
        </h2>
        <p className="text-purple-200">
          העלה את התלוש שלך ונסביר לך הכל!
        </p>
      </div>

      {/* Upload Section */}
      {!results && (
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-8 border-2 border-purple-500/30 text-center">
            <div className="mb-6">
              <span className="text-6xl">📤</span>
            </div>

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 inline-block">
                {file ? 'שנה קובץ' : 'בחר קובץ'}
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
                  מנתח...
                </span>
              ) : (
                '🚀 נתח את התלוש'
              )}
            </button>
          )}
        </div>
      )}

      {/* Results Section */}
      {results && results.breakdown && (
        <div className="space-y-4">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-green-400 mb-2">
              ✅ ניתוח הושלם!
            </h3>
            <p className="text-sm text-purple-300">
              הנה פירוט מלא של התלוש שלך
            </p>
          </div>

          {results.breakdown.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              subtitle={item.value}
              emoji={item.emoji}
              color={item.color}
              highlight={item.highlight}
            />
          ))}

          <button
            onClick={() => {
              setFile(null)
              setResults(null)
            }}
            className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 mt-6"
          >
            🔄 נתח תלוש נוסף
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
                התלוש יכול להיות בפורמט PDF, תמונה (PNG, JPG) או צילום מסך.
                המערכת תנתח אותו ותסביר לך מה כל סעיף אומר!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UploadPayslip
