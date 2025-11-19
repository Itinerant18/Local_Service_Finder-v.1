import React from 'react';
import ProviderCard from './ProviderCard';
import ProviderListItem from './ProviderListItem';

const ProviderGrid = ({ providers, viewMode = 'grid', loading = false }) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-surface border border-border rounded-lg overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="flex space-x-2">
                <div className="h-6 bg-muted rounded w-16"></div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
              <div className="flex space-x-2">
                <div className="h-8 bg-muted rounded flex-1"></div>
                <div className="h-8 bg-muted rounded flex-1"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (providers?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No providers found</h3>
        <p className="text-muted-foreground mb-4">
          Try adjusting your filters or search in a different location.
        </p>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>• Expand your search radius</p>
          <p>• Remove some filters</p>
          <p>• Try different keywords</p>
        </div>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {providers?.map((provider) => (
          <ProviderListItem key={provider?.id} provider={provider} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {providers?.map((provider) => (
        <ProviderCard key={provider?.id} provider={provider} />
      ))}
    </div>
  );
};

export default ProviderGrid;