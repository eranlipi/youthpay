function Card({ title, subtitle, emoji, description, color = 'primary', highlight = false, onClick, className = '' }) {
  const colorClasses = {
    primary: 'bg-white border-primary-200 hover:border-primary-400',
    pink: 'bg-white border-pink-200 hover:border-pink-400',
    blue: 'bg-white border-blue-200 hover:border-blue-400',
    green: 'bg-white border-green-200 hover:border-green-400',
    orange: 'bg-white border-orange-200 hover:border-orange-400',
    purple: 'bg-white border-purple-200 hover:border-purple-400',
    red: 'bg-white border-red-200 hover:border-red-400',
  }

  const emojiColors = {
    primary: 'text-primary-500',
    pink: 'text-pink-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    orange: 'text-orange-500',
    purple: 'text-purple-500',
    red: 'text-red-500',
  }

  const titleColors = {
    primary: 'text-gray-800',
    pink: 'text-pink-600',
    blue: 'text-blue-600',
    green: 'text-green-600',
    orange: 'text-orange-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
  }

  const baseClasses = `
    rounded-2xl p-6 mb-3
    ${colorClasses[color] || colorClasses.primary}
    border-2 shadow-card
    transform transition-all duration-200
    hover:-translate-y-1 hover:shadow-soft-lg
    animate-slide-up
    ${highlight ? 'ring-2 ring-primary-400 shadow-soft-lg' : ''}
    ${onClick ? 'cursor-pointer active:scale-[0.98]' : ''}
    ${className}
  `

  return (
    <div className={baseClasses} onClick={onClick}>
      {emoji && (
        <div className={`text-5xl mb-3 text-center ${emojiColors[color]}`}>
          {emoji}
        </div>
      )}
      {title && (
        <h3 className={`text-xl font-bold mb-2 text-center ${titleColors[color]}`}>
          {title}
        </h3>
      )}
      {subtitle && (
        <p className="text-2xl font-bold text-center mb-2 text-gray-900">
          {subtitle}
        </p>
      )}
      {description && (
        <p className="text-sm text-center text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}

export default Card
