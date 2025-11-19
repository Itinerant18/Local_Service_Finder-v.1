import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BusinessInfoForm = ({ formData, setFormData, errors }) => {
  const businessTypeOptions = [
    { value: 'individual', label: 'Individual Professional' },
    { value: 'company', label: 'Registered Company' },
    { value: 'partnership', label: 'Partnership Firm' },
    { value: 'proprietorship', label: 'Sole Proprietorship' }
  ];

  const serviceCategoryOptions = [
    { value: 'plumbing', label: 'Plumbing Services' },
    { value: 'electrical', label: 'Electrical Work' },
    { value: 'cleaning', label: 'Home Cleaning' },
    { value: 'carpentry', label: 'Carpentry & Furniture' },
    { value: 'painting', label: 'Painting & Decoration' },
    { value: 'appliance', label: 'Appliance Repair' },
    { value: 'gardening', label: 'Gardening & Landscaping' },
    { value: 'pest-control', label: 'Pest Control' },
    { value: 'security', label: 'Security Services' },
    { value: 'beauty', label: 'Beauty & Wellness' },
    { value: 'tutoring', label: 'Home Tutoring' },
    { value: 'catering', label: 'Catering Services' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatPhoneNumber = (value) => {
    const cleaned = value?.replace(/\D/g, '');
    if (cleaned?.length <= 10) {
      return cleaned;
    }
    return cleaned?.slice(0, 10);
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    handleInputChange('phone', formatted);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Business Name"
          type="text"
          placeholder="Enter your business name"
          value={formData?.businessName}
          onChange={(e) => handleInputChange('businessName', e?.target?.value)}
          error={errors?.businessName}
          required
        />

        <Input
          label="Owner Full Name"
          type="text"
          placeholder="Enter owner's full name"
          value={formData?.ownerName}
          onChange={(e) => handleInputChange('ownerName', e?.target?.value)}
          error={errors?.ownerName}
          required
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Select
          label="Business Type"
          placeholder="Select business type"
          options={businessTypeOptions}
          value={formData?.businessType}
          onChange={(value) => handleInputChange('businessType', value)}
          error={errors?.businessType}
          required
        />

        <Input
          label="Phone Number"
          type="tel"
          placeholder="Enter 10-digit mobile number"
          value={formData?.phone}
          onChange={handlePhoneChange}
          error={errors?.phone}
          description="Indian mobile number (10 digits)"
          required
        />
      </div>
      <Input
        label="Business Address"
        type="text"
        placeholder="Enter complete business address"
        value={formData?.address}
        onChange={(e) => handleInputChange('address', e?.target?.value)}
        error={errors?.address}
        description="Include area, city, state, and PIN code"
        required
      />
      <Select
        label="Primary Service Category"
        placeholder="Select your main service category"
        options={serviceCategoryOptions}
        value={formData?.serviceCategory}
        onChange={(value) => handleInputChange('serviceCategory', value)}
        error={errors?.serviceCategory}
        searchable
        required
      />
      <div>
        <Input
          label="Business Description"
          type="text"
          placeholder="Describe your services and experience..."
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value)}
          error={errors?.description}
          description={`${formData?.description?.length}/500 characters`}
          required
        />
        <textarea
          className="w-full mt-2 p-3 border border-border rounded-lg bg-input focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          rows="4"
          placeholder="Tell customers about your business, services offered, years of experience, and what makes you unique..."
          value={formData?.description}
          onChange={(e) => handleInputChange('description', e?.target?.value?.slice(0, 500))}
          maxLength={500}
        />
      </div>
    </div>
  );
};

export default BusinessInfoForm;