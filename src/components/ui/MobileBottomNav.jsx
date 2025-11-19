import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileBottomNav = ({ user = null }) => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', path: '/landing-home', icon: 'Home' },
    { label: 'Search', path: '/provider-search', icon: 'Search' },
    { 
      label: user ? 'Profile' : 'Sign In', 
      path: user ? '/provider-profile' : '/authentication', 
      icon: user ? 'User' : 'LogIn' 
    },
  ];

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-999 bg-card border-t border-border shadow-elevation-lg">
      <div className="flex items-center justify-around px-4 py-2">
        {navItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth min-w-0 flex-1 ${
              isActiveRoute(item?.path)
                ? 'text-primary' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              color={isActiveRoute(item?.path) ? 'var(--color-primary)' : 'currentColor'} 
            />
            <span className="text-xs font-medium truncate">{item?.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default MobileBottomNav;