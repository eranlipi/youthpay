import { Link, useLocation } from 'react-router-dom'
import ChatbotWidget from './ChatbotWidget'

function Layout({ children }) {
  const location = useLocation()

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900/50 to-indigo-900/50 backdrop-blur-lg border-b border-purple-500/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl">💼</span>
              <h1 className="text-2xl font-bold gradient-text">YouthPay</h1>
            </Link>
            <div className="text-sm text-purple-300">
              זכויות עובדים לנוער
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6 max-w-md">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-lg border-t border-purple-500/20 py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-purple-300">
            💡 המידע באפליקציה הוא למטרות חינוכיות בלבד
          </p>
          <p className="text-xs text-purple-400 mt-2">
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
