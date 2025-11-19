import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState('');
  const [searchService, setSearchService] = useState('');

  const handleSearch = () => {
    navigate('/provider-search', { 
      state: { 
        location: searchLocation, 
        service: searchService 
      } 
    });
  };

  const handleLocationDetection = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setSearchLocation('Current Location');
        },
        (error) => {
          console.log('Location detection failed');
        }
      );
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 pt-24 pb-16 lg:pt-32 lg:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
            Find Trusted Local
            <span className="text-primary block">Service Providers</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with verified professionals in your area for home repairs, cleaning, maintenance, and more. 
            Book with confidence and get quality service delivered to your doorstep.
          </p>
          
          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-12 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-success" />
              <span>2,500+ Verified Providers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span>50,000+ Completed Bookings</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} className="text-warning" />
              <span>4.8 Average Rating</span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-elevation-lg p-6 lg:p-8 border border-border">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
              <div className="lg:col-span-5">
                <Input
                  label="What service do you need?"
                  type="text"
                  placeholder="e.g., Plumber, Electrician, Cleaner"
                  value={searchService}
                  onChange={(e) => setSearchService(e?.target?.value)}
                  className="mb-0"
                />
              </div>
              
              <div className="lg:col-span-5">
                <div className="relative">
                  <Input
                    label="Your location"
                    type="text"
                    placeholder="Enter your area or pincode"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e?.target?.value)}
                    className="mb-0"
                  />
                  <button
                    onClick={handleLocationDetection}
                    className="absolute right-3 top-9 p-1 text-primary hover:text-primary/80 transition-smooth"
                    title="Use current location"
                  >
                    <Icon name="MapPin" size={18} />
                  </button>
                </div>
              </div>
              
              <div className="lg:col-span-2">
                <Button
                  onClick={handleSearch}
                  size="lg"
                  fullWidth
                  iconName="Search"
                  iconPosition="left"
                  className="h-12"
                >
                  Search
                </Button>
              </div>
            </div>
            
            {/* Popular Searches */}
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-3">Popular searches:</p>
              <div className="flex flex-wrap gap-2">
                {['Plumber', 'Electrician', 'House Cleaning', 'AC Repair', 'Carpenter', 'Painter']?.map((service) => (
                  <button
                    key={service}
                    onClick={() => setSearchService(service)}
                    className="px-3 py-1 text-sm bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground rounded-full transition-smooth"
                  >
                    {service}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <Button
            onClick={() => navigate('/provider-search')}
            size="lg"
            iconName="Search"
            iconPosition="left"
            className="min-w-48"
          >
            Find Services
          </Button>
          <Button
            onClick={() => navigate('/authentication')}
            variant="outline"
            size="lg"
            iconName="UserPlus"
            iconPosition="left"
            className="min-w-48"
          >
            Join as Provider
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;