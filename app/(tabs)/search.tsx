import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';
import { ServiceCategory } from '@/lib/firebase';
import { getServiceCategories, getServiceProviders } from '@/lib/realtime-helpers';
import { Search as SearchIcon, MapPin, Star, ChevronDown } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';

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
      const [categories, providers] = await Promise.all([
        getServiceCategories(),
        getServiceProviders({
          verificationStatus: 'verified',
        }),
      ]);

      setCategories(categories);
      setProviders(providers);
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
          {getCategoryName(item.category_id)}
        </Text>
        <View style={globalStyles.detailsRow}>
          <View style={globalStyles.detail}>
            <Text style={globalStyles.detailLabel}>₹{item.hourly_rate}/hr</Text>
          </View>
          <View style={globalStyles.detail}>
            <Star size={12} color="#fbbf24" fill="#fbbf24" />
            <Text style={globalStyles.detailLabel}>{item.average_rating.toFixed(1)}</Text>
          </View>
        </View>
        {item.users?.city && (
          <View style={globalStyles.location}>
            <MapPin size={12} color="#9ca3af" />
            <Text style={globalStyles.locationText} numberOfLines={1}>
              {item.users.city}
            </Text>
          </View>
        )}
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
      <View style={globalStyles.searchSection}>
        <View style={globalStyles.searchBar}>
          <SearchIcon size={20} color="#9ca3af" strokeWidth={2} />
          <TextInput
            style={globalStyles.searchInput}
            placeholder="Search providers..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9ca3af"
          />
        </View>

        <TouchableOpacity
          style={globalStyles.filterButton}
          onPress={() => setShowFilters(!showFilters)}
        >
          <ChevronDown size={20} color="#2563eb" strokeWidth={2} />
          <Text style={globalStyles.filterButtonText}>Filters</Text>
        </TouchableOpacity>
      </View>

      {showFilters && (
        <ScrollView style={globalStyles.filterPanel} showsVerticalScrollIndicator={false}>
          <View style={globalStyles.filterGroup}>
            <Text style={globalStyles.filterLabel}>Category</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={globalStyles.categoryScroll}
            >
              <TouchableOpacity
                style={[globalStyles.filterChip, !selectedCategory && globalStyles.filterChipActive]}
                onPress={() => setSelectedCategory(null)}
              >
                <Text
                  style={[
                    globalStyles.filterChipText,
                    !selectedCategory && globalStyles.filterChipTextActive,
                  ]}
                >
                  All
                </Text>
              </TouchableOpacity>
              {categories.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={[
                    globalStyles.filterChip,
                    selectedCategory === category.id && globalStyles.filterChipActive,
                  ]}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <Text
                    style={[
                      globalStyles.filterChipText,
                      selectedCategory === category.id && globalStyles.filterChipTextActive,
                    ]}
                  >
                    {category.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View style={globalStyles.filterGroup}>
            <Text style={globalStyles.filterLabel}>Minimum Rating</Text>
            <View style={globalStyles.ratingButtons}>
              {[0, 3, 4, 4.5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[globalStyles.ratingButton, minRating === rating && globalStyles.ratingButtonActive]}
                  onPress={() => setMinRating(rating)}
                >
                  <Text
                    style={[
                      globalStyles.ratingButtonText,
                      minRating === rating && globalStyles.ratingButtonTextActive,
                    ]}
                  >
                    {rating === 0 ? 'All' : `${rating}★+`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={globalStyles.filterGroup}>
            <Text style={globalStyles.filterLabel}>Hourly Rate</Text>
            <Text style={globalStyles.priceRange}>
              ₹{priceRange[0]} - ₹{priceRange[1]}
            </Text>
          </View>
        </ScrollView>
      )}

      <FlatList
        data={filteredProviders}
        renderItem={renderProviderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={globalStyles.listContent}
        ListEmptyComponent={
          <View style={globalStyles.emptyContainer}>
            <Text style={globalStyles.emptyText}>No providers found</Text>
            <Text style={globalStyles.emptySubtext}>Try adjusting your filters</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
