import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getProviderById, createBooking } from '@/lib/realtime-helpers';
import { ArrowLeft, Calendar, Clock, MapPin, DollarSign } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';

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
      const providerData = await getProviderById(providerId as string);
      setProvider(providerData);
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

    // Validate service description length (max 500 chars as per PRD)
    if (description && description.length > 500) {
      Alert.alert('Error', 'Service description must be under 500 characters');
      return;
    }

    setCreating(true);
    try {
      await createBooking({
        customer_id: user.id,
        provider_id: providerId as string,
        booking_date: date,
        booking_time: time,
        duration_minutes: parseInt(duration),
        service_address: address,
        service_description: description || null,
        estimated_price: estimatedPrice,
        final_price: null,
        status: 'pending',
        payment_status: 'pending',
        latitude: null,
        longitude: null,
        special_instructions: null,
        cancellation_reason: null,
        cancelled_by: null,
        cancelled_at: null,
        completed_at: null,
      });

      Alert.alert('Success', 'Booking created successfully!', [
        {
          text: 'View Booking',
          onPress: () => router.replace('/(tabs)/bookings'),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to create booking');
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!provider) {
    return (
      <View style={globalStyles.centerContainer}>
        <Text style={globalStyles.errorText}>Provider not found</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Create Booking</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={globalStyles.content} showsVerticalScrollIndicator={false}>
        <View style={globalStyles.providerCard}>
          <Text style={globalStyles.cardTitle}>Service Provider</Text>
          <Text style={globalStyles.providerName}>{provider.users?.full_name}</Text>
          <Text style={globalStyles.providerRate}>₹{provider.hourly_rate}/hour</Text>
        </View>

        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Date & Time</Text>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Service Date *</Text>
            <View style={globalStyles.inputWrapper}>
              <Calendar size={20} color="#9ca3af" strokeWidth={2} />
              <TextInput
                style={globalStyles.input}
                placeholder="YYYY-MM-DD"
                value={date}
                onChangeText={setDate}
                editable={!creating}
              />
            </View>
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Service Time *</Text>
            <View style={globalStyles.inputWrapper}>
              <Clock size={20} color="#9ca3af" strokeWidth={2} />
              <TextInput
                style={globalStyles.input}
                placeholder="HH:MM"
                value={time}
                onChangeText={setTime}
                editable={!creating}
              />
            </View>
          </View>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Duration (minutes) *</Text>
            <View style={globalStyles.durationContainer}>
              {[30, 60, 90, 120].map((min) => (
                <TouchableOpacity
                  key={min}
                  style={[
                    globalStyles.durationButton,
                    duration === min.toString() && globalStyles.durationButtonActive,
                  ]}
                  onPress={() => setDuration(min.toString())}
                >
                  <Text
                    style={[
                      globalStyles.durationButtonText,
                      duration === min.toString() && globalStyles.durationButtonTextActive,
                    ]}
                  >
                    {min}m
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={globalStyles.section}>
          <Text style={globalStyles.sectionTitle}>Location & Details</Text>

          <View style={globalStyles.formGroup}>
            <Text style={globalStyles.label}>Service Address *</Text>
            <View style={globalStyles.inputWrapper}>
              <MapPin size={20} color="#9ca3af" strokeWidth={2} />
              <TextInput
                style={globalStyles.input}
                placeholder="Enter service address"
                value={address}
                onChangeText={setAddress}
                editable={!creating}
              />
            </View>
          </View>

          <View style={globalStyles.formGroup}>
            <View style={globalStyles.labelWithCounter}>
              <Text style={globalStyles.label}>Service Description</Text>
              <Text style={globalStyles.charCounter}>{description.length}/500</Text>
            </View>
            <TextInput
              style={[globalStyles.textArea]}
              placeholder="Describe the service needed..."
              value={description}
              onChangeText={setDescription}
              editable={!creating}
              multiline
              numberOfLines={4}
              maxLength={500}
            />
          </View>
        </View>

        <View style={globalStyles.priceCard}>
          <View style={globalStyles.priceRow}>
            <Text style={globalStyles.priceLabel}>Service Rate</Text>
            <Text style={globalStyles.priceValue}>₹{provider.hourly_rate}/hour</Text>
          </View>
          <View style={globalStyles.priceRow}>
            <Text style={globalStyles.priceLabel}>Duration</Text>
            <Text style={globalStyles.priceValue}>{duration} minutes</Text>
          </View>
          <View style={globalStyles.priceDivider} />
          <View style={globalStyles.priceRow}>
            <Text style={globalStyles.totalLabel}>Estimated Total</Text>
            <Text style={globalStyles.totalValue}>₹{estimatedPrice.toFixed(0)}</Text>
          </View>
        </View>

        <View style={globalStyles.note}>
          <Text style={globalStyles.noteText}>
            This is an estimated price. Final price may vary based on actual service time and
            complexity.
          </Text>
        </View>

        <View style={globalStyles.policyCard}>
          <Text style={globalStyles.policyTitle}>Cancellation Policy</Text>
          <Text style={globalStyles.policyText}>• Free cancellation: Up to 4 hours before service</Text>
          <Text style={globalStyles.policyText}>• 50% charge: 2-4 hours before service</Text>
          <Text style={globalStyles.policyText}>• 100% charge: Less than 2 hours before service</Text>
        </View>
      </ScrollView>

      <View style={globalStyles.footer}>
        <TouchableOpacity
          style={[globalStyles.button, globalStyles.cancelButton]}
          onPress={() => router.back()}
          disabled={creating}
        >
          <Text style={globalStyles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[globalStyles.button, globalStyles.bookButton, creating && globalStyles.buttonDisabled]}
          onPress={handleCreateBooking}
          disabled={creating}
        >
          {creating ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={globalStyles.bookButtonText}>Book Service</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
