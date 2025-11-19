import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProviderCard = ({ provider, viewMode = 'grid' }) => {
  const renderRating = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5]?.map((star) => (
            <Icon
              key={star}
              name="Star"
              size={14}
              color={star <= rating ? '#fbbf24' : '#e5e7eb'}
              className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
            />
          ))}
        </div>
        <span className="text-sm font-medium text-foreground">{rating}</span>
        <span className="text-sm text-muted-foreground">({provider?.reviewCount})</span>
      </div>
    );
  };

  const renderBadges = () => (
    <div className="flex items-center space-x-2 mb-3">
      {provider?.isVerified && (
        <div className="flex items-center space-x-1 bg-success/10 text-success px-2 py-1 rounded-full">
          <Icon name="CheckCircle" size={12} />
          <span className="text-xs font-medium">Verified</span>
        </div>
      )}
      {provider?.isAvailableToday && (
        <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
          <Icon name="Clock" size={12} />
          <span className="text-xs font-medium">Available Today</span>
        </div>
      )}
      {provider?.isPremium && (
        <div className="flex items-center space-x-1 bg-warning/10 text-warning px-2 py-1 rounded-full">
          <Icon name="Crown" size={12} />
          <span className="text-xs font-medium">Premium</span>
        </div>
      )}
    </div>
  );

  if (viewMode === 'list') {
    return (
      <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-sm hover:shadow-elevation-md transition-smooth">
        <div className="flex items-start space-x-4">
          {/* Provider Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-lg overflow-hidden">
              <Image
                src={provider?.profileImage}
                alt={provider?.profileImageAlt}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Provider Info */}
          <div className="flex-1 min-w-0">
            {renderBadges()}
            
            <h3 className="text-lg font-semibold text-foreground mb-1">
              {provider?.name}
            </h3>
            
            <div className="flex items-center space-x-4 mb-2">
              {renderRating(provider?.rating)}
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span className="text-sm">{provider?.distance} km away</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 mb-3">
              <Icon name="Briefcase" size={14} className="text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {provider?.experience} years experience
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-3">
              {provider?.services?.slice(0, 3)?.map((service, index) => (
                <span
                  key={index}
                  className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
                >
                  {service}
                </span>
              ))}
              {provider?.services?.length > 3 && (
                <span className="text-xs text-muted-foreground">
                  +{provider?.services?.length - 3} more
                </span>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
              {provider?.description}
            </p>
          </div>

          {/* Price and Actions */}
          <div className="flex-shrink-0 text-right">
            <div className="mb-4">
              <span className="text-sm text-muted-foreground">Starting from</span>
              <div className="text-xl font-bold text-foreground">₹{provider?.startingPrice}</div>
            </div>

            <div className="space-y-2">
              <Link to="/provider-profile" className="block">
                <Button variant="outline" size="sm" fullWidth>
                  View Profile
                </Button>
              </Link>
              <Button variant="default" size="sm" fullWidth>
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden shadow-elevation-sm hover:shadow-elevation-md transition-smooth">
      {/* Provider Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={provider?.profileImage}
          alt={provider?.profileImageAlt}
          className="w-full h-full object-cover"
        />
        {provider?.isPremium && (
          <div className="absolute top-3 right-3 bg-warning text-warning-foreground px-2 py-1 rounded-full">
            <div className="flex items-center space-x-1">
              <Icon name="Crown" size={12} />
              <span className="text-xs font-medium">Premium</span>
            </div>
          </div>
        )}
      </div>
      {/* Provider Info */}
      <div className="p-4">
        {renderBadges()}
        
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {provider?.name}
        </h3>
        
        <div className="flex items-center justify-between mb-2">
          {renderRating(provider?.rating)}
          <div className="flex items-center space-x-1 text-muted-foreground">
            <Icon name="MapPin" size={14} />
            <span className="text-sm">{provider?.distance} km</span>
          </div>
        </div>

        <div className="flex items-center space-x-1 mb-3">
          <Icon name="Briefcase" size={14} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            {provider?.experience} years experience
          </span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {provider?.services?.slice(0, 2)?.map((service, index) => (
            <span
              key={index}
              className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
            >
              {service}
            </span>
          ))}
          {provider?.services?.length > 2 && (
            <span className="text-xs text-muted-foreground">
              +{provider?.services?.length - 2}
            </span>
          )}
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
          {provider?.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-sm text-muted-foreground">Starting from</span>
            <div className="text-lg font-bold text-foreground">₹{provider?.startingPrice}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Link to="/provider-profile">
            <Button variant="outline" size="sm" fullWidth>
              View Profile
            </Button>
          </Link>
          <Button variant="default" size="sm" fullWidth>
            Book Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProviderCard;