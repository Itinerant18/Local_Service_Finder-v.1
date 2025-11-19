import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import Icon from '../../components/AppIcon';
import {
  loginWithEmail,
  registerWithEmail,
  requestPasswordReset,
  signOutCurrentUser,
  fetchCurrentUser,
} from '../../services/authService';
import { onAuthStateChanged } from '../../lib/firebase';

const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [passwordResetMessage, setPasswordResetMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const profile = await fetchCurrentUser();
        setUser(
          profile || {
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName,
            role: 'customer',
          }
        );
      } catch (error) {
        console.warn('Unable to load user profile', error);
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          role: 'customer',
        });
      } finally {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams?.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [location.search]);

  const redirectToRoleDashboard = (role) => {
    switch (role) {
      case 'customer':
        navigate('/landing-home');
        break;
      case 'provider':
        navigate('/provider-profile');
        break;
      case 'admin':
        navigate('/landing-home'); // Admin dashboard would be here
        break;
      default:
        navigate('/landing-home');
    }
  };

  const handleLogin = async (loginData) => {
    if (loginData?.socialProvider) {
      setAuthError('Social login will be available soon. Please continue with email and password.');
      return;
    }

    setIsLoading(true);
    setAuthError('');

    try {
      const { user: authenticatedUser } = await loginWithEmail(loginData?.email, loginData?.password);
      setUser(authenticatedUser);
      redirectToRoleDashboard(authenticatedUser?.role);
    } catch (error) {
      setAuthError(error?.message || 'Unable to sign in. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (registerData) => {
    if (registerData?.socialProvider) {
      setRegisterError('Social signup will be available soon. Please use email and password.');
      return;
    }

    setIsLoading(true);
    setRegisterError('');

    try {
      const { user: newUser } = await registerWithEmail({
        name: registerData?.name,
        email: registerData?.email,
        password: registerData?.password,
        role: registerData?.role,
        phone: registerData?.phone,
      });
      setUser(newUser);
      redirectToRoleDashboard(newUser?.role);
    } catch (error) {
      setRegisterError(error?.message || 'Unable to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setPasswordResetMessage('');
  };

  const handleForgotPasswordSubmit = async (email) => {
    setIsLoading(true);
    setPasswordResetMessage('');
    setAuthError('');

    try {
      await requestPasswordReset(email);
      setPasswordResetMessage('Password reset link sent! Please check your inbox.');
    } catch (error) {
      setAuthError(error?.message || 'Unable to send reset link.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    signOutCurrentUser();
    setUser(null);
    navigate('/authentication');
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader user={user} onSignOut={handleSignOut} />
      
      <main className="pt-16 pb-20 md:pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 pt-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="MapPin" size={32} color="white" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Welcome to Local Service Finder
            </h1>
            <p className="text-muted-foreground">
              {activeTab === 'login' ? 'Sign in to your account to continue' : 'Create your account to get started'
              }
            </p>
            {passwordResetMessage && (
              <div className="mt-4 rounded-md border border-success/30 bg-success/5 px-4 py-3 text-sm text-success">
                {passwordResetMessage}
              </div>
            )}
          </div>

          <div className="bg-card rounded-lg shadow-elevation-md border border-border p-6">
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'login' ?
            <LoginForm
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
              isLoading={isLoading}
              errorMessage={authError} /> :


            <RegisterForm
              onRegister={handleRegister}
              isLoading={isLoading}
              errorMessage={registerError} />

            }
          </div>
        </div>
      </main>

      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
        onSubmit={handleForgotPasswordSubmit}
        isLoading={isLoading} />


      <MobileBottomNav user={user} />
    </div>);

};

export default Authentication;