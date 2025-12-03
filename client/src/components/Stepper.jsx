function Stepper({ steps, currentStep }) {
  return (
    <div className="flex items-center justify-between mb-6 px-2">
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
                    ? 'bg-primary-500 text-white shadow-soft'
                    : 'bg-gray-200 text-gray-400'
                }
              `}
            >
              {index + 1}
            </div>
            <span
              className={`
                text-xs mt-2 text-center max-w-[60px]
                ${index <= currentStep ? 'text-primary-600 font-semibold' : 'text-gray-400'}
              `}
            >
              {step}
            </span>
          </div>

          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`
                h-0.5 flex-1 mx-2 transition-all duration-300
                ${
                  index < currentStep
                    ? 'bg-primary-500'
                    : 'bg-gray-200'
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
