import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ favoriteProviders, onRebookProvider }) => {
  const navigate = useNavigate();

  const handleFindServices = () => {
    navigate('/provider-listing');
  };

  const handleViewHome = () => {
    navigate('/customer-home');
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      {/* Action Buttons */}
      <div className="space-y-3 mb-6">
        <Button
          variant="default"
          fullWidth
          onClick={handleFindServices}
          iconName="Search"
          iconPosition="left"
        >
          Find New Services
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          onClick={handleViewHome}
          iconName="Home"
          iconPosition="left"
        >
          Browse Categories
        </Button>
      </div>
      {/* Favorite Providers */}
      {favoriteProviders && favoriteProviders?.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-slate-700 mb-3">Favorite Providers</h4>
          <div className="space-y-2">
            {favoriteProviders?.slice(0, 3)?.map((provider) => (
              <div
                key={provider?.id}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <Icon name="User" size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{provider?.name}</p>
                    <p className="text-xs text-slate-600">{provider?.service}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRebookProvider(provider)}
                  iconName="RotateCcw"
                >
                  Book
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuickActions;
