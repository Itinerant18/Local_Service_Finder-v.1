import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Booking } from '@/lib/firebase';
import { getUserBookings } from '@/lib/realtime-helpers';
import { Calendar, Clock, MapPin } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';

export default function Bookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');

  useEffect(() => {
    loadBookings();
  }, [user]);

  const loadBookings = async () => {
    if (!user?.id || !user?.role) return;

    try {
      const role = user.role === 'customer' ? 'customer' : 'provider';
      const statusFilter = filter === 'all' ? undefined : filter;
      const bookingsData = await getUserBookings(user.id, role, statusFilter);
      setBookings(bookingsData);
    } catch (error) {
      console.error('Error loading bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderBookingItem = ({ item }: { item: Booking }) => (
    <TouchableOpacity style={globalStyles.bookingCard}>
      <View style={globalStyles.bookingHeader}>
        <Text style={globalStyles.bookingDate}>
          {new Date(item.booking_date).toLocaleDateString('en-IN', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          })}
        </Text>
        <View
          style={[
            globalStyles.statusBadge,
            item.status === 'confirmed' && globalStyles.statusConfirmed,
            item.status === 'in_progress' && globalStyles.statusInProgress,
            item.status === 'completed' && globalStyles.statusCompleted,
            item.status === 'cancelled' && globalStyles.statusCancelled,
          ]}
        >
          <Text
            style={[
              globalStyles.statusText,
              item.status === 'confirmed' && globalStyles.statusTextConfirmed,
              item.status === 'in_progress' && globalStyles.statusTextInProgress,
              item.status === 'completed' && globalStyles.statusTextCompleted,
              item.status === 'cancelled' && globalStyles.statusTextCancelled,
            ]}
          >
            {item.status === 'in_progress' ? 'In Progress' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Text>
        </View>
      </View>

      <View style={globalStyles.bookingDetails}>
        <View style={globalStyles.detailRow}>
          <Clock size={16} color="#6b7280" strokeWidth={2} />
          <Text style={globalStyles.detailText}>{item.booking_time}</Text>
        </View>
        <View style={globalStyles.detailRow}>
          <MapPin size={16} color="#6b7280" strokeWidth={2} />
          <Text style={globalStyles.detailText} numberOfLines={1}>
            {item.service_address}
          </Text>
        </View>
      </View>

      <View style={globalStyles.bookingFooter}>
        <Text style={globalStyles.price}>₹{item.estimated_price}</Text>
        <TouchableOpacity style={globalStyles.detailsButton}>
          <Text style={globalStyles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
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
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>My Bookings</Text>
      </View>

      <View style={globalStyles.filterContainer}>
        {(['all', 'pending', 'confirmed', 'completed'] as const).map((status) => (
          <TouchableOpacity
            key={status}
            style={[globalStyles.filterChip, filter === status && globalStyles.filterChipActive]}
            onPress={() => {
              setFilter(status);
              setLoading(true);
            }}
          >
            <Text
              style={[
                globalStyles.filterChipText,
                filter === status && globalStyles.filterChipTextActive,
              ]}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={globalStyles.listContent}
        ListEmptyComponent={
          <View style={globalStyles.emptyContainer}>
            <Calendar size={48} color="#d1d5db" strokeWidth={1.5} />
            <Text style={globalStyles.emptyText}>No bookings found</Text>
            <Text style={globalStyles.emptySubtext}>You haven't made any bookings yet</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
