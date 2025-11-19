import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const ConfirmationStep = ({ 
  selectedServices, 
  selectedDate, 
  selectedTime, 
  address, 
  onBack, 
  availableServices,
  providerInfo 
}) => {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [policyAccepted, setPolicyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getSelectedServiceDetails = () => {
    return selectedServices?.map(serviceId => 
      availableServices?.find(service => service?.id === serviceId)
    )?.filter(Boolean);
  };

  const calculateTotals = () => {
    const services = getSelectedServiceDetails();
    const subtotal = services?.reduce((total, service) => total + service?.price, 0);
    const tax = Math.round(subtotal * 0.18); // 18% GST
    const total = subtotal + tax;
    const duration = services?.reduce((total, service) => total + service?.duration, 0);
    
    return { subtotal, tax, total, duration };
  };

  const formatTime = (time) => {
    const [hours, minutes] = time?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const handleBookingSubmit = async () => {
    if (!termsAccepted || !policyAccepted) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to customer dashboard with success message
      navigate('/customer-dashboard', { 
        state: { 
          bookingSuccess: true,
          bookingId: 'BK' + Date.now()?.toString()?.slice(-6)
        }
      });
    } catch (error) {
      console.error('Booking submission failed:', error);
      setIsSubmitting(false);
    }
  };

  const { subtotal, tax, total, duration } = calculateTotals();
  const services = getSelectedServiceDetails();

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Review & Confirm Booking
        </h2>
        <p className="text-muted-foreground">
          Please review all details before confirming your booking
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Provider Info */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Service Provider</h3>
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="User" size={24} className="text-primary" />
              </div>
              <div>
                <div className="font-medium text-foreground">{providerInfo?.name}</div>
                <div className="text-sm text-muted-foreground">{providerInfo?.category}</div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                    <span className="text-sm text-foreground">{providerInfo?.rating}</span>
                  </div>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{providerInfo?.experience} years exp</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Selected Services</h3>
            <div className="space-y-3">
              {services?.map((service) => (
                <div key={service?.id} className="flex items-center justify-between py-2 border-b border-border last:border-b-0">
                  <div>
                    <div className="font-medium text-foreground">{service?.name}</div>
                    <div className="text-sm text-muted-foreground">{service?.duration} minutes</div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-foreground">₹{service?.price?.toLocaleString('en-IN')}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date & Time */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Appointment Details</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Calendar" size={20} className="text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">
                    {selectedDate?.toLocaleDateString('en-IN', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {formatTime(selectedTime)} • {duration} minutes duration
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="bg-surface border border-border rounded-lg p-4">
            <h3 className="font-medium text-foreground mb-3">Service Location</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={20} className="text-muted-foreground mt-0.5" />
                <div>
                  <div className="font-medium text-foreground">{address?.fullAddress}</div>
                  {address?.apartment && (
                    <div className="text-sm text-muted-foreground">{address?.apartment}</div>
                  )}
                  {address?.landmark && (
                    <div className="text-sm text-muted-foreground">Near {address?.landmark}</div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="User" size={20} className="text-muted-foreground" />
                <div>
                  <div className="font-medium text-foreground">{address?.contactName}</div>
                  <div className="text-sm text-muted-foreground">+91 {address?.phoneNumber}</div>
                </div>
              </div>

              {address?.instructions && (
                <div className="flex items-start space-x-3">
                  <Icon name="MessageSquare" size={20} className="text-muted-foreground mt-0.5" />
                  <div>
                    <div className="text-sm text-muted-foreground">Special Instructions:</div>
                    <div className="text-sm text-foreground">{address?.instructions}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-lg p-4 sticky top-4">
            <h3 className="font-medium text-foreground mb-4">Booking Summary</h3>
            
            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal ({services?.length} services)</span>
                <span className="text-foreground">₹{subtotal?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">GST (18%)</span>
                <span className="text-foreground">₹{tax?.toLocaleString('en-IN')}</span>
              </div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Total Amount</span>
                  <span className="text-foreground text-lg">₹{total?.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 mb-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={14} />
                <span>100% secure payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RotateCcw" size={14} />
                <span>Free cancellation up to 2 hours before</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={14} />
                <span>Service guarantee included</span>
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <Checkbox
                label="I agree to the Terms & Conditions"
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e?.target?.checked)}
                required
              />
              <Checkbox
                label="I accept the Cancellation Policy"
                checked={policyAccepted}
                onChange={(e) => setPolicyAccepted(e?.target?.checked)}
                required
              />
            </div>

            <Button
              fullWidth
              onClick={handleBookingSubmit}
              disabled={!termsAccepted || !policyAccepted || isSubmitting}
              loading={isSubmitting}
              iconName="CreditCard"
              iconPosition="left"
            >
              {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
            </Button>
          </div>
        </div>
      </div>
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} iconName="ArrowLeft" disabled={isSubmitting}>
          Back to Address
        </Button>
        <div className="text-sm text-muted-foreground">
          By confirming, you agree to our terms and conditions
        </div>
      </div>
    </div>
  );
};

export default ConfirmationStep;