import React from 'react';
import Icon from '../../../components/AppIcon';

const StepIndicator = ({ currentStep, steps }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between relative">
        {/* Progress Line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps?.length - 1)) * 100}%` }}
          />
        </div>

        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;
          const isUpcoming = stepNumber > currentStep;

          return (
            <div key={step?.id} className="flex flex-col items-center relative z-10">
              {/* Step Circle */}
              <div className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                ${isCompleted 
                  ? 'bg-primary text-primary-foreground' 
                  : isActive 
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                    : 'bg-surface border-2 border-border text-muted-foreground'
                }
              `}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  stepNumber
                )}
              </div>
              {/* Step Label */}
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${
                  isActive ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1 hidden sm:block">
                  {step?.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Mobile Step Info */}
      <div className="mt-6 sm:hidden">
        <div className="text-center">
          <div className="text-lg font-medium text-foreground">
            {steps?.[currentStep - 1]?.title}
          </div>
          <div className="text-sm text-muted-foreground">
            Step {currentStep} of {steps?.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepIndicator;