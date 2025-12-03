function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between mb-8 px-4">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center flex-1">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`
                w-10 h-10 rounded-full flex items-center justify-center
                font-bold text-sm transition-all duration-300
                ${
                  index <= currentStep
                    ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white neon-glow'
                    : 'bg-gray-700 text-gray-400'
                }
              `}
            >
              {index + 1}
            </div>
            <span
              className={`
                text-xs mt-2 text-center
                ${index <= currentStep ? 'text-purple-300 font-semibold' : 'text-gray-500'}
              `}
            >
              {step}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`
                h-1 flex-1 mx-2 rounded transition-all duration-300
                ${
                  index < currentStep
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'bg-gray-700'
                }
              `}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default Stepper
