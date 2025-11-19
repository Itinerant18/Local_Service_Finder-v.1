import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProviderListItem = ({ provider }) => {
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
      <div className="flex flex-col sm:flex-row">
        {/* Provider Image */}
        <div className="relative w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
          <Image
            src={provider?.profileImage}
            alt={provider?.profileImageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {provider?.isVerified && (
              <div className="bg-success text-success-foreground px-2 py-1 rounded-full flex items-center space-x-1">
                <Icon name="CheckCircle" size={12} />
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
            {provider?.isPremium && (
              <div className="bg-accent text-accent-foreground px-2 py-1 rounded-full flex items-center space-x-1">
                <Icon name="Crown" size={12} />
                <span className="text-xs font-medium">Premium</span>
              </div>
            )}
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex-1 p-4 sm:p-6">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground text-xl leading-tight mb-1">{provider?.name}</h3>
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
              
              <div className="flex items-center space-x-2 ml-4">
                <div className="flex items-center space-x-1">
                  {renderStars(provider?.rating)}
                </div>
                <span className="text-sm font-medium text-foreground">{provider?.rating}</span>
                <span className="text-xs text-muted-foreground">({provider?.reviewCount})</span>
              </div>
            </div>

            {/* Services */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Specializes in:</p>
              <div className="flex flex-wrap gap-2">
                {provider?.services?.map((service, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-end justify-between mt-auto">
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="text-2xl font-semibold text-foreground">₹{provider?.startingPrice?.toLocaleString('en-IN')}</p>
                </div>
                
                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${availability?.bgColor} ${availability?.color}`}>
                  {availability?.text}
                </div>
              </div>

              <div className="flex flex-col space-y-2 ml-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleViewProfile}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleBookNow}
                    iconName="Calendar"
                    iconPosition="left"
                  >
                    Book Now
                  </Button>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={12} />
                    <span>{provider?.completedJobs} jobs</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="ThumbsUp" size={12} />
                    <span>{provider?.responseRate}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProviderListItem;