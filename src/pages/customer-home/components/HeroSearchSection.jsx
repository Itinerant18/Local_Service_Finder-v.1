import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSearchSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLocation, setCurrentLocation] = useState('Mumbai, Maharashtra');
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  const handleSearch = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/provider-listing?search=${encodeURIComponent(searchQuery)}&location=${encodeURIComponent(currentLocation)}`);
    }
  };

  const handleLocationDetection = () => {
    setIsLocationLoading(true);
    // Mock location detection
    setTimeout(() => {
      setCurrentLocation('Detected: Bandra West, Mumbai');
      setIsLocationLoading(false);
    }, 2000);
  };

  const popularSearches = [
    "Plumber near me",
    "AC repair service",
    "House cleaning",
    "Electrician",
    "Carpenter"
  ];

  return (
    <section className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
            Find Trusted Local Services
            <span className="block text-primary mt-2">Near You</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
            Connect with verified professionals for all your home and business needs. 
            Book instantly with transparent pricing.
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="bg-surface rounded-2xl shadow-lg p-4 lg:p-6 border border-border">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Service Search Input */}
              <div className="flex-1">
                <label htmlFor="service-search" className="block text-sm font-medium text-foreground mb-2">
                  What service do you need?
                </label>
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={20} 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    id="service-search"
                    type="text"
                    placeholder="Search for plumber, electrician, cleaner..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-12 pr-4 py-4 border border-border rounded-xl bg-input focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground"
                  />
                </div>
              </div>

              {/* Location Input */}
              <div className="lg:w-80">
                <label htmlFor="location-search" className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Icon 
                      name="MapPin" 
                      size={20} 
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                    />
                    <input
                      id="location-search"
                      type="text"
                      placeholder="Enter your location"
                      value={currentLocation}
                      onChange={(e) => setCurrentLocation(e?.target?.value)}
                      className="w-full pl-12 pr-4 py-4 border border-border rounded-xl bg-input focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={handleLocationDetection}
                    loading={isLocationLoading}
                    className="h-14 w-14 shrink-0"
                    title="Detect current location"
                  >
                    <Icon name="Crosshair" size={20} />
                  </Button>
                </div>
              </div>

              {/* Search Button */}
              <div className="lg:flex lg:items-end">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full lg:w-auto lg:h-14 lg:px-8"
                  disabled={!searchQuery?.trim()}
                >
                  <Icon name="Search" size={20} className="mr-2" />
                  Search Services
                </Button>
              </div>
            </div>
          </form>

          {/* Popular Searches */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
            <div className="flex flex-wrap justify-center gap-2">
              {popularSearches?.map((search, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(search);
                    navigate(`/provider-listing?search=${encodeURIComponent(search)}&location=${encodeURIComponent(currentLocation)}`);
                  }}
                  className="px-4 py-2 text-sm bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  {search}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 lg:mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Shield" size={24} color="var(--color-primary)" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Verified Providers</h3>
              <p className="text-sm text-muted-foreground">Background checked professionals</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Star" size={24} color="var(--color-success)" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Rated Services</h3>
              <p className="text-sm text-muted-foreground">Real customer reviews &amp; ratings</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Clock" size={24} color="var(--color-accent)" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Quick Booking</h3>
              <p className="text-sm text-muted-foreground">Instant scheduling available</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="IndianRupee" size={24} color="var(--color-primary)" />
              </div>
              <h3 className="font-semibold text-foreground mb-1">Fair Pricing</h3>
              <p className="text-sm text-muted-foreground">Transparent cost estimates</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSearchSection;