import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { supabase, ServiceCategory } from '@/lib/supabase';
import { Search as SearchIcon, MapPin, Star, ChevronDown } from 'lucide-react-native';

export default function Search() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [providers, setProviders] = useState<any[]>([]);
  const [filteredProviders, setFilteredProviders] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    (params.categoryId as string) || null
  );
  const [minRating, setMinRating] = useState(0);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterProviders();
  }, [searchQuery, selectedCategory, minRating, priceRange, providers]);

  const loadData = async () => {
    try {
      const [categoriesResult, providersResult] = await Promise.all([
        supabase.from('service_categories').select('*'),
        supabase
          .from('service_providers')
          .select('*, users:id(full_name, profile_picture_url, city)')
          .eq('verification_status', 'verified'),
      ]);

      setCategories(categoriesResult.data || []);
      setProviders(providersResult.data || []);
    } catch (error) {
      console.error('Error loading search data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProviders = () => {
    let filtered = providers;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category_id === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.users?.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter((p) => p.average_rating >= minRating);
    filtered = filtered.filter(
      (p) => p.hourly_rate >= priceRange[0] && p.hourly_rate <= priceRange[1]
    );

    setFilteredProviders(filtered);
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find((c) => c.id === categoryId)?.name || 'Service';
  };

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
          {getCategoryName(item.category_id)}
        </Text>
        <View style={styles.detailsRow}>
          <View style={styles.detail}>
            <Text style={styles.detailLabel}>₹{item.hourly_rate}/hr</Text>
          </View>
          <View style={styles.detail}>
            <Star size={12} color="#fbbf24" fill="#fbbf24" />
            <Text style={styles.detailLabel}>{item.average_rating.toFixed(1)}</Text>
          </View>
        </View>
        {item.users?.city && (
          <View style={styles.location}>
            <MapPin size={12} color="#9ca3af" />
            <Text style={styles.locationText} numberOfLines={1}>
              {item.users.city}
            </Text>
          </View>
        )}
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
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <SearchIcon size={20} color="#9ca3af" strokeWidth={2} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search providers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <ChevronDown size={20} color="#2563eb" strokeWidth={2} />
          <Text style={styles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {showFilters && (
        <ScrollView style={styles.filterPanel} showsVerticalScrollIndicator={false}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.categoryScroll}
            >
              <TouchableOpacity
                style={[styles.filterChip, !selectedCategory && styles.filterChipActive]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text
                  style={[
                    styles.filterChipText,
                    !selectedCategory && styles.filterChipTextActive,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    styles.filterChip,
                    selectedCategory === category.id && styles.filterChipActive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text
                    style={[
                      styles.filterChipText,
                      selectedCategory === category.id && styles.filterChipTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Minimum Rating</Text>
            <View style={styles.ratingButtons}>
              {[0, 3, 4, 4.5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[styles.ratingButton, minRating === rating && styles.ratingButtonActive]}
                  onPress={() => setMinRating(rating)}
                >
                  <Text
                    style={[
                      styles.ratingButtonText,
                      minRating === rating && styles.ratingButtonTextActive,
                    ]}
                  >
                    {rating === 0 ? 'All' : `${rating}★+`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Hourly Rate</Text>
            <Text style={styles.priceRange}>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </Text>
          </View>
        </ScrollView>
      )}

      <FlatList
        data={filteredProviders}
        renderItem={renderProviderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No providers found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        }
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
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
    gap: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563eb',
  },
  filterPanel: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    maxHeight: 200,
  },
  filterGroup: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  filterLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
  },
  categoryScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterChipText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  ratingButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  ratingButton: {
    flex: 1,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    alignItems: 'center',
  },
  ratingButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  ratingButtonText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  ratingButtonTextActive: {
    color: '#ffffff',
  },
  priceRange: {
    fontSize: 13,
    color: '#2563eb',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 20,
  },
  providerCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  providerImage: {
    width: 100,
    height: 120,
  },
  providerInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  providerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
  },
  providerCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginVertical: 4,
  },
  detailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginVertical: 4,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1f2937',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    fontSize: 11,
    color: '#9ca3af',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 13,
    color: '#9ca3af',
  },
});
