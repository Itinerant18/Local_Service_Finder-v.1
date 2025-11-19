import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceSelectionStep = ({ 
  selectedServices, 
  onServiceToggle, 
  onNext, 
  availableServices 
}) => {
  const calculateTotal = () => {
    return selectedServices?.reduce((total, serviceId) => {
      const service = availableServices?.find(s => s?.id === serviceId);
      return total + (service?.price || 0);
    }, 0);
  };

  const calculateDuration = () => {
    return selectedServices?.reduce((total, serviceId) => {
      const service = availableServices?.find(s => s?.id === serviceId);
      return total + (service?.duration || 0);
    }, 0);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Select Services
        </h2>
        <p className="text-muted-foreground">
          Choose the services you need for your appointment
        </p>
      </div>
      <div className="grid gap-4">
        {availableServices?.map((service) => {
          const isSelected = selectedServices?.includes(service?.id);
          
          return (
            <div
              key={service?.id}
              className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
              onClick={() => onServiceToggle(service?.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                      isSelected 
                        ? 'bg-primary border-primary' :'border-border'
                    }`}>
                      {isSelected && (
                        <Icon name="Check" size={12} color="white" />
                      )}
                    </div>
                    <h3 className="font-medium text-foreground">
                      {service?.name}
                    </h3>
                    {service?.isPopular && (
                      <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {service?.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Clock" size={14} />
                      <span>{service?.duration} mins</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Users" size={14} />
                      <span>{service?.category}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-lg font-semibold text-foreground">
                    ₹{service?.price?.toLocaleString('en-IN')}
                  </div>
                  {service?.originalPrice && service?.originalPrice > service?.price && (
                    <div className="text-sm text-muted-foreground line-through">
                      ₹{service?.originalPrice?.toLocaleString('en-IN')}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {selectedServices?.length > 0 && (
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <h4 className="font-medium text-foreground mb-3">Selection Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Services Selected:</span>
              <span className="text-foreground">{selectedServices?.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Duration:</span>
              <span className="text-foreground">{calculateDuration()} minutes</span>
            </div>
            <div className="flex justify-between font-medium">
              <span className="text-foreground">Total Amount:</span>
              <span className="text-foreground">₹{calculateTotal()?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-end pt-4">
        <Button
          onClick={onNext}
          disabled={selectedServices?.length === 0}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Date & Time
        </Button>
      </div>
    </div>
  );
};

export default ServiceSelectionStep;