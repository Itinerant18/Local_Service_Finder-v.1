export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('en-IN', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour.toString().padStart(2, '0')}:${minutes} ${ampm}`;
};

export const formatPrice = (price: number): string => {
  return `₹${price.toFixed(0)}`;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return /^[0-9]{10}$/.test(phone);
};

export const getBookingStatusColor = (status: string): string => {
  switch (status) {
    case 'confirmed':
      return '#dbeafe';
    case 'completed':
      return '#dcfce7';
    case 'cancelled':
      return '#fee2e2';
    default:
      return '#fef3c7';
  }
};

export const getBookingStatusTextColor = (status: string): string => {
  switch (status) {
    case 'confirmed':
      return '#0c4a6e';
    case 'completed':
      return '#166534';
    case 'cancelled':
      return '#7f1d1d';
    default:
      return '#92400e';
  }
};

export const getDayName = (dayOfWeek: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayOfWeek];
};

export const calculateCancellationCharge = (hoursUntilBooking: number): number => {
  if (hoursUntilBooking > 4) return 0;
  if (hoursUntilBooking > 2) return 50;
  return 100;
};

export const sortProvidersByDistance = (
  providers: any[],
  userLat: number,
  userLon: number
): any[] => {
  return [...providers].sort((a, b) => {
    const distA = calculateDistance(
      userLat,
      userLon,
      a.latitude || 0,
      a.longitude || 0
    );
    const distB = calculateDistance(
      userLat,
      userLon,
      b.latitude || 0,
      b.longitude || 0
    );
    return distA - distB;
  });
};

export const sortProvidersByRating = (providers: any[]): any[] => {
  return [...providers].sort(
    (a, b) => b.average_rating - a.average_rating
  );
};

export const getAverageRating = (reviews: any[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return sum / reviews.length;
};
