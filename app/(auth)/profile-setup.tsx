import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase, ServiceCategory } from '@/lib/supabase';
import { useEffect } from 'react';
import { User, Phone } from 'lucide-react-native';

export default function ProfileSetup() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [experience, setExperience] = useState('');
  const [hourlyRate, setHourlyRate] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const { data } = await supabase
        .from('service_categories')
        .select('*');
      setCategories(data || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    if (!fullName || !phone) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (user?.role === 'provider' && (!selectedCategory || !experience || !hourlyRate)) {
      Alert.alert('Error', 'Please complete all provider details');
      return;
    }

    setSaving(true);
    try {
      await updateProfile({
        full_name: fullName,
        phone_number: phone,
      });

      if (user?.role === 'provider') {
        const { error } = await supabase.from('service_providers').insert({
          id: user.id,
          category_id: selectedCategory,
          experience_years: parseInt(experience),
          hourly_rate: parseFloat(hourlyRate),
          verification_status: 'pending',
        });

        if (error) throw error;
      }

      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <Text style={styles.title}>Complete Your Profile</Text>
        <Text style={styles.subtitle}>
          {user?.role === 'provider' ? 'Set up your service profile' : 'Let us know about you'}
        </Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name *</Text>
          <View style={styles.inputWrapper}>
            <User size={20} color="#9ca3af" strokeWidth={2} />
            <TextInput
              style={styles.input}
              placeholder="Your full name"
              value={fullName}
              onChangeText={setFullName}
              editable={!saving}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Phone Number *</Text>
          <View style={styles.inputWrapper}>
            <Phone size={20} color="#9ca3af" strokeWidth={2} />
            <TextInput
              style={styles.input}
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
            <View style={styles.formGroup}>
              <Text style={styles.label}>Service Category *</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.categoryScroll}
              >
                {categories.map((category) => (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      selectedCategory === category.id && styles.categoryButtonActive,
                    ]}
                    onPress={() => setSelectedCategory(category.id)}
                  >
                    <Text
                      style={[
                        styles.categoryButtonText,
                        selectedCategory === category.id && styles.categoryButtonTextActive,
                      ]}
                    >
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Years of Experience *</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
                  placeholder="e.g., 5"
                  value={experience}
                  onChangeText={setExperience}
                  editable={!saving}
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Hourly Rate (₹) *</Text>
              <View style={styles.inputWrapper}>
                <TextInput
                  style={styles.input}
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

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, saving && styles.buttonDisabled]}
          onPress={handleNext}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Continue</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 28,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
    gap: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  categoryScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  categoryButtonText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  footer: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});
