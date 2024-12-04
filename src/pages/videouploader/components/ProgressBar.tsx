import React from 'react';

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ steps, currentStep }) => {
  return (
    <div className="flex items-center justify-between relative">
      {/* Progress Line */}
      <div className="absolute h-[2px] bg-gray-700 left-0 right-0 top-1/2 transform -translate-y-1/2 z-0">
        <div 
          className="h-full bg-purple-600 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />
      </div>
      
      {/* Steps */}
      <div className="relative z-10 flex justify-between w-full">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center">
            <div className="relative">
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === currentStep
                    ? 'bg-purple-600 ring-4 ring-purple-600/30'
                    : index < currentStep
                      ? 'bg-purple-600'
                      : 'bg-transparent border-2 border-gray-600'
                }`}
              >
                {index <= currentStep && (
                  <div className="w-2 h-2 bg-white rounded-full" />
                )}
              </div>
            </div>
            <span className={`text-sm mt-2 ${
              index === currentStep ? 'text-white' : 'text-gray-400'
            }`}>
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;