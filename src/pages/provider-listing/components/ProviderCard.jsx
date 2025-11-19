import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProviderCard = ({ provider }) => {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate('/provider-profile', { state: { providerId: provider?.id } });
  };

  const handleBookNow = () => {
    navigate('/booking-creation', { state: { providerId: provider?.id } });
  };

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, i) => (
      <Icon
        key={i}
        name="Star"
        size={14}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const getAvailabilityStatus = () => {
    if (provider?.isAvailableToday) {
      return { text: 'Available today', color: 'text-success', bgColor: 'bg-success/10' };
    } else if (provider?.nextAvailable) {
      return { text: `Next: ${provider?.nextAvailable}`, color: 'text-warning', bgColor: 'bg-warning/10' };
    }
    return { text: 'Busy', color: 'text-muted-foreground', bgColor: 'bg-muted' };
  };

  const availability = getAvailabilityStatus();

  return (
    <div className="bg-surface border border-border rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
      {/* Provider Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={provider?.profileImage}
          alt={provider?.profileImageAlt}
          className="w-full h-full object-cover"
        />
        {provider?.isVerified && (
          <div className="absolute top-3 right-3 bg-success text-success-foreground px-2 py-1 rounded-full flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} />
            <span className="text-xs font-medium">Verified</span>
          </div>
        )}
        {provider?.isPremium && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-full flex items-center space-x-1">
            <Icon name="Crown" size={14} />
            <span className="text-xs font-medium">Premium</span>
          </div>
        )}
      </div>
      {/* Provider Info */}
      <div className="p-4 space-y-3">
        {/* Name and Rating */}
        <div className="space-y-2">
          <div className="flex items-start justify-between">
            <h3 className="font-semibold text-foreground text-lg leading-tight">{provider?.name}</h3>
            <div className="flex items-center space-x-1 ml-2">
              <div className="flex items-center space-x-1">
                {renderStars(provider?.rating)}
              </div>
              <span className="text-sm font-medium text-foreground">{provider?.rating}</span>
              <span className="text-xs text-muted-foreground">({provider?.reviewCount})</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{provider?.distance} km away</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{provider?.experience} years exp.</span>
            </div>
          </div>
        </div>

        {/* Services */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Specializes in:</p>
          <div className="flex flex-wrap gap-1">
            {provider?.services?.slice(0, 3)?.map((service, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
              >
                {service}
              </span>
            ))}
            {provider?.services?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                +{provider?.services?.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Pricing */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">Starting from</p>
            <p className="text-lg font-semibold text-foreground">₹{provider?.startingPrice?.toLocaleString('en-IN')}</p>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${availability?.bgColor} ${availability?.color}`}>
            {availability?.text}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewProfile}
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            View Profile
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleBookNow}
            className="flex-1"
            iconName="Calendar"
            iconPosition="left"
          >
            Book Now
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-between pt-2 border-t border-border text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Users" size={12} />
            <span>{provider?.completedJobs} jobs completed</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="ThumbsUp" size={12} />
            <span>{provider?.responseRate}% response rate</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;