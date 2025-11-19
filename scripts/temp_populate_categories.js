
const admin = require("firebase-admin");
const serviceAccount = require("../../google-services.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://local-service-marketplace-e3a89-default-rtdb.firebaseio.com"
});

const db = admin.database();
const ref = db.ref("service_categories");

const categories = {
    "1": {
      "id": "1",
      "name": "Plumbing",
      "description": "Professional plumbing services including repairs, installations, and maintenance",
      "icon_name": "🔧",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "2": {
      "id": "2",
      "name": "Electrical",
      "description": "Electrical work, wiring, installations, and repairs",
      "icon_name": "⚡",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "3": {
      "id": "3",
      "name": "Carpentry",
      "description": "Woodwork, furniture, and carpentry services",
      "icon_name": "🪚",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "4": {
      "id": "4",
      "name": "Teaching",
      "description": "Tutoring and educational services",
      "icon_name": "📚",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "5": {
      "id": "5",
      "name": "Driving",
      "description": "Driving lessons and chauffeur services",
      "icon_name": "🚗",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "6": {
      "id": "6",
      "name": "Cooking",
      "description": "Catering, cooking classes, and chef services",
      "icon_name": "👨‍🍳",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "7": {
      "id": "7",
      "name": "Cleaning",
      "description": "House cleaning, office cleaning, and deep cleaning services",
      "icon_name": "🧹",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "8": {
      "id": "8",
      "name": "Painting",
      "description": "Interior and exterior painting services",
      "icon_name": "🎨",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "9": {
      "id": "9",
      "name": "AC Repair",
      "description": "Air conditioning installation, repair, and maintenance",
      "icon_name": "❄️",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "10": {
      "id": "10",
      "name": "Mobile Repair",
      "description": "Mobile phone and tablet repair services",
      "icon_name": "📱",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    },
    "11": {
      "id": "11",
      "name": "Home Appliance Repair",
      "description": "Repair services for home appliances",
      "icon_name": "🔌",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  };

ref.set(categories)
  .then(() => {
    console.log("Service categories populated successfully!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Error populating service categories:", error);
    process.exit(1);
  });
