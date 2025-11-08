import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getProviderByUserId, getUserBookings } from '@/lib/realtime-helpers';
import { TrendingUp, Calendar, Star, DollarSign, LogOut } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';
import { useRouter } from 'expo-router';

export default function ProviderHome() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedBookings: 0,
    averageRating: 0,
    totalEarnings: 0,
  });
  const [upcomingBookings, setUpcomingBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviderData();
  }, [user]);

  const loadProviderData = async () => {
    if (!user?.id) return;

    try {
      const [providerData, allBookings] = await Promise.all([
        getProviderByUserId(user.id),
        getUserBookings(user.id, 'provider'),
      ]);

      if (providerData) {
        setStats({
          totalBookings: providerData.total_bookings || 0,
          completedBookings: providerData.completed_bookings || 0,
          averageRating: providerData.average_rating || 0,
          totalEarnings: 0,
        });
      }

      // Filter upcoming bookings (today or future) and limit to 5
      const today = new Date().toISOString().split('T')[0];
      const upcoming = allBookings
        .filter((b) => b.booking_date >= today)
        .sort((a, b) => a.booking_date.localeCompare(b.booking_date))
        .slice(0, 5);
      
      setUpcomingBookings(upcoming);
    } catch (error) {
      console.error('Error loading provider data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Sign Out',
        onPress: async () => {
          setLoading(true);
          try {
            await signOut();
            router.replace('/(auth)/signin');
          } catch (error: any) {
            Alert.alert('Error', error.message);
          } finally {
            setLoading(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  const renderStatCard = (icon: any, label: string, value: string | number) => (
    <View style={globalStyles.statCard}>
      <View style={globalStyles.statIconContainer}>{icon}</View>
      <Text style={globalStyles.statLabel}>{label}</Text>
      <Text style={globalStyles.statValue}>{value}</Text>
    </View>
  );

  const renderBookingItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={globalStyles.bookingItem}>
      <View style={globalStyles.bookingItemHeader}>
        <Text style={globalStyles.bookingDate}>
          {new Date(item.booking_date).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
          })}
        </Text>
        <Text style={globalStyles.bookingTime}>{item.booking_time}</Text>
      </View>
      <Text style={globalStyles.bookingAddress} numberOfLines={1}>
        {item.service_address}
      </Text>
      <View style={globalStyles.bookingFooter}>
        <Text style={globalStyles.bookingPrice}>₹{item.estimated_price}</Text>
        <View
          style={[
            globalStyles.bookingStatus,
            item.status === 'confirmed' && globalStyles.statusConfirmed,
            item.status === 'pending' && globalStyles.statusPending,
          ]}
        >
          <Text
            style={[
              globalStyles.bookingStatusText,
              item.status === 'confirmed' && globalStyles.statusTextConfirmed,
              item.status === 'pending' && globalStyles.statusTextPending,
            ]}
          >
            {item.status === 'confirmed' ? 'Confirmed' : 'Pending'}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={[1]}
        renderItem={() => (
          <>
            <View style={globalStyles.header}>
              <Text style={globalStyles.greeting}>Welcome back!</Text>
              <Text style={globalStyles.subGreeting}>{user?.full_name}</Text>
            </View>

            <View style={globalStyles.statsGrid}>
              {renderStatCard(
                <Calendar size={24} color="#2563eb" strokeWidth={2} />,
                'Total Bookings',
                stats.totalBookings
              )}
              {renderStatCard(
                <TrendingUp size={24} color="#16a34a" strokeWidth={2} />,
                'Completed',
                stats.completedBookings
              )}
              {renderStatCard(
                <Star size={24} color="#fbbf24" fill="#fbbf24" strokeWidth={1.5} />,
                'Rating',
                `${stats.averageRating.toFixed(1)}/5`
              )}
              {renderStatCard(
                <DollarSign size={24} color="#06b6d4" strokeWidth={2} />,
                'Earnings',
                `₹${stats.totalEarnings}`
              )}
            </View>

            <View style={globalStyles.section}>
              <View style={globalStyles.sectionHeader}>
                <Text style={globalStyles.sectionTitle}>Upcoming Bookings</Text>
                <TouchableOpacity>
                  <Text style={globalStyles.seeAll}>View all</Text>
                </TouchableOpacity>
              </View>
              {upcomingBookings.length > 0 ? (
                <FlatList
                  data={upcomingBookings}
                  renderItem={renderBookingItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={globalStyles.bookingsList}
                />
              ) : (
                <View style={globalStyles.noBookingsContainer}>
                  <Calendar size={40} color="#d1d5db" strokeWidth={1.5} />
                  <Text style={globalStyles.noBookingsText}>No upcoming bookings</Text>
                  <Text style={globalStyles.noBookingsSubtext}>You're all caught up!</Text>
                </View>
              )}
            </View>

            <View style={globalStyles.section}>
              <View style={globalStyles.sectionHeader}>
                <Text style={globalStyles.sectionTitle}>Profile Status</Text>
              </View>
              <View style={globalStyles.profileStatusCard}>
                <View style={globalStyles.statusIndicator}>
                  <View style={globalStyles.statusDot} />
                  <Text style={globalStyles.statusLabel}>Verified</Text>
                </View>
                <TouchableOpacity style={globalStyles.editButton}>
                  <Text style={globalStyles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={globalStyles.signOutButton}
              onPress={handleSignOut}
              disabled={loading}
            >
              <LogOut size={20} color="#ef4444" strokeWidth={2} />
              <Text style={globalStyles.signOutButtonText}>Sign Out</Text>
            </TouchableOpacity>
          </>
        )}
        keyExtractor={() => 'provider-home'}
        contentContainerStyle={globalStyles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
