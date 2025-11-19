import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import Icon from '../../components/AppIcon';

const Authentication = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [user, setUser] = useState(null);

  // Mock credentials for different roles
  const mockCredentials = {
    customer: { email: 'customer@example.com', password: 'customer123' },
    provider: { email: 'provider@example.com', password: 'provider123' },
    admin: { email: 'admin@example.com', password: 'admin123' }
  };

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      redirectToRoleDashboard(userData?.role);
    }

    // Set tab based on URL parameter
    const urlParams = new URLSearchParams(location.search);
    const tab = urlParams?.get('tab');
    if (tab === 'register') {
      setActiveTab('register');
    }
  }, [location]);

  const redirectToRoleDashboard = (role) => {
    switch (role) {
      case 'customer':navigate('/landing-home');
        break;
      case 'provider':navigate('/provider-profile');
        break;
      case 'admin':navigate('/landing-home'); // Admin dashboard would be here
        break;
      default:
        navigate('/landing-home');
    }
  };

  const handleLogin = async (loginData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check credentials
      let authenticatedUser = null;

      if (loginData?.socialProvider) {
        // Mock social login
        authenticatedUser = {
          id: Date.now(),
          email: loginData?.email,
          name: 'Social User',
          role: 'customer',
          loginMethod: loginData?.socialProvider,
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14588f7f1-1763295690005.png",
          avatarAlt: 'Professional headshot of man with short brown hair in casual shirt'
        };
      } else {
        // Check mock credentials
        const credentialMatch = Object.entries(mockCredentials)?.find(([role, creds]) =>
        creds?.email === loginData?.email && creds?.password === loginData?.password
        );

        if (credentialMatch) {
          const [role] = credentialMatch;
          authenticatedUser = {
            id: Date.now(),
            email: loginData?.email,
            name: `${role?.charAt(0)?.toUpperCase() + role?.slice(1)} User`,
            role: role,
            loginMethod: 'email',
            avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_172fcd53a-1763299680950.png",
            avatarAlt: 'Professional headshot of man with dark hair in business attire'
          };
        } else {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        }
      }

      if (authenticatedUser) {
        // Save user data
        localStorage.setItem('user', JSON.stringify(authenticatedUser));
        localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());

        if (loginData?.rememberMe) {
          localStorage.setItem('rememberMe', 'true');
        }

        setUser(authenticatedUser);
        redirectToRoleDashboard(authenticatedUser?.role);
      }
    } catch (error) {
      alert(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (registerData) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Validate OTP if phone verification was used
      if (registerData?.otp && registerData?.otp !== '123456') {
        throw new Error('Invalid OTP. Please enter 123456 for demo purposes.');
      }

      let newUser = null;

      if (registerData?.socialProvider) {
        // Mock social registration
        newUser = {
          id: Date.now(),
          email: registerData?.email,
          name: registerData?.name,
          role: registerData?.role,
          loginMethod: registerData?.socialProvider,
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_103b528db-1763293982935.png",
          avatarAlt: 'Professional headshot of woman with long brown hair smiling'
        };
      } else {
        // Regular registration
        newUser = {
          id: Date.now(),
          email: registerData?.email,
          name: registerData?.name,
          phone: registerData?.phone,
          role: registerData?.role,
          loginMethod: 'email',
          avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1253f34e5-1763292117062.png",
          avatarAlt: 'Professional headshot of man with beard in casual shirt'
        };
      }

      // Save user data
      localStorage.setItem('user', JSON.stringify(newUser));
      localStorage.setItem('authToken', 'mock-jwt-token-' + Date.now());

      setUser(newUser);
      redirectToRoleDashboard(newUser?.role);
    } catch (error) {
      alert(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const handleForgotPasswordSubmit = async (email) => {
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock success - in real app, this would send an email
      console.log('Password reset email sent to:', email);
    } catch (error) {
      alert('Failed to send reset email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
    localStorage.removeItem('rememberMe');
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
          </div>

          <div className="bg-card rounded-lg shadow-elevation-md border border-border p-6">
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            {activeTab === 'login' ?
            <LoginForm
              onLogin={handleLogin}
              onForgotPassword={handleForgotPassword}
              isLoading={isLoading} /> :


            <RegisterForm
              onRegister={handleRegister}
              isLoading={isLoading} />

            }
          </div>

          {/* Mock Credentials Info */}
          <div className="mt-6 p-4 bg-muted rounded-lg border border-border">
            <h3 className="text-sm font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2" />
              Demo Credentials
            </h3>
            <div className="text-xs text-muted-foreground space-y-1">
              <div><strong>Customer:</strong> customer@example.com / customer123</div>
              <div><strong>Provider:</strong> provider@example.com / provider123</div>
              <div><strong>Admin:</strong> admin@example.com / admin123</div>
              <div><strong>OTP:</strong> 123456</div>
            </div>
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