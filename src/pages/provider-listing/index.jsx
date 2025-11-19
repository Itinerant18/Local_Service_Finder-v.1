import React, { useState, useEffect } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FilterPanel from './components/FilterPanel';
import SearchBar from './components/SearchBar';
import SortControls from './components/SortControls';
import ProviderGrid from './components/ProviderGrid';
import Pagination from './components/Pagination';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProviderListing = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('search') || '');
  const [currentLocation, setCurrentLocation] = useState('Mumbai, Maharashtra');
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: { min: 0, max: 5000 },
    rating: 0,
    experience: [],
    availability: false,
    distance: 50
  });

  // Mock data for providers
  const mockProviders = [
  {
    id: 1,
    name: "Rajesh Kumar",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1b09cae8d-1763295945796.png",
    profileImageAlt: "Professional headshot of Indian man with short black hair wearing blue shirt",
    rating: 4.8,
    reviewCount: 127,
    distance: 2.3,
    experience: 8,
    services: ["Plumbing", "Pipe Repair", "Bathroom Fitting", "Emergency Service"],
    startingPrice: 500,
    isAvailableToday: true,
    nextAvailable: null,
    isVerified: true,
    isPremium: true,
    completedJobs: 245,
    responseRate: 95
  },
  {
    id: 2,
    name: "Priya Electricals",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a7c17fd0-1763294649663.png",
    profileImageAlt: "Professional woman electrician in work uniform with safety helmet",
    rating: 4.6,
    reviewCount: 89,
    distance: 1.8,
    experience: 5,
    services: ["Electrical Repair", "Wiring", "Fan Installation", "Switch Replacement"],
    startingPrice: 300,
    isAvailableToday: false,
    nextAvailable: "Tomorrow",
    isVerified: true,
    isPremium: false,
    completedJobs: 156,
    responseRate: 88
  },
  {
    id: 3,
    name: "Clean Home Services",
    profileImage: "https://images.unsplash.com/photo-1680631626569-d163da98ff40",
    profileImageAlt: "Smiling woman in cleaning uniform holding cleaning supplies",
    rating: 4.9,
    reviewCount: 203,
    distance: 3.1,
    experience: 6,
    services: ["House Cleaning", "Deep Cleaning", "Kitchen Cleaning", "Bathroom Cleaning"],
    startingPrice: 800,
    isAvailableToday: true,
    nextAvailable: null,
    isVerified: true,
    isPremium: true,
    completedJobs: 312,
    responseRate: 97
  },
  {
    id: 4,
    name: "Amit Carpenter Works",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1a7a5fcb6-1763293247020.png",
    profileImageAlt: "Middle-aged carpenter with beard wearing work clothes in workshop",
    rating: 4.5,
    reviewCount: 76,
    distance: 4.2,
    experience: 12,
    services: ["Furniture Repair", "Custom Furniture", "Door Installation", "Cabinet Making"],
    startingPrice: 1200,
    isAvailableToday: false,
    nextAvailable: "Nov 20",
    isVerified: true,
    isPremium: false,
    completedJobs: 189,
    responseRate: 92
  },
  {
    id: 5,
    name: "Sunita Painting Services",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1740d6480-1763298482899.png",
    profileImageAlt: "Professional woman painter in white overalls holding paint brush",
    rating: 4.7,
    reviewCount: 134,
    distance: 2.9,
    experience: 7,
    services: ["Interior Painting", "Exterior Painting", "Wall Texture", "Color Consultation"],
    startingPrice: 600,
    isAvailableToday: true,
    nextAvailable: null,
    isVerified: true,
    isPremium: true,
    completedJobs: 267,
    responseRate: 94
  },
  {
    id: 6,
    name: "Tech Appliance Repair",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_12ac3c371-1763295220735.png",
    profileImageAlt: "Young technician in blue uniform working on appliance repair",
    rating: 4.4,
    reviewCount: 98,
    distance: 5.1,
    experience: 4,
    services: ["AC Repair", "Washing Machine", "Refrigerator", "Microwave Repair"],
    startingPrice: 400,
    isAvailableToday: false,
    nextAvailable: "Nov 19",
    isVerified: false,
    isPremium: false,
    completedJobs: 123,
    responseRate: 85
  }];


  const resultsPerPage = 9;
  const totalResults = 247;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

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

  // Simulate loading when filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [filters, sortBy, searchQuery, currentPage]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);

    // Update URL params
    if (query) {
      setSearchParams({ search: query });
    } else {
      setSearchParams({});
    }
  };

  const handleLocationChange = (location) => {
    setCurrentLocation(location);
    setCurrentPage(1);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getFilteredProviders = () => {
    let filtered = [...mockProviders];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered?.filter((provider) =>
      provider?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      provider?.services?.some((service) =>
      service?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      )
      );
    }

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter((provider) =>
      provider?.services?.some((service) =>
      filters?.categories?.some((category) =>
      service?.toLowerCase()?.includes(category?.toLowerCase())
      )
      )
      );
    }

    // Apply price filter
    if (filters?.priceRange) {
      filtered = filtered?.filter((provider) =>
      provider?.startingPrice >= filters?.priceRange?.min &&
      provider?.startingPrice <= filters?.priceRange?.max
      );
    }

    // Apply rating filter
    if (filters?.rating > 0) {
      filtered = filtered?.filter((provider) => provider?.rating >= filters?.rating);
    }

    // Apply availability filter
    if (filters?.availability) {
      filtered = filtered?.filter((provider) => provider?.isAvailableToday);
    }

    // Apply distance filter
    if (filters?.distance < 50) {
      filtered = filtered?.filter((provider) => provider?.distance <= filters?.distance);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        filtered?.sort((a, b) => b?.rating - a?.rating);
        break;
      case 'price-low':
        filtered?.sort((a, b) => a?.startingPrice - b?.startingPrice);
        break;
      case 'price-high':
        filtered?.sort((a, b) => b?.startingPrice - a?.startingPrice);
        break;
      case 'distance':
        filtered?.sort((a, b) => a?.distance - b?.distance);
        break;
      case 'experience':
        filtered?.sort((a, b) => b?.experience - a?.experience);
        break;
      case 'availability':
        filtered?.sort((a, b) => b?.isAvailableToday - a?.isAvailableToday);
        break;
      case 'popular':
        filtered?.sort((a, b) => b?.completedJobs - a?.completedJobs);
        break;
      default:
        // relevance - keep original order
        break;
    }

    return filtered;
  };

  const filteredProviders = getFilteredProviders();
  const paginatedProviders = filteredProviders?.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

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
              resultCount={filteredProviders?.length}
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
              resultCount={filteredProviders?.length}
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
                {filteredProviders?.length} providers found
              </span>
            </div>

            {/* Provider Grid */}
            <ProviderGrid
              providers={paginatedProviders}
              viewMode={viewMode}
              loading={loading} />


            {/* Pagination */}
            {filteredProviders?.length > resultsPerPage &&
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredProviders?.length / resultsPerPage)}
              totalResults={filteredProviders?.length}
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