import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const ServiceCategoriesSection = () => {
  const navigate = useNavigate();

  const serviceCategories = [
    {
      id: 'home-repair',
      name: 'Home Repair',
      description: 'Plumbing, electrical, carpentry',
      icon: 'Wrench',
      color: 'bg-blue-500',
      services: ['Plumber', 'Electrician', 'Carpenter', 'Painter'],
      providerCount: 245
    },
    {
      id: 'cleaning',
      name: 'Cleaning Services',
      description: 'House, office, deep cleaning',
      icon: 'Sparkles',
      color: 'bg-green-500',
      services: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning', 'Carpet Cleaning'],
      providerCount: 189
    },
    {
      id: 'appliance',
      name: 'Appliance Repair',
      description: 'AC, washing machine, fridge',
      icon: 'Zap',
      color: 'bg-orange-500',
      services: ['AC Repair', 'Washing Machine', 'Refrigerator', 'Microwave'],
      providerCount: 156
    },
    {
      id: 'beauty',
      name: 'Beauty & Wellness',
      description: 'Salon, spa, massage',
      icon: 'Scissors',
      color: 'bg-pink-500',
      services: ['Hair Salon', 'Spa Services', 'Massage', 'Nail Art'],
      providerCount: 98
    },
    {
      id: 'fitness',
      name: 'Fitness & Health',
      description: 'Personal trainer, yoga, physiotherapy',
      icon: 'Dumbbell',
      color: 'bg-purple-500',
      services: ['Personal Trainer', 'Yoga', 'Physiotherapy', 'Dietician'],
      providerCount: 134
    },
    {
      id: 'tutoring',
      name: 'Education & Tutoring',
      description: 'Academic, music, language',
      icon: 'BookOpen',
      color: 'bg-indigo-500',
      services: ['Academic Tutor', 'Music Teacher', 'Language Coach', 'Skill Training'],
      providerCount: 167
    },
    {
      id: 'automotive',
      name: 'Automotive Services',
      description: 'Car wash, repair, maintenance',
      icon: 'Car',
      color: 'bg-red-500',
      services: ['Car Wash', 'Auto Repair', 'Bike Service', 'Tyre Service'],
      providerCount: 89
    },
    {
      id: 'pet-care',
      name: 'Pet Care',
      description: 'Grooming, training, veterinary',
      icon: 'Heart',
      color: 'bg-teal-500',
      services: ['Pet Grooming', 'Pet Training', 'Veterinary', 'Pet Sitting'],
      providerCount: 67
    }
  ];

  const handleCategoryClick = (category) => {
    navigate(`/provider-listing?category=${category?.id}&services=${category?.services?.join(',')}`);
  };

  const handleViewAllCategories = () => {
    navigate('/provider-listing');
  };

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
            Popular Service Categories
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our most requested services and find the perfect professional for your needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {serviceCategories?.map((category) => (
            <div
              key={category?.id}
              onClick={() => handleCategoryClick(category)}
              className="group bg-surface border border-border rounded-2xl p-6 hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
            >
              {/* Category Icon */}
              <div className={`w-14 h-14 ${category?.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={category?.icon} size={28} color="white" />
              </div>

              {/* Category Info */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {category?.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {category?.description}
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="Users" size={14} className="mr-1" />
                  <span>{category?.providerCount} providers</span>
                </div>
              </div>

              {/* Popular Services */}
              <div className="space-y-1">
                {category?.services?.slice(0, 3)?.map((service, index) => (
                  <div key={index} className="flex items-center text-xs text-muted-foreground">
                    <div className="w-1 h-1 bg-muted-foreground rounded-full mr-2"></div>
                    <span>{service}</span>
                  </div>
                ))}
                {category?.services?.length > 3 && (
                  <div className="text-xs text-primary font-medium">
                    +{category?.services?.length - 3} more
                  </div>
                )}
              </div>

              {/* Hover Arrow */}
              <div className="flex justify-end mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Icon name="ArrowRight" size={16} className="text-primary" />
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button
            onClick={handleViewAllCategories}
            className="inline-flex items-center px-6 py-3 bg-muted text-muted-foreground rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors duration-200 font-medium"
          >
            <span>View All Categories</span>
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </button>
        </div>

        {/* Quick Stats */}
        <div className="mt-12 lg:mt-16 bg-gradient-to-r from-primary/5 to-accent/5 rounded-2xl p-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">1,200+</div>
              <div className="text-sm text-muted-foreground">Verified Providers</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-success mb-1">50,000+</div>
              <div className="text-sm text-muted-foreground">Services Completed</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-accent mb-1">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div>
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCategoriesSection;