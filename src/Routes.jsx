import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Authentication from './pages/authentication';
import LandingHome from './pages/landing-home';
import ProviderProfile from './pages/provider-profile';
import ProviderSearch from './pages/provider-search';
import ProviderOnboardingStep1 from './pages/provider-onboarding-step-1';
import ProviderListing from './pages/provider-listing';
import CustomerHome from './pages/customer-home';
import BookingCreation from './pages/booking-creation';
import CustomerDashboard from './pages/customer-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your routes here */}
          <Route path="/" element={<LandingHome />} />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/landing-home" element={<LandingHome />} />
          <Route path="/provider-profile" element={<ProviderProfile />} />
          <Route path="/provider-search" element={<ProviderSearch />} />
          <Route path="/provider-onboarding-step-1" element={<ProviderOnboardingStep1 />} />
          <Route path="/provider-listing" element={<ProviderListing />} />
          <Route path="/customer-home" element={<CustomerHome />} />
          <Route path="/booking-creation" element={<BookingCreation />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;