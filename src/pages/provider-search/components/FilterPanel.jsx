import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  providerCount = 0, 
  isOpen = false, 
  onToggle = () => {},
  isMobile = false 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const serviceCategories = [
    { id: 'plumbing', label: 'Plumbing', count: 45 },
    { id: 'electrical', label: 'Electrical', count: 38 },
    { id: 'cleaning', label: 'Cleaning', count: 62 },
    { id: 'carpentry', label: 'Carpentry', count: 29 },
    { id: 'painting', label: 'Painting', count: 41 },
    { id: 'gardening', label: 'Gardening', count: 33 },
    { id: 'appliance-repair', label: 'Appliance Repair', count: 27 },
    { id: 'pest-control', label: 'Pest Control', count: 19 }
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

  const handleClearFilters = () => {
    const clearedFilters = {
      categories: [],
      priceRange: [0, 5000],
      rating: 0,
      distance: 50,
      availability: false,
      verified: false,
      experience: 0
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Search Keywords */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Search Services
        </label>
        <Input
          type="text"
          placeholder="e.g., kitchen repair, bathroom cleaning"
          value={localFilters?.keywords || ''}
          onChange={(e) => handleFilterChange('keywords', e?.target?.value)}
          className="w-full"
        />
      </div>

      {/* Service Categories */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Service Categories
        </label>
        <div className="grid grid-cols-2 gap-2">
          {serviceCategories?.map((category) => (
            <div key={category?.id} className="flex items-center space-x-2">
              <Checkbox
                checked={(localFilters?.categories || [])?.includes(category?.id)}
                onChange={() => handleCategoryToggle(category?.id)}
              />
              <span className="text-sm text-foreground flex-1">
                {category?.label}
              </span>
              <span className="text-xs text-muted-foreground">
                ({category?.count})
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Price Range (₹)
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Input
              type="number"
              placeholder="Min"
              value={localFilters?.priceRange?.[0] || 0}
              onChange={(e) => handleFilterChange('priceRange', [parseInt(e?.target?.value) || 0, localFilters?.priceRange?.[1] || 5000])}
              className="flex-1"
            />
            <span className="text-muted-foreground">to</span>
            <Input
              type="number"
              placeholder="Max"
              value={localFilters?.priceRange?.[1] || 5000}
              onChange={(e) => handleFilterChange('priceRange', [localFilters?.priceRange?.[0] || 0, parseInt(e?.target?.value) || 5000])}
              className="flex-1"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>₹{localFilters?.priceRange?.[0] || 0}</span>
            <span>₹{localFilters?.priceRange?.[1] || 5000}</span>
          </div>
        </div>
      </div>

      {/* Distance */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Distance: {localFilters?.distance || 50} km
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={localFilters?.distance || 50}
          onChange={(e) => handleFilterChange('distance', parseInt(e?.target?.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>1 km</span>
          <span>100 km</span>
        </div>
      </div>

      {/* Rating Filter */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Minimum Rating
        </label>
        <div className="flex space-x-2">
          {[1, 2, 3, 4, 5]?.map((rating) => (
            <button
              key={rating}
              onClick={() => handleFilterChange('rating', rating === localFilters?.rating ? 0 : rating)}
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg border transition-smooth ${
                localFilters?.rating >= rating
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50'
              }`}
            >
              <Icon name="Star" size={14} />
              <span className="text-sm">{rating}+</span>
            </button>
          ))}
        </div>
      </div>

      {/* Experience Level */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Minimum Experience: {localFilters?.experience || 0} years
        </label>
        <input
          type="range"
          min="0"
          max="20"
          value={localFilters?.experience || 0}
          onChange={(e) => handleFilterChange('experience', parseInt(e?.target?.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-1">
          <span>0 years</span>
          <span>20+ years</span>
        </div>
      </div>

      {/* Additional Filters */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={localFilters?.availability || false}
            onChange={(e) => handleFilterChange('availability', e?.target?.checked)}
          />
          <span className="text-sm text-foreground">Available Today</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            checked={localFilters?.verified || false}
            onChange={(e) => handleFilterChange('verified', e?.target?.checked)}
          />
          <span className="text-sm text-foreground">Verified Providers Only</span>
        </div>
      </div>

      {/* Clear Filters */}
      <div className="pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={handleClearFilters}
          iconName="RotateCcw"
          iconPosition="left"
          iconSize={16}
          fullWidth
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  if (isMobile) {
    return (
      <>
        {/* Mobile Filter Toggle Button */}
        <Button
          variant="outline"
          onClick={onToggle}
          iconName="Filter"
          iconPosition="left"
          iconSize={16}
          className="mb-4"
        >
          Filters ({providerCount} providers)
        </Button>

        {/* Mobile Filter Overlay */}
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm">
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-card border-l border-border shadow-elevation-lg">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="text-lg font-semibold text-foreground">Filters</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onToggle}
                  iconName="X"
                  iconSize={20}
                />
              </div>
              <div className="p-4 overflow-y-auto h-full pb-20">
                <FilterContent />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        <span className="text-sm text-muted-foreground">
          {providerCount} providers found
        </span>
      </div>
      <FilterContent />
    </div>
  );
};

export default FilterPanel;