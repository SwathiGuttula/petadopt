// =============================================
// 🔥 REPLACE THESE VALUES WITH YOUR FIREBASE PROJECT DETAILS
// Go to: https://console.firebase.google.com
// Create a project → Add Web App → Copy config below
// =============================================

const firebaseConfig = {
  apiKey: "AIzaSyC2ZDk9qqm83CFk5Efr_8LRDNxG_1tN2zI",
  authDomain: "petadopt-a07da.firebaseapp.com",
  projectId: "petadopt-a07da",
  storageBucket: "petadopt-a07da.firebasestorage.app",
  messagingSenderId: "467395988669",
  appId: "1:467395988669:web:e0817f5f50c9396adc3bd4"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// =============================================
// Seed demo pets into Firestore (run once)
// =============================================
async function seedPetsIfEmpty() {
  const snap = await db.collection("pets").limit(1).get();
  if (!snap.empty) return;

  const pets = [
    {
      name: "Mango", breed: "Golden Retriever", age: "2 years", gender: "Male",
      location: "Hyderabad", status: "Available", vaccinated: true,
      description: "Mango is a playful, energetic Golden Retriever who loves fetch and cuddles equally. Great with kids!",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
      shelterId: "demo-shelter", shelterName: "Happy Paws Shelter",
      medicalHistory: "Vaccinated, dewormed, neutered", createdAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    {
      name: "Luna", breed: "Indie Cat", age: "1 year", gender: "Female",
      location: "Bangalore", status: "Available", vaccinated: true,
      description: "Luna is a curious, affectionate cat who purrs loudly and loves window-watching. Perfect apartment companion.",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&q=80",
      shelterId: "demo-shelter", shelterName: "Happy Paws Shelter",
      medicalHistory: "Vaccinated, spayed", createdAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    {
      name: "Biscuit", breed: "Beagle", age: "3 years", gender: "Male",
      location: "Chennai", status: "Available", vaccinated: true,
      description: "Biscuit is a gentle Beagle who loves long walks and belly rubs. Gets along with everyone.",
      image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600&q=80",
      shelterId: "demo-shelter", shelterName: "Rainbow Rescue",
      medicalHistory: "Fully vaccinated, neutered", createdAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    {
      name: "Coco", breed: "Persian Cat", age: "4 years", gender: "Female",
      location: "Mumbai", status: "Available", vaccinated: true,
      description: "Coco is a regal Persian who enjoys quiet afternoons and gentle grooming. Ideal for calm households.",
      image: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80",
      shelterId: "demo-shelter", shelterName: "Rainbow Rescue",
      medicalHistory: "Vaccinated, spayed", createdAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    {
      name: "Bruno", breed: "Labrador", age: "5 years", gender: "Male",
      location: "Hyderabad", status: "Adopted", vaccinated: true,
      description: "Bruno is a calm, loyal Labrador. He has been adopted and is living his best life!",
      image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=600&q=80",
      shelterId: "demo-shelter", shelterName: "Happy Paws Shelter",
      medicalHistory: "Fully vaccinated, neutered", createdAt: firebase.firestore.FieldValue.serverTimestamp()
    },
    {
      name: "Whiskers", breed: "Tabby Cat", age: "2 years", gender: "Male",
      location: "Delhi", status: "Available", vaccinated: false,
      description: "Whiskers is a street-smart tabby who is now ready for a loving indoor home. Very smart and playful.",
      image: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?w=600&q=80",
      shelterId: "demo-shelter", shelterName: "Paws & Hearts",
      medicalHistory: "Dewormed, vaccination pending", createdAt: firebase.firestore.FieldValue.serverTimestamp()
    }
  ];

  const batch = db.batch();
  pets.forEach(pet => {
    const ref = db.collection("pets").doc();
    batch.set(ref, pet);
  });
  await batch.commit();
  console.log("✅ Demo pets seeded!");
}

seedPetsIfEmpty();
