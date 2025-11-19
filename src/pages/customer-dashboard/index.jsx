import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BookingCard from './components/BookingCard';
import ReviewCard from './components/ReviewCard';
import StatsCard from './components/StatsCard';
import QuickActions from './components/QuickActions';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data
  const mockBookings = [
  {
    id: 'BK001',
    provider: {
      id: 'PR001',
      name: 'Rajesh Kumar',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_13867bc71-1763291763087.png",
      avatarAlt: 'Professional headshot of Indian man with short black hair in white shirt',
      rating: 4.8,
      reviewCount: 127,
      phone: '+91 98765 43210'
    },
    service: {
      id: 'SV001',
      name: 'Plumbing Repair',
      category: 'Home Maintenance'
    },
    status: 'confirmed',
    scheduledDate: '2025-11-20',
    scheduledTime: '10:00',
    address: 'Flat 302, Sunrise Apartments, Bandra West, Mumbai',
    totalAmount: 1500,
    hasReview: false,
    createdAt: '2025-11-15T10:30:00Z'
  },
  {
    id: 'BK002',
    provider: {
      id: 'PR002',
      name: 'Priya Sharma',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1dc1e6e21-1763293673531.png",
      avatarAlt: 'Professional headshot of Indian woman with long black hair in blue blazer',
      rating: 4.9,
      reviewCount: 89,
      phone: '+91 87654 32109'
    },
    service: {
      id: 'SV002',
      name: 'House Cleaning',
      category: 'Cleaning Services'
    },
    status: 'in-progress',
    scheduledDate: '2025-11-18',
    scheduledTime: '14:00',
    address: 'Villa 15, Green Valley Society, Pune',
    totalAmount: 2500,
    hasReview: false,
    createdAt: '2025-11-10T15:45:00Z'
  },
  {
    id: 'BK003',
    provider: {
      id: 'PR003',
      name: 'Amit Patel',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18d825848-1763291877251.png",
      avatarAlt: 'Professional headshot of Indian man with beard in grey shirt',
      rating: 4.7,
      reviewCount: 156,
      phone: '+91 76543 21098'
    },
    service: {
      id: 'SV003',
      name: 'Electrical Wiring',
      category: 'Electrical Services'
    },
    status: 'completed',
    scheduledDate: '2025-11-10',
    scheduledTime: '09:30',
    address: 'Office 204, Tech Park, Whitefield, Bangalore',
    totalAmount: 3200,
    hasReview: true,
    createdAt: '2025-11-05T11:20:00Z'
  },
  {
    id: 'BK004',
    provider: {
      id: 'PR004',
      name: 'Sunita Reddy',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fdaaf983-1763295802198.png",
      avatarAlt: 'Professional headshot of Indian woman with shoulder-length hair in white top',
      rating: 4.6,
      reviewCount: 203,
      phone: '+91 65432 10987'
    },
    service: {
      id: 'SV004',
      name: 'AC Repair',
      category: 'Appliance Repair'
    },
    status: 'completed',
    scheduledDate: '2025-11-08',
    scheduledTime: '16:00',
    address: 'House 45, Sector 12, Noida',
    totalAmount: 1800,
    hasReview: false,
    createdAt: '2025-11-03T09:15:00Z'
  },
  {
    id: 'BK005',
    provider: {
      id: 'PR005',
      name: 'Vikram Singh',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1cdc87418-1763294586674.png",
      avatarAlt: 'Professional headshot of Indian man with mustache in blue shirt',
      rating: 4.5,
      reviewCount: 78,
      phone: '+91 54321 09876'
    },
    service: {
      id: 'SV005',
      name: 'Painting Work',
      category: 'Home Improvement'
    },
    status: 'cancelled',
    scheduledDate: '2025-11-12',
    scheduledTime: '11:00',
    address: 'Apartment 8B, Royal Heights, Gurgaon',
    totalAmount: 4500,
    hasReview: false,
    createdAt: '2025-10-28T14:30:00Z'
  }];


  const mockReviews = [
  {
    id: 'RV001',
    provider: {
      id: 'PR003',
      name: 'Amit Patel',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_18d825848-1763291877251.png",
      avatarAlt: 'Professional headshot of Indian man with beard in grey shirt'
    },
    service: {
      id: 'SV003',
      name: 'Electrical Wiring'
    },
    rating: 5,
    comment: `Excellent work by Amit! He completed the electrical wiring for my office space professionally and efficiently. The work was done on time and within budget. Highly recommend his services for any electrical work.`,
    createdAt: '2025-11-11T16:45:00Z',
    images: [
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_1f465e835-1763449224000.png",
      alt: 'Completed electrical wiring installation in modern office space'
    },
    {
      url: "https://img.rocket.new/generatedImages/rocket_gen_img_19bb73aef-1763449222640.png",
      alt: 'Professional electrical panel installation with proper labeling'
    }]

  },
  {
    id: 'RV002',
    provider: {
      id: 'PR006',
      name: 'Meera Joshi',
      avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12e0ab935-1763295854981.png",
      avatarAlt: 'Professional headshot of Indian woman with curly hair in green top'
    },
    service: {
      id: 'SV006',
      name: 'Interior Design Consultation'
    },
    rating: 4,
    comment: `Good consultation session with Meera. She provided valuable insights for my living room redesign. The suggestions were practical and within my budget. Would consider booking her services again for the actual implementation.`,
    createdAt: '2025-11-05T12:30:00Z',
    images: []
  }];


  const mockStats = {
    totalBookings: 12,
    activeBookings: 2,
    completedBookings: 8,
    totalSpent: 28500,
    favoriteProviders: 5,
    reviewsWritten: 6
  };

  const mockFavoriteProviders = [
  {
    id: 'PR001',
    name: 'Rajesh Kumar',
    service: 'Plumbing Services',
    rating: 4.8
  },
  {
    id: 'PR002',
    name: 'Priya Sharma',
    service: 'Cleaning Services',
    rating: 4.9
  },
  {
    id: 'PR003',
    name: 'Amit Patel',
    service: 'Electrical Services',
    rating: 4.7
  }];


  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter and sort bookings
  const getFilteredBookings = () => {
    let filtered = [...mockBookings];

    // Filter by tab
    if (activeTab === 'active') {
      filtered = filtered.filter(booking => 
        booking.status === 'confirmed' || booking.status === 'in-progress'
      );
    } else if (activeTab === 'history') {
      filtered = filtered.filter(booking => 
        booking.status === 'completed' || booking.status === 'cancelled'
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(booking => 
        booking.provider.name.toLowerCase().includes(query) ||
        booking.service.name.toLowerCase().includes(query) ||
        booking.service.category.toLowerCase().includes(query) ||
        booking.address.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(booking => booking.status === statusFilter);
    }

    // Sort bookings
    filtered.sort((a, b) => {
      const dateA = new Date(a.scheduledDate + 'T' + a.scheduledTime);
      const dateB = new Date(b.scheduledDate + 'T' + b.scheduledTime);
      
      switch (sortBy) {
        case 'date-asc':
          return dateA - dateB;
        case 'date-desc':
          return dateB - dateA;
        case 'amount-asc':
          return a.totalAmount - b.totalAmount;
        case 'amount-desc':
          return b.totalAmount - a.totalAmount;
        case 'provider-name':
          return a?.provider?.name?.localeCompare(b?.provider?.name);
        default:
          return dateB - dateA;
      }
    });

    return filtered;
  };

  const handleViewDetails = (bookingId) => {
    console.log('View booking details:', bookingId);
    // Navigate to booking details page
  };

  const handleCancelBooking = (bookingId) => {
    console.log('Cancel booking:', bookingId);
    // Implement cancel booking logic
  };

  const handleContactProvider = (provider) => {
    console.log('Contact provider:', provider);
    // Implement contact provider logic
  };

  const handleRebookProvider = (provider) => {
    navigate('/provider-profile', { state: { providerId: provider?.id } });
  };

  const handleWriteReview = (booking) => {
    console.log('Write review for booking:', booking);
    // Navigate to review writing page
  };

  const handleEditReview = (review) => {
    console.log('Edit review:', review);
    // Implement edit review logic
  };

  const handleDeleteReview = (reviewId) => {
    console.log('Delete review:', reviewId);
    // Implement delete review logic
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSortBy('date-desc');
  };

  const tabs = [
  {
    id: 'active',
    label: 'Active Bookings',
    count: mockBookings?.filter((b) => b?.status === 'confirmed' || b?.status === 'in-progress')?.length,
    icon: 'Clock'
  },
  {
    id: 'history',
    label: 'Booking History',
    count: mockBookings?.filter((b) => b?.status === 'completed' || b?.status === 'cancelled')?.length,
    icon: 'History'
  },
  {
    id: 'reviews',
    label: 'My Reviews',
    count: mockReviews?.length,
    icon: 'Star'
  }];


  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 rounded w-64 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[1, 2, 3, 4]?.map((i) =>
              <div key={i} className="h-32 bg-slate-200 rounded-lg"></div>
              )}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {[1, 2, 3]?.map((i) =>
                <div key={i} className="h-48 bg-slate-200 rounded-lg"></div>
                )}
              </div>
              <div className="h-96 bg-slate-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">My Dashboard</h1>
          <p className="text-slate-600">Manage your bookings, reviews, and account preferences</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Bookings"
            value={mockStats?.totalBookings}
            icon="Calendar"
            color="blue"
            trend="up"
            trendValue="+2 this month" />

          <StatsCard
            title="Active Bookings"
            value={mockStats?.activeBookings}
            icon="Clock"
            color="amber"
            trend={undefined}
            trendValue={undefined} />

          <StatsCard
            title="Total Spent"
            value={`₹${mockStats?.totalSpent?.toLocaleString('en-IN')}`}
            icon="IndianRupee"
            color="green"
            trend="up"
            trendValue="+₹3,500" />

          <StatsCard
            title="Reviews Written"
            value={mockStats?.reviewsWritten}
            icon="Star"
            color="purple"
            trend={undefined}
            trendValue={undefined} />

        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg border border-slate-200 mb-6">
              <div className="flex overflow-x-auto">
                {tabs?.map((tab) =>
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-6 py-4 font-medium text-sm whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab?.id ?
                  'border-blue-600 text-blue-600 bg-blue-50' : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`
                  }>

                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                  activeTab === tab?.id ?
                  'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}`
                  }>
                      {tab?.count}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Filters */}
            {(activeTab === 'active' || activeTab === 'history') &&
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortBy={sortBy}
              onSortChange={setSortBy}
              onClearFilters={handleClearFilters} />

            }

            {/* Content */}
            <div className="space-y-6">
              {activeTab === 'reviews' ?
              // Reviews Tab
              mockReviews?.length > 0 ? mockReviews?.map((review) =>
              <ReviewCard
                key={review?.id}
                review={review}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview} />

              ) : <EmptyState type="reviews" /> :

              // Bookings Tabs
              filteredBookings?.length > 0 ? filteredBookings?.map((booking) =>
              <BookingCard
                key={booking?.id}
                booking={booking}
                onViewDetails={handleViewDetails}
                onCancel={handleCancelBooking}
                onContact={handleContactProvider}
                onRebook={handleRebookProvider}
                onWriteReview={handleWriteReview} />

              ) : <EmptyState
                type={searchQuery || statusFilter !== 'all' ? 'search' :
                activeTab === 'active' ? 'active-bookings' : 'history'} />

              }
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <QuickActions
              favoriteProviders={mockFavoriteProviders}
              onRebookProvider={handleRebookProvider} />


            {/* Account Summary */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Summary</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Member Since</span>
                  <span className="text-sm font-medium text-slate-900">Jan 2024</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Favorite Providers</span>
                  <span className="text-sm font-medium text-slate-900">{mockStats?.favoriteProviders}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Completed Services</span>
                  <span className="text-sm font-medium text-slate-900">{mockStats?.completedBookings}</span>
                </div>
                
                <div className="pt-4 border-t border-slate-200">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => navigate('/profile')}
                    iconName="Settings"
                    iconPosition="left">

                    Account Settings
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default CustomerDashboard;