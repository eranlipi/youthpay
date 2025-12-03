import { useNavigate } from 'react-router-dom'
import Card from '../components/Card'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-4 text-shadow gradient-text">
          ברוכים הבאים ל-YouthPay!
        </h2>
        <p className="text-lg text-purple-200 leading-relaxed">
          המערכת שעוזרת לך להבין את תלוש השכר,
          <br />
          לבדוק את החוזה שלך, ולדעת מה מגיע לך 💪
        </p>
      </div>

      {/* Feature Cards */}
      <div className="space-y-4">
        <Card
          title="תלוש שכר"
          subtitle="בוא נבין מה כתוב פה"
          emoji="📊"
          description="העלה תלוש שכר ותקבל הסבר פשוט על כל השורות - בלי בלבול!"
          color="purple"
          onClick={() => navigate('/upload-payslip')}
        />

        <Card
          title="בדיקת חוזה"
          subtitle="האם החוזה תקין?"
          emoji="📄"
          description="העלה את החוזה שלך ונבדוק אם יש בעיות או סעיפים שצריך לשים לב אליהם"
          color="blue"
          onClick={() => navigate('/contract-analyzer')}
        />

        <Card
          title="מה מגיע לי?"
          subtitle="בואו נבדוק ביחד"
          emoji="🔍"
          description="ענה על כמה שאלות ונבדוק אם השכר שלך תקין לפי חוק העבודה"
          color="pink"
          onClick={() => navigate('/rights-checker')}
        />
      </div>

      {/* Info Banner */}
      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 rounded-2xl border-2 border-indigo-500/30">
        <div className="flex items-start gap-3">
          <span className="text-3xl">💡</span>
          <div>
            <h3 className="font-bold text-lg mb-2">למה YouthPay?</h3>
            <p className="text-sm text-purple-200 leading-relaxed">
              הרבה בני נוער לא יודעים לקרוא תלוש שכר או להבין את החוזה שחתמו עליו.
              YouthPay עוזר לך להבין את הזכויות שלך בצורה פשוטה וידידותית -
              כמו TikTok, אבל לזכויות עובדים! 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
