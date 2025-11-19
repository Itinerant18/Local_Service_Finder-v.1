import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ServiceCategoryGrid = () => {
  const navigate = useNavigate();

  const serviceCategories = [
    {
      id: 1,
      name: "Plumbing",
      icon: "Wrench",
      providerCount: 450,
      description: "Pipe repairs, installations, leaks",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      name: "Electrical",
      icon: "Zap",
      providerCount: 320,
      description: "Wiring, repairs, installations",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50"
    },
    {
      id: 3,
      name: "House Cleaning",
      icon: "Sparkles",
      providerCount: 680,
      description: "Deep cleaning, regular maintenance",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      id: 4,
      name: "AC Repair",
      icon: "Wind",
      providerCount: 280,
      description: "AC service, installation, repair",
      color: "text-cyan-600",
      bgColor: "bg-cyan-50"
    },
    {
      id: 5,
      name: "Carpentry",
      icon: "Hammer",
      providerCount: 190,
      description: "Furniture, repairs, installations",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    },
    {
      id: 6,
      name: "Painting",
      icon: "Paintbrush",
      providerCount: 240,
      description: "Interior, exterior, touch-ups",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      id: 7,
      name: "Appliance Repair",
      icon: "Settings",
      providerCount: 160,
      description: "Washing machine, refrigerator, etc.",
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      id: 8,
      name: "Pest Control",
      icon: "Bug",
      providerCount: 95,
      description: "Termite, cockroach, rodent control",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50"
    }
  ];

  const handleCategoryClick = (categoryName) => {
    navigate('/provider-search', { 
      state: { 
        service: categoryName 
      } 
    });
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Popular Service Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our most requested services and find the right professional for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceCategories?.map((category) => (
            <div
              key={category?.id}
              onClick={() => handleCategoryClick(category?.name)}
              className="group bg-card rounded-xl border border-border p-6 hover:shadow-elevation-md transition-all duration-300 cursor-pointer hover:border-primary/20"
            >
              <div className={`w-16 h-16 ${category?.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={category?.icon} 
                  size={28} 
                  className={category?.color}
                />
              </div>
              
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {category?.name}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                {category?.description}
              </p>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  {category?.providerCount}+ providers
                </span>
                <Icon 
                  name="ArrowRight" 
                  size={16} 
                  className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/provider-search')}
            className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <span>View all categories</span>
            <Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoryGrid;