import React from 'react';
import Icon from '../../../components/AppIcon';

const MapView = ({ providers, center = { lat: 28.6139, lng: 77.2090 } }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-elevation-sm">
      <div className="h-96 relative">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Service Providers Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${center?.lat},${center?.lng}&z=12&output=embed`}
          className="border-0"
        />
        
        {/* Map Overlay with Provider Count */}
        <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg border border-border p-3 shadow-elevation-md">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {providers?.length} providers in this area
            </span>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 space-y-2">
          <button className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-elevation-md hover:bg-muted transition-smooth">
            <Icon name="Plus" size={16} className="text-foreground" />
          </button>
          <button className="bg-card/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-elevation-md hover:bg-muted transition-smooth">
            <Icon name="Minus" size={16} className="text-foreground" />
          </button>
        </div>

        {/* Current Location Button */}
        <div className="absolute bottom-4 right-4">
          <button className="bg-primary text-primary-foreground rounded-lg p-3 shadow-elevation-md hover:bg-primary/90 transition-smooth">
            <Icon name="Navigation" size={16} />
          </button>
        </div>
      </div>
      {/* Provider List Below Map */}
      <div className="p-4 max-h-64 overflow-y-auto">
        <h4 className="text-sm font-medium text-foreground mb-3">Nearby Providers</h4>
        <div className="space-y-3">
          {providers?.slice(0, 5)?.map((provider) => (
            <div key={provider?.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted transition-smooth cursor-pointer">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <img
                  src={provider?.profileImage}
                  alt={provider?.profileImageAlt}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {provider?.name}
                </div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{provider?.distance} km away</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={10} className="text-yellow-400" />
                    <span>{provider?.rating}</span>
                  </div>
                </div>
              </div>
              <div className="text-sm font-medium text-foreground">
                ₹{provider?.startingPrice}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapView;