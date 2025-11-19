import React from 'react';
import Header from '../../components/ui/Header';
import HeroSearchSection from './components/HeroSearchSection';
import ServiceCategoriesSection from './components/ServiceCategoriesSection';
import FeaturedProvidersSection from './components/FeaturedProvidersSection';
import HowItWorksSection from './components/HowItWorksSection';
import TestimonialsSection from './components/TestimonialsSection';

const CustomerHome = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section with Search */}
        <HeroSearchSection />
        
        {/* Service Categories */}
        <ServiceCategoriesSection />
        
        {/* Featured Providers */}
        <FeaturedProvidersSection />
        
        {/* How It Works */}
        <HowItWorksSection />
        
        {/* Customer Testimonials */}
        <TestimonialsSection />
      </main>
      {/* Footer */}
      <footer className="bg-foreground text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">L</span>
                </div>
                <span className="text-xl font-bold">LocalFind</span>
              </div>
              <p className="text-sm text-primary-foreground/80 mb-4">
                Connecting customers with trusted local service providers across India. 
                Find, book, and get quality services at your doorstep.
              </p>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-foreground/20 transition-colors">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-foreground/20 transition-colors">
                  <span className="text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-primary-foreground/10 rounded-lg flex items-center justify-center cursor-pointer hover:bg-primary-foreground/20 transition-colors">
                  <span className="text-xs font-bold">in</span>
                </div>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Popular Services</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Plumbing Services</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Electrical Work</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">House Cleaning</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">AC Repair</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Carpentry</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Beauty Services</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Partner With Us</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-primary-foreground/80">
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary-foreground transition-colors">Refund Policy</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-primary-foreground/20 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-sm text-primary-foreground/80 mb-4 md:mb-0">
                © {new Date()?.getFullYear()} LocalFind. All rights reserved.
              </div>
              <div className="flex items-center space-x-6 text-sm text-primary-foreground/80">
                <span>Available in 50+ cities across India</span>
                <div className="flex items-center space-x-2">
                  <span>🇮🇳</span>
                  <span>Made in India</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CustomerHome;