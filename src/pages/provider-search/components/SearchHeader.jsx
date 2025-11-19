import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchHeader = ({ 
  searchQuery, 
  onSearchChange, 
  location, 
  onLocationChange,
  onSearch 
}) => {
  const [isLocationExpanded, setIsLocationExpanded] = useState(false);

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    onSearch();
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-elevation-sm mb-6">
      <form onSubmit={handleSearchSubmit} className="space-y-4">
        {/* Main Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="text"
                placeholder="Search for services (e.g., plumber, electrician, cleaner)"
                value={searchQuery}
                onChange={(e) => onSearchChange(e?.target?.value)}
                className="pl-10 pr-4 py-3 text-base"
              />
            </div>
          </div>

          <div className="md:w-80">
            <div className="relative">
              <Icon 
                name="MapPin" 
                size={20} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="text"
                placeholder="Enter your location"
                value={location}
                onChange={(e) => onLocationChange(e?.target?.value)}
                className="pl-10 pr-10 py-3 text-base"
              />
              <button
                type="button"
                onClick={() => setIsLocationExpanded(!isLocationExpanded)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
              >
                <Icon name="Navigation" size={16} />
              </button>
            </div>
          </div>

          <Button
            type="submit"
            variant="default"
            size="lg"
            iconName="Search"
            iconPosition="left"
            iconSize={16}
            className="md:px-8"
          >
            Search
          </Button>
        </div>

        {/* Location Suggestions */}
        {isLocationExpanded && (
          <div className="bg-muted rounded-lg p-4">
            <h4 className="text-sm font-medium text-foreground mb-3">Popular Areas</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                'Connaught Place, Delhi',
                'Bandra West, Mumbai',
                'Koramangala, Bangalore',
                'Park Street, Kolkata',
                'Sector 18, Noida',
                'Cyber City, Gurgaon',
                'Hitech City, Hyderabad',
                'MG Road, Pune'
              ]?.map((area, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onLocationChange(area);
                    setIsLocationExpanded(false);
                  }}
                  className="text-left text-sm text-muted-foreground hover:text-foreground hover:bg-card rounded-md p-2 transition-smooth"
                >
                  {area}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quick Service Categories */}
        <div className="flex flex-wrap gap-2">
          <span className="text-sm text-muted-foreground mr-2">Popular:</span>
          {[
            'Plumbing',
            'Electrical',
            'Cleaning',
            'Carpentry',
            'Painting',
            'AC Repair'
          ]?.map((category, index) => (
            <button
              key={index}
              type="button"
              onClick={() => onSearchChange(category)}
              className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground px-3 py-1 rounded-full text-sm transition-smooth"
            >
              {category}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
};

export default SearchHeader;