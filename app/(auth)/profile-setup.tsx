import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ServiceCategory } from '@/lib/firebase';
import { getServiceCategories, createServiceProvider } from '@/lib/realtime-helpers';
import { useEffect } from 'react';
import { User, Phone } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';

export default function ProfileSetup() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [servicesOffered, setServicesOffered] = useState(''); // comma-separated list
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const categoriesData = await getServiceCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    console.log('handleNext called');
    console.log('Full Name:', fullName);
    console.log('Phone:', phone);
    console.log('Selected Category:', selectedCategory);
    console.log('Experience:', experience);
    console.log('Hourly Rate:', hourlyRate);

    if (!fullName || !phone) {
      console.log('Validation failed: Full name or phone number is missing');
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    // Validate phone number (10 digits)
    if (phone.length !== 10) {
      console.log('Validation failed: Phone number is not 10 digits');
      Alert.alert('Error', 'Phone number must be 10 digits');
      return;
    }

    if (user?.role === 'provider') {
      if (!selectedCategory || !experience || !hourlyRate) {
        console.log('Validation failed: Provider details are missing');
        Alert.alert('Error', 'Please complete all provider details');
        return;
      }

      // Validate experience (0-50 years as per PRD)
      const expYears = parseInt(experience);
      if (isNaN(expYears) || expYears < 0 || expYears > 50) {
        console.log('Validation failed: Experience is not a valid number');
        Alert.alert('Error', 'Experience must be between 0 and 50 years');
        return;
      }

      // Validate hourly rate (₹0-₹10,000 as per PRD)
      const rate = parseFloat(hourlyRate);
      if (isNaN(rate) || rate < 0 || rate > 10000) {
        console.log('Validation failed: Hourly rate is not a valid number');
        Alert.alert('Error', 'Hourly rate must be between ₹0 and ₹10,000');
        return;
      }
    }

    setSaving(true);
    try {
      console.log('Calling updateProfile');
      await updateProfile({
        full_name: fullName,
        phone_number: phone,
      });
      console.log('updateProfile successful');

      if (user?.role === 'provider') {
        console.log('Calling createServiceProvider');
        await createServiceProvider({
          id: user.id,
          category_id: selectedCategory!,
          experience_years: parseInt(experience),
          hourly_rate: parseFloat(hourlyRate),
          verification_status: 'pending',
          service_description: null,
          services_offered: servicesOffered
            ? servicesOffered
                .split(',')
                .map((s) => s.trim())
                .filter((s) => s.length > 0)
            : [],
          service_area_radius_km: 10,
          verification_documents: null,
          id_proof_url: null,
          address_proof_url: null,
          certifications: null,
          response_time_minutes: null,
        });
        console.log('createServiceProvider successful');
      }

      router.replace('/(tabs)');
    } catch (error: any) {
      console.log('An error occurred:', error.message);
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={globalStyles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.content}>
        <Text style={globalStyles.title}>Complete Your Profile</Text>
        <Text style={globalStyles.subtitle}>
          {user?.role === 'provider' ? 'Set up your service profile' : 'Let us know about you'}
        </Text>

        <View style={globalStyles.formGroup}>
          <Text style={globalStyles.label}>Full Name *</Text>
          <View style={globalStyles.inputWrapper}>
            <User size={20} color="#9ca3af" strokeWidth={2} />
            <TextInput
              style={globalStyles.input}
              placeholder="Your full name"
              value={fullName}
              onChangeText={setFullName}
              editable={!saving}
            />
          </View>
        </View>

        <View style={globalStyles.formGroup}>
          <Text style={globalStyles.label}>Phone Number *</Text>
          <View style={globalStyles.inputWrapper}>
            <Phone size={20} color="#9ca3af" strokeWidth={2} />
            <TextInput
              style={globalStyles.input}
              placeholder="10-digit phone number"
              value={phone}
              onChangeText={setPhone}
              editable={!saving}
              keyboardType="phone-pad"
              maxLength={10}
            />
          </View>
        </View>

        {user?.role === 'provider' && (
          <>
            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Service Category *</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={globalStyles.categoryScroll}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      globalStyles.categoryButton,
                      selectedCategory === category.id && globalStyles.categoryButtonActive,
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text
                      style={[
                        globalStyles.categoryButtonText,
                        selectedCategory === category.id && globalStyles.categoryButtonTextActive,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Services Offered (comma separated)</Text>
              <View style={globalStyles.inputWrapper}>
                <TextInput
                  style={globalStyles.input}
                  placeholder="e.g., Wiring fix, AC installation, Fan repair"
                  value={servicesOffered}
                  onChangeText={setServicesOffered}
                  editable={!saving}
                  multiline
                />
              </View>
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Years of Experience * (0-50)</Text>
              <View style={globalStyles.inputWrapper}>
                <TextInput
                  style={globalStyles.input}
                  placeholder="e.g., 5"
                  value={experience}
                  onChangeText={setExperience}
                  editable={!saving}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={globalStyles.formGroup}>
              <Text style={globalStyles.label}>Hourly Rate (₹) * (0-10,000)</Text>
              <View style={globalStyles.inputWrapper}>
                <TextInput
                  style={globalStyles.input}
                  placeholder="e.g., 500"
                  value={hourlyRate}
                  onChangeText={setHourlyRate}
                  editable={!saving}
                  keyboardType="decimal-pad"
                />
              </View>
            </View>
          </>
        )}
      </View>

      <View style={globalStyles.footer}>
        <TouchableOpacity
          style={[globalStyles.button, saving && globalStyles.buttonDisabled]}
          onPress={handleNext}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={globalStyles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
