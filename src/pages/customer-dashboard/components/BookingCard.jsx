import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const BookingCard = ({ booking, onViewDetails, onCancel, onRebook, onWriteReview, onContact }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-blue-600 bg-blue-50';
      case 'in-progress':
        return 'text-amber-600 bg-amber-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'cancelled':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`)?.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100">
            <Image
              src={booking?.provider?.avatar}
              alt={booking?.provider?.avatarAlt}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">{booking?.provider?.name}</h3>
            <p className="text-sm text-slate-600">{booking?.service?.name}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking?.status)}`}>
          {booking?.status?.charAt(0)?.toUpperCase() + booking?.status?.slice(1)}
        </span>
      </div>
      {/* Service Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Icon name="Calendar" size={16} />
          <span>{formatDate(booking?.scheduledDate)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Icon name="Clock" size={16} />
          <span>{formatTime(booking?.scheduledTime)}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Icon name="MapPin" size={16} />
          <span className="truncate">{booking?.address}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-600">
          <Icon name="IndianRupee" size={16} />
          <span>₹{booking?.totalAmount?.toLocaleString('en-IN')}</span>
        </div>
      </div>
      {/* Provider Rating */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="flex items-center">
          {[1, 2, 3, 4, 5]?.map((star) => (
            <Icon
              key={star}
              name="Star"
              size={14}
              className={star <= booking?.provider?.rating ? 'text-amber-400 fill-current' : 'text-slate-300'}
            />
          ))}
        </div>
        <span className="text-sm text-slate-600">
          {booking?.provider?.rating} ({booking?.provider?.reviewCount} reviews)
        </span>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(booking?.id)}
          iconName="Eye"
          iconPosition="left"
        >
          View Details
        </Button>

        {booking?.status === 'confirmed' && (
          <>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onContact(booking?.provider)}
              iconName="Phone"
              iconPosition="left"
            >
              Contact
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onCancel(booking?.id)}
              iconName="X"
              iconPosition="left"
            >
              Cancel
            </Button>
          </>
        )}

        {booking?.status === 'completed' && !booking?.hasReview && (
          <Button
            variant="default"
            size="sm"
            onClick={() => onWriteReview(booking)}
            iconName="Star"
            iconPosition="left"
          >
            Write Review
          </Button>
        )}

        {booking?.status === 'completed' && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onRebook(booking?.provider)}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Book Again
          </Button>
        )}
      </div>
    </div>
  );
};

export default BookingCard;