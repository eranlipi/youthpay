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
    <div className="space-y-4 animate-fade-in">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">
          📊 ניתוח תלוש שכר
        </h2>
        <p className="text-gray-600">
          העלה את התלוש שלך ונסביר לך הכל!
        </p>
      </div>

      {/* Upload Section */}
      {!results && (
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-8 border-2 border-dashed border-gray-300 text-center hover:border-primary-400 transition-colors">
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
              <div className="gradient-primary text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95 inline-block">
                {file ? 'שנה קובץ' : 'בחר קובץ'}
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
                  מנתח את התלוש...
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
        <div className="space-y-3">
          <div className="text-center mb-4 bg-green-50 rounded-xl p-4 border border-green-200">
            <h3 className="text-xl font-bold text-green-700 mb-1">
              ✅ ניתוח הושלם!
            </h3>
            <p className="text-sm text-green-600">
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
            className="w-full bg-white text-gray-700 font-semibold py-3 px-6 rounded-xl border-2 border-gray-200 hover:border-primary-400 transition-all duration-200 active:scale-95 mt-6"
          >
            🔄 נתח תלוש נוסף
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
