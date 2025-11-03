import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { TrendingUp, Calendar, Star, DollarSign } from 'lucide-react-native';

export default function ProviderHome() {
  const { user } = useAuth();
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
      const [providerData, bookingsData] = await Promise.all([
        supabase.from('service_providers').select('*').eq('id', user.id).maybeSingle(),
        supabase
          .from('bookings')
          .select('*')
          .eq('provider_id', user.id)
          .gte('booking_date', new Date().toISOString().split('T')[0])
          .order('booking_date', { ascending: true })
          .limit(5),
      ]);

      if (providerData.data) {
        setStats({
          totalBookings: providerData.data.total_bookings || 0,
          completedBookings: providerData.data.completed_bookings || 0,
          averageRating: providerData.data.average_rating || 0,
          totalEarnings: 0,
        });
      }

      setUpcomingBookings(bookingsData.data || []);
    } catch (error) {
      console.error('Error loading provider data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStatCard = (icon: any, label: string, value: string | number) => (
    <View style={styles.statCard}>
      <View style={styles.statIconContainer}>{icon}</View>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statValue}>{value}</Text>
    </View>
  );

  const renderBookingItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.bookingItem}>
      <View style={styles.bookingItemHeader}>
        <Text style={styles.bookingDate}>
          {new Date(item.booking_date).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
          })}
        </Text>
        <Text style={styles.bookingTime}>{item.booking_time}</Text>
      </View>
      <Text style={styles.bookingAddress} numberOfLines={1}>
        {item.service_address}
      </Text>
      <View style={styles.bookingFooter}>
        <Text style={styles.bookingPrice}>₹{item.estimated_price}</Text>
        <View
          style={[
            styles.bookingStatus,
            item.status === 'confirmed' && styles.statusConfirmed,
            item.status === 'pending' && styles.statusPending,
          ]}
        >
          <Text
            style={[
              styles.bookingStatusText,
              item.status === 'confirmed' && styles.statusTextConfirmed,
              item.status === 'pending' && styles.statusTextPending,
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
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={[1]}
        renderItem={() => (
          <>
            <View style={styles.header}>
              <Text style={styles.greeting}>Welcome back!</Text>
              <Text style={styles.subGreeting}>{user?.full_name}</Text>
            </View>

            <View style={styles.statsGrid}>
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

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
                <TouchableOpacity>
                  <Text style={styles.seeAll}>View all</Text>
                </TouchableOpacity>
              </View>
              {upcomingBookings.length > 0 ? (
                <FlatList
                  data={upcomingBookings}
                  renderItem={renderBookingItem}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  contentContainerStyle={styles.bookingsList}
                />
              ) : (
                <View style={styles.noBookingsContainer}>
                  <Calendar size={40} color="#d1d5db" strokeWidth={1.5} />
                  <Text style={styles.noBookingsText}>No upcoming bookings</Text>
                  <Text style={styles.noBookingsSubtext}>You're all caught up!</Text>
                </View>
              )}
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Profile Status</Text>
              </View>
              <View style={styles.profileStatusCard}>
                <View style={styles.statusIndicator}>
                  <View style={styles.statusDot} />
                  <Text style={styles.statusLabel}>Verified</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
        keyExtractor={() => 'provider-home'}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  subGreeting: {
    fontSize: 14,
    color: '#6b7280',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 12,
    paddingVertical: 16,
    gap: 8,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    alignItems: 'center',
  },
  statIconContainer: {
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  section: {
    marginBottom: 16,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  seeAll: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '500',
  },
  bookingsList: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    gap: 10,
  },
  bookingItem: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
  },
  bookingItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  bookingDate: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  bookingTime: {
    fontSize: 13,
    color: '#6b7280',
  },
  bookingAddress: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  bookingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookingPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  bookingStatus: {
    backgroundColor: '#fef3c7',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 4,
  },
  statusConfirmed: {
    backgroundColor: '#dbeafe',
  },
  statusPending: {
    backgroundColor: '#fef3c7',
  },
  bookingStatusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#92400e',
  },
  statusTextConfirmed: {
    color: '#0c4a6e',
  },
  statusTextPending: {
    color: '#92400e',
  },
  noBookingsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noBookingsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 12,
  },
  noBookingsSubtext: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  profileStatusCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#16a34a',
  },
  statusLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  editButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2563eb',
    borderRadius: 6,
  },
  editButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
});
