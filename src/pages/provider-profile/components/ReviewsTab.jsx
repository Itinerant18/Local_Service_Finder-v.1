import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ReviewsTab = ({ provider }) => {
  const [selectedRating, setSelectedRating] = useState('all');

  const ratingFilters = [
    { value: 'all', label: 'All Reviews', count: provider?.reviewCount },
    { value: '5', label: '5 Stars', count: provider?.ratingBreakdown?.[5] },
    { value: '4', label: '4 Stars', count: provider?.ratingBreakdown?.[4] },
    { value: '3', label: '3 Stars', count: provider?.ratingBreakdown?.[3] },
    { value: '2', label: '2 Stars', count: provider?.ratingBreakdown?.[2] },
    { value: '1', label: '1 Star', count: provider?.ratingBreakdown?.[1] },
  ];

  const filteredReviews = selectedRating === 'all' 
    ? provider?.reviews 
    : provider?.reviews?.filter(review => review?.rating === parseInt(selectedRating));

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-card rounded-lg shadow-elevation-sm p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Overall Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="text-4xl font-bold text-foreground">{provider?.rating}</span>
              <div>
                <div className="flex items-center mb-1">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon
                      key={i}
                      name="Star"
                      size={20}
                      className={i < Math.floor(provider?.rating) ? 'text-warning fill-current' : 'text-muted-foreground/30'}
                    />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on {provider?.reviewCount} reviews
                </p>
              </div>
            </div>
          </div>

          {/* Rating Breakdown */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1]?.map((rating) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm font-medium text-foreground w-6">{rating}</span>
                <Icon name="Star" size={14} className="text-warning fill-current" />
                <div className="flex-1 bg-muted rounded-full h-2">
                  <div
                    className="bg-warning rounded-full h-2 transition-all duration-300"
                    style={{
                      width: `${(provider?.ratingBreakdown?.[rating] / provider?.reviewCount) * 100}%`
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {provider?.ratingBreakdown?.[rating]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Rating Filters */}
      <div className="bg-card rounded-lg shadow-elevation-sm p-4">
        <div className="flex flex-wrap gap-2">
          {ratingFilters?.map((filter) => (
            <button
              key={filter?.value}
              onClick={() => setSelectedRating(filter?.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-smooth ${
                selectedRating === filter?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filter?.label} ({filter?.count})
            </button>
          ))}
        </div>
      </div>
      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews?.map((review, index) => (
          <div key={index} className="bg-card rounded-lg shadow-elevation-sm p-6">
            <div className="flex items-start gap-4">
              {/* Customer Avatar */}
              <Image
                src={review?.customerAvatar}
                alt={review?.customerAvatarAlt}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />

              <div className="flex-1">
                {/* Review Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                  <div>
                    <h4 className="font-medium text-foreground">{review?.customerName}</h4>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        {[...Array(5)]?.map((_, i) => (
                          <Icon
                            key={i}
                            name="Star"
                            size={14}
                            className={i < review?.rating ? 'text-warning fill-current' : 'text-muted-foreground/30'}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">{review?.date}</span>
                    </div>
                  </div>
                  
                  {review?.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 bg-success/10 text-success rounded text-xs">
                      <Icon name="CheckCircle" size={12} />
                      <span>Verified</span>
                    </div>
                  )}
                </div>

                {/* Service Type */}
                <div className="mb-3">
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                    <Icon name="Wrench" size={12} />
                    {review?.serviceType}
                  </span>
                </div>

                {/* Review Content */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {review?.comment}
                </p>

                {/* Review Photos */}
                {review?.photos && review?.photos?.length > 0 && (
                  <div className="flex gap-2 mb-4 overflow-x-auto">
                    {review?.photos?.map((photo, photoIndex) => (
                      <Image
                        key={photoIndex}
                        src={photo?.url}
                        alt={photo?.alt}
                        className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                      />
                    ))}
                  </div>
                )}

                {/* Provider Response */}
                {review?.providerResponse && (
                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="MessageCircle" size={14} className="text-primary" />
                      <span className="text-sm font-medium text-foreground">
                        Response from {provider?.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {review?.providerResponse?.date}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {review?.providerResponse?.message}
                    </p>
                  </div>
                )}

                {/* Review Actions */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border">
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                    <Icon name="ThumbsUp" size={14} />
                    <span>Helpful ({review?.helpfulCount})</span>
                  </button>
                  <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-smooth">
                    <Icon name="Flag" size={14} />
                    <span>Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Load More Reviews */}
      {filteredReviews?.length < provider?.reviewCount && (
        <div className="text-center">
          <button className="px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-smooth">
            Load More Reviews
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsTab;