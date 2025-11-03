import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase, ServiceProvider, ServiceCategory } from '@/lib/supabase';
import { MapPin, Star } from 'lucide-react-native';

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [featuredProviders, setFeaturedProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHomeData();
  }, []);

  const loadHomeData = async () => {
    try {
      const [categoriesResult, providersResult] = await Promise.all([
        supabase.from('service_categories').select('*').limit(6),
        supabase
          .from('service_providers')
          .select('*, users:id(full_name, profile_picture_url)')
          .eq('verification_status', 'verified')
          .order('average_rating', { ascending: false })
          .limit(5),
      ]);

      setCategories(categoriesResult.data || []);
      setFeaturedProviders(providersResult.data || []);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryItem = ({ item }: { item: ServiceCategory }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => router.push({ pathname: '/(tabs)/search', params: { categoryId: item.id } })}
    >
      <View style={styles.categoryIcon}>
        <Text style={styles.categoryIconText}>{item.icon_name?.[0] || '⚡'}</Text>
      </View>
      <Text style={styles.categoryName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProviderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.providerCard}
      onPress={() => router.push({ pathname: '/provider-details', params: { id: item.id } })}
    >
      <Image
        source={{ uri: item.users?.profile_picture_url || 'https://via.placeholder.com/120' }}
        style={styles.providerImage}
      />
      <View style={styles.providerInfo}>
        <Text style={styles.providerName} numberOfLines={1}>
          {item.users?.full_name}
        </Text>
        <Text style={styles.providerCategory} numberOfLines={1}>
          {item.category_id}
        </Text>
        <View style={styles.ratingRow}>
          <Star size={14} color="#fbbf24" fill="#fbbf24" />
          <Text style={styles.rating}>{item.average_rating.toFixed(1)}</Text>
          <Text style={styles.reviewCount}>({item.total_reviews})</Text>
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
              <Text style={styles.greeting}>Hello, {user?.full_name || 'Guest'}</Text>
              <Text style={styles.subGreeting}>Find services near you</Text>
            </View>

            <TouchableOpacity
              style={styles.searchBar}
              onPress={() => router.push('/(tabs)/search')}
            >
              <Text style={styles.searchPlaceholder}>Search services...</Text>
            </TouchableOpacity>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Services</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryList}
              />
            </View>

            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Featured Providers</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={featuredProviders}
                renderItem={renderProviderItem}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
              />
            </View>
          </>
        )}
        keyExtractor={() => 'home'}
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
  searchBar: {
    marginHorizontal: 20,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    justifyContent: 'center',
  },
  searchPlaceholder: {
    color: '#9ca3af',
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  seeAll: {
    fontSize: 14,
    color: '#2563eb',
    fontWeight: '500',
  },
  categoryList: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryCard: {
    width: 100,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryIconText: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
    textAlign: 'center',
  },
  providerCard: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  providerImage: {
    width: 100,
    height: 100,
  },
  providerInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  providerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
  },
  providerCategory: {
    fontSize: 13,
    color: '#6b7280',
    marginVertical: 4,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
  },
  reviewCount: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
