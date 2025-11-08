import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { MapPin, Users, Star } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';

export default function Welcome() {
  const router = useRouter();

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400' }}
          style={globalStyles.headerImage}
        />
        <View style={globalStyles.overlay} />
        <View style={globalStyles.headerContent}>
          <Text style={globalStyles.title}>Local Service Finder</Text>
          <Text style={globalStyles.subtitle}>Find trusted service providers near you</Text>
        </View>
      </View>

      <View style={globalStyles.features}>
        <View style={globalStyles.feature}>
          <MapPin size={32} color="#2563eb" strokeWidth={1.5} />
          <Text style={globalStyles.featureTitle}>Find Nearby</Text>
          <Text style={globalStyles.featureText}>Discover verified professionals in your area</Text>
        </View>

        <View style={globalStyles.feature}>
          <Users size={32} color="#2563eb" strokeWidth={1.5} />
          <Text style={globalStyles.featureTitle}>Trusted Network</Text>
          <Text style={globalStyles.featureText}>Connect with quality service providers</Text>
        </View>

        <View style={globalStyles.feature}>
          <Star size={32} color="#2563eb" strokeWidth={1.5} />
          <Text style={globalStyles.featureTitle}>Rated & Reviewed</Text>
          <Text style={globalStyles.featureText}>Make informed decisions with real reviews</Text>
        </View>
      </View>

      <View style={globalStyles.actions}>
        <TouchableOpacity
          style={[globalStyles.button, globalStyles.primaryButton]}
          onPress={() => router.push('/(auth)/signup')}
        >
          <Text style={globalStyles.primaryButtonText}>Get Started</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[globalStyles.button, globalStyles.secondaryButton]}
          onPress={() => router.push('/(auth)/signin')}
        >
          <Text style={globalStyles.secondaryButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
