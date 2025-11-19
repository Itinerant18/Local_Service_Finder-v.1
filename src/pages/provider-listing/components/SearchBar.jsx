import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ searchQuery, onSearchChange, onLocationChange, currentLocation }) => {
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const locationDropdownRef = useRef(null);

  const popularLocations = [
    { id: 1, name: 'Mumbai, Maharashtra', area: 'All areas' },
    { id: 2, name: 'Andheri West, Mumbai', area: 'Western Suburbs' },
    { id: 3, name: 'Bandra, Mumbai', area: 'Western Suburbs' },
    { id: 4, name: 'Powai, Mumbai', area: 'Central Suburbs' },
    { id: 5, name: 'Thane, Maharashtra', area: 'Extended Mumbai' },
    { id: 6, name: 'Navi Mumbai, Maharashtra', area: 'Satellite City' }
  ];

  const recentSearches = [
    'Plumber near me',
    'Electrician in Andheri',
    'House cleaning service',
    'AC repair Mumbai',
    'Carpenter for furniture'
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef?.current && !locationDropdownRef?.current?.contains(event?.target)) {
        setIsLocationDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location) => {
    onLocationChange(location?.name);
    setIsLocationDropdownOpen(false);
    setLocationSearch('');
  };

  const filteredLocations = popularLocations?.filter(location =>
    location?.name?.toLowerCase()?.includes(locationSearch?.toLowerCase()) ||
    location?.area?.toLowerCase()?.includes(locationSearch?.toLowerCase())
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search for services, providers, or keywords..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10 pr-4 py-3 text-base"
            />
          </div>
        </div>

        {/* Location Selector */}
        <div className="lg:w-80 relative" ref={locationDropdownRef}>
          <div className="relative">
            <Icon 
              name="MapPin" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="w-full pl-10 pr-10 py-3 text-left bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring text-base"
            >
              <span className="truncate">{currentLocation}</span>
            </button>
            <Icon 
              name="ChevronDown" 
              size={20} 
              className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-transform duration-200 ${
                isLocationDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </div>

          {/* Location Dropdown */}
          {isLocationDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-hidden">
              {/* Search within locations */}
              <div className="p-3 border-b border-border">
                <Input
                  type="text"
                  placeholder="Search locations..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e?.target?.value)}
                  className="text-sm"
                />
              </div>

              <div className="max-h-64 overflow-y-auto">
                {/* Current Location */}
                <div className="p-3 border-b border-border">
                  <button
                    onClick={() => {
                      onLocationChange('Current Location');
                      setIsLocationDropdownOpen(false);
                    }}
                    className="flex items-center space-x-3 w-full text-left hover:bg-muted rounded-lg p-2 transition-colors"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="Navigation" size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Use current location</p>
                      <p className="text-xs text-muted-foreground">Detect automatically</p>
                    </div>
                  </button>
                </div>

                {/* Popular Locations */}
                <div className="p-3">
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Popular Locations</h4>
                  <div className="space-y-1">
                    {filteredLocations?.map((location) => (
                      <button
                        key={location?.id}
                        onClick={() => handleLocationSelect(location)}
                        className="flex items-center space-x-3 w-full text-left hover:bg-muted rounded-lg p-2 transition-colors"
                      >
                        <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                          <Icon name="MapPin" size={14} className="text-muted-foreground" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{location?.name}</p>
                          <p className="text-xs text-muted-foreground">{location?.area}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Button */}
        <Button
          variant="default"
          size="lg"
          className="lg:w-auto w-full"
          iconName="Search"
          iconPosition="left"
        >
          Search
        </Button>
      </div>
      {/* Recent Searches */}
      {searchQuery === '' && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">Recent Searches</h4>
          <div className="flex flex-wrap gap-2">
            {recentSearches?.map((search, index) => (
              <button
                key={index}
                onClick={() => onSearchChange(search)}
                className="px-3 py-1 bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground text-sm rounded-full transition-colors"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;