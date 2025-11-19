import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
  {
    id: 1,
    name: 'Anita Desai',
    location: 'Bandra, Mumbai',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c48da832-1763299032357.png",
    imageAlt: 'Smiling Indian woman with shoulder-length black hair in casual blue top',
    rating: 5,
    service: 'House Cleaning',
    review: `LocalFind made finding a reliable house cleaning service so easy! Priya arrived on time, was very professional, and did an amazing job. My house has never been cleaner. The booking process was seamless and the pricing was transparent. Highly recommend!`,
    date: '2 weeks ago',
    verified: true
  },
  {
    id: 2,
    name: 'Rohit Sharma',
    location: 'Andheri, Mumbai',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1249ee08a-1763294972375.png",
    imageAlt: 'Professional Indian man with mustache in white collared shirt smiling',
    rating: 5,
    service: 'Plumbing Repair',
    review: `Had a major plumbing issue and found Rajesh through LocalFind. He was available the same day, diagnosed the problem quickly, and fixed it efficiently. Fair pricing and excellent workmanship. Will definitely use LocalFind again for future needs.`,
    date: '1 month ago',
    verified: true
  },
  {
    id: 3,
    name: 'Kavya Patel',
    location: 'Powai, Mumbai',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_110842b84-1763293329006.png",
    imageAlt: 'Young Indian woman with long dark hair wearing professional attire',
    rating: 5,
    service: 'AC Repair',
    review: `My AC stopped working during the summer heat. Found Amit on LocalFind and he came within 2 hours! Professional service, reasonable rates, and my AC is working perfectly now. The app made the whole process so convenient.`,
    date: '3 weeks ago',
    verified: true
  },
  {
    id: 4,
    name: 'Suresh Kumar',
    location: 'Malad, Mumbai',
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1432b9929-1763293721888.png",
    imageAlt: 'Middle-aged Indian man with graying hair in casual shirt outdoors',
    rating: 5,
    service: 'Electrical Work',
    review: `Needed electrical work done urgently for my office. LocalFind connected me with a certified electrician who completed the job safely and efficiently. Great platform for finding trusted professionals. Five stars!`,
    date: '1 week ago',
    verified: true
  },
  {
    id: 5,
    name: 'Meera Joshi',
    location: 'Juhu, Mumbai',
    image: "https://images.unsplash.com/photo-1654764745324-ac95545c9e91",
    imageAlt: 'Elegant Indian woman with styled hair in traditional Indian attire',
    rating: 5,
    service: 'Beauty Services',
    review: `Booked a home beauty service through LocalFind for my sister's wedding. The beautician was skilled, punctual, and made the bride look absolutely stunning. Excellent service quality and very convenient booking process.`, date: '2 months ago',
    verified: true
  }];


  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const handlePrevious = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const handleNext = () => {
    setIsAutoPlaying(false);
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const handleDotClick = (index) => {
    setIsAutoPlaying(false);
    setCurrentTestimonial(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) =>
    <Icon
      key={index}
      name="Star"
      size={16}
      className={index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'} />

    );
  };

  return (
    <section className="py-12 lg:py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-2xl lg:text-4xl font-bold text-foreground mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real experiences from satisfied customers who found their perfect service providers through LocalFind
          </p>
        </div>

        {/* Main Testimonial Display */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface border border-border rounded-2xl p-8 lg:p-12 shadow-lg">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-6 lg:space-y-0 lg:space-x-8">
              {/* Customer Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <Image
                    src={testimonials?.[currentTestimonial]?.image}
                    alt={testimonials?.[currentTestimonial]?.imageAlt}
                    className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover" />

                  {testimonials?.[currentTestimonial]?.verified &&
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-success rounded-full flex items-center justify-center border-4 border-surface">
                      <Icon name="Check" size={16} color="white" />
                    </div>
                  }
                </div>
              </div>

              {/* Testimonial Content */}
              <div className="flex-1 text-center lg:text-left">
                {/* Rating */}
                <div className="flex justify-center lg:justify-start items-center space-x-1 mb-4">
                  {renderStars(testimonials?.[currentTestimonial]?.rating)}
                </div>

                {/* Review Text */}
                <blockquote className="text-lg lg:text-xl text-foreground mb-6 leading-relaxed">
                  "{testimonials?.[currentTestimonial]?.review}"
                </blockquote>

                {/* Customer Info */}
                <div className="space-y-2">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
                    <h4 className="text-lg font-semibold text-foreground">
                      {testimonials?.[currentTestimonial]?.name}
                    </h4>
                    <div className="flex items-center justify-center lg:justify-start space-x-2 text-sm text-muted-foreground">
                      <Icon name="MapPin" size={14} />
                      <span>{testimonials?.[currentTestimonial]?.location}</span>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <Icon name="Briefcase" size={14} />
                      <span>Service: {testimonials?.[currentTestimonial]?.service}</span>
                    </div>
                    <div className="flex items-center justify-center lg:justify-start space-x-2">
                      <Icon name="Clock" size={14} />
                      <span>{testimonials?.[currentTestimonial]?.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center space-x-4 mt-8">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200">

              <Icon name="ChevronLeft" size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials?.map((_, index) =>
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial ?
                'bg-primary scale-125' : 'bg-border hover:bg-muted-foreground'}`
                } />

              )}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200">

              <Icon name="ChevronRight" size={20} />
            </button>
          </div>

          {/* Auto-play Indicator */}
          <div className="text-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 flex items-center justify-center space-x-2">

              <Icon name={isAutoPlaying ? 'Pause' : 'Play'} size={14} />
              <span>{isAutoPlaying ? 'Pause' : 'Play'} auto-rotation</span>
            </button>
          </div>
        </div>

        {/* Trust Metrics */}
        <div className="mt-12 lg:mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-success mb-1">15,000+</div>
              <div className="text-sm text-muted-foreground">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-accent mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">50,000+</div>
              <div className="text-sm text-muted-foreground">Services Completed</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;