import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      {/* Provider Info */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-100">
          <Image
            src={review?.provider?.avatar}
            alt={review?.provider?.avatarAlt}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-slate-900">{review?.provider?.name}</h4>
          <p className="text-sm text-slate-600">{review?.service?.name}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-1 mb-1">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <Icon
                key={star}
                name="Star"
                size={14}
                className={star <= review?.rating ? 'text-amber-400 fill-current' : 'text-slate-300'}
              />
            ))}
          </div>
          <p className="text-xs text-slate-500">{formatDate(review?.createdAt)}</p>
        </div>
      </div>
      {/* Review Content */}
      <div className="mb-4">
        <p className="text-slate-700 leading-relaxed">{review?.comment}</p>
      </div>
      {/* Review Images */}
      {review?.images && review?.images?.length > 0 && (
        <div className="flex space-x-2 mb-4 overflow-x-auto">
          {review?.images?.map((image, index) => (
            <div key={index} className="w-20 h-20 rounded-lg overflow-hidden bg-slate-100 flex-shrink-0">
              <Image
                src={image?.url}
                alt={image?.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex justify-end space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(review)}
          iconName="Edit2"
          iconPosition="left"
        >
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(review?.id)}
          iconName="Trash2"
          iconPosition="left"
          className="text-red-600 hover:text-red-700"
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default ReviewCard;