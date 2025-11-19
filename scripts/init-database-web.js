/**
 * Database Initialization Script for Web Browser
 * 
 * Usage:
 * 1. Open your app in the browser
 * 2. Open browser console (F12)
 * 3. Copy and paste this script
 * 4. Or import this in your app and call initDatabase()
 */

// Make sure you're logged in to Firebase first
// Then run this in the browser console

async function initDatabase() {
  const { getDatabase, ref, set, get } = await import('firebase/database');
  const db = getDatabase();

  const defaultCategories = [
    {
      id: '1',
      name: 'Plumbing',
      description: 'Professional plumbing services including repairs, installations, and maintenance',
      icon_name: '🔧',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Electrical',
      description: 'Electrical work, wiring, installations, and repairs',
      icon_name: '⚡',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Carpentry',
      description: 'Woodwork, furniture, and carpentry services',
      icon_name: '🪚',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Teaching',
      description: 'Tutoring and educational services',
      icon_name: '📚',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Driving',
      description: 'Driving lessons and chauffeur services',
      icon_name: '🚗',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'Cooking',
      description: 'Catering, cooking classes, and chef services',
      icon_name: '👨‍🍳',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '7',
      name: 'Cleaning',
      description: 'House cleaning, office cleaning, and deep cleaning services',
      icon_name: '🧹',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '8',
      name: 'Painting',
      description: 'Interior and exterior painting services',
      icon_name: '🎨',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '9',
      name: 'AC Repair',
      description: 'Air conditioning installation, repair, and maintenance',
      icon_name: '❄️',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '10',
      name: 'Mobile Repair',
      description: 'Mobile phone and tablet repair services',
      icon_name: '📱',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '11',
      name: 'Home Appliance Repair',
      description: 'Repair services for home appliances',
      icon_name: '🔌',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  try {
    console.log('🚀 Initializing database...');

    // Check if categories already exist
    const categoriesRef = ref(db, 'service_categories');
    const snapshot = await get(categoriesRef);

    if (snapshot.exists()) {
      console.log('⚠️  Service categories already exist. Skipping...');
      return;
    }

    // Add each category
    console.log('📝 Adding service categories...');
    for (const category of defaultCategories) {
      await set(ref(db, `service_categories/${category.id}`), category);
      console.log(`✅ Added category: ${category.name}`);
    }

    console.log('✅ Database initialization complete!');
    console.log(`📊 Added ${defaultCategories.length} service categories`);
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
}

// Export for use in app
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initDatabase };
}

