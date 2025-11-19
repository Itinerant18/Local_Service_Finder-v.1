import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const TermsAcceptance = ({ formData, setFormData, errors }) => {
  const handleCheckboxChange = (field, checked) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
    }));
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">Terms & Policies</h3>
        <p className="text-sm text-muted-foreground">
          Please review and accept our terms to continue with your registration
        </p>
      </div>
      <div className="bg-muted/30 rounded-lg p-6 space-y-4">
        <Checkbox
          label="I agree to the Terms of Service"
          description="I have read and accept the platform's terms and conditions for service providers"
          checked={formData?.acceptTerms}
          onChange={(e) => handleCheckboxChange('acceptTerms', e?.target?.checked)}
          error={errors?.acceptTerms}
          required
        />

        <Checkbox
          label="I accept the Privacy Policy"
          description="I understand how my personal and business data will be collected and used"
          checked={formData?.acceptPrivacy}
          onChange={(e) => handleCheckboxChange('acceptPrivacy', e?.target?.checked)}
          error={errors?.acceptPrivacy}
          required
        />

        <Checkbox
          label="I agree to Platform Commission Structure"
          description="I understand the service fees and commission rates for completed bookings"
          checked={formData?.acceptCommission}
          onChange={(e) => handleCheckboxChange('acceptCommission', e?.target?.checked)}
          error={errors?.acceptCommission}
          required
        />

        <Checkbox
          label="I consent to Background Verification"
          description="I authorize LocalFind to verify my documents and conduct background checks"
          checked={formData?.acceptVerification}
          onChange={(e) => handleCheckboxChange('acceptVerification', e?.target?.checked)}
          error={errors?.acceptVerification}
          required
        />
      </div>
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-primary mb-2">Verification Process</h4>
            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Document verification typically takes 24-48 hours</p>
              <p>• You'll receive email updates on your verification status</p>
              <p>• Once approved, you can start receiving booking requests</p>
              <p>• Maintain 4+ star rating to stay active on the platform</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-warning/5 border border-warning/20 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-warning mb-2">Important Notice</h4>
            <p className="text-xs text-muted-foreground">
              Providing false information or fraudulent documents will result in immediate account 
              suspension and may lead to legal action. All information provided will be verified 
              through official channels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAcceptance;