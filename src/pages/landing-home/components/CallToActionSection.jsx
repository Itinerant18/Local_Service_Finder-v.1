import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CallToActionSection = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: "Shield",
      title: "Verified Professionals",
      description: "All service providers are background-checked and verified"
    },
    {
      icon: "Clock",
      title: "Quick Response",
      description: "Get connected with available providers within minutes"
    },
    {
      icon: "CreditCard",
      title: "Transparent Pricing",
      description: "No hidden charges, see exact costs before booking"
    },
    {
      icon: "Star",
      title: "Quality Guaranteed",
      description: "Rate and review services to maintain high standards"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto leading-relaxed">
            Whether you need a service or want to offer your skills, join our trusted marketplace today
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {benefits?.map((benefit, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Icon
                  name={benefit?.icon}
                  size={24}
                  color="white"
                />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {benefit?.title}
              </h3>
              <p className="text-sm opacity-80 leading-relaxed">
                {benefit?.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <div className="text-center">
            <Button
              onClick={() => navigate('/provider-search')}
              variant="secondary"
              size="lg"
              iconName="Search"
              iconPosition="left"
              className="min-w-56 bg-white text-primary hover:bg-white/90"
            >
              Find Services Now
            </Button>
            <p className="text-sm opacity-80 mt-2">
              Browse 2,500+ verified providers
            </p>
          </div>

          <div className="hidden sm:block w-px h-16 bg-white/20"></div>
          <div className="sm:hidden w-16 h-px bg-white/20"></div>

          <div className="text-center">
            <Button
              onClick={() => navigate('/authentication')}
              variant="outline"
              size="lg"
              iconName="UserPlus"
              iconPosition="left"
              className="min-w-56 border-white text-white hover:bg-white hover:text-primary"
            >
              Become a Provider
            </Button>
            <p className="text-sm opacity-80 mt-2">
              Start earning with your skills
            </p>
          </div>
        </div>

        {/* Contact Info */}
        <div className="text-center mt-12 pt-8 border-t border-white/20">
          <p className="text-sm opacity-80 mb-4">
            Need help? Contact our support team
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} />
              <span>support@localservicefinder.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span>24/7 Customer Support</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;