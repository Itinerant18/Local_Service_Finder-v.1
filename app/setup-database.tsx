/**
 * Database Setup Screen
 * One-time use screen to initialize the database with service categories
 * Access this screen once to set up your database
 */

import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { ref, get, set } from 'firebase/database';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';

const defaultCategories = [
  {
    id: '1',
    name: 'Plumbing',
    description: 'Professional plumbing services including repairs, installations, and maintenance',
    icon_name: '🔧',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Electrical',
    description: 'Electrical work, wiring, installations, and repairs',
    icon_name: '⚡',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Carpentry',
    description: 'Woodwork, furniture, and carpentry services',
    icon_name: '🪚',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Teaching',
    description: 'Tutoring and educational services',
    icon_name: '📚',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Driving',
    description: 'Driving lessons and chauffeur services',
    icon_name: '🚗',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Cooking',
    description: 'Catering, cooking classes, and chef services',
    icon_name: '👨‍🍳',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Cleaning',
    description: 'House cleaning, office cleaning, and deep cleaning services',
    icon_name: '🧹',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Painting',
    description: 'Interior and exterior painting services',
    icon_name: '🎨',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'AC Repair',
    description: 'Air conditioning installation, repair, and maintenance',
    icon_name: '❄️',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Mobile Repair',
    description: 'Mobile phone and tablet repair services',
    icon_name: '📱',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Home Appliance Repair',
    description: 'Repair services for home appliances',
    icon_name: '🔌',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function SetupDatabase() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>('');

  const initializeDatabase = async () => {
    if (!user) {
      Alert.alert('Error', 'Please sign in first to initialize the database');
      return;
    }

    setLoading(true);
    setStatus('Checking database...');

    try {
      // Check if categories already exist
      const categoriesRef = ref(db, 'service_categories');
      const snapshot = await get(categoriesRef);

      if (snapshot.exists()) {
        Alert.alert(
          'Already Initialized',
          'Service categories already exist in the database. No action needed.',
          [
            {
              text: 'OK',
              onPress: () => router.back(),
            },
          ]
        );
        setLoading(false);
        return;
      }

      // Add each category
      setStatus('Adding service categories...');
      for (let i = 0; i < defaultCategories.length; i++) {
        const category = defaultCategories[i];
        await set(ref(db, `service_categories/${category.id}`), category);
        setStatus(`Adding category ${i + 1}/${defaultCategories.length}: ${category.name}`);
      }

      setStatus('Database initialized successfully!');
      Alert.alert(
        'Success!',
        `Successfully added ${defaultCategories.length} service categories to the database.`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error: any) {
      console.error('Error initializing database:', error);
      Alert.alert('Error', error.message || 'Failed to initialize database');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Database Setup</Text>
        <Text style={styles.subtitle}>
          Initialize your database with default service categories
        </Text>

        {status ? (
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{status}</Text>
          </View>
        ) : (
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              This will add {defaultCategories.length} service categories to your database:
            </Text>
            <View style={styles.categoriesList}>
              {defaultCategories.map((cat) => (
                <Text key={cat.id} style={styles.categoryItem}>
                  {cat.icon_name} {cat.name}
                </Text>
              ))}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={initializeDatabase}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Initialize Database</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
          disabled={loading}
        >
          <Text style={styles.backButtonText}>Go Back</Text>
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
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  statusContainer: {
    backgroundColor: '#eff6ff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
  },
  statusText: {
    fontSize: 14,
    color: '#2563eb',
    textAlign: 'center',
  },
  infoContainer: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  infoText: {
    fontSize: 14,
    color: '#1f2937',
    marginBottom: 12,
  },
  categoriesList: {
    gap: 8,
  },
  categoryItem: {
    fontSize: 14,
    color: '#4b5563',
    paddingVertical: 4,
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#6b7280',
    fontSize: 14,
  },
});

