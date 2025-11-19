import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, sortOrder, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'distance', label: 'Distance', icon: 'MapPin' },
    { value: 'rating', label: 'Rating', icon: 'Star' },
    { value: 'price', label: 'Price', icon: 'DollarSign' },
    { value: 'experience', label: 'Experience', icon: 'Award' },
    { value: 'availability', label: 'Availability', icon: 'Clock' }
  ];

  const handleSortChange = (newSortBy) => {
    if (sortBy === newSortBy) {
      // Toggle order if same sort option
      onSortChange(sortBy, sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending for new sort option
      onSortChange(newSortBy, 'asc');
    }
  };

  return (
    <div className="flex items-center justify-between bg-card rounded-lg border border-border p-4 shadow-elevation-sm">
      {/* Sort Options */}
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-foreground mr-2">Sort by:</span>
        <div className="flex items-center space-x-1">
          {sortOptions?.map((option) => (
            <Button
              key={option?.value}
              variant={sortBy === option?.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => handleSortChange(option?.value)}
              iconName={option?.icon}
              iconPosition="left"
              iconSize={14}
              className="relative"
            >
              {option?.label}
              {sortBy === option?.value && (
                <Icon 
                  name={sortOrder === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
                  size={14} 
                  className="ml-1"
                />
              )}
            </Button>
          ))}
        </div>
      </div>
      {/* View Mode Toggle */}
      <div className="hidden md:flex items-center space-x-1 border border-border rounded-lg p-1">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('grid')}
          iconName="Grid3X3"
          iconSize={16}
          className="px-3"
        />
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('list')}
          iconName="List"
          iconSize={16}
          className="px-3"
        />
        <Button
          variant={viewMode === 'map' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('map')}
          iconName="Map"
          iconSize={16}
          className="px-3"
        />
      </div>
    </div>
  );
};

export default SortControls;