import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { getProviderById, getProviderReviews } from '@/lib/realtime-helpers';
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  Phone,
  MessageSquare,
} from 'lucide-react-native';

export default function ProviderDetails() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [provider, setProvider] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviderDetails();
  }, [id]);

  const loadProviderDetails = async () => {
    if (!id) return;

    try {
      const [providerData, reviewsData] = await Promise.all([
        getProviderById(id as string),
        getProviderReviews(id as string, 10),
      ]);

      if (providerData) {
        setProvider(providerData);
      }
      setReviews(reviewsData);
    } catch (error) {
      console.error('Error loading provider details:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderReviewItem = ({ item }: { item: any }) => (
    <View style={styles.reviewCard}>
      <View style={styles.reviewHeader}>
        <Text style={styles.reviewerName}>Customer</Text>
        <View style={styles.ratingStars}>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={14}
              color={i < item.rating ? '#fbbf24' : '#e5e7eb'}
              fill={i < item.rating ? '#fbbf24' : 'transparent'}
            />
          ))}
        </View>
      </View>
      {item.review_text && (
        <Text style={styles.reviewText} numberOfLines={3}>
          {item.review_text}
        </Text>
      )}
      <Text style={styles.reviewDate}>
        {new Date(item.created_at).toLocaleDateString('en-IN')}
      </Text>
    </View>
  );

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
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Provider Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Image
          source={{
            uri: provider.users?.profile_picture_url || 'https://via.placeholder.com/200',
          }}
          style={styles.profileImage}
        />

        <View style={styles.providerInfo}>
          <Text style={styles.providerName}>{provider.users?.full_name}</Text>
          <Text style={styles.providerCategory}>{provider.category_id}</Text>

          <View style={styles.ratingContainer}>
            <View style={styles.ratingStars}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  color={
                    i < Math.floor(provider.average_rating) ? '#fbbf24' : '#e5e7eb'
                  }
                  fill={
                    i < Math.floor(provider.average_rating) ? '#fbbf24' : 'transparent'
                  }
                />
              ))}
            </View>
            <Text style={styles.rating}>
              {provider.average_rating.toFixed(1)} ({provider.total_reviews} reviews)
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Info</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Clock size={20} color="#2563eb" strokeWidth={2} />
              <Text style={styles.infoLabel}>Experience</Text>
              <Text style={styles.infoValue}>{provider.experience_years} years</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Hourly Rate</Text>
              <Text style={styles.infoValue}>₹{provider.hourly_rate}</Text>
            </View>
          </View>
        </View>

        {provider.service_description && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{provider.service_description}</Text>
          </View>
        )}

        {provider.users?.city && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.locationInfo}>
              <MapPin size={20} color="#2563eb" strokeWidth={2} />
              <Text style={styles.locationText}>{provider.users.city}</Text>
            </View>
          </View>
        )}

        {reviews.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Reviews</Text>
            <FlatList
              data={reviews}
              renderItem={renderReviewItem}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.contactButton}>
          <Phone size={20} color="#ffffff" strokeWidth={2} />
          <Text style={styles.contactButtonText}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.messageButton}>
          <MessageSquare size={20} color="#ffffff" strokeWidth={2} />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bookButton}
          onPress={() =>
            router.push({
              pathname: '/booking-create',
              params: { providerId: id },
            })
          }
        >
          <Text style={styles.bookButtonText}>Book Now</Text>
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
  },
  profileImage: {
    width: '100%',
    height: 300,
  },
  providerInfo: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    backgroundColor: '#ffffff',
    marginBottom: 12,
  },
  providerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  providerCategory: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 4,
  },
  rating: {
    fontSize: 13,
    color: '#6b7280',
  },
  section: {
    backgroundColor: '#ffffff',
    marginBottom: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  infoCard: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 8,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginTop: 4,
  },
  description: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  locationText: {
    fontSize: 14,
    color: '#4b5563',
    flex: 1,
  },
  reviewCard: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    marginBottom: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  reviewerName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  reviewText: {
    fontSize: 13,
    color: '#6b7280',
    lineHeight: 18,
    marginBottom: 8,
  },
  reviewDate: {
    fontSize: 11,
    color: '#9ca3af',
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
  contactButton: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06b6d4',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  contactButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  messageButton: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8b5cf6',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 6,
  },
  messageButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  bookButton: {
    flex: 1,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  backButton: {
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#2563eb',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    color: '#1f2937',
  },
});
