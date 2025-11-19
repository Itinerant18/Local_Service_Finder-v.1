import React from 'react';
import Icon from '../../../components/AppIcon';

const HowItWorksSection = () => {
  const steps = [
    {
      id: 1,
      title: 'Search & Browse',
      description: 'Find service providers by location, category, or specific needs. Use filters to narrow down your options.',
      icon: 'Search',
      color: 'bg-blue-500',
      details: [
        'Location-based search',
        'Category filtering',
        'Price range selection',
        'Availability check'
      ]
    },
    {
      id: 2,
      title: 'Compare & Select',
      description: 'Review profiles, ratings, and pricing. Check availability and read customer reviews to make informed decisions.',
      icon: 'Users',
      color: 'bg-green-500',
      details: [
        'Profile comparison',
        'Rating & reviews',
        'Portfolio viewing',
        'Price comparison'
      ]
    },
    {
      id: 3,
      title: 'Book & Schedule',
      description: 'Select your preferred date and time. Provide service details and confirm your booking with transparent pricing.',
      icon: 'Calendar',
      color: 'bg-orange-500',
      details: [
        'Date & time selection',
        'Service customization',
        'Address confirmation',
        'Price estimation'
      ]
    },
    {
      id: 4,
      title: 'Get Service & Pay',
      description: 'Professional arrives on time. Service completed to your satisfaction. Pay securely through the platform.',
      icon: 'CheckCircle',
      color: 'bg-purple-500',
      details: [
        'Professional arrival',
        'Quality service delivery',
        'Secure payment',
        'Service completion'
      ]
    }
  ];

  return (
    <section className="py-12 lg:py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
            How LocalFind Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Getting professional services has never been easier. Follow these simple steps to connect with trusted local providers.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps?.map((step, index) => (
            <div key={step?.id} className="relative">
              {/* Connection Line */}
              {index < steps?.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-border to-transparent z-0"></div>
              )}
              
              <div className="relative z-10 text-center">
                {/* Step Icon */}
                <div className={`w-16 h-16 ${step?.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <Icon name={step?.icon} size={32} color="white" />
                </div>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                  {step?.id}
                </div>

                {/* Step Content */}
                <div className="bg-surface border border-border rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {step?.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {step?.description}
                  </p>

                  {/* Step Details */}
                  <div className="space-y-2">
                    {step?.details?.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center text-sm text-muted-foreground">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-3"></div>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Benefits */}
        <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-xl lg:text-2xl font-bold text-foreground mb-3">
              Why Choose LocalFind?
            </h3>
            <p className="text-muted-foreground">
              We make finding and booking local services simple, safe, and reliable
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Shield" size={24} color="var(--color-success)" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Verified Professionals</h4>
              <p className="text-sm text-muted-foreground">
                All service providers undergo background verification and skill assessment
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="CreditCard" size={24} color="var(--color-primary)" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">Secure Payments</h4>
              <p className="text-sm text-muted-foreground">
                Multiple payment options with secure processing and money-back guarantee
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Icon name="Headphones" size={24} color="var(--color-accent)" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">24/7 Support</h4>
              <p className="text-sm text-muted-foreground">
                Round-the-clock customer support to help you with any queries or issues
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-4 bg-surface border border-border rounded-xl p-6">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">Average booking time:</span>
              <span className="text-sm font-semibold text-foreground">Under 3 minutes</span>
            </div>
            <div className="w-px h-6 bg-border"></div>
            <div className="flex items-center space-x-2">
              <Icon name="Star" size={20} className="text-yellow-500" />
              <span className="text-sm text-muted-foreground">Customer satisfaction:</span>
              <span className="text-sm font-semibold text-foreground">4.8/5 stars</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;