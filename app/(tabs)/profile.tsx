import { View, Text, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { LogOut, Edit2, Settings, HelpCircle } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';

export default function Profile() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Sign Out',
        onPress: async () => {
          setLoading(true);
          try {
            await signOut();
            router.replace('/(auth)/signin');
          } catch (error: any) {
            Alert.alert('Error', error.message);
          } finally {
            setLoading(false);
          }
        },
        style: 'destructive',
      },
    ]);
  };

  return (
    <ScrollView style={globalStyles.container} showsVerticalScrollIndicator={false}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>My Profile</Text>
      </View>

      <View style={globalStyles.profileCard}>
        <Image
          source={{
            uri: user?.profile_picture_url || require('../../assets/images/icon.png'),
          }}
          style={globalStyles.profileImage}
        />
        <View style={globalStyles.profileInfo}>
          <Text style={globalStyles.profileName}>{user?.full_name || 'User'}</Text>
          <Text style={globalStyles.profileEmail}>{user?.email}</Text>
          <View style={globalStyles.roleBadge}>
            <Text style={globalStyles.roleBadgeText}>
              {user?.role === 'provider' ? 'Service Provider' : 'Customer'}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={globalStyles.editButton} onPress={() => router.push('/profile-edit')}>
          <Edit2 size={20} color="#2563eb" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.sectionTitle}>Account</Text>
        </View>

        <TouchableOpacity style={globalStyles.menuItem}>
          <View style={globalStyles.menuItemContent}>
            <Text style={globalStyles.menuItemText}>Personal Information</Text>
            <Text style={globalStyles.menuItemSubtext}>{user?.phone_number}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.menuItem}>
          <View style={globalStyles.menuItemContent}>
            <Text style={globalStyles.menuItemText}>Payment Methods</Text>
            <Text style={globalStyles.menuItemSubtext}>Manage your payment options</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.menuItem}>
          <View style={globalStyles.menuItemContent}>
            <Text style={globalStyles.menuItemText}>Addresses</Text>
            <Text style={globalStyles.menuItemSubtext}>Manage your addresses</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.sectionTitle}>Preferences</Text>
        </View>

        <TouchableOpacity style={globalStyles.menuItem}>
          <Settings size={20} color="#6b7280" strokeWidth={2} />
          <View style={globalStyles.menuItemContent}>
            <Text style={globalStyles.menuItemText}>Notifications</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.menuItem}>
          <Settings size={20} color="#6b7280" strokeWidth={2} />
          <View style={globalStyles.menuItemContent}>
            <Text style={globalStyles.menuItemText}>Privacy & Security</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={globalStyles.section}>
        <View style={globalStyles.sectionHeader}>
          <Text style={globalStyles.sectionTitle}>Support</Text>
        </View>

        <TouchableOpacity style={globalStyles.menuItem}>
          <HelpCircle size={20} color="#6b7280" strokeWidth={2} />
          <View style={globalStyles.menuItemContent}>
            <Text style={globalStyles.menuItemText}>Help Center</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={globalStyles.menuItem}>
          <HelpCircle size={20} color="#6b7280" strokeWidth={2} />
          <View style={globalStyles.menuItemContent}>
            <Text style={globalStyles.menuItemText}>About Us</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={globalStyles.signOutButton}
        onPress={handleSignOut}
        disabled={loading}
      >
        <LogOut size={20} color="#ef4444" strokeWidth={2} />
        <Text style={globalStyles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>

      <View style={globalStyles.footer}>
        <Text style={globalStyles.footerText}>Version 1.0.0</Text>
      </View>
    </ScrollView>
  );
}
