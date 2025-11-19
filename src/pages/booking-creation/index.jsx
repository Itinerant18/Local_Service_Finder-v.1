import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import StepIndicator from './components/StepIndicator';
import ServiceSelectionStep from './components/ServiceSelectionStep';
import DateTimeStep from './components/DateTimeStep';
import AddressStep from './components/AddressStep';
import ConfirmationStep from './components/ConfirmationStep';
import { createBooking } from '../../services/bookingService';
import Button from '../../components/ui/Button';

const BookingCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [address, setAddress] = useState({
    fullAddress: '',
    apartment: '',
    landmark: '',
    contactName: '',
    phoneNumber: '',
    instructions: '',
    lat: null,
    lng: null
  });

  const [availableServices, setAvailableServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [servicesError, setServicesError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Add this block - Mock provider availability data
  const providerAvailability = {
    availableDates: [
      new Date(),
      new Date(Date.now() + 86400000),
      new Date(Date.now() + 86400000 * 2),
      new Date(Date.now() + 86400000 * 3),
      new Date(Date.now() + 86400000 * 4),
      new Date(Date.now() + 86400000 * 5),
      new Date(Date.now() + 86400000 * 6)],

    timeSlots: ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00']
  };

  const providerInfo = useMemo(() => location?.state?.provider || null, [location?.state]);

  const steps = [
    {
      id: 1,
      title: 'Services',
      description: 'Select services'
    },
    {
      id: 2,
      title: 'Date & Time',
      description: 'Choose appointment'
    },
    {
      id: 3,
      title: 'Address',
      description: 'Service location'
    },
    {
      id: 4,
      title: 'Confirmation',
      description: 'Review & pay'
    }];

  // Get provider info from navigation state if available
  useEffect(() => {
    async function loadServices() {
      setServicesLoading(true);
      setServicesError('');
      try {
        const response = location?.state?.services;
        if (response?.length) {
          setAvailableServices(response);
        } else {
          setAvailableServices([]);
        }
      } catch (error) {
        setServicesError('Unable to load services for this provider.');
      } finally {
        setServicesLoading(false);
      }
    }
    loadServices();
  }, [location?.state]);

  // Step navigation handlers
  const handleServiceToggle = (serviceId) => {
    setSelectedServices((prev) =>
      prev?.includes(serviceId) ?
        prev?.filter((id) => id !== serviceId) :
        [...prev, serviceId]
    );
  };

  const handleNextStep = () => {
    if (currentStep === 1 && selectedServices.length === 0) {
      setServicesError('Please select at least one service to continue.');
      return;
    }
    if (currentStep < steps?.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Clear selected time when date changes
    setSelectedTime('');
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleAddressChange = (newAddress) => {
    setAddress(newAddress);
  };

  // Render current step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelectionStep
            selectedServices={selectedServices}
            onServiceToggle={handleServiceToggle}
            onNext={handleNextStep}
            availableServices={availableServices}
            loading={servicesLoading}
            error={servicesError} />);

      case 2:
        return (
          <DateTimeStep
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            onDateSelect={handleDateSelect}
            onTimeSelect={handleTimeSelect}
            onNext={handleNextStep}
            onBack={handlePrevStep}
            providerAvailability={providerAvailability} />);

      case 3:
        return (
          <AddressStep
            address={address}
            onAddressChange={handleAddressChange}
            onNext={handleNextStep}
            onBack={handlePrevStep} />);

      case 4:
        return (
          <ConfirmationStep
            selectedServices={selectedServices}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            address={address}
            onBack={handlePrevStep}
            availableServices={availableServices}
            providerInfo={providerInfo}
            onSubmit={async () => {
              setSubmitError('');
              setSubmitSuccess('');
              setIsSubmitting(true);
              try {
                const payload = {
                  providerId: providerInfo?.id,
                  serviceIds: selectedServices,
                  datetime: selectedDate?.toISOString(),
                  timeSlot: selectedTime,
                  address,
                };
                const result = await createBooking(payload);
                setSubmitSuccess('Booking created successfully!');
                navigate('/customer-dashboard', {
                  state: {
                    bookingSuccess: true,
                    bookingId: result?.booking?._id || result?._id,
                  },
                });
              } catch (error) {
                setSubmitError(error?.message || 'Unable to create booking.');
              } finally {
                setIsSubmitting(false);
              }
            }}
            isSubmitting={isSubmitting}
            submitError={submitError}
            submitSuccess={submitSuccess}
          />);

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Book Your Service
          </h1>
          <p className="text-muted-foreground">
            Complete your booking in a few simple steps
          </p>
        </div>

        <StepIndicator currentStep={currentStep} steps={steps} />

        <div className="bg-surface rounded-lg border border-border p-6 lg:p-8">
          {servicesError && currentStep === 1 && (
            <div className="mb-4 rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error">
              {servicesError}
            </div>
          )}
          {renderStepContent()}
        </div>
      </main>

      {/* Mobile spacing for bottom navigation */}
      <div className="h-20 md:hidden" />
    </div>
  );
};

export default BookingCreation;