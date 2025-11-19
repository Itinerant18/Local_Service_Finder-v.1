import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Header from '../../components/ui/Header';
import BookingCard from './components/BookingCard';
import ReviewCard from './components/ReviewCard';
import StatsCard from './components/StatsCard';
import QuickActions from './components/QuickActions';
import FilterBar from './components/FilterBar';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { fetchCustomerDashboard } from '../../services/dashboardService';

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('active');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['customer-dashboard'],
    queryFn: fetchCustomerDashboard,
    staleTime: 1000 * 60,
  });

  const bookings = data?.recentBookings || [];
  const dashboardStats = data?.stats || {};
  const reviews = data?.recentReviews || [];
  const favoriteProviders = data?.recommendedProviders || [];

  // Filter and sort bookings
  const getFilteredBookings = () => {
    let filtered = [...bookings];

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

  const tabs = useMemo(() => ([
    {
      id: 'active',
      label: 'Active Bookings',
      count: bookings?.filter((b) => b?.status === 'confirmed' || b?.status === 'in-progress')?.length || 0,
      icon: 'Clock'
    },
    {
      id: 'history',
      label: 'Booking History',
      count: bookings?.filter((b) => b?.status === 'completed' || b?.status === 'cancelled')?.length || 0,
      icon: 'History'
    },
    {
      id: 'reviews',
      label: 'My Reviews',
      count: reviews?.length || 0,
      icon: 'Star'
    }
  ]), [bookings, reviews]);

  if (isError) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="rounded-md border border-error/30 bg-error/5 px-4 py-6">
            <h2 className="text-lg font-semibold text-error mb-2">Unable to load dashboard</h2>
            <p className="text-sm text-slate-700">{error?.message || 'Please try again later.'}</p>
          </div>
        </div>
      </div>
    );
  }

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
      </div>
    );
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
            value={dashboardStats?.totalBookings || 0}
            icon="Calendar"
            color="blue"
            trend="up"
            trendValue="+2 this month" />

          <StatsCard
            title="Active Bookings"
            value={dashboardStats?.activeBookings || 0}
            icon="Clock"
            color="amber"
            trend={undefined}
            trendValue={undefined} />

          <StatsCard
            title="Total Spent"
            value={`₹${(dashboardStats?.totalSpent || 0)?.toLocaleString('en-IN')}`}
            icon="IndianRupee"
            color="green"
            trend="up"
            trendValue="+₹3,500" />

          <StatsCard
            title="Reviews Written"
            value={dashboardStats?.reviewsWritten || 0}
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
              reviews?.length > 0 ? reviews?.map((review) =>
              <ReviewCard
                key={review?.id}
                review={review}
                onEdit={handleEditReview}
                onDelete={handleDeleteReview} />

              ) : <EmptyState type="reviews" /> :

              // Bookings Tabs
              getFilteredBookings()?.length > 0 ? getFilteredBookings()?.map((booking) =>
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
              favoriteProviders={favoriteProviders}
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
                  <span className="text-sm font-medium text-slate-900">{dashboardStats?.favoriteProviders || 0}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Completed Services</span>
                  <span className="text-sm font-medium text-slate-900">{dashboardStats?.completedBookings || 0}</span>
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