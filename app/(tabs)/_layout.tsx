import { Tabs } from 'expo-router';
import { Home, Search, Briefcase, User } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function TabsLayout() {
  const { user } = useAuth();
  const isProvider = user?.role === 'provider';

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          borderTopColor: '#e5e7eb',
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
      }}
    >
      {isProvider ? (
        <>
          <Tabs.Screen
            name="provider-home"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Home size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
          <Tabs.Screen
            name="bookings"
            options={{
              title: 'Bookings',
              tabBarIcon: ({ color, size }) => (
                <Briefcase size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <User size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
        </>
      ) : (
        <>
          <Tabs.Screen
            name="home"
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size }) => (
                <Home size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              title: 'Search',
              tabBarIcon: ({ color, size }) => (
                <Search size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
          <Tabs.Screen
            name="bookings"
            options={{
              title: 'Bookings',
              tabBarIcon: ({ color, size }) => (
                <Briefcase size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: 'Profile',
              tabBarIcon: ({ color, size }) => (
                <User size={size} color={color} strokeWidth={2} />
              ),
            }}
          />
        </>
      )}
    </Tabs>
  );
}
