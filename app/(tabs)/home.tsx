import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ServiceProvider, ServiceCategory } from '@/lib/firebase';
import { getServiceCategories, getServiceProviders } from '@/lib/realtime-helpers';
import { MapPin, Star } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';

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
      const [categories, providers] = await Promise.all([
        getServiceCategories(),
        getServiceProviders({
          verificationStatus: 'verified',
          orderByRating: true,
          limitCount: 5,
        }),
      ]);

      setCategories(categories);
      setFeaturedProviders(providers);
    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderCategoryItem = ({ item }: { item: ServiceCategory }) => (
    <TouchableOpacity
      style={globalStyles.categoryCard}
      onPress={() => router.push({ pathname: '/(tabs)/search', params: { categoryId: item.id } })}
    >
      <View style={globalStyles.categoryIcon}>
        <Text style={globalStyles.categoryIconText}>{item.icon_name?.[0] || '⚡'}</Text>
      </View>
      <Text style={globalStyles.categoryName} numberOfLines={1}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderProviderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={globalStyles.providerCard}
      onPress={() => router.push({ pathname: '/provider-details', params: { id: item.id } })}
    >
      <Image
        source={{ uri: item.users?.profile_picture_url || 'https://via.placeholder.com/120' }}
        style={globalStyles.providerImage}
      />
      <View style={globalStyles.providerInfo}>
        <Text style={globalStyles.providerName} numberOfLines={1}>
          {item.users?.full_name}
        </Text>
        <Text style={globalStyles.providerCategory} numberOfLines={1}>
          {item.category_id}
        </Text>
        <View style={globalStyles.ratingRow}>
          <Star size={14} color="#fbbf24" fill="#fbbf24" />
          <Text style={globalStyles.rating}>{item.average_rating.toFixed(1)}</Text>
          <Text style={globalStyles.reviewCount}>({item.total_reviews})</Text>
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
              <Text style={globalStyles.greeting}>Hello, {user?.full_name || 'Guest'}</Text>
              <Text style={globalStyles.subGreeting}>Find services near you</Text>
            </View>

            <TouchableOpacity
              style={globalStyles.searchBar}
              onPress={() => router.push('/(tabs)/search')}
            >
              <Text style={globalStyles.searchPlaceholder}>Search services...</Text>
            </TouchableOpacity>

            <View style={globalStyles.section}>
              <View style={globalStyles.sectionHeader}>
                <Text style={globalStyles.sectionTitle}>Services</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                  <Text style={globalStyles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={globalStyles.categoryList}
              />
            </View>

            <View style={globalStyles.section}>
              <View style={globalStyles.sectionHeader}>
                <Text style={globalStyles.sectionTitle}>Featured Providers</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
                  <Text style={globalStyles.seeAll}>See all</Text>
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
        contentContainerStyle={globalStyles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
