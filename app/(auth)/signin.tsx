import { View, Text, TouchableOpacity, TextInput, ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Mail, Lock, ArrowLeft } from 'lucide-react-native';
import { globalStyles } from '@/styles/global';

export default function SignIn() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      // The AuthProvider will handle redirection
    } catch (error: any) {
      Alert.alert('Sign In Failed', error.message);
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
        <Text style={globalStyles.headerTitle}>Sign In</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={globalStyles.content}>
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
      </View>

      <View style={globalStyles.footer}>
        <TouchableOpacity
          style={[globalStyles.signUpButton, loading && globalStyles.buttonDisabled]}
          onPress={handleSignIn}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={globalStyles.signUpButtonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <View style={globalStyles.signInContainer}>
          <Text style={globalStyles.signInText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
            <Text style={globalStyles.signInLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
