import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortControls = ({ sortBy, onSortChange, viewMode, onViewModeChange }) => {
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const sortDropdownRef = useRef(null);

  const sortOptions = [
    { value: 'relevance', label: 'Best Match', icon: 'Target' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'TrendingUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'TrendingDown' },
    { value: 'distance', label: 'Nearest First', icon: 'MapPin' },
    { value: 'availability', label: 'Available Now', icon: 'Clock' },
    { value: 'experience', label: 'Most Experienced', icon: 'Award' },
    { value: 'popular', label: 'Most Popular', icon: 'ThumbsUp' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sortDropdownRef?.current && !sortDropdownRef?.current?.contains(event?.target)) {
        setIsSortDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getCurrentSortLabel = () => {
    const currentSort = sortOptions?.find(option => option?.value === sortBy);
    return currentSort ? currentSort?.label : 'Best Match';
  };

  const handleSortSelect = (value) => {
    onSortChange(value);
    setIsSortDropdownOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-6">
      {/* Sort Controls */}
      <div className="flex items-center space-x-4">
        <div className="relative" ref={sortDropdownRef}>
          <Button
            variant="outline"
            onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
            iconName="ArrowUpDown"
            iconPosition="left"
            className="min-w-48"
          >
            <span className="flex-1 text-left">Sort: {getCurrentSortLabel()}</span>
            <Icon 
              name="ChevronDown" 
              size={16} 
              className={`ml-2 transition-transform duration-200 ${
                isSortDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </Button>

          {/* Sort Dropdown */}
          {isSortDropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-lg z-50">
              <div className="py-2">
                {sortOptions?.map((option) => (
                  <button
                    key={option?.value}
                    onClick={() => handleSortSelect(option?.value)}
                    className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-muted transition-colors ${
                      sortBy === option?.value ? 'bg-primary/10 text-primary' : 'text-foreground'
                    }`}
                  >
                    <Icon name={option?.icon} size={16} />
                    <span className="flex-1">{option?.label}</span>
                    {sortBy === option?.value && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Sort Buttons - Desktop Only */}
        <div className="hidden lg:flex items-center space-x-2">
          <Button
            variant={sortBy === 'rating' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onSortChange('rating')}
            iconName="Star"
            iconPosition="left"
          >
            Top Rated
          </Button>
          <Button
            variant={sortBy === 'price-low' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onSortChange('price-low')}
            iconName="TrendingUp"
            iconPosition="left"
          >
            Best Price
          </Button>
          <Button
            variant={sortBy === 'availability' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onSortChange('availability')}
            iconName="Clock"
            iconPosition="left"
          >
            Available Now
          </Button>
        </div>
      </div>
      {/* View Mode Toggle - Desktop Only */}
      <div className="hidden lg:flex items-center space-x-2 bg-muted rounded-lg p-1">
        <Button
          variant={viewMode === 'grid' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('grid')}
          className="px-3"
        >
          <Icon name="Grid3X3" size={16} />
        </Button>
        <Button
          variant={viewMode === 'list' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => onViewModeChange('list')}
          className="px-3"
        >
          <Icon name="List" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default SortControls;