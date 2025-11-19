import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProvidersSection = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const featuredProviders = [
  {
    id: 'provider-1',
    name: 'Rajesh Kumar',
    profession: 'Master Plumber',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1567f90c6-1763292031693.png",
    imageAlt: 'Professional headshot of Indian man with mustache wearing blue work shirt',
    rating: 4.9,
    reviewCount: 127,
    experience: '8 years',
    startingPrice: 299,
    location: 'Bandra West, Mumbai',
    distance: '2.3 km',
    specialties: ['Pipe Repair', 'Bathroom Fitting', 'Water Heater'],
    availability: 'Available Today',
    isVerified: true,
    responseTime: '15 mins',
    completedJobs: 450
  },
  {
    id: 'provider-2',
    name: 'Priya Sharma',
    profession: 'House Cleaning Expert',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_160d57367-1763300679418.png",
    imageAlt: 'Smiling Indian woman with long black hair in professional cleaning uniform',
    rating: 4.8,
    reviewCount: 89,
    experience: '5 years',
    startingPrice: 199,
    location: 'Andheri East, Mumbai',
    distance: '3.1 km',
    specialties: ['Deep Cleaning', 'Kitchen Cleaning', 'Bathroom Sanitization'],
    availability: 'Available Tomorrow',
    isVerified: true,
    responseTime: '10 mins',
    completedJobs: 320
  },
  {
    id: 'provider-3',
    name: 'Amit Patel',
    profession: 'Certified Electrician',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11b4446af-1763295185739.png",
    imageAlt: 'Professional Indian electrician in safety gear with hard hat and tool belt',
    rating: 4.9,
    reviewCount: 156,
    experience: '10 years',
    startingPrice: 349,
    location: 'Powai, Mumbai',
    distance: '4.2 km',
    specialties: ['Wiring', 'Fan Installation', 'Switch Board'],
    availability: 'Available Today',
    isVerified: true,
    responseTime: '20 mins',
    completedJobs: 580
  },
  {
    id: 'provider-4',
    name: 'Sunita Devi',
    profession: 'AC Repair Specialist',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1b4e4527d-1763301249067.png",
    imageAlt: 'Confident Indian woman technician in blue uniform holding AC repair tools',
    rating: 4.7,
    reviewCount: 98,
    experience: '6 years',
    startingPrice: 399,
    location: 'Malad West, Mumbai',
    distance: '5.8 km',
    specialties: ['AC Service', 'Gas Refill', 'Compressor Repair'],
    availability: 'Available Today',
    isVerified: true,
    responseTime: '25 mins',
    completedJobs: 275
  },
  {
    id: 'provider-5',
    name: 'Vikram Singh',
    profession: 'Carpenter & Furniture Expert',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a7a5fcb6-1763293247020.png",
    imageAlt: 'Skilled Indian carpenter with beard wearing work apron in workshop',
    rating: 4.8,
    reviewCount: 134,
    experience: '12 years',
    startingPrice: 449,
    location: 'Goregaon West, Mumbai',
    distance: '6.5 km',
    specialties: ['Furniture Repair', 'Custom Cabinets', 'Door Fitting'],
    availability: 'Available Tomorrow',
    isVerified: true,
    responseTime: '30 mins',
    completedJobs: 390
  },
  {
    id: 'provider-6',
    name: 'Meera Joshi',
    profession: 'Beauty & Wellness Expert',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1536e43fc-1763295220673.png",
    imageAlt: 'Professional Indian beautician with styled hair in white salon uniform',
    rating: 4.9,
    reviewCount: 201,
    experience: '7 years',
    startingPrice: 599,
    location: 'Juhu, Mumbai',
    distance: '7.2 km',
    specialties: ['Facial Treatment', 'Hair Styling', 'Bridal Makeup'],
    availability: 'Available Today',
    isVerified: true,
    responseTime: '12 mins',
    completedJobs: 650
  }];


  const handleProviderClick = (providerId) => {
    navigate(`/provider-profile?id=${providerId}`);
  };

  const handleBookNow = (e, providerId) => {
    e?.stopPropagation();
    navigate(`/booking-creation?provider=${providerId}`);
  };

  const handleViewAllProviders = () => {
    navigate('/provider-listing');
  };

  const SkeletonCard = () =>
  <div className="bg-surface border border-border rounded-2xl p-6 animate-pulse">
      <div className="flex items-start space-x-4 mb-4">
        <div className="w-16 h-16 bg-muted rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-muted rounded mb-2"></div>
          <div className="h-3 bg-muted rounded w-3/4"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-muted rounded"></div>
        <div className="h-3 bg-muted rounded w-2/3"></div>
      </div>
      <div className="h-10 bg-muted rounded"></div>
    </div>;


  if (loading) {
    return (
      <section className="py-12 lg:py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8 lg:mb-12">
            <div className="h-8 bg-muted rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-muted rounded w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)]?.map((_, index) =>
            <SkeletonCard key={index} />
            )}
          </div>
        </div>
      </section>);

  }

  return (
    <section className="py-12 lg:py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
            Featured Service Providers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover top-rated professionals in your area with verified credentials and excellent reviews
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {featuredProviders?.map((provider) =>
          <div
            key={provider?.id}
            onClick={() => handleProviderClick(provider?.id)}
            className="bg-surface border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer group">

              {/* Provider Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="relative">
                  <Image
                  src={provider?.image}
                  alt={provider?.imageAlt}
                  className="w-16 h-16 rounded-full object-cover" />

                  {provider?.isVerified &&
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} color="white" />
                    </div>
                }
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                    {provider?.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">{provider?.profession}</p>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Icon name="Star" size={12} className="text-yellow-500 mr-1" />
                      <span className="font-medium">{provider?.rating}</span>
                      <span className="ml-1">({provider?.reviewCount})</span>
                    </div>
                    <div className="flex items-center">
                      <Icon name="Clock" size={12} className="mr-1" />
                      <span>{provider?.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location & Distance */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Icon name="MapPin" size={14} className="mr-1" />
                  <span className="truncate">{provider?.location}</span>
                </div>
                <span className="text-sm text-primary font-medium">{provider?.distance}</span>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {provider?.specialties?.slice(0, 2)?.map((specialty, index) =>
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full">

                      {specialty}
                    </span>
                )}
                  {provider?.specialties?.length > 2 &&
                <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                      +{provider?.specialties?.length - 2}
                    </span>
                }
                </div>
              </div>

              {/* Availability & Response Time */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                  <span className="text-success font-medium">{provider?.availability}</span>
                </div>
                <div className="text-xs text-muted-foreground">
                  Responds in {provider?.responseTime}
                </div>
              </div>

              {/* Pricing & Action */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold text-foreground">
                    ₹{provider?.startingPrice?.toLocaleString('en-IN')}
                  </div>
                  <div className="text-xs text-muted-foreground">Starting price</div>
                </div>
                <Button
                size="sm"
                onClick={(e) => handleBookNow(e, provider?.id)}
                className="group-hover:bg-primary group-hover:text-primary-foreground">

                  Book Now
                </Button>
              </div>

              {/* Completed Jobs */}
              <div className="mt-3 pt-3 border-t border-border">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{provider?.completedJobs} jobs completed</span>
                  <div className="flex items-center">
                    <span>View Profile</span>
                    <Icon name="ArrowRight" size={12} className="ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleViewAllProviders}
            iconName="Users"
            iconPosition="left">

            View All Providers
          </Button>
        </div>
      </div>
    </section>);

};

export default FeaturedProvidersSection;