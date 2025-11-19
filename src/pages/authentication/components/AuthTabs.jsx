import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'login', label: 'Sign In', icon: 'LogIn' },
    { id: 'register', label: 'Sign Up', icon: 'UserPlus' }
  ];

  return (
    <div className="flex bg-muted rounded-lg p-1 mb-6">
      {tabs?.map((tab) => (
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-sm font-medium transition-smooth ${
            activeTab === tab?.id
              ? 'bg-card text-foreground shadow-elevation-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <Icon name={tab?.icon} size={16} />
          <span>{tab?.label}</span>
        </button>
      ))}
    </div>
  );
};

export default AuthTabs;