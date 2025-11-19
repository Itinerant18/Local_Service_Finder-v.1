import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, ArrowLeft } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';

export default function SignUp() {
  const router = useRouter();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'customer' | 'provider' | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !role) {
      Alert.alert('Error', 'Please fill all fields and select a role');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);
    try {
      await signUp(email, password, role);
      router.push('/(auth)/profile-setup');
    } catch (error: any) {
      Alert.alert('Sign Up Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={globalStyles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1f2937" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={globalStyles.headerTitle}>Create Account</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={globalStyles.content}>
        <Text style={globalStyles.label}>Choose your role</Text>
        <View style={globalStyles.roleContainer}>
          <TouchableOpacity
            style={[globalStyles.roleButton, role === 'customer' && globalStyles.roleButtonActive]}
            onPress={() => setRole('customer')}
          >
            <Text style={[globalStyles.roleText, role === 'customer' && globalStyles.roleTextActive]}>
              I need services
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[globalStyles.roleButton, role === 'provider' && globalStyles.roleButtonActive]}
            onPress={() => setRole('provider')}
          >
            <Text style={[globalStyles.roleText, role === 'provider' && globalStyles.roleTextActive]}>
              I provide services
            </Text>
          </TouchableOpacity>
        </View>

        <View style={globalStyles.formGroup}>
          <Text style={globalStyles.label}>Email</Text>
          <View style={globalStyles.inputWrapper}>
            <Mail size={20} color="#9ca3af" strokeWidth={2} />
            <TextInput
              style={globalStyles.input}
              placeholder="your@email.com"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={globalStyles.formGroup}>
          <Text style={globalStyles.label}>Password</Text>
          <View style={globalStyles.inputWrapper}>
            <Lock size={20} color="#9ca3af" strokeWidth={2} />
            <TextInput
              style={globalStyles.input}
              placeholder="Min 8 characters"
              value={password}
              onChangeText={setPassword}
              editable={!loading}
              secureTextEntry
            />
          </View>
        </View>

        <View style={globalStyles.formGroup}>
          <Text style={globalStyles.label}>Confirm Password</Text>
          <View style={globalStyles.inputWrapper}>
            <Lock size={20} color="#9ca3af" strokeWidth={2} />
            <TextInput
              style={globalStyles.input}
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              editable={!loading}
              secureTextEntry
            />
          </View>
        </View>
      </View>

      <View style={globalStyles.footer}>
        <TouchableOpacity
          style={[globalStyles.signUpButton, loading && globalStyles.buttonDisabled]}
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={globalStyles.signUpButtonText}>Create Account</Text>
          )}
        </TouchableOpacity>

        <View style={globalStyles.signInContainer}>
          <Text style={globalStyles.signInText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signin')}>
            <Text style={globalStyles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
