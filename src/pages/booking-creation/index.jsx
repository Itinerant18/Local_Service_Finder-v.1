import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import StepIndicator from './components/StepIndicator';
import ServiceSelectionStep from './components/ServiceSelectionStep';
import DateTimeStep from './components/DateTimeStep';
import AddressStep from './components/AddressStep';
import ConfirmationStep from './components/ConfirmationStep';

const BookingCreation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  // Booking state
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

  // Mock data
  const availableServices = [
  {
    id: 'plumb-001',
    name: 'Tap Repair & Installation',
    description: 'Fix leaky taps, install new taps, and repair faucet mechanisms',
    price: 299,
    originalPrice: 399,
    duration: 45,
    category: 'Plumbing',
    isPopular: true
  },
  {
    id: 'plumb-002',
    name: 'Pipe Leak Repair',
    description: 'Detect and fix water pipe leaks, joint repairs, and pipe replacement',
    price: 499,
    duration: 60,
    category: 'Plumbing',
    isPopular: false
  },
  {
    id: 'plumb-003',
    name: 'Toilet Installation & Repair',
    description: 'Complete toilet installation, flush mechanism repair, and seat replacement',
    price: 799,
    originalPrice: 999,
    duration: 90,
    category: 'Plumbing',
    isPopular: true
  },
  {
    id: 'plumb-004',
    name: 'Drain Cleaning',
    description: 'Clear blocked drains, remove clogs, and improve water flow',
    price: 399,
    duration: 30,
    category: 'Plumbing',
    isPopular: false
  },
  {
    id: 'plumb-005',
    name: 'Water Heater Service',
    description: 'Geyser installation, repair, and maintenance services',
    price: 699,
    duration: 75,
    category: 'Plumbing',
    isPopular: true
  },
  {
    id: 'plumb-006',
    name: 'Bathroom Fitting',
    description: 'Install shower heads, bathroom accessories, and plumbing fixtures',
    price: 899,
    duration: 120,
    category: 'Plumbing',
    isPopular: false
  }];


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

  const providerInfo = {
    id: 'provider-123',
    name: 'Rajesh Kumar',
    category: 'Plumbing Specialist',
    rating: 4.8,
    experience: 8,
    avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1ee047f3e-1763293623246.png",
    avatarAlt: 'Professional headshot of Indian male plumber in blue work shirt smiling at camera'
  };

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
    const state = location?.state;
    if (state?.providerId) {
      // In a real app, fetch provider details using the ID
      console.log('Provider ID:', state?.providerId);
    }
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
            availableServices={availableServices} />);


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
            providerInfo={providerInfo} />);


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
          {renderStepContent()}
        </div>
      </main>

      {/* Mobile spacing for bottom navigation */}
      <div className="h-20 md:hidden" />
    </div>);

};

export default BookingCreation;