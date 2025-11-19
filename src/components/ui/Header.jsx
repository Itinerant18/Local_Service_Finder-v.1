import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeBookingCount, setActiveBookingCount] = useState(2);
  const [currentLocation, setCurrentLocation] = useState('Mumbai, Maharashtra');
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const navigationItems = [
    {
      label: 'Home',
      path: '/customer-home',
      icon: 'Home',
      tooltip: 'Discover local services'
    },
    {
      label: 'Browse Providers',
      path: '/provider-listing',
      icon: 'Search',
      tooltip: 'Find and compare service providers'
    },
    {
      label: 'My Bookings',
      path: '/customer-dashboard',
      icon: 'Calendar',
      tooltip: 'Manage your appointments',
      badge: activeBookingCount > 0 ? activeBookingCount : null
    },
    {
      label: 'Profile',
      path: '/profile',
      icon: 'User',
      tooltip: 'Account settings and preferences'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLocationChange = () => {
    // Location change functionality
    console.log('Location change requested');
  };

  const handleSearchSubmit = (e) => {
    e?.preventDefault();
    if (searchQuery?.trim()) {
      navigate(`/provider-listing?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchExpanded(false);
      setSearchQuery('');
    }
  };

  const handleSearchToggle = () => {
    setIsSearchExpanded(!isSearchExpanded);
    if (isSearchExpanded) {
      setSearchQuery('');
    }
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  if (isMobile) {
    return (
      <>
        {/* Mobile Header */}
        <header className="sticky top-0 z-50 bg-surface border-b border-border">
          <div className="flex items-center justify-between px-4 py-3">
            {/* Logo */}
            <div 
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigation('/customer-home')}
            >
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="MapPin" size={20} color="white" />
                </div>
                <span className="text-lg font-semibold text-foreground">LocalFind</span>
              </div>
            </div>

            {/* Location and Search */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLocationChange}
                className="text-muted-foreground"
              >
                <Icon name="MapPin" size={16} className="mr-1" />
                <span className="text-xs truncate max-w-20">{currentLocation?.split(',')?.[0]}</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSearchToggle}
              >
                <Icon name="Search" size={20} />
              </Button>
            </div>
          </div>

          {/* Expanded Search */}
          {isSearchExpanded && (
            <div className="px-4 pb-3 border-t border-border bg-surface">
              <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2 mt-3">
                <div className="flex-1 relative">
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                  />
                  <input
                    type="text"
                    placeholder="Search for services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e?.target?.value)}
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                    autoFocus
                  />
                </div>
                <Button type="submit" size="sm">
                  Search
                </Button>
              </form>
            </div>
          )}
        </header>
        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface border-t border-border">
          <div className="flex items-center justify-around py-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex flex-col items-center justify-center py-2 px-3 min-w-0 flex-1 relative ${
                  isActivePath(item?.path)
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                } transition-colors duration-200`}
                title={item?.tooltip}
              >
                <div className="relative">
                  <Icon name={item?.icon} size={20} />
                  {item?.badge && (
                    <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1">
                      {item?.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs mt-1 truncate max-w-full">{item?.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between py-6 px-4">
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => handleNavigation('/customer-home')}
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Icon name="MapPin" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">LocalFind</h1>
                <p className="text-xs text-muted-foreground">Find trusted local services</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg font-medium transition-all duration-200 relative ${
                  isActivePath(item?.path)
                    ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                title={item?.tooltip}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.badge && (
                  <span className="bg-accent text-accent-foreground text-xs rounded-full min-w-5 h-5 flex items-center justify-center px-1 ml-1">
                    {item?.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Location Context */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleLocationChange}
              className="text-muted-foreground border-border"
            >
              <Icon name="MapPin" size={16} className="mr-2" />
              <span className="text-sm">{currentLocation}</span>
              <Icon name="ChevronDown" size={14} className="ml-2" />
            </Button>

            {/* Search Quick Access */}
            <div className="relative">
              {!isSearchExpanded ? (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleSearchToggle}
                  className="text-muted-foreground"
                >
                  <Icon name="Search" size={20} />
                </Button>
              ) : (
                <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
                  <div className="relative">
                    <Icon 
                      name="Search" 
                      size={16} 
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                    />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-64 pl-10 pr-4 py-2 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring"
                      autoFocus
                    />
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleSearchToggle}
                  >
                    <Icon name="X" size={16} />
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;