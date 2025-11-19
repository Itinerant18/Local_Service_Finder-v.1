import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const NavigationHeader = ({ user = null, onSignOut = () => {} }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { label: 'Home', path: '/landing-home', icon: 'Home', authRequired: false, mobileVisible: true },
    { label: 'Find Services', path: '/provider-search', icon: 'Search', authRequired: false, mobileVisible: true },
    { label: 'Sign In', path: '/authentication', icon: 'LogIn', authRequired: false, mobileVisible: true, hideWhenAuth: true },
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleSignOut = () => {
    onSignOut();
    closeMobileMenu();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-card border-b border-border shadow-elevation-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/landing-home" 
            className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            onClick={closeMobileMenu}
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MapPin" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Local Service Finder
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems?.filter(item => !item?.hideWhenAuth || !user)?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={16} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            
            {user && (
              <div className="flex items-center space-x-4">
                <Link
                  to="/provider-profile"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                    isActiveRoute('/provider-profile')
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name="User" size={16} />
                  <span>Profile</span>
                </Link>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleSignOut}
                  iconName="LogOut"
                  iconPosition="left"
                  iconSize={14}
                >
                  Sign Out
                </Button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={handleMobileMenuToggle}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="Toggle mobile menu"
          >
            <Icon name={mobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>
      </div>
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-1001 bg-background/95 backdrop-blur-sm">
          <nav className="px-4 py-6 space-y-4">
            {menuItems?.filter(item => item?.mobileVisible && (!item?.hideWhenAuth || !user))?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                    isActiveRoute(item?.path)
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            
            {user && (
              <>
                <Link
                  to="/provider-profile"
                  onClick={closeMobileMenu}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-smooth ${
                    isActiveRoute('/provider-profile')
                      ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name="User" size={20} />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth w-full text-left"
                >
                  <Icon name="LogOut" size={20} />
                  <span>Sign Out</span>
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavigationHeader;