import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NavigationControls = ({ 
  onSaveDraft, 
  onContinue, 
  isLoading, 
  isSaving, 
  canContinue,
  hasUnsavedChanges 
}) => {
  return (
    <div className="sticky bottom-0 bg-surface border-t border-border p-4 mt-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 sm:space-x-4">
          {/* Left side - Draft info */}
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Save" size={16} />
            <span>
              {hasUnsavedChanges 
                ? 'You have unsaved changes' :'All changes saved automatically'
              }
            </span>
          </div>

          {/* Right side - Action buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onSaveDraft}
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
              disabled={isLoading}
            >
              Save Draft
            </Button>

            <Button
              variant="default"
              onClick={onContinue}
              loading={isLoading}
              iconName="ArrowRight"
              iconPosition="right"
              disabled={!canContinue || isSaving}
            >
              Continue to Step 2
            </Button>
          </div>
        </div>

        {/* Mobile-specific helper text */}
        <div className="sm:hidden mt-3 text-center">
          <p className="text-xs text-muted-foreground">
            Complete all required fields to continue to pricing setup
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavigationControls;