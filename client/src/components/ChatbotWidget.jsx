import { useState } from 'react'

const QA_PAIRS = [
  {
    q: 'למה ניכו לי כסף מהשכר?',
    a: 'ניכויים מהשכר כוללים בדרך כלל: ביטוח לאומי (3-7%), מס הכנסה (אם השכר מעל הסף), ופנסיה. זה חוקי ונורמלי!'
  },
  {
    q: 'מה זה שעות נוספות?',
    a: 'שעות נוספות הן שעות שעבדת מעבר ל-8 שעות ביום או 43 שעות בשבוע. מגיע לך תוספת של 25% או 50% תלוי בכמות השעות!'
  },
  {
    q: 'מה זה שכר מינימום?',
    a: 'שכר מינימום הוא השכר המינימלי שמעסיק חייב לשלם לפי חוק. הוא משתנה לפי גיל: מתחת ל-16, 16-18, ומעל 18.'
  },
  {
    q: 'האם יכולים לפטר אותי ככה סתם?',
    a: 'לא! יש כללים לפיטורים. בתקופת ניסיון (3 חודשים ראשונים) זה קל יותר, אבל אחרי זה צריך סיבה מוצדקת והתראה מראש.'
  },
  {
    q: 'מה זה דמי הבראה?',
    a: 'דמי הבראה זה כסף שמגיע לך פעם בשנה למטרת נופש. זה בערך 378 ש״ח לחודש עבודה (נכון ל-2024).'
  }
]

function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'היי! 👋 יש לך שאלה על זכויות עובדים?' }
  ])

  const handleQuestionClick = (qa) => {
    setMessages([
      ...messages,
      { type: 'user', text: qa.q },
      { type: 'bot', text: qa.a }
    ])
  }

  const resetChat = () => {
    setMessages([{ type: 'bot', text: 'היי! 👋 יש לך שאלה על זכויות עובדים?' }])
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 w-14 h-14 gradient-primary rounded-full shadow-soft-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center text-2xl z-50"
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col z-50 animate-slide-up">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex items-center justify-between gradient-primary rounded-t-2xl">
            <div className="text-white">
              <h3 className="font-bold text-base">צ'אטבוט YouthPay</h3>
              <p className="text-xs opacity-90">שואל ואני עונה!</p>
            </div>
            <button
              onClick={resetChat}
              className="text-white hover:bg-white/20 rounded-lg p-1.5 transition-colors text-sm"
            >
              🔄
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`${
                  msg.type === 'bot' ? 'text-right' : 'text-left'
                }`}
              >
                <div
                  className={`inline-block px-4 py-2 rounded-2xl max-w-[85%] ${
                    msg.type === 'bot'
                      ? 'bg-white text-gray-800 border border-gray-200'
                      : 'gradient-primary text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                </div>
              </div>
            ))}

            {/* Question Options */}
            {messages.length <= 2 && (
              <div className="space-y-2 mt-4">
                <p className="text-xs text-gray-500 text-center mb-2 font-semibold">
                  בחר שאלה:
                </p>
                {QA_PAIRS.map((qa, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuestionClick(qa)}
                    className="w-full text-right px-3 py-2 bg-white hover:bg-gray-100 rounded-lg text-sm transition-all duration-200 border border-gray-200 hover:border-primary-400 text-gray-700"
                  >
                    {qa.q}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

export default ChatbotWidget
