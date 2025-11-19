import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import HeroSection from './components/HeroSection';
import ServiceCategoryGrid from './components/ServiceCategoryGrid';
import FeaturedProviders from './components/FeaturedProviders';
import TestimonialsSection from './components/TestimonialsSection';
import CallToActionSection from './components/CallToActionSection';
import { onAuthStateChanged } from '../../lib/firebase';
import { signOutCurrentUser, fetchCurrentUser } from '../../services/authService';

const LandingHome = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        return;
      }

      try {
        const profile = await fetchCurrentUser();
        setUser(profile || {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        });
      } catch (error) {
        console.warn('Unable to load user profile', error);
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = () => {
    signOutCurrentUser();
    setUser(null);
  };

  return (
    <>
      <Helmet>
        <title>Local Service Finder - Find Trusted Service Providers Near You</title>
        <meta 
          name="description" 
          content="Connect with verified local service providers for plumbing, electrical, cleaning, and more. Book trusted professionals with transparent pricing and quality guarantee." 
        />
        <meta name="keywords" content="local services, plumber, electrician, house cleaning, home repair, service providers, booking" />
        <meta property="og:title" content="Local Service Finder - Find Trusted Service Providers Near You" />
        <meta property="og:description" content="Connect with verified local service providers for plumbing, electrical, cleaning, and more." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-home" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <NavigationHeader user={user} onSignOut={handleSignOut} />

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Service Categories */}
          <ServiceCategoryGrid />

          {/* Featured Providers */}
          <FeaturedProviders />

          {/* Testimonials & Stats */}
          <TestimonialsSection />

          {/* Call to Action */}
          <CallToActionSection />
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav user={user} />

        {/* Footer */}
        <footer className="bg-secondary text-secondary-foreground py-12 pb-20 md:pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Company Info */}
              <div className="md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">LSF</span>
                  </div>
                  <span className="text-lg font-semibold">Local Service Finder</span>
                </div>
                <p className="text-sm text-secondary-foreground/80 leading-relaxed">
                  Connecting customers with trusted local service providers across India. 
                  Quality service, transparent pricing, verified professionals.
                </p>
              </div>

              {/* Services */}
              <div>
                <h4 className="font-semibold mb-4">Popular Services</h4>
                <ul className="space-y-2 text-sm text-secondary-foreground/80">
                  <li>Plumbing Services</li>
                  <li>Electrical Work</li>
                  <li>House Cleaning</li>
                  <li>AC Repair</li>
                  <li>Carpentry</li>
                  <li>Painting Services</li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-semibold mb-4">Company</h4>
                <ul className="space-y-2 text-sm text-secondary-foreground/80">
                  <li>About Us</li>
                  <li>How It Works</li>
                  <li>Safety & Trust</li>
                  <li>Careers</li>
                  <li>Press & Media</li>
                  <li>Partner With Us</li>
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm text-secondary-foreground/80">
                  <li>Help Center</li>
                  <li>Contact Us</li>
                  <li>Terms of Service</li>
                  <li>Privacy Policy</li>
                  <li>Refund Policy</li>
                  <li>Community Guidelines</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-secondary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-sm text-secondary-foreground/60">
                © {new Date()?.getFullYear()} Local Service Finder. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <span className="text-sm text-secondary-foreground/60">Made in India 🇮🇳</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LandingHome;