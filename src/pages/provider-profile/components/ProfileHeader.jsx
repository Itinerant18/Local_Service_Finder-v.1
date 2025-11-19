import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileHeader = ({ provider }) => {
  return (
    <div className="bg-card rounded-lg shadow-elevation-md p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-start gap-6">
        {/* Provider Photo */}
        <div className="flex-shrink-0">
          <div className="relative">
            <Image
              src={provider?.profilePhoto}
              alt={provider?.profilePhotoAlt}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary/20"
            />
            {provider?.isVerified && (
              <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground rounded-full p-2">
                <Icon name="CheckCircle" size={20} />
              </div>
            )}
          </div>
        </div>

        {/* Provider Info */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {provider?.name}
              </h1>
              <p className="text-lg text-muted-foreground mb-3">
                {provider?.profession}
              </p>
              
              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={i < Math.floor(provider?.rating) ? 'text-warning fill-current' : 'text-muted-foreground/30'}
                      />
                    ))}
                  </div>
                  <span className="font-semibold text-foreground">{provider?.rating}</span>
                  <span className="text-muted-foreground">({provider?.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Service Categories */}
              <div className="flex flex-wrap gap-2 mb-4">
                {provider?.serviceCategories?.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {category}
                  </span>
                ))}
              </div>

              {/* Experience and Location */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} />
                  <span>{provider?.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>{provider?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Responds in {provider?.responseTime}</span>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-col gap-2">
              {provider?.isVerified && (
                <div className="flex items-center gap-2 px-3 py-2 bg-success/10 text-success rounded-lg">
                  <Icon name="Shield" size={16} />
                  <span className="text-sm font-medium">Verified Provider</span>
                </div>
              )}
              {provider?.isTopRated && (
                <div className="flex items-center gap-2 px-3 py-2 bg-warning/10 text-warning rounded-lg">
                  <Icon name="Award" size={16} />
                  <span className="text-sm font-medium">Top Rated</span>
                </div>
              )}
              {provider?.backgroundChecked && (
                <div className="flex items-center gap-2 px-3 py-2 bg-primary/10 text-primary rounded-lg">
                  <Icon name="UserCheck" size={16} />
                  <span className="text-sm font-medium">Background Checked</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;