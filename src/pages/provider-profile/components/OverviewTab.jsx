import React from 'react';
import Icon from '../../../components/AppIcon';

const OverviewTab = ({ provider }) => {
  return (
    <div className="space-y-6">
      {/* Professional Summary */}
      <div className="bg-card rounded-lg shadow-elevation-sm p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">About {provider?.name}</h3>
        <p className="text-muted-foreground leading-relaxed mb-4">
          {provider?.description}
        </p>
        
        {/* Specializations */}
        <div className="mb-4">
          <h4 className="font-medium text-foreground mb-2">Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {provider?.specializations?.map((spec, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* Certifications */}
        {provider?.certifications?.length > 0 && (
          <div>
            <h4 className="font-medium text-foreground mb-2">Certifications</h4>
            <div className="space-y-2">
              {provider?.certifications?.map((cert, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span className="text-sm text-muted-foreground">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Service Area Map */}
      <div className="bg-card rounded-lg shadow-elevation-sm p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Service Area</h3>
        <div className="aspect-video rounded-lg overflow-hidden bg-muted">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={`${provider?.name} Service Area`}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${provider?.coordinates?.lat},${provider?.coordinates?.lng}&z=12&output=embed`}
            className="border-0"
          />
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Serves within {provider?.serviceRadius}km radius of {provider?.location}
        </p>
      </div>
      {/* Availability Calendar */}
      <div className="bg-card rounded-lg shadow-elevation-sm p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Availability This Week</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {provider?.weeklyAvailability?.map((day, index) => (
            <div key={index} className="text-center">
              <div className="text-xs font-medium text-muted-foreground mb-2">
                {day?.dayName}
              </div>
              <div className="text-sm font-medium text-foreground mb-1">
                {day?.date}
              </div>
              <div className={`text-xs px-2 py-1 rounded ${
                day?.available 
                  ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}>
                {day?.available ? 'Available' : 'Booked'}
              </div>
            </div>
          ))}
        </div>
        
        {/* Time Slots for Today */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Available Time Slots Today</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {provider?.todayTimeSlots?.map((slot, index) => (
              <button
                key={index}
                className={`px-3 py-2 text-sm rounded-md border transition-smooth ${
                  slot?.available
                    ? 'border-primary text-primary hover:bg-primary hover:text-primary-foreground'
                    : 'border-muted text-muted-foreground cursor-not-allowed'
                }`}
                disabled={!slot?.available}
              >
                {slot?.time}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;