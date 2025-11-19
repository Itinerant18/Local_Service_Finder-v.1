import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  isOpen, 
  onToggle, 
  resultCount = 0,
  isMobile = false 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const categories = [
    { id: 'plumbing', label: 'Plumbing', count: 45 },
    { id: 'electrical', label: 'Electrical', count: 38 },
    { id: 'cleaning', label: 'House Cleaning', count: 62 },
    { id: 'carpentry', label: 'Carpentry', count: 29 },
    { id: 'painting', label: 'Painting', count: 41 },
    { id: 'appliance', label: 'Appliance Repair', count: 33 },
    { id: 'gardening', label: 'Gardening', count: 27 },
    { id: 'pest-control', label: 'Pest Control', count: 19 }
  ];

  const experienceLevels = [
    { id: 'beginner', label: '0-2 years', count: 23 },
    { id: 'intermediate', label: '3-5 years', count: 67 },
    { id: 'experienced', label: '6-10 years', count: 89 },
    { id: 'expert', label: '10+ years', count: 45 }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleCategoryToggle = (categoryId) => {
    const currentCategories = localFilters?.categories || [];
    const updatedCategories = currentCategories?.includes(categoryId)
      ? currentCategories?.filter(id => id !== categoryId)
      : [...currentCategories, categoryId];
    handleFilterChange('categories', updatedCategories);
  };

  const handleExperienceToggle = (experienceId) => {
    const currentExperience = localFilters?.experience || [];
    const updatedExperience = currentExperience?.includes(experienceId)
      ? currentExperience?.filter(id => id !== experienceId)
      : [...currentExperience, experienceId];
    handleFilterChange('experience', updatedExperience);
  };

  const handlePriceRangeChange = (type, value) => {
    const priceRange = localFilters?.priceRange || { min: 0, max: 5000 };
    const updatedRange = { ...priceRange, [type]: parseInt(value) || 0 };
    handleFilterChange('priceRange', updatedRange);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: { min: 0, max: 5000 },
      rating: 0,
      experience: [],
      availability: false,
      distance: 50
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters?.categories?.length > 0) count++;
    if (localFilters?.priceRange?.min > 0 || localFilters?.priceRange?.max < 5000) count++;
    if (localFilters?.rating > 0) count++;
    if (localFilters?.experience?.length > 0) count++;
    if (localFilters?.availability) count++;
    if (localFilters?.distance < 50) count++;
    return count;
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Results Count */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">{resultCount} providers</span>
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              className="text-primary hover:text-primary/80"
            >
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Service Categories</h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {categories?.map((category) => (
            <div key={category?.id} className="flex items-center justify-between">
              <Checkbox
                label={category?.label}
                checked={localFilters?.categories?.includes(category?.id) || false}
                onChange={() => handleCategoryToggle(category?.id)}
                size="sm"
              />
              <span className="text-xs text-muted-foreground">({category?.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Price Range (₹)</h4>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters?.priceRange?.min || 0}
              onChange={(e) => handlePriceRangeChange('min', e?.target?.value)}
              className="flex-1"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={localFilters?.priceRange?.max || 5000}
              onChange={(e) => handlePriceRangeChange('max', e?.target?.value)}
              className="flex-1"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹0</span>
            <span>₹5,000+</span>
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Minimum Rating</h4>
        <div className="space-y-2">
          {[4, 3, 2, 1]?.map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                checked={localFilters?.rating === rating}
                onChange={() => handleFilterChange('rating', localFilters?.rating === rating ? 0 : rating)}
                size="sm"
              />
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={14}
                    className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
                <span className="text-sm text-muted-foreground">& above</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Experience Level</h4>
        <div className="space-y-2">
          {experienceLevels?.map((level) => (
            <div key={level?.id} className="flex items-center justify-between">
              <Checkbox
                label={level?.label}
                checked={localFilters?.experience?.includes(level?.id) || false}
                onChange={() => handleExperienceToggle(level?.id)}
                size="sm"
              />
              <span className="text-xs text-muted-foreground">({level?.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Availability</h4>
        <Checkbox
          label="Available today"
          checked={localFilters?.availability || false}
          onChange={(e) => handleFilterChange('availability', e?.target?.checked)}
          size="sm"
        />
      </div>

      {/* Distance */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Distance (km)</h4>
        <div className="space-y-2">
          <Input
            type="range"
            min="1"
            max="50"
            value={localFilters?.distance || 50}
            onChange={(e) => handleFilterChange('distance', parseInt(e?.target?.value))}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>1 km</span>
            <span className="font-medium text-foreground">{localFilters?.distance || 50} km</span>
            <span>50+ km</span>
          </div>
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Button */}
        <Button
          variant="outline"
          onClick={onToggle}
          className="w-full mb-4"
          iconName="Filter"
          iconPosition="left"
        >
          Filters {getActiveFilterCount() > 0 && `(${getActiveFilterCount()})`}
        </Button>
        {/* Mobile Filter Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-black/50" onClick={onToggle}>
            <div 
              className="fixed right-0 top-0 h-full w-80 bg-surface border-l border-border overflow-y-auto"
              onClick={(e) => e?.stopPropagation()}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={onToggle}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
                <FilterContent />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <FilterContent />
    </div>
  );
};

export default FilterPanel;