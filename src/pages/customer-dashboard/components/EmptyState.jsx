import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'bookings' }) => {
  const navigate = useNavigate();

  const getEmptyStateContent = () => {
    switch (type) {
      case 'bookings':
        return {
          icon: 'Calendar',
          title: 'No bookings yet',
          description: 'Start by finding trusted service providers in your area and book your first service.',
          actionText: 'Find Services',
          actionHandler: () => navigate('/provider-listing')
        };
      case 'active-bookings':
        return {
          icon: 'Clock',
          title: 'No active bookings',
          description: 'You don\'t have any upcoming appointments. Browse services to book a new appointment.',
          actionText: 'Browse Services',
          actionHandler: () => navigate('/provider-listing')
        };
      case 'history':
        return {
          icon: 'History',
          title: 'No booking history',
          description: 'Your completed and cancelled bookings will appear here once you start using our services.',
          actionText: 'Book Your First Service',
          actionHandler: () => navigate('/customer-home')
        };
      case 'reviews':
        return {
          icon: 'Star',
          title: 'No reviews written',
          description: 'Share your experience by writing reviews for completed services to help other customers.',
          actionText: 'View Completed Bookings',
          actionHandler: () => {}
        };
      case 'search':
        return {
          icon: 'SearchX',
          title: 'No results found',
          description: 'Try adjusting your search terms or filters to find what you\'re looking for.',
          actionText: 'Clear Filters',
          actionHandler: () => {}
        };
      default:
        return {
          icon: 'FileX',
          title: 'Nothing here',
          description: 'There\'s nothing to show at the moment.',
          actionText: 'Go Back',
          actionHandler: () => navigate(-1)
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
        <Icon name={content?.icon} size={32} className="text-slate-400" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">
        {content?.title}
      </h3>
      <p className="text-slate-600 mb-6 max-w-md">
        {content?.description}
      </p>
      <Button
        variant="default"
        onClick={content?.actionHandler}
        iconName="ArrowRight"
        iconPosition="right"
      >
        {content?.actionText}
      </Button>
    </div>
  );
};

export default EmptyState;