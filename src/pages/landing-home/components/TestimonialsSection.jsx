import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const testimonials = [
  {
    id: 1,
    name: "Anita Gupta",
    location: "Mumbai, Maharashtra",
    rating: 5,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_126973f11-1763295439413.png",
    imageAlt: "Professional Indian woman with shoulder-length black hair smiling warmly at camera",
    review: `Found an excellent plumber through this platform. Rajesh arrived on time, fixed our kitchen leak quickly, and charged exactly what was quoted. The booking process was so simple!`,
    service: "Plumbing Service",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Vikram Singh",
    location: "Delhi, NCR",
    rating: 5,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d9e9c37c-1763293898045.png",
    imageAlt: "Middle-aged Indian businessman in formal shirt smiling confidently in office setting",
    review: `The house cleaning service was outstanding. Priya and her team were professional, thorough, and left our home spotless. Highly recommend this platform for reliable services.`,
    service: "House Cleaning",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Meera Krishnan",
    location: "Bangalore, Karnataka",
    rating: 5,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17f8f5ea4-1763299033127.png",
    imageAlt: "Young Indian woman with long dark hair wearing casual top smiling brightly outdoors",
    review: `Amit solved our electrical issues efficiently and explained everything clearly. The transparent pricing and verified professionals give me confidence to use this service again.`,
    service: "Electrical Work",
    date: "3 weeks ago"
  }];


  const platformStats = [
  {
    icon: "Users",
    value: "2,500+",
    label: "Verified Providers",
    color: "text-primary"
  },
  {
    icon: "CheckCircle",
    value: "50,000+",
    label: "Completed Bookings",
    color: "text-success"
  },
  {
    icon: "Star",
    value: "4.8/5",
    label: "Average Rating",
    color: "text-warning"
  },
  {
    icon: "MapPin",
    value: "25+",
    label: "Cities Covered",
    color: "text-purple-600"
  }];


  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Real experiences from satisfied customers who found their perfect service providers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials?.map((testimonial) =>
            <div
              key={testimonial?.id}
              className="bg-card rounded-xl border border-border p-6 hover:shadow-elevation-md transition-shadow duration-300">

                {/* Rating Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial?.rating)]?.map((_, index) =>
                <Icon
                  key={index}
                  name="Star"
                  size={16}
                  className="text-warning fill-current" />

                )}
                </div>

                {/* Review Text */}
                <blockquote className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial?.review}"
                </blockquote>

                {/* Customer Info */}
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-border">
                    <Image
                    src={testimonial?.image}
                    alt={testimonial?.imageAlt}
                    className="w-full h-full object-cover" />

                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">
                      {testimonial?.name}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial?.location}
                    </p>
                  </div>
                </div>

                {/* Service Info */}
                <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-sm">
                  <span className="text-primary font-medium">
                    {testimonial?.service}
                  </span>
                  <span className="text-muted-foreground">
                    {testimonial?.date}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Platform Statistics */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Trusted by Thousands
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Join our growing community of satisfied customers and verified service providers
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {platformStats?.map((stat, index) =>
            <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-card rounded-full flex items-center justify-center shadow-elevation-sm">
                  <Icon
                  name={stat?.icon}
                  size={24}
                  className={stat?.color} />

                </div>
                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {stat?.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat?.label}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

};

export default TestimonialsSection;