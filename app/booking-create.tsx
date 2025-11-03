import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign } from 'lucide-react-native';

export default function BookingCreate() {
  const router = useRouter();
  const { providerId } = useLocalSearchParams();
  const { user } = useAuth();
  const [provider, setProvider] = useState<any>(null);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('10:00');
  const [duration, setDuration] = useState('60');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    loadProvider();
  }, [providerId]);

  const loadProvider = async () => {
    if (!providerId) return;

    try {
      const { data } = await supabase
        .from('service_providers')
        .select('*, users:id(full_name)')
        .eq('id', providerId)
        .maybeSingle();

      setProvider(data);
    } catch (error) {
      console.error('Error loading provider:', error);
      Alert.alert('Error', 'Failed to load provider details');
    } finally {
      setLoading(false);
    }
  };

  const estimatedPrice = provider
    ? (provider.hourly_rate * parseInt(duration)) / 60
    : 0;

  const handleCreateBooking = async () => {
    if (!user?.id || !providerId) {
      Alert.alert('Error', 'Missing required information');
      return;
    }

    if (!date || !time || !address || !duration) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    setCreating(true);
    try {
      const { error } = await supabase.from('bookings').insert({
        customer_id: user.id,
        provider_id: providerId,
        booking_date: date,
        booking_time: time,
        duration_minutes: parseInt(duration),
        service_address: address,
        service_description: description,
        estimated_price: estimatedPrice,
        status: 'pending',
        payment_status: 'pending',
      });

      if (error) throw error;

      Alert.alert('Success', 'Booking created successfully!', [
        {
          text: 'View Booking',
          onPress: () => router.replace('/(tabs)/bookings'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!provider) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Provider not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.providerCard}>
          <Text style={styles.cardTitle}>Service Provider</Text>
          <Text style={styles.providerName}>{provider.users?.full_name}</Text>
          <Text style={styles.providerRate}>₹{provider.hourly_rate}/hour</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Date & Time</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Service Date *</Text>
            <View style={styles.inputWrapper}>
              <Calendar size={20} color="#9ca3af" strokeWidth={2} />
              <TextInput
                style={styles.input}
                placeholder="YYYY-MM-DD"
                value={date}
                onChangeText={setDate}
                editable={!creating}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Service Time *</Text>
            <View style={styles.inputWrapper}>
              <Clock size={20} color="#9ca3af" strokeWidth={2} />
              <TextInput
                style={styles.input}
                placeholder="HH:MM"
                value={time}
                onChangeText={setTime}
                editable={!creating}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Duration (minutes) *</Text>
            <View style={styles.durationContainer}>
              {[30, 60, 90, 120].map((min) => (
                <TouchableOpacity
                  key={min}
                  style={[
                    styles.durationButton,
                    duration === min.toString() && styles.durationButtonActive,
                  ]}
                  onPress={() => setDuration(min.toString())}
                >
                  <Text
                    style={[
                      styles.durationButtonText,
                      duration === min.toString() && styles.durationButtonTextActive,
                    ]}
                  >
                    {min}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location & Details</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Service Address *</Text>
            <View style={styles.inputWrapper}>
              <MapPin size={20} color="#9ca3af" strokeWidth={2} />
              <TextInput
                style={styles.input}
                placeholder="Enter service address"
                value={address}
                onChangeText={setAddress}
                editable={!creating}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Service Description</Text>
            <TextInput
              style={[styles.textArea]}
              placeholder="Describe the service needed..."
              value={description}
              onChangeText={setDescription}
              editable={!creating}
              multiline
              numberOfLines={4}
            />
          </View>
        </View>

        <View style={styles.priceCard}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Service Rate</Text>
            <Text style={styles.priceValue}>₹{provider.hourly_rate}/hour</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Duration</Text>
            <Text style={styles.priceValue}>{duration} minutes</Text>
          </View>
          <View style={styles.priceDivider} />
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Estimated Total</Text>
            <Text style={styles.totalValue}>₹{estimatedPrice.toFixed(0)}</Text>
          </View>
        </View>

        <View style={styles.note}>
          <Text style={styles.noteText}>
            This is an estimated price. Final price may vary based on actual service time and
            complexity.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
          disabled={creating}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.bookButton, creating && styles.buttonDisabled]}
          onPress={handleCreateBooking}
          disabled={creating}
        >
          {creating ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.bookButtonText}>Book Service</Text>
          )}
        </TouchableOpacity>
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  providerCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bfdbfe',
    padding: 16,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 12,
    color: '#0c4a6e',
    fontWeight: '600',
    marginBottom: 8,
  },
  providerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  providerRate: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '600',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  durationContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  durationButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  durationButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  durationButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  durationButtonTextActive: {
    color: '#ffffff',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#1f2937',
    height: 100,
    textAlignVertical: 'top',
  },
  priceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 14,
    marginBottom: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  priceValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  priceDivider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  note: {
    backgroundColor: '#fef3c7',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  noteText: {
    fontSize: 12,
    color: '#78350f',
    lineHeight: 16,
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  cancelButton: {
    borderWidth: 1.5,
    borderColor: '#e5e7eb',
  },
  cancelButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  bookButton: {
    backgroundColor: '#2563eb',
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  errorText: {
    fontSize: 16,
    color: '#1f2937',
  },
});
