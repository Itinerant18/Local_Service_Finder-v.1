import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from './components/ProgressIndicator';
import BusinessInfoForm from './components/BusinessInfoForm';
import DocumentUpload from './components/DocumentUpload';
import TermsAcceptance from './components/TermsAcceptance';
import NavigationControls from './components/NavigationControls';
import Icon from '../../components/AppIcon';

const ProviderOnboardingStep1 = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeSection, setActiveSection] = useState('business');

  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    businessType: '',
    phone: '',
    address: '',
    serviceCategory: '',
    description: '',
    documents: {
      businessLicense: null,
      identityProof: null,
      addressProof: null
    },
    acceptTerms: false,
    acceptPrivacy: false,
    acceptCommission: false,
    acceptVerification: false
  });

  const [errors, setErrors] = useState({});

  // Auto-save functionality
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hasUnsavedChanges) {
        handleSaveDraft();
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(timer);
  }, [formData, hasUnsavedChanges]);

  // Track form changes
  useEffect(() => {
    setHasUnsavedChanges(true);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    // Business info validation
    if (!formData?.businessName?.trim()) {
      newErrors.businessName = 'Business name is required';
    }

    if (!formData?.ownerName?.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }

    if (!formData?.businessType) {
      newErrors.businessType = 'Please select business type';
    }

    if (!formData?.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/?.test(formData?.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData?.address?.trim()) {
      newErrors.address = 'Business address is required';
    }

    if (!formData?.serviceCategory) {
      newErrors.serviceCategory = 'Please select a service category';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Business description is required';
    } else if (formData?.description?.length < 50) {
      newErrors.description = 'Description must be at least 50 characters';
    }

    // Document validation
    if (!formData?.documents?.businessLicense) {
      newErrors.businessLicense = 'Business license document is required';
    }

    if (!formData?.documents?.identityProof) {
      newErrors.identityProof = 'Identity proof document is required';
    }

    if (!formData?.documents?.addressProof) {
      newErrors.addressProof = 'Address proof document is required';
    }

    // Terms validation
    if (!formData?.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the Terms of Service';
    }

    if (!formData?.acceptPrivacy) {
      newErrors.acceptPrivacy = 'You must accept the Privacy Policy';
    }

    if (!formData?.acceptCommission) {
      newErrors.acceptCommission = 'You must accept the Commission Structure';
    }

    if (!formData?.acceptVerification) {
      newErrors.acceptVerification = 'You must consent to background verification';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      // Simulate API call to save draft
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Save to localStorage as backup
      localStorage.setItem('providerOnboardingStep1', JSON.stringify(formData));
      
      setHasUnsavedChanges(false);
      console.log('Draft saved successfully');
    } catch (error) {
      console.error('Failed to save draft:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleContinue = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorElement = document.querySelector('.text-error');
      if (firstErrorElement) {
        firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call to save step 1 data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Save completed step 1 data
      localStorage.setItem('providerOnboardingStep1Complete', JSON.stringify(formData));
      
      // Navigate to step 2
      navigate('/provider-onboarding-step-2');
    } catch (error) {
      console.error('Failed to save and continue:', error);
      setErrors({ submit: 'Failed to save information. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  // Load saved draft on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('providerOnboardingStep1');
    if (savedDraft) {
      try {
        const parsedData = JSON.parse(savedDraft);
        setFormData(parsedData);
        setHasUnsavedChanges(false);
      } catch (error) {
        console.error('Failed to load saved draft:', error);
      }
    }
  }, []);

  const canContinue = formData?.businessName && 
                     formData?.ownerName && 
                     formData?.businessType && 
                     formData?.phone && 
                     formData?.address && 
                     formData?.serviceCategory && 
                     formData?.description && 
                     formData?.documents?.businessLicense && 
                     formData?.documents?.identityProof && 
                     formData?.documents?.addressProof && 
                     formData?.acceptTerms && 
                     formData?.acceptPrivacy && 
                     formData?.acceptCommission && 
                     formData?.acceptVerification;

  const sections = [
    { id: 'business', label: 'Business Information', icon: 'Building' },
    { id: 'documents', label: 'Document Upload', icon: 'FileText' },
    { id: 'terms', label: 'Terms & Policies', icon: 'Shield' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Join as a Service Provider
          </h1>
          <p className="text-muted-foreground">
            Complete your business registration to start receiving customer bookings
          </p>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator currentStep={1} totalSteps={2} />

        {/* Section Navigation - Desktop */}
        <div className="hidden md:flex items-center justify-center space-x-8 mb-8">
          {sections?.map((section) => (
            <button
              key={section?.id}
              onClick={() => setActiveSection(section?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeSection === section?.id
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={section?.icon} size={18} />
              <span>{section?.label}</span>
            </button>
          ))}
        </div>

        {/* Section Navigation - Mobile */}
        <div className="md:hidden mb-6">
          <div className="flex space-x-1 bg-muted rounded-lg p-1">
            {sections?.map((section) => (
              <button
                key={section?.id}
                onClick={() => setActiveSection(section?.id)}
                className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 rounded-md font-medium transition-all duration-200 ${
                  activeSection === section?.id
                    ? 'text-primary bg-surface shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                <Icon name={section?.icon} size={16} />
                <span className="text-xs">{section?.label?.split(' ')?.[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-surface rounded-lg border border-border p-6 mb-6">
          {activeSection === 'business' && (
            <BusinessInfoForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          )}

          {activeSection === 'documents' && (
            <DocumentUpload
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          )}

          {activeSection === 'terms' && (
            <TermsAcceptance
              formData={formData}
              setFormData={setFormData}
              errors={errors}
            />
          )}

          {/* Error Summary */}
          {errors?.submit && (
            <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center space-x-2">
                <Icon name="AlertCircle" size={20} className="text-error" />
                <p className="text-sm text-error font-medium">{errors?.submit}</p>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Controls */}
        <NavigationControls
          onSaveDraft={handleSaveDraft}
          onContinue={handleContinue}
          isLoading={isLoading}
          isSaving={isSaving}
          canContinue={canContinue}
          hasUnsavedChanges={hasUnsavedChanges}
        />
      </div>
    </div>
  );
};

export default ProviderOnboardingStep1;