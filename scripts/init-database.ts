/**
 * Database Initialization Script
 * Run this script to initialize the Firebase Realtime Database with default data
 * 
 * Usage:
 * 1. Make sure Firebase is configured
 * 2. Run: npx ts-node scripts/init-database.ts
 * Or import and call initDatabase() from your app
 */

import { ref, set, get } from 'firebase/database';
import { db } from '../lib/firebase';

// Default service categories
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

/**
 * Initialize the database with default service categories
 */
export async function initDatabase() {
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

/**
 * Add a single category (useful for adding new categories later)
 */
export async function addCategory(category: {
  id: string;
  name: string;
  description: string | null;
  icon_name: string | null;
}) {
  try {
    const categoryData = {
      ...category,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    await set(ref(db, `service_categories/${category.id}`), categoryData);
    console.log(`✅ Added category: ${category.name}`);
  } catch (error) {
    console.error('❌ Error adding category:', error);
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  initDatabase()
    .then(() => {
      console.log('✨ Done!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 Failed:', error);
      process.exit(1);
    });
}

