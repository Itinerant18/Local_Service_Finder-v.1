import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddressStep = ({ 
  address, 
  onAddressChange, 
  onNext, 
  onBack 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Mock address suggestions
  const mockSuggestions = [
    {
      id: 1,
      fullAddress: "123 MG Road, Bangalore, Karnataka 560001",
      mainText: "123 MG Road",
      secondaryText: "Bangalore, Karnataka 560001",
      lat: 12.9716,
      lng: 77.5946
    },
    {
      id: 2,
      fullAddress: "456 Brigade Road, Bangalore, Karnataka 560025",
      mainText: "456 Brigade Road",
      secondaryText: "Bangalore, Karnataka 560025",
      lat: 12.9698,
      lng: 77.6205
    },
    {
      id: 3,
      fullAddress: "789 Koramangala 4th Block, Bangalore, Karnataka 560034",
      mainText: "789 Koramangala 4th Block",
      secondaryText: "Bangalore, Karnataka 560034",
      lat: 12.9352,
      lng: 77.6245
    },
    {
      id: 4,
      fullAddress: "321 Indiranagar, Bangalore, Karnataka 560038",
      mainText: "321 Indiranagar",
      secondaryText: "Bangalore, Karnataka 560038",
      lat: 12.9719,
      lng: 77.6412
    },
    {
      id: 5,
      fullAddress: "654 Whitefield, Bangalore, Karnataka 560066",
      mainText: "654 Whitefield",
      secondaryText: "Bangalore, Karnataka 560066",
      lat: 12.9698,
      lng: 77.7500
    }
  ];

  useEffect(() => {
    if (address?.fullAddress && address?.fullAddress?.length > 2) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.fullAddress?.toLowerCase()?.includes(address?.fullAddress?.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [address?.fullAddress]);

  const handleAddressSelect = (suggestion) => {
    onAddressChange({
      ...address,
      fullAddress: suggestion?.fullAddress,
      lat: suggestion?.lat,
      lng: suggestion?.lng
    });
    setShowSuggestions(false);
    setMapLoaded(true);
  };

  const handleInputChange = (field, value) => {
    onAddressChange({
      ...address,
      [field]: value
    });
  };

  const isFormValid = () => {
    return address?.fullAddress && 
           address?.contactName && 
           address?.phoneNumber && 
           address?.phoneNumber?.length === 10;
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Service Address
        </h2>
        <p className="text-muted-foreground">
          Enter the address where the service will be provided
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Address Form */}
        <div className="space-y-4">
          <div className="relative">
            <Input
              label="Service Address"
              type="text"
              placeholder="Enter your address"
              value={address?.fullAddress || ''}
              onChange={(e) => handleInputChange('fullAddress', e?.target?.value)}
              required
            />
            
            {showSuggestions && suggestions?.length > 0 && (
              <div className="absolute top-full left-0 right-0 z-10 bg-surface border border-border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
                {suggestions?.map((suggestion) => (
                  <button
                    key={suggestion?.id}
                    onClick={() => handleAddressSelect(suggestion)}
                    className="w-full text-left p-3 hover:bg-muted/50 transition-colors duration-200 border-b border-border last:border-b-0"
                  >
                    <div className="flex items-start space-x-3">
                      <Icon name="MapPin" size={16} className="text-muted-foreground mt-1" />
                      <div>
                        <div className="font-medium text-foreground text-sm">
                          {suggestion?.mainText}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {suggestion?.secondaryText}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Apartment/Floor"
              type="text"
              placeholder="Apt, Suite, Floor"
              value={address?.apartment || ''}
              onChange={(e) => handleInputChange('apartment', e?.target?.value)}
            />
            <Input
              label="Landmark"
              type="text"
              placeholder="Near landmark"
              value={address?.landmark || ''}
              onChange={(e) => handleInputChange('landmark', e?.target?.value)}
            />
          </div>

          <div className="border-t border-border pt-4">
            <h3 className="font-medium text-foreground mb-3">Contact Information</h3>
            
            <div className="space-y-4">
              <Input
                label="Contact Person Name"
                type="text"
                placeholder="Full name"
                value={address?.contactName || ''}
                onChange={(e) => handleInputChange('contactName', e?.target?.value)}
                required
              />
              
              <Input
                label="Phone Number"
                type="tel"
                placeholder="10-digit mobile number"
                value={address?.phoneNumber || ''}
                onChange={(e) => handleInputChange('phoneNumber', e?.target?.value)}
                maxLength={10}
                pattern="[0-9]{10}"
                required
              />
              
              <Input
                label="Special Instructions"
                type="text"
                placeholder="Any specific instructions for the service provider"
                value={address?.instructions || ''}
                onChange={(e) => handleInputChange('instructions', e?.target?.value)}
              />
            </div>
          </div>
        </div>

        {/* Map Preview */}
        <div className="bg-surface border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-medium text-foreground">Location Preview</h3>
          </div>
          
          <div className="h-80 relative">
            {address?.lat && address?.lng ? (
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Service Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${address?.lat},${address?.lng}&z=15&output=embed`}
                className="border-0"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted/30">
                <div className="text-center">
                  <Icon name="MapPin" size={48} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">
                    Select an address to preview location
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {address?.fullAddress && (
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <h4 className="font-medium text-foreground mb-2">Service Location</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
              <div>
                <div className="text-foreground">{address?.fullAddress}</div>
                {address?.apartment && (
                  <div className="text-muted-foreground">{address?.apartment}</div>
                )}
                {address?.landmark && (
                  <div className="text-muted-foreground">Near {address?.landmark}</div>
                )}
              </div>
            </div>
            
            {address?.contactName && (
              <div className="flex items-center space-x-2">
                <Icon name="User" size={16} className="text-muted-foreground" />
                <span className="text-foreground">{address?.contactName}</span>
              </div>
            )}
            
            {address?.phoneNumber && (
              <div className="flex items-center space-x-2">
                <Icon name="Phone" size={16} className="text-muted-foreground" />
                <span className="text-foreground">+91 {address?.phoneNumber}</span>
              </div>
            )}
          </div>
        </div>
      )}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} iconName="ArrowLeft">
          Back to Date & Time
        </Button>
        <Button
          onClick={onNext}
          disabled={!isFormValid()}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Review Booking
        </Button>
      </div>
    </div>
  );
};

export default AddressStep;