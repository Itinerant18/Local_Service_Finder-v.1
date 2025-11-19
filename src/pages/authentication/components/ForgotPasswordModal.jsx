import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose, onSubmit, isLoading }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    onSubmit(email);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSubmitted(false);
    onClose();
  };

  const handleEmailChange = (e) => {
    setEmail(e?.target?.value);
    if (error) {
      setError('');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-card rounded-lg shadow-elevation-lg border border-border">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-lg font-semibold text-foreground">
            {isSubmitted ? 'Check Your Email' : 'Reset Password'}
          </h2>
          <button
            onClick={handleClose}
            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            disabled={isLoading}
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-sm text-muted-foreground mb-4">
                Enter your email address and we'll send you a link to reset your password.
              </div>

              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                error={error}
                required
                disabled={isLoading}
              />

              <div className="flex space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  loading={isLoading}
                  iconName="Send"
                  iconPosition="right"
                  className="flex-1"
                >
                  Send Reset Link
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="Mail" size={32} color="var(--color-success)" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-foreground">Email Sent!</h3>
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <p className="text-xs text-muted-foreground">
                  Check your inbox and click the link to reset your password. The link will expire in 24 hours.
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <Button
                  variant="default"
                  onClick={handleClose}
                  fullWidth
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back to Login
                </Button>
                
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full text-sm text-primary hover:text-primary/80 transition-smooth"
                >
                  Didn't receive email? Try again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;