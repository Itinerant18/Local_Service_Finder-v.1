import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';


const RegisterForm = ({ onRegister, isLoading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer',
    agreeToTerms: false,
    receiveUpdates: false
  });
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showOtpField, setShowOtpField] = useState(false);
  const [otp, setOtp] = useState('');

  const roles = [
    { value: 'customer', label: 'Customer', description: 'Find and book local services' },
    { value: 'provider', label: 'Service Provider', description: 'Offer your services to customers' },
    { value: 'admin', label: 'Administrator', description: 'Manage platform operations' }
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return 'bg-red-500';
    if (passwordStrength < 50) return 'bg-orange-500';
    if (passwordStrength < 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData?.name?.trim()?.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }

    if (showOtpField && !otp) {
      newErrors.otp = 'Please enter the OTP sent to your phone';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSendOtp = () => {
    if (formData?.phone && /^[6-9]\d{9}$/?.test(formData?.phone)) {
      setShowOtpField(true);
      // Mock OTP: 123456
    } else {
      setErrors(prev => ({ ...prev, phone: 'Please enter a valid phone number first' }));
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onRegister({ ...formData, otp });
    }
  };

  const handleSocialRegister = (provider) => {
    // Mock social registration
    onRegister({ 
      email: 'newuser@example.com',
      name: 'New User',
      socialProvider: provider,
      role: formData?.role
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          name="name"
          placeholder="Enter your full name"
          value={formData?.name}
          onChange={handleInputChange}
          error={errors?.name}
          required
          disabled={isLoading}
        />

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          required
          disabled={isLoading}
        />

        <div className="space-y-2">
          <Input
            label="Phone Number"
            type="tel"
            name="phone"
            placeholder="Enter 10-digit phone number"
            value={formData?.phone}
            onChange={handleInputChange}
            error={errors?.phone}
            required
            disabled={isLoading}
          />
          
          {formData?.phone && /^[6-9]\d{9}$/?.test(formData?.phone) && !showOtpField && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleSendOtp}
              disabled={isLoading}
              iconName="MessageSquare"
              iconPosition="left"
            >
              Send OTP
            </Button>
          )}

          {showOtpField && (
            <Input
              label="Enter OTP"
              type="text"
              placeholder="Enter 6-digit OTP (Mock: 123456)"
              value={otp}
              onChange={(e) => setOtp(e?.target?.value)}
              error={errors?.otp}
              required
              disabled={isLoading}
              description="OTP sent to your phone number"
            />
          )}
        </div>

        <div className="space-y-2">
          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            required
            disabled={isLoading}
          />
          
          {formData?.password && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Password strength:</span>
                <span className={`font-medium ${passwordStrength >= 75 ? 'text-green-600' : passwordStrength >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {getPasswordStrengthText()}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all ${getPasswordStrengthColor()}`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        <Input
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          required
          disabled={isLoading}
        />

        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Select Your Role</label>
          <div className="space-y-3">
            {roles?.map((role) => (
              <label key={role?.value} className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value={role?.value}
                  checked={formData?.role === role?.value}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                  disabled={isLoading}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium text-foreground">{role?.label}</div>
                  <div className="text-xs text-muted-foreground">{role?.description}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          name="agreeToTerms"
          checked={formData?.agreeToTerms}
          onChange={handleInputChange}
          error={errors?.agreeToTerms}
          required
          disabled={isLoading}
        />

        <Checkbox
          label="I want to receive updates and promotional emails"
          name="receiveUpdates"
          checked={formData?.receiveUpdates}
          onChange={handleInputChange}
          disabled={isLoading}
        />
      </div>
      <div className="space-y-4">
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="right"
        >
          Create Account
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-card text-muted-foreground">Or register with</span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          fullWidth
          onClick={() => handleSocialRegister('google')}
          disabled={isLoading}
          iconName="Chrome"
          iconPosition="left"
        >
          Continue with Google
        </Button>
      </div>
      <div className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link to="/authentication" className="text-primary hover:text-primary/80 transition-smooth font-medium">
          Sign in here
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;