function Card({ title, subtitle, emoji, description, color = 'purple', highlight = false, onClick }) {
  const colorClasses = {
    purple: 'from-purple-600 to-purple-800 border-purple-500',
    blue: 'from-blue-600 to-blue-800 border-blue-500',
    green: 'from-green-600 to-green-800 border-green-500',
    yellow: 'from-yellow-600 to-yellow-800 border-yellow-500',
    red: 'from-red-600 to-red-800 border-red-500',
    pink: 'from-pink-600 to-pink-800 border-pink-500',
  }

  const baseClasses = `
    rounded-2xl p-6 mb-4
    bg-gradient-to-br ${colorClasses[color] || colorClasses.purple}
    border-2 card-shadow
    transform transition-all duration-300
    hover:scale-105 hover:shadow-2xl
    animate-slide-up
    ${highlight ? 'neon-glow ring-4 ring-purple-500/50' : ''}
    ${onClick ? 'cursor-pointer' : ''}
  `

  return (
    <div className={baseClasses} onClick={onClick}>
      {emoji && (
        <div className="text-5xl mb-3 text-center float-animation">
          {emoji}
        </div>
      )}
      {title && (
        <h3 className="text-2xl font-bold mb-2 text-center text-shadow">
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-3xl font-extrabold text-center mb-2">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-sm text-center text-white/90 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export default Card
