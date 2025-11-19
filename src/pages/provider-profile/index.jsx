import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import NavigationHeader from '../../components/ui/NavigationHeader';
import MobileBottomNav from '../../components/ui/MobileBottomNav';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import ProfileHeader from './components/ProfileHeader';
import BookingPanel from './components/BookingPanel';
import TabNavigation from './components/TabNavigation';
import OverviewTab from './components/OverviewTab';
import ServicesTab from './components/ServicesTab';
import ReviewsTab from './components/ReviewsTab';
import GalleryTab from './components/GalleryTab';

const ProviderProfile = () => {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);

  // Mock provider data
  const provider = {
    id: "provider-123",
    name: "Rajesh Kumar Sharma",
    profession: "Certified Electrician & Home Repair Specialist",
    profilePhoto: "https://img.rocket.new/generatedImages/rocket_gen_img_13cdf0bc2-1763296311463.png",
    profilePhotoAlt: "Professional headshot of middle-aged Indian man with mustache wearing blue work shirt",
    rating: 4.8,
    reviewCount: 247,
    experience: 12,
    location: "Sector 15, Noida, UP",
    responseTime: "2 hours",
    serviceRadius: 15,
    startingPrice: 299,
    isVerified: true,
    isTopRated: true,
    backgroundChecked: true,
    serviceCategories: ["Electrical Work", "Home Repairs", "Appliance Installation"],
    coordinates: { lat: 28.5355, lng: 77.3910 },
    description: `Professional electrician with over 12 years of experience in residential and commercial electrical work. Specialized in home automation, electrical repairs, and appliance installations. Licensed and insured with a commitment to safety and quality workmanship.\n\nI take pride in providing reliable, efficient, and affordable electrical services to homeowners and businesses across Noida and surrounding areas. My goal is to ensure your electrical systems are safe, up to code, and functioning optimally.`,
    specializations: [
    "Home Automation Systems",
    "Electrical Panel Upgrades",
    "LED Lighting Installation",
    "Ceiling Fan Installation",
    "Electrical Troubleshooting",
    "Smart Switch Installation"],

    certifications: [
    "Licensed Electrician - UP State Board",
    "Electrical Safety Certification",
    "Home Automation Specialist Certificate",
    "First Aid & CPR Certified"],

    weeklyAvailability: [
    { dayName: "Mon", date: "18", available: true },
    { dayName: "Tue", date: "19", available: true },
    { dayName: "Wed", date: "20", available: false },
    { dayName: "Thu", date: "21", available: true },
    { dayName: "Fri", date: "22", available: true },
    { dayName: "Sat", date: "23", available: true },
    { dayName: "Sun", date: "24", available: false }],

    todayTimeSlots: [
    { time: "9:00 AM", available: true },
    { time: "10:30 AM", available: false },
    { time: "12:00 PM", available: true },
    { time: "2:00 PM", available: true },
    { time: "3:30 PM", available: false },
    { time: "5:00 PM", available: true }],

    services: [
    {
      name: "Electrical Repairs & Maintenance",
      description: "Complete electrical repair and maintenance services for homes and offices",
      icon: "Zap",
      items: [
      {
        name: "Basic Electrical Repair",
        description: "Fix switches, outlets, and minor wiring issues",
        price: 299,
        unit: "per visit",
        duration: "1-2 hours",
        warranty: "30 days",
        materials: "included",
        features: ["Diagnostic included", "Same day service", "Quality guarantee"]
      },
      {
        name: "Electrical Panel Upgrade",
        description: "Upgrade old electrical panels to modern standards",
        price: 8999,
        originalPrice: 12000,
        unit: "complete job",
        duration: "4-6 hours",
        warranty: "1 year",
        materials: "extra",
        features: ["Safety inspection", "Code compliance", "Professional installation"]
      },
      {
        name: "Wiring Installation",
        description: "New wiring installation for rooms or entire homes",
        price: 150,
        unit: "per point",
        duration: "30 mins per point",
        warranty: "6 months",
        materials: "extra",
        features: ["ISI certified materials", "Hidden wiring", "Testing included"]
      }]

    },
    {
      name: "Appliance Installation",
      description: "Professional installation of home appliances and fixtures",
      icon: "Home",
      items: [
      {
        name: "Ceiling Fan Installation",
        description: "Complete ceiling fan installation with wiring",
        price: 499,
        unit: "per fan",
        duration: "1 hour",
        warranty: "90 days",
        materials: "extra",
        features: ["Balancing included", "Speed regulator setup", "Safety check"]
      },
      {
        name: "AC Installation & Wiring",
        description: "Air conditioner installation with electrical connections",
        price: 1299,
        unit: "per unit",
        duration: "2-3 hours",
        warranty: "6 months",
        materials: "included",
        features: ["Dedicated circuit", "Earthing setup", "Load calculation"]
      }]

    }],

    packages: [
    {
      name: "Home Electrical Checkup",
      description: "Complete electrical safety inspection and minor repairs",
      price: 1499,
      originalPrice: 2000,
      savings: 501,
      popular: true,
      includes: [
      "Complete electrical inspection",
      "Safety report with recommendations",
      "Minor repairs (up to 3 points)",
      "Earthing and MCB testing",
      "30-day warranty on repairs"]

    },
    {
      name: "Smart Home Basic Setup",
      description: "Convert your home to smart home with basic automation",
      price: 4999,
      originalPrice: 6500,
      savings: 1501,
      includes: [
      "5 smart switches installation",
      "Smart doorbell setup",
      "Basic home automation app setup",
      "Training on smart controls",
      "6-month warranty"]

    }],

    ratingBreakdown: {
      5: 189,
      4: 42,
      3: 12,
      2: 3,
      1: 1
    },
    reviews: [
    {
      customerName: "Priya Sharma",
      customerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1e94201ef-1763296134446.png",
      customerAvatarAlt: "Professional headshot of young Indian woman with long black hair wearing white blouse",
      rating: 5,
      date: "2 days ago",
      serviceType: "Electrical Panel Upgrade",
      verified: true,
      comment: `Excellent work by Rajesh! He upgraded our old electrical panel and explained everything clearly. Very professional, arrived on time, and completed the work efficiently. The pricing was transparent with no hidden charges. Highly recommend for any electrical work.`,
      photos: [
      {
        url: "https://images.unsplash.com/photo-1597388068679-9af37ca363cd",
        alt: "Before photo showing old electrical panel with exposed wires"
      },
      {
        url: "https://images.unsplash.com/photo-1571234517176-ed759be01455",
        alt: "After photo showing new modern electrical panel with proper labeling"
      }],

      helpfulCount: 12,
      providerResponse: {
        date: "1 day ago",
        message: "Thank you Priya! It was a pleasure working on your electrical upgrade. Safety is always my top priority, and I'm glad you're satisfied with the work. Please don't hesitate to contact me for any future electrical needs."
      }
    },
    {
      customerName: "Amit Gupta",
      customerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12423ed11-1763292649145.png",
      customerAvatarAlt: "Professional headshot of middle-aged Indian man with glasses wearing dark shirt",
      rating: 5,
      date: "1 week ago",
      serviceType: "Smart Home Setup",
      verified: true,
      comment: `Rajesh converted our home to a smart home setup. He installed smart switches, doorbell, and taught us how to use the app. Very knowledgeable about latest technology and provided great suggestions for future upgrades.`,
      helpfulCount: 8,
      providerResponse: {
        date: "6 days ago",
        message: "Thank you Amit! I\'m happy that you and your family are enjoying the smart home features. The app will make your daily routines much more convenient. Feel free to reach out when you\'re ready for the next phase of automation!"
      }
    },
    {
      customerName: "Sunita Devi",
      customerAvatar: "https://img.rocket.new/generatedImages/rocket_gen_img_19d9d7cd2-1763293467118.png",
      customerAvatarAlt: "Professional headshot of elderly Indian woman with gray hair wearing traditional saree",
      rating: 4,
      date: "2 weeks ago",
      serviceType: "Ceiling Fan Installation",
      verified: true,
      comment: `Good service for ceiling fan installation. Rajesh was punctual and did clean work. The fan is working perfectly and he also balanced it properly. Only minor issue was that he arrived 15 minutes late, but overall satisfied with the service.`,
      helpfulCount: 5
    }],

    gallery: [
    {
      category: "before-after",
      beforeAfter: "Before",
      title: "Old Electrical Panel",
      description: "Outdated electrical panel replacement project in Sector 12",
      image: "https://images.unsplash.com/photo-1659474122276-aa162e37367a",
      imageAlt: "Old electrical panel with exposed wires and outdated components",
      date: "Nov 2024",
      location: "Sector 12, Noida",
      tags: ["Panel Upgrade", "Safety"]
    },
    {
      category: "before-after",
      beforeAfter: "After",
      title: "Modern Electrical Panel",
      description: "New modern electrical panel with proper labeling and safety features",
      image: "https://images.unsplash.com/photo-1571234517176-ed759be01455",
      imageAlt: "New modern electrical panel with organized wiring and proper labeling",
      date: "Nov 2024",
      location: "Sector 12, Noida",
      tags: ["Panel Upgrade", "Modern"]
    },
    {
      category: "completed",
      title: "Smart Home Installation",
      description: "Complete smart home automation setup with app integration",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c72d334d-1763447602613.png",
      imageAlt: "Modern smart home control panel with touchscreen interface",
      date: "Oct 2024",
      location: "Sector 18, Noida",
      tags: ["Smart Home", "Automation"]
    },
    {
      category: "completed",
      title: "LED Lighting Project",
      description: "Complete LED lighting installation for 3BHK apartment",
      image: "https://images.unsplash.com/photo-1622282429766-616a4530d2af",
      imageAlt: "Modern LED ceiling lights installed in living room with warm lighting",
      date: "Oct 2024",
      location: "Greater Noida",
      tags: ["LED Lights", "Energy Efficient"]
    },
    {
      category: "in-progress",
      title: "Office Wiring Project",
      description: "Commercial office electrical wiring in progress",
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c29d9afa-1763447602565.png",
      imageAlt: "Electrical wiring work in progress showing organized cable management",
      date: "Nov 2024",
      location: "Sector 62, Noida",
      tags: ["Commercial", "Wiring"]
    },
    {
      category: "completed",
      title: "Ceiling Fan Installation",
      description: "Premium ceiling fan installation with speed control",
      image: "https://images.unsplash.com/photo-1723642613073-89c1362a8cee",
      imageAlt: "Modern ceiling fan installed in bedroom with remote control",
      date: "Sep 2024",
      location: "Sector 15, Noida",
      tags: ["Ceiling Fan", "Installation"]
    }],

    portfolioStats: {
      totalProjects: 450,
      completedThisMonth: 28,
      averageRating: 4.8,
      repeatCustomers: 85
    }
  };

  const tabs = [
  { id: 'overview', label: 'Overview', icon: 'User' },
  { id: 'services', label: 'Services & Pricing', icon: 'Wrench' },
  { id: 'reviews', label: 'Reviews', icon: 'Star', count: provider?.reviewCount },
  { id: 'gallery', label: 'Gallery', icon: 'Image', count: provider?.gallery?.length }];


  const breadcrumbSegments = [
  { label: 'Home', path: '/landing-home' },
  { label: 'Find Services', path: '/provider-search' },
  { label: provider?.name, path: `/provider-profile/${providerId}` }];


  useEffect(() => {
    // Check for user authentication
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleBookNow = () => {
    // Navigate to booking creation (would be implemented in actual app)
    console.log('Navigate to booking creation');
  };

  const handleContact = (type) => {
    if (type === 'message') {
      console.log('Open messaging interface');
    } else if (type === 'call') {
      console.log('Initiate phone call');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/authentication');
  };

  const handleBreadcrumbNavigation = (path) => {
    navigate(path);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab provider={provider} />;
      case 'services':
        return <ServicesTab provider={provider} />;
      case 'reviews':
        return <ReviewsTab provider={provider} />;
      case 'gallery':
        return <GalleryTab provider={provider} />;
      default:
        return <OverviewTab provider={provider} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader user={user} onSignOut={handleSignOut} />
      
      <main className="pt-16 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BreadcrumbTrail
            pathSegments={breadcrumbSegments}
            onNavigate={handleBreadcrumbNavigation} />


          <div className="grid lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              <ProfileHeader provider={provider} />
              
              <TabNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabs={tabs} />

              
              {renderTabContent()}
            </div>

            {/* Booking Panel */}
            <div className="lg:col-span-1">
              <BookingPanel
                provider={provider}
                onBookNow={handleBookNow}
                onContact={handleContact} />

            </div>
          </div>
        </div>
      </main>

      <MobileBottomNav user={user} />
    </div>);

};

export default ProviderProfile;