import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SearchHeader from './components/SearchHeader';
import FilterPanel from './components/FilterPanel';
import SortControls from './components/SortControls';
import ProviderGrid from './components/ProviderGrid';
import MapView from './components/MapView';

const ProviderSearch = () => {
  const location = useLocation();
  const [user] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('Connaught Place, Delhi');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('distance');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 5000],
    rating: 0,
    distance: 50,
    availability: false,
    verified: false,
    experience: 0,
    keywords: ''
  });

  // Mock providers data
  const mockProviders = [
  {
    id: 1,
    name: "Rajesh Kumar",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_13cdf0bc2-1763296311463.png",
    profileImageAlt: "Professional headshot of middle-aged Indian man with mustache in blue shirt",
    rating: 4.8,
    reviewCount: 127,
    experience: 8,
    distance: 2.3,
    startingPrice: 299,
    services: ["Plumbing", "Pipe Repair", "Bathroom Fitting"],
    description: "Expert plumber with 8+ years experience in residential and commercial plumbing. Specializes in emergency repairs and bathroom installations.",
    isVerified: true,
    isAvailableToday: true,
    isPremium: false,
    categories: ['plumbing']
  },
  {
    id: 2,
    name: "Priya Sharma",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e94201ef-1763296134446.png",
    profileImageAlt: "Professional portrait of young Indian woman with long black hair in white blouse",
    rating: 4.9,
    reviewCount: 89,
    experience: 5,
    distance: 1.8,
    startingPrice: 199,
    services: ["House Cleaning", "Deep Cleaning", "Office Cleaning"],
    description: "Professional cleaning service with eco-friendly products. Trusted by 200+ families for regular and deep cleaning services.",
    isVerified: true,
    isAvailableToday: false,
    isPremium: true,
    categories: ['cleaning']
  },
  {
    id: 3,
    name: "Amit Electricals",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1cddf7af6-1763298815955.png",
    profileImageAlt: "Professional headshot of young Indian man with short hair in dark shirt",
    rating: 4.7,
    reviewCount: 156,
    experience: 12,
    distance: 3.1,
    startingPrice: 249,
    services: ["Electrical Repair", "Wiring", "Fan Installation"],
    description: "Licensed electrician providing safe and reliable electrical services. Available for emergency calls 24/7.",
    isVerified: true,
    isAvailableToday: true,
    isPremium: false,
    categories: ['electrical']
  },
  {
    id: 4,
    name: "Sunita Devi",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c5711e77-1763301639812.png",
    profileImageAlt: "Friendly portrait of middle-aged Indian woman with traditional attire and warm smile",
    rating: 4.6,
    reviewCount: 203,
    experience: 15,
    distance: 4.2,
    startingPrice: 179,
    services: ["Home Cleaning", "Cooking", "Elderly Care"],
    description: "Experienced domestic helper providing comprehensive home care services. Trusted by families for over 15 years.",
    isVerified: true,
    isAvailableToday: true,
    isPremium: false,
    categories: ['cleaning']
  },
  {
    id: 5,
    name: "Carpenter Singh",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1292be1e7-1763295448730.png",
    profileImageAlt: "Professional portrait of bearded Indian man in plaid shirt with confident expression",
    rating: 4.8,
    reviewCount: 94,
    experience: 10,
    distance: 2.7,
    startingPrice: 399,
    services: ["Furniture Repair", "Custom Carpentry", "Door Installation"],
    description: "Skilled carpenter specializing in custom furniture and home repairs. Quality workmanship guaranteed.",
    isVerified: false,
    isAvailableToday: false,
    isPremium: true,
    categories: ['carpentry']
  },
  {
    id: 6,
    name: "Ravi Painter",
    profileImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1384e61b9-1763293617205.png",
    profileImageAlt: "Casual portrait of young Indian man with short hair in casual t-shirt",
    rating: 4.5,
    reviewCount: 67,
    experience: 6,
    distance: 5.1,
    startingPrice: 149,
    services: ["Interior Painting", "Exterior Painting", "Wall Texture"],
    description: "Professional painter with expertise in residential and commercial painting projects. Quality finish guaranteed.",
    isVerified: true,
    isAvailableToday: true,
    isPremium: false,
    categories: ['painting']
  }];


  const [filteredProviders, setFilteredProviders] = useState(mockProviders);

  // Breadcrumb navigation
  const breadcrumbSegments = [
  { label: 'Home', path: '/landing-home' },
  { label: 'Find Services', path: '/provider-search' }];


  // Handle responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter and sort providers
  useEffect(() => {
    let filtered = [...mockProviders];

    // Apply search query filter
    if (searchQuery?.trim()) {
      filtered = filtered?.filter((provider) =>
      provider?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
      provider?.services?.some((service) =>
      service?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      ) ||
      provider?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())
      );
    }

    // Apply category filter
    if (filters?.categories?.length > 0) {
      filtered = filtered?.filter((provider) =>
      provider?.categories?.some((category) => filters?.categories?.includes(category))
      );
    }

    // Apply price range filter
    filtered = filtered?.filter((provider) =>
    provider?.startingPrice >= filters?.priceRange?.[0] &&
    provider?.startingPrice <= filters?.priceRange?.[1]
    );

    // Apply rating filter
    if (filters?.rating > 0) {
      filtered = filtered?.filter((provider) => provider?.rating >= filters?.rating);
    }

    // Apply distance filter
    filtered = filtered?.filter((provider) => provider?.distance <= filters?.distance);

    // Apply availability filter
    if (filters?.availability) {
      filtered = filtered?.filter((provider) => provider?.isAvailableToday);
    }

    // Apply verified filter
    if (filters?.verified) {
      filtered = filtered?.filter((provider) => provider?.isVerified);
    }

    // Apply experience filter
    if (filters?.experience > 0) {
      filtered = filtered?.filter((provider) => provider?.experience >= filters?.experience);
    }

    // Apply keywords filter
    if (filters?.keywords?.trim()) {
      filtered = filtered?.filter((provider) =>
      provider?.services?.some((service) =>
      service?.toLowerCase()?.includes(filters?.keywords?.toLowerCase())
      )
      );
    }

    // Apply sorting
    filtered?.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case 'distance':
          aValue = a?.distance;
          bValue = b?.distance;
          break;
        case 'rating':
          aValue = a?.rating;
          bValue = b?.rating;
          break;
        case 'price':
          aValue = a?.startingPrice;
          bValue = b?.startingPrice;
          break;
        case 'experience':
          aValue = a?.experience;
          bValue = b?.experience;
          break;
        case 'availability':
          aValue = a?.isAvailableToday ? 1 : 0;
          bValue = b?.isAvailableToday ? 1 : 0;
          break;
        default:
          return 0;
      }

      if (sortOrder === 'asc') {
        return aValue - bValue;
      } else {
        return bValue - aValue;
      }
    });

    setFilteredProviders(filtered);
  }, [searchQuery, filters, sortBy, sortOrder]);

  const handleSearch = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleSignOut = () => {

    // Handle sign out logic
  };
  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader user={user} onSignOut={handleSignOut} />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbTrail pathSegments={breadcrumbSegments} />
          
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Find Local Service Providers
            </h1>
            <p className="text-muted-foreground">
              Discover trusted professionals in your area for all your service needs
            </p>
          </div>

          <SearchHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            location={searchLocation}
            onLocationChange={setSearchLocation}
            onSearch={handleSearch} />


          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Filter Panel */}
            <div className="lg:col-span-1">
              <FilterPanel
                filters={filters}
                onFiltersChange={handleFiltersChange}
                providerCount={filteredProviders?.length}
                isOpen={isFilterOpen}
                onToggle={() => setIsFilterOpen(!isFilterOpen)}
                isMobile={isMobile} />

            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <SortControls
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
                viewMode={viewMode}
                onViewModeChange={setViewMode} />


              {viewMode === 'map' ?
              <MapView
                providers={filteredProviders}
                center={{ lat: 28.6139, lng: 77.2090 }} /> :


              <ProviderGrid
                providers={filteredProviders}
                viewMode={viewMode}
                loading={loading} />

              }

              {/* Load More Button */}
              {filteredProviders?.length > 0 && !loading &&
              <div className="text-center pt-6">
                  <button className="bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground px-6 py-3 rounded-lg transition-smooth">
                    Load More Providers
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </main>
      <MobileBottomNav user={user} />
    </div>);

};

export default ProviderSearch;