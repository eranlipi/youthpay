import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Hero Section - Clean & Modern */}
      <div className="text-center pt-4 pb-2">
        <h2 className="text-3xl font-bold mb-3 text-gray-900">
          ברוכים הבאים ל-<span className="gradient-text">YouthPay</span>
        </h2>
        <p className="text-base text-gray-600 leading-relaxed px-2">
          המערכת שעוזרת לך להבין את תלוש השכר,
          לבדוק את החוזה שלך, ולדעת מה מגיע לך 💪
        </p>
      </div>

      {/* Feature Cards - TikTok/Facebook Style */}
      <div className="space-y-3 pt-2">
        <Card
          title="תלוש שכר"
          subtitle="בוא נבין מה כתוב פה"
          emoji="📊"
          description="העלה תלוש שכר ותקבל הסבר פשוט על כל השורות"
          color="primary"
          onClick={() => navigate('/upload-payslip')}
        />

        <Card
          title="בדיקת חוזה"
          subtitle="האם החוזה תקין?"
          emoji="📄"
          description="העלה את החוזה שלך ונבדוק אם יש בעיות"
          color="blue"
          onClick={() => navigate('/contract-analyzer')}
        />

        <Card
          title="מה מגיע לי?"
          subtitle="בואו נבדוק ביחד"
          emoji="🔍"
          description="ענה על כמה שאלות ונבדוק אם השכר שלך תקין"
          color="pink"
          onClick={() => navigate('/rights-checker')}
        />
      </div>

      {/* Info Banner - Clean Style */}
      <div className="mt-6 p-5 bg-white rounded-2xl border-2 border-primary-100 shadow-card">
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <h3 className="font-bold text-base mb-2 text-gray-900">למה YouthPay?</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              הרבה בני נוער לא יודעים לקרוא תלוש שכר או להבין את החוזה שחתמו עליו.
              YouthPay עוזר לך להבין את הזכויות שלך בצורה פשוטה וידידותית 🚀
            </p>
          </div>
        </div>
      </div>

      {/* Stats or Trust indicators */}
      <div className="grid grid-cols-3 gap-3 pt-2">
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-primary-500">100%</div>
          <div className="text-xs text-gray-500">חינם</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-pink-500">1 דק׳</div>
          <div className="text-xs text-gray-500">ניתוח</div>
        </div>
        <div className="bg-white rounded-xl p-4 text-center border border-gray-200">
          <div className="text-2xl font-bold text-green-500">✓</div>
          <div className="text-xs text-gray-500">מהימן</div>
        </div>
      </div>
    </div>
  )
}

export default Home
