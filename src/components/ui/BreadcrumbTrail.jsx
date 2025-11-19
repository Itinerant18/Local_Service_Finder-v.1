import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const BreadcrumbTrail = ({ pathSegments = [], onNavigate = () => {} }) => {
  if (!pathSegments || pathSegments?.length === 0) {
    return null;
  }

  const handleNavigation = (path, index) => {
    onNavigate(path, index);
  };

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {pathSegments?.map((segment, index) => (
          <li key={index} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
            )}
            {index === pathSegments?.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {segment?.label}
              </span>
            ) : (
              <Link
                to={segment?.path}
                onClick={() => handleNavigation(segment?.path, index)}
                className="hover:text-primary transition-smooth"
              >
                {segment?.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
      {/* Mobile simplified version */}
      <div className="md:hidden ml-auto">
        {pathSegments?.length > 1 && (
          <Link
            to={pathSegments?.[pathSegments?.length - 2]?.path}
            onClick={() => handleNavigation(pathSegments?.[pathSegments?.length - 2]?.path, pathSegments?.length - 2)}
            className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-smooth"
          >
            <Icon name="ArrowLeft" size={16} />
            <span className="font-medium">Back</span>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default BreadcrumbTrail;