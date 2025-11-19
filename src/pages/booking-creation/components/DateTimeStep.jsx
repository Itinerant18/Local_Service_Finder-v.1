import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateTimeStep = ({ 
  selectedDate, 
  selectedTime, 
  onDateSelect, 
  onTimeSelect, 
  onNext, 
  onBack,
  providerAvailability 
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);

  // Mock availability data
  const mockAvailability = {
    '2024-11-18': ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
    '2024-11-19': ['09:00', '10:30', '11:30', '13:00', '14:30', '15:30'],
    '2024-11-20': ['10:00', '11:00', '12:00', '15:00', '16:00'],
    '2024-11-21': ['09:30', '10:30', '13:30', '14:30', '15:30', '16:30'],
    '2024-11-22': ['09:00', '10:00', '11:00', '14:00', '15:00'],
    '2024-11-25': ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
    '2024-11-26': ['10:00', '11:00', '14:00', '15:00', '16:00'],
    '2024-11-27': ['09:30', '10:30', '11:30', '13:30', '14:30', '15:30']
  };

  useEffect(() => {
    if (selectedDate) {
      const dateKey = selectedDate?.toISOString()?.split('T')?.[0];
      setAvailableSlots(mockAvailability?.[dateKey] || []);
    }
  }, [selectedDate]);

  const generateCalendarDays = () => {
    const year = currentMonth?.getFullYear();
    const month = currentMonth?.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate?.setDate(startDate?.getDate() - firstDay?.getDay());
    
    const days = [];
    const today = new Date();
    today?.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date?.setDate(startDate?.getDate() + i);
      
      const isCurrentMonth = date?.getMonth() === month;
      const isPast = date < today;
      const dateKey = date?.toISOString()?.split('T')?.[0];
      const hasAvailability = mockAvailability?.[dateKey]?.length > 0;
      const isSelected = selectedDate && 
        date?.toDateString() === selectedDate?.toDateString();
      
      days?.push({
        date,
        isCurrentMonth,
        isPast,
        hasAvailability,
        isSelected,
        dayNumber: date?.getDate()
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth?.setMonth(currentMonth?.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const formatTime = (time) => {
    const [hours, minutes] = time?.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-foreground mb-2">
          Select Date & Time
        </h2>
        <p className="text-muted-foreground">
          Choose your preferred appointment date and time slot
        </p>
      </div>
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Calendar */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-foreground">
              {monthNames?.[currentMonth?.getMonth()]} {currentMonth?.getFullYear()}
            </h3>
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth(-1)}
              >
                <Icon name="ChevronLeft" size={16} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigateMonth(1)}
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2">
            {weekDays?.map(day => (
              <div key={day} className="text-center text-xs font-medium text-muted-foreground p-2">
                {day}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1">
            {generateCalendarDays()?.map((day, index) => (
              <button
                key={index}
                onClick={() => day?.isCurrentMonth && !day?.isPast && day?.hasAvailability && onDateSelect(day?.date)}
                disabled={!day?.isCurrentMonth || day?.isPast || !day?.hasAvailability}
                className={`
                  aspect-square p-2 text-sm rounded-lg transition-all duration-200 relative
                  ${!day?.isCurrentMonth ? 'text-muted-foreground/50' : ''}
                  ${day?.isPast ? 'text-muted-foreground/50 cursor-not-allowed' : ''}
                  ${day?.hasAvailability && day?.isCurrentMonth && !day?.isPast 
                    ? 'hover:bg-primary/10 cursor-pointer' :''
                  }
                  ${day?.isSelected 
                    ? 'bg-primary text-primary-foreground' 
                    : day?.isCurrentMonth 
                      ? 'text-foreground' 
                      : ''
                  }
                  ${!day?.hasAvailability && day?.isCurrentMonth && !day?.isPast 
                    ? 'text-muted-foreground cursor-not-allowed' 
                    : ''
                  }
                `}
              >
                {day?.dayNumber}
                {day?.hasAvailability && day?.isCurrentMonth && !day?.isPast && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>

          <div className="mt-4 text-xs text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-muted-foreground/50 rounded-full"></div>
                <span>Unavailable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Time Slots */}
        <div className="bg-surface border border-border rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-4">Available Time Slots</h3>
          
          {!selectedDate ? (
            <div className="text-center py-8">
              <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">Please select a date first</p>
            </div>
          ) : availableSlots?.length === 0 ? (
            <div className="text-center py-8">
              <Icon name="Clock" size={48} className="mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No slots available for this date</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {availableSlots?.map((time) => (
                <button
                  key={time}
                  onClick={() => onTimeSelect(time)}
                  className={`
                    p-3 text-sm rounded-lg border transition-all duration-200
                    ${selectedTime === time
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }
                  `}
                >
                  {formatTime(time)}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedDate && selectedTime && (
        <div className="bg-muted/50 rounded-lg p-4 border border-border">
          <h4 className="font-medium text-foreground mb-2">Selected Appointment</h4>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-foreground">
                {selectedDate?.toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-foreground">{formatTime(selectedTime)}</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} iconName="ArrowLeft">
          Back to Services
        </Button>
        <Button
          onClick={onNext}
          disabled={!selectedDate || !selectedTime}
          iconName="ArrowRight"
          iconPosition="right"
        >
          Continue to Address
        </Button>
      </div>
    </div>
  );
};

export default DateTimeStep;