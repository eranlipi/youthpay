import { Link, useLocation } from 'react-router-dom'
import ChatbotWidget from './ChatbotWidget'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - Clean & Modern */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 group">
              <span className="text-3xl transition-transform group-hover:scale-110">💼</span>
              <div>
                <h1 className="text-xl font-bold gradient-text">YouthPay</h1>
                <p className="text-xs text-gray-500">זכויות עובדים לנוער</p>
              </div>
            </Link>

            {/* Optional: Navigation dots */}
            {location.pathname !== '/' && (
              <Link
                to="/"
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-lg">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            💡 המידע באפליקציה הוא למטרות חינוכיות בלבד
          </p>
          <p className="text-xs text-gray-400">
            YouthPay © 2024
          </p>
        </div>
      </footer>

      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  )
}

export default Layout
