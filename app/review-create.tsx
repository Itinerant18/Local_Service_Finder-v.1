import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getBookingById, getReviewByBookingId, createReview, updateProviderRating } from '@/lib/realtime-helpers';
import { ArrowLeft, Star } from 'lucide-react-native';

export default function ReviewCreate() {
  const router = useRouter();
  const { bookingId, providerId } = useLocalSearchParams();
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    loadBooking();
  }, [bookingId]);

  const loadBooking = async () => {
    if (!bookingId) return;

    try {
      const bookingData = await getBookingById(bookingId as string);
      if (bookingData) {
        setBooking(bookingData);
      }
    } catch (error) {
      console.error('Error loading booking:', error);
    }
  };

  const handleSubmitReview = async () => {
    if (rating === 0) {
      Alert.alert('Error', 'Please select a rating (1-5 stars)');
      return;
    }

    // Validate review text length (max 500 chars as per PRD)
    if (reviewText && reviewText.length > 500) {
      Alert.alert('Error', 'Review text must be under 500 characters');
      return;
    }

    if (!user?.id || !providerId || !bookingId) {
      Alert.alert('Error', 'Missing required information');
      return;
    }

    setLoading(true);
    try {
      // Check if review already exists
      const existingReview = await getReviewByBookingId(bookingId as string);

      if (existingReview) {
        Alert.alert('Error', 'You have already reviewed this booking');
        setLoading(false);
        return;
      }

      await createReview({
        booking_id: bookingId as string,
        customer_id: user.id,
        provider_id: providerId as string,
        rating: rating,
        review_text: reviewText || null,
      });

      // Update provider's average rating
      await updateProviderRating(providerId as string);

      Alert.alert('Success', 'Review submitted successfully!', [
        {
          text: 'OK',
          onPress: () => router.back(),
        },
      ]);
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProviderRating = async (providerIdStr: string) => {
    try {
      // Calculate new average rating
      const { data: reviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('provider_id', providerIdStr);

      if (reviews && reviews.length > 0) {
        const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

        await supabase
          .from('service_providers')
          .update({
            average_rating: avgRating,
            total_reviews: reviews.length,
          })
          .eq('id', providerIdStr);
      }
    } catch (error) {
      console.error('Error updating provider rating:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Write a Review</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How was your experience?</Text>
          <Text style={styles.sectionSubtitle}>
            Rate this service (required)
          </Text>

          <View style={styles.starContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity
                key={star}
                onPress={() => setRating(star)}
                style={styles.starButton}
              >
                <Star
                  size={40}
                  color={star <= rating ? '#fbbf24' : '#e5e7eb'}
                  fill={star <= rating ? '#fbbf24' : 'transparent'}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            ))}
          </View>

          {rating > 0 && (
            <Text style={styles.ratingText}>
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </Text>
          )}
        </View>

        <View style={styles.section}>
          <View style={styles.labelWithCounter}>
            <Text style={styles.label}>Tell us more (optional)</Text>
            <Text style={styles.charCounter}>{reviewText.length}/500</Text>
          </View>
          <TextInput
            style={styles.textArea}
            placeholder="Share your experience with this service provider..."
            value={reviewText}
            onChangeText={setReviewText}
            editable={!loading}
            multiline
            numberOfLines={6}
            maxLength={500}
            placeholderTextColor="#9ca3af"
          />
          <Text style={styles.hint}>
            Your review will help other customers make informed decisions
          </Text>
        </View>

        <View style={styles.policyCard}>
          <Text style={styles.policyTitle}>Review Guidelines</Text>
          <Text style={styles.policyText}>• Be honest and constructive</Text>
          <Text style={styles.policyText}>• Focus on your experience with the service</Text>
          <Text style={styles.policyText}>• You can edit your review within 48 hours</Text>
          <Text style={styles.policyText}>• One review per booking</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
          onPress={handleSubmitReview}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit Review</Text>
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
    paddingVertical: 20,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 20,
  },
  starContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  starButton: {
    padding: 4,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  labelWithCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  charCounter: {
    fontSize: 12,
    color: '#9ca3af',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#1f2937',
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: '#ffffff',
  },
  hint: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 8,
  },
  policyCard: {
    backgroundColor: '#f0f9ff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bae6fd',
    padding: 14,
    marginBottom: 20,
  },
  policyTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0c4a6e',
    marginBottom: 8,
  },
  policyText: {
    fontSize: 11,
    color: '#0369a1',
    lineHeight: 18,
    marginBottom: 2,
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
  submitButton: {
    backgroundColor: '#2563eb',
  },
  submitButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});
