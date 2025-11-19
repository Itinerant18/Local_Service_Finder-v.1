import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const BookingPanel = ({ provider, onBookNow, onContact }) => {
  const [isSticky, setIsSticky] = useState(false);

  return (
    <>
      {/* Desktop Booking Panel */}
      <div className="hidden lg:block sticky top-24">
        <div className="bg-card rounded-lg shadow-elevation-lg p-6 border border-border">
          <div className="mb-4">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-2xl font-bold text-foreground">₹{provider?.startingPrice}</span>
              <span className="text-muted-foreground">starting from</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Prices may vary based on service requirements
            </p>
          </div>

          <div className="space-y-3 mb-6">
            <Button
              variant="default"
              size="lg"
              fullWidth
              iconName="Calendar"
              iconPosition="left"
              onClick={onBookNow}
            >
              Book Now
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="default"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => onContact('message')}
              >
                Message
              </Button>
              <Button
                variant="outline"
                size="default"
                iconName="Phone"
                iconPosition="left"
                onClick={() => onContact('call')}
              >
                Call
              </Button>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Response time:</span>
              <span className="font-medium text-foreground">{provider?.responseTime}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Availability:</span>
              <span className="font-medium text-success">Available today</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Service area:</span>
              <span className="font-medium text-foreground">{provider?.serviceRadius}km radius</span>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Sticky Bottom Panel */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border shadow-elevation-lg p-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-foreground">₹{provider?.startingPrice}</span>
              <span className="text-sm text-muted-foreground">starting</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="default"
              iconName="MessageCircle"
              onClick={() => onContact('message')}
            />
            <Button
              variant="default"
              size="default"
              iconName="Calendar"
              iconPosition="left"
              onClick={onBookNow}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingPanel;