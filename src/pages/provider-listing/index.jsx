import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import ProviderGrid from './components/ProviderGrid';
import Pagination from './components/Pagination';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useProviders } from '../../hooks/useProviders';

const ProviderListing = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [currentLocation, setCurrentLocation] = useState('Mumbai, Maharashtra');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')) || 1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const resultsPerPage = 9;

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    experience: [],
    availability: false,
    distance: 50
  });

  const { providers, isLoading, isError, error, totalResults, totalPages } = useProviders({
    searchQuery,
    currentLocation,
    sortBy,
    filters,
    currentPage,
    resultsPerPage
  });

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle search from URL params
  useEffect(() => {
    const searchFromUrl = searchParams?.get('search');
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
  }, [searchParams]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);

    // Update URL params
    if (query) {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.set('search', query);
        params.delete('page');
        return params;
      });
    } else {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        params.delete('search');
        params.delete('page');
        return params;
      });
    }
  };

  const handleLocationChange = (location) => {
    setCurrentLocation(location);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete('page');
      return params;
    });
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
    setCurrentPage(1);
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (page === 1) {
        params.delete('page');
      } else {
        params.set('page', String(page));
      }
      return params;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const paginatedProviders = providers;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Search Bar */}
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onLocationChange={handleLocationChange}
          currentLocation={currentLocation} />

        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <span>Home</span>
          <Icon name="ChevronRight" size={14} />
          <span>Service Providers</span>
          {searchQuery &&
          <>
              <Icon name="ChevronRight" size={14} />
              <span className="text-foreground">"{searchQuery}"</span>
            </>
          }
        </nav>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters - Desktop */}
          {!isMobile &&
          <aside className="w-80 flex-shrink-0">
              <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              resultCount={totalResults}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              isMobile={false} />

            </aside>
          }

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Mobile Filter Button */}
            {isMobile &&
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              resultCount={totalResults}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
              isMobile={true} />

            }

            {/* Sort Controls */}
            <SortControls
              sortBy={sortBy}
              onSortChange={handleSortChange}
              viewMode={viewMode}
              onViewModeChange={handleViewModeChange} />

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">
                {searchQuery ? `Results for "${searchQuery}"` : 'All Service Providers'}
              </h2>
              <span className="text-sm text-muted-foreground">
                {isLoading ? 'Loading results…' : `${totalResults} providers found`}
              </span>
            </div>

            {isError && (
              <div className="mb-4 rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
                {error?.message || 'Unable to load providers. Please try again later.'}
              </div>
            )}

            {/* Provider Grid */}
            <ProviderGrid
              providers={paginatedProviders}
              viewMode={viewMode}
              loading={isLoading} />

            {/* Pagination */}
            {totalResults > resultsPerPage &&
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onPageChange={handlePageChange} />

            }
          </div>
        </div>

        {/* Quick Actions - Mobile */}
        {isMobile &&
        <div className="fixed bottom-20 right-4 z-40">
            <Button
            variant="default"
            size="icon"
            className="w-14 h-14 rounded-full shadow-lg"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>

              <Icon name="ArrowUp" size={24} />
            </Button>
          </div>
        }
      </main>
    </div>);

};

export default ProviderListing;