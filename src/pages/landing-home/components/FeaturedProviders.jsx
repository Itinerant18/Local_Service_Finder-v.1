import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedProviders = () => {
  const navigate = useNavigate();

  const featuredProviders = [
  {
    id: 1,
    name: "Rajesh Kumar",
    profession: "Master Plumber",
    rating: 4.9,
    reviewCount: 156,
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1659353591742-9fa64d94738e",
    imageAlt: "Professional Indian plumber in blue uniform holding wrench and smiling at camera",
    specialties: ["Pipe Installation", "Leak Repair", "Bathroom Fitting"],
    completedJobs: 340,
    responseTime: "30 mins",
    verified: true
  },
  {
    id: 2,
    name: "Priya Sharma",
    profession: "House Cleaning Expert",
    rating: 4.8,
    reviewCount: 203,
    experience: "5 years",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_11ac8194f-1763294669350.png",
    imageAlt: "Professional woman in cleaning uniform with cleaning supplies smiling confidently",
    specialties: ["Deep Cleaning", "Kitchen Cleaning", "Office Cleaning"],
    completedJobs: 520,
    responseTime: "1 hour",
    verified: true
  },
  {
    id: 3,
    name: "Amit Patel",
    profession: "Certified Electrician",
    rating: 4.9,
    reviewCount: 128,
    experience: "10 years",
    image: "https://images.unsplash.com/photo-1615774925655-a0e97fc85c14",
    imageAlt: "Experienced electrician in safety gear working with electrical panel and tools",
    specialties: ["Wiring", "Fan Installation", "Electrical Repair"],
    completedJobs: 280,
    responseTime: "45 mins",
    verified: true
  },
  {
    id: 4,
    name: "Sunita Devi",
    profession: "AC Technician",
    rating: 4.7,
    reviewCount: 89,
    experience: "6 years",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1402bd26c-1763300334773.png",
    imageAlt: "Female AC technician in uniform working on air conditioning unit with professional tools",
    specialties: ["AC Repair", "Installation", "Maintenance"],
    completedJobs: 195,
    responseTime: "2 hours",
    verified: true
  }];


  const handleProviderClick = (providerId) => {
    navigate('/provider-profile', {
      state: {
        providerId: providerId
      }
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Top-Rated Service Providers
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Meet our verified professionals who consistently deliver exceptional service and customer satisfaction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProviders?.map((provider) =>
          <div
            key={provider?.id}
            onClick={() => handleProviderClick(provider?.id)}
            className="bg-card rounded-xl border border-border p-6 hover:shadow-elevation-lg transition-all duration-300 cursor-pointer group">

              {/* Provider Image */}
              <div className="relative mb-4">
                <div className="w-20 h-20 mx-auto rounded-full overflow-hidden border-4 border-primary/10 group-hover:border-primary/30 transition-colors">
                  <Image
                  src={provider?.image}
                  alt={provider?.imageAlt}
                  className="w-full h-full object-cover" />

                </div>
                {provider?.verified &&
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-card">
                    <Icon name="Check" size={12} color="white" />
                  </div>
              }
              </div>

              {/* Provider Info */}
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {provider?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {provider?.profession}
                </p>
                
                {/* Rating */}
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-foreground">
                    {provider?.rating}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({provider?.reviewCount} reviews)
                  </span>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Experience:</span>
                  <span className="font-medium text-foreground">{provider?.experience}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Jobs completed:</span>
                  <span className="font-medium text-foreground">{provider?.completedJobs}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Response time:</span>
                  <span className="font-medium text-foreground">{provider?.responseTime}</span>
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2">Specialties:</p>
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
                      +{provider?.specialties?.length - 2} more
                    </span>
                }
                </div>
              </div>

              {/* View Profile Button */}
              <Button
              variant="outline"
              size="sm"
              fullWidth
              iconName="ArrowRight"
              iconPosition="right"
              iconSize={14}
              className="group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors">

                View Profile
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <Button
            onClick={() => navigate('/provider-search')}
            size="lg"
            iconName="Users"
            iconPosition="left">

            Browse All Providers
          </Button>
        </div>
      </div>
    </section>);

};

export default FeaturedProviders;