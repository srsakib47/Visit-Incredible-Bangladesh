import { useState, useRef, useEffect } from "react";

const spots = [
  {
    id: 1, name: "Cox's Bazar", region: "Chittagong", tagline: "World's Longest Natural Sea Beach",
    description: "Cox's Bazar boasts 120 km of unbroken sandy beach — the longest natural sea beach on Earth. Famous for golden sands, crashing waves, and spectacular sunsets.",
    image: "🏖️", photo: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80", distanceKm: 414, travelTime: "8–10 hrs (bus) / 1 hr (flight)",
    tags: ["Beach", "Sunset", "Seafood"],
    transport: [
      { type: "🚌 Bus (AC)", cost: "৳800–1,500", duration: "8–10 hrs" },
      { type: "✈️ Flight", cost: "৳3,500–8,000", duration: "1 hr" },
      { type: "🚂 Train", cost: "৳500–1,200", duration: "10–12 hrs" },
    ],
    hotels: [
      { name: "Long Beach Hotel", type: "Luxury", price: "৳6,000–15,000/night", rating: "⭐⭐⭐⭐⭐", phone: "+880 1730-338907", address: "14 Kalatoli, Hotel-Motel Zone, Cox's Bazar" },
      { name: "Hotel Sea Palace", type: "Mid-range", price: "৳2,500–5,000/night", rating: "⭐⭐⭐⭐", phone: "+880 1819-900049", address: "Kolatoli Road, Cox's Bazar" },
      { name: "Seagull Hotel", type: "Mid-range", price: "৳2,000–4,000/night", rating: "⭐⭐⭐", phone: "+880 1766-666530", address: "Hotel Motel Zone, Sugandha Beach, Cox's Bazar" },
      { name: "Hotel Mermaid Beach", type: "Budget", price: "৳800–2,000/night", rating: "⭐⭐⭐", phone: "+880 1601-895550", address: "Kolatoli Road, Cox's Bazar" },
    ],
    costs: { budgetTransport: 900, midTransport: 1200, luxTransport: 5000, budgetHotel: 1000, midHotel: 3500, luxHotel: 10000, budgetFood: 300, midFood: 800, luxFood: 1500 },
    totalBudget: { budget: "৳3,000–5,000", mid: "৳6,000–12,000", luxury: "৳15,000+" },
    highlights: ["Laboni Beach", "Himchori Waterfall", "Inani Beach", "Aggmeda Khyang Temple"],
    bestTime: "November – March", color: "#06b6d4",
  },
  {
    id: 2, name: "Saint Martin's Island", region: "Chittagong", tagline: "Bangladesh's Only Coral Island",
    description: "Saint Martin's is Bangladesh's only coral island, surrounded by crystal-clear turquoise water. A paradise for snorkeling, fresh seafood, and stargazing.",
    image: "🐠", photo: "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800&q=80", distanceKm: 500, travelTime: "10–12 hrs (bus+ferry)",
    tags: ["Coral", "Snorkeling", "Island"],
    transport: [
      { type: "🚌 Bus to Teknaf", cost: "৳1,000–1,800", duration: "10–12 hrs" },
      { type: "⛵ Ferry Teknaf→Island", cost: "৳250–600", duration: "2.5–3 hrs" },
      { type: "✈️ Flight to Cox's + bus+ferry", cost: "৳5,000–10,000", duration: "4–5 hrs total" },
    ],
    hotels: [
      { name: "Blue Marine Resort", type: "Luxury", price: "৳8,000–18,000/night", rating: "⭐⭐⭐⭐⭐", phone: "+880 1711-012345", address: "North Beach, Saint Martin's Island" },
      { name: "Hotel Sea Crown", type: "Mid-range", price: "৳2,000–4,500/night", rating: "⭐⭐⭐⭐", phone: "+880 1819-123456", address: "Main Road, Saint Martin's Island" },
      { name: "Coral View Resort", type: "Mid-range", price: "৳1,800–3,500/night", rating: "⭐⭐⭐", phone: "+880 1715-234567", address: "East Beach, Saint Martin's Island" },
      { name: "Local Guesthouses", type: "Budget", price: "৳500–1,200/night", rating: "⭐⭐", phone: "+880 1820-119463", address: "Village Area, Saint Martin's Island" },
    ],
    costs: { budgetTransport: 1300, midTransport: 1800, luxTransport: 6000, budgetHotel: 700, midHotel: 3000, luxHotel: 12000, budgetFood: 400, midFood: 900, luxFood: 1500 },
    totalBudget: { budget: "৳4,000–7,000", mid: "৳8,000–15,000", luxury: "৳20,000+" },
    highlights: ["Chera Dwip", "Coral Reef Snorkeling", "Coconut Groves", "Fresh Lobster Dining"],
    bestTime: "October – March", color: "#2dd4bf",
  },
  {
    id: 3, name: "Sylhet", region: "Sylhet", tagline: "Land of Tea Gardens & Waterfalls",
    description: "Sylhet is famous for its endless rolling tea gardens, misty hills, natural gas fields, and the sacred Shrine of Hazrat Shah Jalal. A truly refreshing escape.",
    image: "🍃", photo: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", distanceKm: 240, travelTime: "4–5 hrs (bus) / 45 min (flight)",
    tags: ["Tea Gardens", "Hills", "Spiritual"],
    transport: [
      { type: "🚌 Bus (AC)", cost: "৳500–900", duration: "4–5 hrs" },
      { type: "✈️ Flight", cost: "৳2,500–6,000", duration: "45 min" },
      { type: "🚂 Train (Parabat/Upaban)", cost: "৳400–900", duration: "6–7 hrs" },
    ],
    hotels: [
      { name: "Rose View Hotel", type: "Luxury", price: "৳5,000–12,000/night", rating: "⭐⭐⭐⭐⭐", phone: "+880 1972-787878", address: "Shahjalal Uposhohor, Sylhet-3100" },
      { name: "Hotel Noorjahan Grand", type: "Luxury", price: "৳4,500–10,000/night", rating: "⭐⭐⭐⭐⭐", phone: "+880 1930-111666", address: "Waves 1, Dargah Gate, Sylhet-3100" },
      { name: "Hotel Hilltown", type: "Mid-range", price: "৳1,500–3,500/night", rating: "⭐⭐⭐⭐", phone: "+880 821-721835", address: "Zindabazar, Sylhet" },
      { name: "Hotel Dariapara", type: "Budget", price: "৳600–1,500/night", rating: "⭐⭐⭐", phone: "+880 1711-345678", address: "Dariapara, Sylhet" },
    ],
    costs: { budgetTransport: 500, midTransport: 700, luxTransport: 3500, budgetHotel: 700, midHotel: 2500, luxHotel: 8000, budgetFood: 300, midFood: 600, luxFood: 1200 },
    totalBudget: { budget: "৳2,500–4,500", mid: "৳5,000–10,000", luxury: "৳12,000+" },
    highlights: ["Ratargul Swamp Forest", "Jaflong", "Lalakhal", "Shah Jalal Shrine", "Srimangal Tea Estates"],
    bestTime: "October – March", color: "#22c55e",
  },
  {
    id: 4, name: "Bandarban", region: "Chittagong Hill Tracts", tagline: "Roof of Bangladesh",
    description: "Bandarban is home to Bangladesh's highest peaks including Tahjindong and Keokradong. Tribal culture, hanging bridges, and cloud-piercing mountains await.",
    image: "⛰️", photo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80", distanceKm: 328, travelTime: "7–8 hrs (bus)",
    tags: ["Trekking", "Hills", "Tribal Culture"],
    transport: [
      { type: "🚌 Bus (AC)", cost: "৳700–1,200", duration: "7–8 hrs" },
      { type: "✈️ Flight to Chittagong + bus", cost: "৳3,000–7,000", duration: "3–4 hrs total" },
    ],
    hotels: [
      { name: "Hotel Hillbird", type: "Mid-range", price: "৳2,000–5,000/night", rating: "⭐⭐⭐⭐", phone: "+880 1816-612345", address: "Bandarban Sadar, Bandarban" },
      { name: "Ruma Tourist Complex", type: "Mid-range", price: "৳1,500–3,000/night", rating: "⭐⭐⭐", phone: "+880 1812-234567", address: "Ruma Road, Bandarban" },
      { name: "Garden Hill Hotel", type: "Budget", price: "৳800–1,800/night", rating: "⭐⭐⭐", phone: "+880 1767-345678", address: "Thana Road, Bandarban" },
      { name: "Tribal Guesthouses", type: "Budget", price: "৳400–1,000/night", rating: "⭐⭐", phone: "+880 1825-456789", address: "Various locations, Bandarban Hills" },
    ],
    costs: { budgetTransport: 700, midTransport: 1000, luxTransport: 4000, budgetHotel: 600, midHotel: 2500, luxHotel: 6000, budgetFood: 250, midFood: 550, luxFood: 1000 },
    totalBudget: { budget: "৳3,000–5,000", mid: "৳6,000–10,000", luxury: "৳12,000+" },
    highlights: ["Nilgiri Hills", "Boga Lake", "Nafakhum Waterfall", "Chimbuk Hill", "Meghla"],
    bestTime: "October – February", color: "#f97316",
  },
  {
    id: 5, name: "Khagrachhari", region: "Chittagong Hill Tracts", tagline: "Hidden Jewel of the Hills",
    description: "Khagrachhari offers stunning landscapes with waterfalls, tribal villages, and misty mountain roads. Less crowded than Bandarban — more raw and authentic.",
    image: "🌄", photo: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80", distanceKm: 308, travelTime: "6–7 hrs (bus)",
    tags: ["Offbeat", "Waterfalls", "Tribal"],
    transport: [
      { type: "🚌 Bus (AC)", cost: "৳600–1,100", duration: "6–7 hrs" },
      { type: "✈️ Flight to Chittagong + bus", cost: "৳3,000–7,000", duration: "3 hrs total" },
    ],
    hotels: [
      { name: "Sajek Valley Resort", type: "Luxury", price: "৳4,000–10,000/night", rating: "⭐⭐⭐⭐⭐", phone: "+880 1556-347711", address: "Sajek Valley, Baghaichhari, Rangamati" },
      { name: "Hotel Shaibal", type: "Mid-range", price: "৳1,200–2,500/night", rating: "⭐⭐⭐", phone: "+880 1711-234678", address: "Khagrachhari Sadar, Khagrachhari" },
      { name: "Tribal Eco Cottages", type: "Budget", price: "৳500–1,200/night", rating: "⭐⭐", phone: "+880 1829-456789", address: "Hill Village Area, Khagrachhari" },
    ],
    costs: { budgetTransport: 600, midTransport: 900, luxTransport: 4000, budgetHotel: 600, midHotel: 1800, luxHotel: 7000, budgetFood: 200, midFood: 500, luxFood: 1000 },
    totalBudget: { budget: "৳2,500–4,500", mid: "৳5,000–9,000", luxury: "৳12,000+" },
    highlights: ["Sajek Valley", "Aluhtila Cave", "Richhang Waterfall", "Mayanimukh", "Tribal Markets"],
    bestTime: "September – February", color: "#8b5cf6",
  },
  {
    id: 6, name: "Sundarbans", region: "Khulna", tagline: "World's Largest Mangrove Forest",
    description: "The Sundarbans is a UNESCO World Heritage Site and home to the Royal Bengal Tiger. Navigate dense mangrove channels, spot wildlife, and experience nature at its wildest.",
    image: "🐯", photo: "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=800&q=80", distanceKm: 320, travelTime: "6–7 hrs (bus to Khulna) + boat",
    tags: ["Wildlife", "UNESCO", "Mangrove"],
    transport: [
      { type: "🚌 Bus to Khulna", cost: "৳500–1,000", duration: "6–7 hrs" },
      { type: "🚂 Train to Khulna", cost: "৳400–900", duration: "7–8 hrs" },
      { type: "⛵ Sundarban Tour Boat", cost: "৳3,000–15,000", duration: "2–3 day package" },
    ],
    hotels: [
      { name: "Tiger Garden Eco Resort", type: "Luxury", price: "৳6,000–14,000/night", rating: "⭐⭐⭐⭐⭐", phone: "+880 1711-567890", address: "Mongla, Bagerhat, Khulna" },
      { name: "Khulna City Inn", type: "Mid-range", price: "৳1,500–3,500/night", rating: "⭐⭐⭐⭐", phone: "+880 41-731234", address: "KDA Avenue, Khulna" },
      { name: "Forest Dept Rest Houses", type: "Budget", price: "৳500–1,200/night", rating: "⭐⭐", phone: "+880 1711-678901", address: "Kotka/Hiron Point, Sundarbans" },
    ],
    costs: { budgetTransport: 700, midTransport: 900, luxTransport: 5000, budgetHotel: 700, midHotel: 2500, luxHotel: 10000, budgetFood: 300, midFood: 700, luxFood: 1200 },
    totalBudget: { budget: "৳5,000–8,000 (3 days)", mid: "৳10,000–18,000", luxury: "৳25,000+" },
    highlights: ["Royal Bengal Tiger Spotting", "Deer Sanctuary", "Crocodile Point", "Kotka Beach", "Hiron Point"],
    bestTime: "November – February", color: "#84cc16",
  },
  {
    id: 7, name: "Rangamati", region: "Chittagong Hill Tracts", tagline: "Lake District of Bangladesh",
    description: "Rangamati is built around the vast Kaptai Lake, surrounded by hills and tribal communities. Boat rides, hanging bridges, and Buddhist temples define this serene destination.",
    image: "🚣", photo: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80", distanceKm: 303, travelTime: "6–7 hrs (bus)",
    tags: ["Lake", "Boat Ride", "Tribal"],
    transport: [
      { type: "🚌 Bus (AC)", cost: "৳600–1,100", duration: "6–7 hrs" },
      { type: "✈️ Flight to Chittagong + bus", cost: "৳3,000–7,000", duration: "3 hrs total" },
    ],
    hotels: [
      { name: "Hotel Sufia", type: "Mid-range", price: "৳1,500–4,000/night", rating: "⭐⭐⭐⭐", phone: "+880 351-61559", address: "Rangamati Sadar, Rangamati" },
      { name: "Parjatan Hotel", type: "Mid-range", price: "৳1,200–3,000/night", rating: "⭐⭐⭐", phone: "+880 351-61135", address: "Rangamati Lake View, Rangamati" },
      { name: "Tribal Eco Lodges", type: "Budget", price: "৳500–1,000/night", rating: "⭐⭐", phone: "+880 1829-567890", address: "Kaptai Lake Area, Rangamati" },
    ],
    costs: { budgetTransport: 600, midTransport: 900, luxTransport: 4000, budgetHotel: 600, midHotel: 2200, luxHotel: 6000, budgetFood: 250, midFood: 550, luxFood: 1000 },
    totalBudget: { budget: "৳2,500–4,500", mid: "৳5,000–9,000", luxury: "৳12,000+" },
    highlights: ["Kaptai Lake Boat Tour", "Shuvolong Waterfall", "Tribal Museum", "Hanging Bridge", "Buddhist Temple"],
    bestTime: "October – March", color: "#3b82f6",
  },
  {
    id: 8, name: "Sreemangal", region: "Sylhet", tagline: "Tea Capital of Bangladesh",
    description: "Sreemangal is the tea capital of Bangladesh with vast tea estates, the famous seven-layer tea, and lush wildlife. The Lawachara Forest is a must for nature lovers.",
    image: "☕", photo: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&q=80", distanceKm: 200, travelTime: "3–4 hrs (bus/train)",
    tags: ["Tea", "Forest", "Nature"],
    transport: [
      { type: "🚌 Bus (AC)", cost: "৳400–700", duration: "3–4 hrs" },
      { type: "🚂 Train", cost: "৳300–700", duration: "3.5–4 hrs" },
    ],
    hotels: [
      { name: "Grand Sultan Resort", type: "Luxury", price: "৳8,000–20,000/night", rating: "⭐⭐⭐⭐⭐", phone: "+880 9678-785959", address: "Srimongal, Moulvibazar-3210" },
      { name: "Tea Town Tourist Complex", type: "Mid-range", price: "৳1,500–3,500/night", rating: "⭐⭐⭐⭐", phone: "+880 1711-789012", address: "Srimangal Town, Moulvibazar" },
      { name: "Niribili Resort", type: "Mid-range", price: "৳2,000–4,000/night", rating: "⭐⭐⭐⭐", phone: "+880 1712-890123", address: "Tea Garden Road, Srimangal" },
      { name: "Local Guesthouses", type: "Budget", price: "৳500–1,200/night", rating: "⭐⭐", phone: "+880 1825-678901", address: "Srimangal Bazaar Area" },
    ],
    costs: { budgetTransport: 400, midTransport: 600, luxTransport: 3000, budgetHotel: 600, midHotel: 2500, luxHotel: 12000, budgetFood: 250, midFood: 500, luxFood: 1000 },
    totalBudget: { budget: "৳2,000–3,500", mid: "৳4,000–8,000", luxury: "৳15,000+" },
    highlights: ["Seven Layer Tea at Nilkantha", "Tea Estate Walks", "Lawachara National Park", "Madhabpur Lake"],
    bestTime: "October – March", color: "#65a30d",
  },
  {
    id: 9, name: "Kuakata", region: "Barisal", tagline: "Daughter of the Sea",
    description: "Kuakata is a unique beach where you can watch both sunrise and sunset over the sea. With Buddhist temples and Rakhaine villages, it's a spiritual and scenic destination.",
    image: "🌅", photo: "https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&q=80", distanceKm: 320, travelTime: "7–8 hrs (bus+launch)",
    tags: ["Beach", "Sunrise", "Sunset"],
    transport: [
      { type: "🚌 Bus (AC)", cost: "৳600–1,000", duration: "7–8 hrs" },
      { type: "⛵ Launch via Barisal", cost: "৳700–1,500", duration: "10–12 hrs (overnight)" },
    ],
    hotels: [
      { name: "Kuakata Grand Hotel", type: "Mid-range", price: "৳2,000–5,000/night", rating: "⭐⭐⭐⭐", phone: "+880 1711-901234", address: "Beach Road, Kuakata, Patuakhali" },
      { name: "Hotel Neelanjona", type: "Mid-range", price: "৳1,500–3,000/night", rating: "⭐⭐⭐", phone: "+880 1811-012345", address: "Main Road, Kuakata" },
      { name: "Sea Beach Motel", type: "Budget", price: "৳600–1,500/night", rating: "⭐⭐⭐", phone: "+880 1602-039990", address: "Kuakata Sea Beach, Patuakhali" },
    ],
    costs: { budgetTransport: 700, midTransport: 900, luxTransport: 3000, budgetHotel: 700, midHotel: 2200, luxHotel: 6000, budgetFood: 300, midFood: 600, luxFood: 1200 },
    totalBudget: { budget: "৳2,500–4,500", mid: "৳5,500–9,000", luxury: "৳12,000+" },
    highlights: ["Sunrise & Sunset Beach", "Buddhist Temple", "Rakhaine Village", "Fat Deer Island", "Gangamati Forest"],
    bestTime: "November – February", color: "#f59e0b",
  },
  {
    id: 10, name: "Paharpur", region: "Rajshahi", tagline: "Ancient Buddhist Monastery",
    description: "Paharpur is home to the Somapura Mahavihara, one of the greatest Buddhist monasteries in South Asia and a UNESCO World Heritage Site dating back to the 8th century.",
    image: "🏛️", photo: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=800&q=80", distanceKm: 280, travelTime: "5–6 hrs (bus/train)",
    tags: ["UNESCO", "History", "Archaeology"],
    transport: [
      { type: "🚌 Bus (AC)", cost: "৳400–800", duration: "5–6 hrs" },
      { type: "🚂 Train to Rajshahi + local bus", cost: "৳350–750", duration: "6–7 hrs" },
    ],
    hotels: [
      { name: "Hotel Rajshahi International", type: "Mid-range", price: "৳2,000–4,500/night", rating: "⭐⭐⭐⭐", phone: "+880 721-812345", address: "Shaheb Bazaar, Rajshahi" },
      { name: "Hotel Nice International", type: "Mid-range", price: "৳1,500–3,000/night", rating: "⭐⭐⭐", phone: "+880 721-723456", address: "Station Road, Rajshahi" },
      { name: "Local Rest Houses", type: "Budget", price: "৳400–1,000/night", rating: "⭐⭐", phone: "+880 1711-456789", address: "Paharpur Village, Naogaon" },
    ],
    costs: { budgetTransport: 450, midTransport: 650, luxTransport: 2500, budgetHotel: 500, midHotel: 2000, luxHotel: 5000, budgetFood: 200, midFood: 500, luxFood: 900 },
    totalBudget: { budget: "৳2,000–3,500", mid: "৳4,500–8,000", luxury: "৳10,000+" },
    highlights: ["Somapura Mahavihara Ruins", "Archaeological Museum", "Ancient Terracotta Art", "Shalban Vihara"],
    bestTime: "October – March", color: "#b45309",
  },
  {
    id: 11, name: "Mahasthangarh", region: "Rajshahi", tagline: "Oldest City in Bangladesh",
    description: "Mahasthangarh is Bangladesh's oldest archaeological site, dating back to 3rd century BC. The ancient citadel and surrounding temples reveal thousands of years of history.",
    image: "🗿", photo: "https://images.unsplash.com/photo-1568454537842-d933259bb258?w=800&q=80", distanceKm: 200, travelTime: "4–5 hrs (bus)",
    tags: ["History", "Archaeology", "Ancient"],
    transport: [
      { type: "🚌 Bus to Bogura", cost: "৳350–650", duration: "4–5 hrs" },
      { type: "🚂 Train to Bogura", cost: "৳300–600", duration: "5–6 hrs" },
    ],
    hotels: [
      { name: "Hotel Akbar International", type: "Mid-range", price: "৳1,500–3,500/night", rating: "⭐⭐⭐⭐", phone: "+880 51-67234", address: "Sherpur Road, Bogura" },
      { name: "Parjatan Motel Bogra", type: "Mid-range", price: "৳1,200–2,500/night", rating: "⭐⭐⭐", phone: "+880 51-66285", address: "Nawab Bazar, Bogura" },
      { name: "Local Guesthouses", type: "Budget", price: "৳300–900/night", rating: "⭐⭐", phone: "+880 1829-234567", address: "Mahasthan Area, Bogura" },
    ],
    costs: { budgetTransport: 380, midTransport: 550, luxTransport: 2000, budgetHotel: 400, midHotel: 1800, luxHotel: 4500, budgetFood: 200, midFood: 450, luxFood: 800 },
    totalBudget: { budget: "৳1,800–3,000", mid: "৳4,000–7,000", luxury: "৳9,000+" },
    highlights: ["Ancient Citadel", "Archaeological Museum", "Govinda Bhita Temple", "Behula's Bashor Ghar"],
    bestTime: "November – February", color: "#92400e",
  },
  {
    id: 12, name: "Nijhum Dwip", region: "Noakhali", tagline: "Island of Spotted Deer",
    description: "Nijhum Dwip is a remote island in the Bay of Bengal covered in mangrove forest and home to thousands of spotted deer. Accessible only by boat, it's true off-the-beaten-path paradise.",
    image: "🦌", photo: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80", distanceKm: 350, travelTime: "8–10 hrs (bus+boat)",
    tags: ["Island", "Wildlife", "Offbeat"],
    transport: [
      { type: "🚌 Bus to Noakhali/Hatiya", cost: "৳400–800", duration: "4–5 hrs" },
      { type: "⛵ Boat to Nijhum Dwip", cost: "৳200–500", duration: "3–4 hrs" },
    ],
    hotels: [
      { name: "Forest Dept Eco Cottages", type: "Mid-range", price: "৳1,500–3,000/night", rating: "⭐⭐⭐", phone: "+880 321-53012", address: "Nijhum Dwip National Park, Noakhali" },
      { name: "Local Fishing Guesthouses", type: "Budget", price: "৳400–900/night", rating: "⭐⭐", phone: "+880 1829-606656", address: "Char Osman Village, Nijhum Dwip" },
    ],
    costs: { budgetTransport: 650, midTransport: 900, luxTransport: 2500, budgetHotel: 500, midHotel: 1800, luxHotel: 4000, budgetFood: 250, midFood: 500, luxFood: 900 },
    totalBudget: { budget: "৳2,500–4,000", mid: "৳5,000–8,000", luxury: "৳10,000+" },
    highlights: ["Spotted Deer Safari", "Mangrove Forest Walk", "Beach Fishing", "Bird Watching", "Sunrise at Sea"],
    bestTime: "October – February", color: "#047857",
  },
];

const gradientFor = (color) => {
  const map = {
    "#06b6d4": "linear-gradient(135deg,#06b6d4,#2563eb)",
    "#2dd4bf": "linear-gradient(135deg,#2dd4bf,#0891b2)",
    "#22c55e": "linear-gradient(135deg,#22c55e,#059669)",
    "#f97316": "linear-gradient(135deg,#f97316,#d97706)",
    "#8b5cf6": "linear-gradient(135deg,#8b5cf6,#7c3aed)",
    "#84cc16": "linear-gradient(135deg,#84cc16,#166534)",
    "#3b82f6": "linear-gradient(135deg,#3b82f6,#4338ca)",
    "#65a30d": "linear-gradient(135deg,#65a30d,#14532d)",
    "#f59e0b": "linear-gradient(135deg,#f59e0b,#b45309)",
    "#b45309": "linear-gradient(135deg,#b45309,#78350f)",
    "#92400e": "linear-gradient(135deg,#92400e,#451a03)",
    "#047857": "linear-gradient(135deg,#047857,#065f46)",
  };
  return map[color] || "linear-gradient(135deg,#1a6b4a,#0f4c35)";
};

// ─── COST CALCULATOR LOGIC ───────────────────────────────────────────────────
function calcPlan(spot, days, budget, people) {
  const nights = days - 1;
  const tier = budget === "budget" ? "budget" : budget === "mid" ? "mid" : "lux";
  const transport = spot.costs[`${tier}Transport`] * people;
  const hotel = spot.costs[`${tier}Hotel`] * nights * people;
  const food = spot.costs[`${tier}Food`] * days * people;
  const misc = Math.round((transport + hotel + food) * 0.1);
  const total = transport + hotel + food + misc;

  const hotelRec = spot.hotels.find(h =>
    tier === "budget" ? h.type === "Budget" :
    tier === "mid" ? h.type === "Mid-range" :
    h.type === "Luxury"
  ) || spot.hotels[0];

  const transportRec = tier === "lux" ? spot.transport.find(t => t.type.includes("Flight")) || spot.transport[0]
    : spot.transport.find(t => t.type.includes("Bus")) || spot.transport[0];

  const itinerary = [];
  for (let d = 1; d <= days; d++) {
    if (d === 1) itinerary.push({ day: d, title: "Arrival Day", activities: [`Depart Dhaka via ${transportRec.type}`, `Check in to ${hotelRec.name}`, "Evening: Explore local area & dinner"] });
    else if (d === days) itinerary.push({ day: d, title: "Departure Day", activities: ["Morning: Last sightseeing", "Checkout & pack up", "Return journey to Dhaka"] });
    else {
      const hl = spot.highlights;
      const idx = (d - 2) % hl.length;
      const idx2 = (d - 1) % hl.length;
      itinerary.push({ day: d, title: `Explore ${spot.name}`, activities: [`Morning: Visit ${hl[idx]}`, `Afternoon: ${hl[idx2]}`, `Evening: Local ${tier === "lux" ? "fine dining" : tier === "mid" ? "restaurant" : "street food"}`] });
    }
  }

  return { transport, hotel, food, misc, total, hotelRec, transportRec, itinerary, nights, tier };
}

export default function VisitIncredibleBangladesh() {
  const [view, setView] = useState("home");
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [search, setSearch] = useState("");
  const [filterRegion, setFilterRegion] = useState("All");
  const [messages, setMessages] = useState([
    { role: "assistant", content: "👋 Hello! I'm your Bangladesh travel guide. Tell me your budget, interests, or travel dates — and I'll recommend the perfect destination for you!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  // Calculator state
  const [calcSpot, setCalcSpot] = useState(spots[0]);
  const [calcDays, setCalcDays] = useState(3);
  const [calcBudget, setCalcBudget] = useState("mid");
  const [calcPeople, setCalcPeople] = useState(2);
  const [calcResult, setCalcResult] = useState(null);
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const regions = ["All", "Chittagong", "Sylhet", "Chittagong Hill Tracts", "Khulna", "Barisal", "Rajshahi", "Noakhali"];
  const filtered = spots.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));
    const matchRegion = filterRegion === "All" || s.region === filterRegion;
    return matchSearch && matchRegion;
  });

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    try {
      const systemPrompt = `You are an expert Bangladesh travel guide for the "Visit Incredible Bangladesh" app. Help tourists plan trips across Bangladesh.
Destinations data: ${JSON.stringify(spots.map(s => ({ name: s.name, region: s.region, tagline: s.tagline, distanceKm: s.distanceKm, travelTime: s.travelTime, transport: s.transport, hotels: s.hotels, totalBudget: s.totalBudget, highlights: s.highlights, bestTime: s.bestTime, tags: s.tags })))}
Rules: Answer in English. Be warm & enthusiastic. Costs in Taka (৳). Keep under 200 words. Use emojis. Mention budget/mid/luxury tiers when relevant.`;
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: systemPrompt, messages: newMessages.map(m => ({ role: m.role, content: m.content })) }),
      });
      const data = await response.json();
      const reply = data.content?.map(b => b.text || "").join("") || "Sorry, I couldn't get a response.";
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch { setMessages(prev => [...prev, { role: "assistant", content: "⚠️ Connection error. Please try again." }]); }
    setLoading(false);
  };

  const runCalc = () => setCalcResult(calcPlan(calcSpot, calcDays, calcBudget, calcPeople));

  const NAV = ({ onHome, onExplore, onCalc, onAI }) => (
    <div style={{ background: "linear-gradient(135deg,#0f4c35,#1a6b4a)", padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
      {onHome && <button onClick={onHome} style={navBtn}>🏠 Home</button>}
      {onExplore && <button onClick={onExplore} style={navBtn}>🗺️ Explore</button>}
      {onCalc && <button onClick={onCalc} style={{ ...navBtn, background: "rgba(255,215,0,0.2)", border: "1px solid rgba(255,215,0,0.4)" }}>🧮 Calculator</button>}
      {onAI && <button onClick={onAI} style={{ ...navBtn, background: "rgba(255,215,0,0.2)", border: "1px solid rgba(255,215,0,0.4)" }}>🤖 AI Guide</button>}
      <div style={{ flex: 1 }} />
      <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>Visit Incredible Bangladesh</span>
    </div>
  );
  const navBtn = { background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.2)", color: "white", padding: "0.45rem 1rem", borderRadius: "20px", cursor: "pointer", fontSize: "0.82rem", fontWeight: "600" };
  const card = { background: "white", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,80,40,0.08)", border: "1px solid #e0f0e8" };

  // ── HOME ────────────────────────────────────────────────────────────────────
  if (view === "home") return (
    <div style={{ fontFamily: "'Georgia',serif", minHeight: "100vh", background: "linear-gradient(135deg,#0f4c35 0%,#1a6b4a 50%,#0d3d2a 100%)", color: "white", overflowX: "hidden" }}>
      <div style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "2rem" }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "350px", height: "350px", borderRadius: "50%", background: "rgba(255,200,50,0.07)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "-40px", left: "-60px", width: "280px", height: "280px", borderRadius: "50%", background: "rgba(100,220,180,0.06)", pointerEvents: "none" }} />
        <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>🇧🇩</div>
        <div style={{ fontSize: "0.8rem", letterSpacing: "0.4em", color: "#7de8c0", textTransform: "uppercase", marginBottom: "1rem", fontFamily: "monospace" }}>Your Complete Travel Companion</div>
        <h1 style={{ fontSize: "clamp(2.8rem,8vw,5rem)", fontWeight: "800", lineHeight: 1.1, marginBottom: "1.5rem", background: "linear-gradient(135deg,#fff 0%,#a8f0d8 60%,#ffd700 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Visit Incredible<br />Bangladesh</h1>
        <p style={{ fontSize: "1.1rem", maxWidth: "520px", lineHeight: 1.7, color: "#b8e8d0", marginBottom: "3rem" }}>12 incredible destinations. Real costs. Best hotels. AI-powered trip planning — all in one place.</p>
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
          <button onClick={() => setView("list")} style={{ background: "linear-gradient(135deg,#ffd700,#ff9500)", color: "#1a1a1a", border: "none", padding: "0.9rem 2rem", borderRadius: "50px", fontSize: "1rem", fontWeight: "700", cursor: "pointer", boxShadow: "0 8px 30px rgba(255,215,0,0.35)" }}>🗺️ Explore Destinations</button>
          <button onClick={() => setView("calc")} style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "2px solid rgba(255,255,255,0.3)", padding: "0.9rem 2rem", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" }}>🧮 Trip Cost Calculator</button>
          <button onClick={() => setView("ai")} style={{ background: "rgba(255,255,255,0.08)", color: "white", border: "2px solid rgba(255,255,255,0.2)", padding: "0.9rem 2rem", borderRadius: "50px", fontSize: "1rem", fontWeight: "600", cursor: "pointer" }}>🤖 Ask AI Guide</button>
        </div>
        <div style={{ display: "flex", gap: "2rem", marginTop: "4rem", flexWrap: "wrap", justifyContent: "center" }}>
          {[["12", "Destinations"], ["8", "Regions"], ["3", "UNESCO Sites"], ["120km", "Longest Beach"]].map(([n, l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "2rem", fontWeight: "800", color: "#ffd700" }}>{n}</div>
              <div style={{ fontSize: "0.75rem", color: "#8ecfb0", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 2rem 5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.8rem", color: "#a8f0d8", marginBottom: "2rem", fontWeight: "300" }}>Featured Destinations</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "1.25rem" }}>
          {spots.slice(0, 4).map(s => (
            <div key={s.id} onClick={() => { setSelectedSpot(s); setView("detail"); }} style={{ borderRadius: "20px", overflow: "hidden", cursor: "pointer", border: "1px solid rgba(255,255,255,0.1)", transition: "transform 0.2s", position: "relative", height: "200px" }}
              onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
              onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}>
              <img src={s.photo} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)" }} />
              <div style={{ position: "absolute", bottom: "1rem", left: "1rem", right: "1rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.25rem" }}>
                  <span style={{ fontSize: "1.4rem" }}>{s.image}</span>
                  <h3 style={{ fontSize: "1.1rem", color: "white", margin: 0, fontWeight: "700", textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{s.name}</h3>
                </div>
                <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.85)", margin: "0 0 0.4rem" }}>{s.tagline}</p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.7rem", color: "rgba(255,255,255,0.75)" }}>
                  <span>📍 {s.distanceKm} km</span>
                  <span>💰 From {s.totalBudget.budget.split("–")[0]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
          <button onClick={() => setView("list")} style={{ background: "transparent", color: "#7de8c0", border: "1px solid #7de8c0", padding: "0.65rem 1.8rem", borderRadius: "50px", cursor: "pointer", fontSize: "0.9rem" }}>View All 12 Destinations →</button>
        </div>
      </div>
    </div>
  );

  // ── LIST ────────────────────────────────────────────────────────────────────
  if (view === "list") return (
    <div style={{ minHeight: "100vh", background: "#f0faf5", fontFamily: "'Georgia',serif" }}>
      <NAV onHome={() => setView("home")} onCalc={() => setView("calc")} onAI={() => setView("ai")} />
      <div style={{ padding: "1.25rem 1.5rem", background: "white", borderBottom: "1px solid #e0f0e8" }}>
        <h1 style={{ fontSize: "1.4rem", color: "#0f3d28", margin: "0 0 1rem" }}>🗺️ All Destinations <span style={{ fontSize: "0.9rem", color: "#5a8a70", fontWeight: "400" }}>({filtered.length} found)</span></h1>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍 Search destinations or activities..." style={{ width: "100%", maxWidth: "400px", padding: "0.65rem 1rem", borderRadius: "12px", border: "1.5px solid #c0e0d0", fontSize: "0.9rem", marginBottom: "0.75rem", display: "block", boxSizing: "border-box", outline: "none" }} />
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
          {regions.map(r => (
            <button key={r} onClick={() => setFilterRegion(r)} style={{ padding: "0.35rem 0.9rem", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "0.75rem", fontWeight: "600", background: filterRegion === r ? "#1a6b4a" : "#e8f5ef", color: filterRegion === r ? "white" : "#2d5a40" }}>{r}</button>
          ))}
        </div>
      </div>
      <div style={{ padding: "1.5rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "1.25rem" }}>
          {filtered.map(s => (
            <div key={s.id} onClick={() => { setSelectedSpot(s); setView("detail"); }} style={{ ...card, overflow: "hidden", cursor: "pointer", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,80,40,0.14)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,80,40,0.08)"; }}>
              <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                <img src={s.photo} alt={s.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={e => { e.target.style.display="none"; e.target.parentNode.style.backgroundImage = gradientFor(s.color); }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: "0.75rem", left: "0.9rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                  <span style={{ fontSize: "1.6rem" }}>{s.image}</span>
                  <span style={{ color: "white", fontWeight: "700", fontSize: "1.1rem", textShadow: "0 1px 4px rgba(0,0,0,0.6)" }}>{s.name}</span>
                </div>
                <span style={{ position: "absolute", top: "0.65rem", right: "0.65rem", fontSize: "0.65rem", padding: "0.2rem 0.55rem", borderRadius: "10px", background: "rgba(255,255,255,0.9)", color: "#1a6b4a", fontWeight: "700" }}>{s.region}</span>
              </div>
              <div style={{ padding: "1rem 1.25rem" }}>
                <p style={{ fontSize: "0.8rem", color: "#2d8a5a", marginBottom: "0.5rem", fontStyle: "italic" }}>{s.tagline}</p>
                <p style={{ fontSize: "0.82rem", color: "#5a7a6a", lineHeight: 1.5, marginBottom: "0.75rem" }}>{s.description.substring(0, 90)}...</p>
                <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "0.75rem" }}>
                  {s.tags.map(t => <span key={t} style={{ fontSize: "0.65rem", padding: "0.2rem 0.55rem", borderRadius: "10px", background: "#f0faf5", color: "#1a6b4a", border: "1px solid #c0e8d0" }}>{t}</span>)}
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.35rem", fontSize: "0.75rem", color: "#5a7a6a", paddingTop: "0.75rem", borderTop: "1px solid #e8f5ef" }}>
                  <span>📍 {s.distanceKm} km</span>
                  <span>🗓 {s.bestTime}</span>
                  <span>💰 From {s.totalBudget.budget.split("–")[0]}</span>
                  <span>⏱ {s.travelTime.split("(")[0].trim()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── DETAIL ──────────────────────────────────────────────────────────────────
  if (view === "detail" && selectedSpot) {
    const s = selectedSpot;
    return (
      <div style={{ minHeight: "100vh", background: "#f0faf5", fontFamily: "'Georgia',serif" }}>
        <div style={{ position: "relative", minHeight: "260px", overflow: "hidden" }}>
          <img src={s.photo} alt={s.name} style={{ width: "100%", height: "260px", objectFit: "cover", display: "block" }} onError={e => { e.target.style.display="none"; }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(to top, rgba(10,50,30,0.92) 0%, rgba(10,50,30,0.4) 60%, transparent 100%)` }} />
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "1.5rem" }}>
            <button onClick={() => setView("list")} style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "white", padding: "0.45rem 1rem", borderRadius: "20px", cursor: "pointer", marginBottom: "1rem", fontSize: "0.85rem", backdropFilter: "blur(6px)" }}>← Back</button>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
              <div style={{ fontSize: "3rem" }}>{s.image}</div>
              <div>
                <h1 style={{ fontSize: "2rem", fontWeight: "800", color: "white", margin: "0 0 0.25rem", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>{s.name}</h1>
                <p style={{ color: "rgba(255,255,255,0.88)", margin: "0 0 0.5rem", fontSize: "0.95rem" }}>{s.tagline}</p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>
                  <span>📍 {s.distanceKm} km from Dhaka</span>
                  <span>⏱ {s.travelTime}</span>
                  <span>🗓 Best: {s.bestTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth: "860px", margin: "0 auto", padding: "1.5rem" }}>
          <div style={{ ...card, padding: "1.25rem", marginBottom: "1.25rem" }}>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#2d4a3a", margin: 0 }}>{s.description}</p>
          </div>
          <div style={{ ...card, padding: "1.25rem", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.1rem", color: "#0f3d28", marginBottom: "0.75rem" }}>🚀 How to Get There from Dhaka</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {s.transport.map((t, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.65rem 0.9rem", background: "#f0faf5", borderRadius: "10px", flexWrap: "wrap", gap: "0.4rem" }}>
                  <span style={{ fontWeight: "600", color: "#0f3d28", fontSize: "0.9rem" }}>{t.type}</span>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.85rem" }}>
                    <span style={{ color: "#1a8a4a", fontWeight: "700" }}>{t.cost}</span>
                    <span style={{ color: "#5a7a6a" }}>{t.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...card, padding: "1.25rem", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.1rem", color: "#0f3d28", marginBottom: "0.75rem" }}>🏨 Where to Stay</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {s.hotels.map((h, i) => (
                <div key={i} style={{ padding: "0.85rem 1rem", background: "#f0faf5", borderRadius: "12px", border: "1px solid #d0ece0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.5rem" }}>
                    <div>
                      <div style={{ fontWeight: "700", color: "#0f3d28", fontSize: "0.95rem" }}>{h.name}</div>
                      <div style={{ fontSize: "0.7rem", color: "#5a7a6a" }}>{h.type} · {h.rating}</div>
                    </div>
                    <span style={{ color: "#1a8a4a", fontWeight: "700", fontSize: "0.88rem" }}>{h.price}</span>
                  </div>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {h.phone && (
                      <a href={`tel:${h.phone}`} style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.8rem", color: "#1a6b4a", textDecoration: "none", background: "white", padding: "0.3rem 0.7rem", borderRadius: "20px", border: "1px solid #b0ddc0", fontWeight: "600" }}>
                        📞 {h.phone}
                      </a>
                    )}
                    {h.address && (
                      <span style={{ display: "flex", alignItems: "center", gap: "0.3rem", fontSize: "0.75rem", color: "#5a7a6a" }}>
                        📍 {h.address}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...card, padding: "1.25rem", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.1rem", color: "#0f3d28", marginBottom: "0.75rem" }}>💰 Total Trip Budget (per person)</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.75rem" }}>
              {[["🎒 Budget", s.totalBudget.budget, "#dcfce7", "#15803d"], ["🏩 Mid-Range", s.totalBudget.mid, "#fef9c3", "#854d0e"], ["💎 Luxury", s.totalBudget.luxury, "#fce7f3", "#9d174d"]].map(([label, val, bg, col]) => (
                <div key={label} style={{ background: bg, borderRadius: "10px", padding: "0.85rem", textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: col, fontWeight: "600", marginBottom: "0.3rem" }}>{label}</div>
                  <div style={{ fontSize: "0.95rem", fontWeight: "800", color: col }}>{val}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: "0.7rem", color: "#8a9a90", marginTop: "0.65rem" }}>* Includes transport + accommodation + food for 2 nights</p>
          </div>
          <div style={{ ...card, padding: "1.25rem", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1.1rem", color: "#0f3d28", marginBottom: "0.75rem" }}>✨ Must-See Highlights</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {s.highlights.map(h => <span key={h} style={{ padding: "0.4rem 0.85rem", background: "#e8f5ef", borderRadius: "20px", fontSize: "0.8rem", color: "#1a6b4a", border: "1px solid #c0e0d0" }}>📌 {h}</span>)}
            </div>
          </div>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <button onClick={() => { setCalcSpot(s); setView("calc"); }} style={{ flex: 1, background: "linear-gradient(135deg,#ffd700,#ff9500)", color: "#1a1a1a", border: "none", padding: "0.9rem", borderRadius: "14px", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", minWidth: "160px" }}>🧮 Calculate My Trip Cost</button>
            <button onClick={() => { setInput(`Plan my trip to ${s.name}`); setView("ai"); }} style={{ flex: 1, background: "linear-gradient(135deg,#0f4c35,#1a6b4a)", color: "white", border: "none", padding: "0.9rem", borderRadius: "14px", fontSize: "0.95rem", fontWeight: "700", cursor: "pointer", minWidth: "160px" }}>🤖 Ask AI to Plan This Trip</button>
          </div>
        </div>
      </div>
    );
  }

  // ── CALCULATOR ──────────────────────────────────────────────────────────────
  if (view === "calc") {
    const fmt = (n) => "৳" + n.toLocaleString();
    return (
      <div style={{ minHeight: "100vh", background: "#f0faf5", fontFamily: "'Georgia',serif" }}>
        <NAV onHome={() => setView("home")} onExplore={() => setView("list")} onAI={() => setView("ai")} />
        <div style={{ maxWidth: "780px", margin: "0 auto", padding: "1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
            <h1 style={{ fontSize: "1.8rem", color: "#0f3d28", margin: "0 0 0.4rem" }}>🧮 Trip Cost Calculator</h1>
            <p style={{ color: "#5a7a6a", fontSize: "0.9rem", margin: 0 }}>Enter your details and get a full personalized trip plan with day-by-day itinerary</p>
          </div>

          {/* Input Card */}
          <div style={{ ...card, padding: "1.5rem", marginBottom: "1.25rem" }}>
            <h2 style={{ fontSize: "1rem", color: "#0f3d28", marginBottom: "1.25rem" }}>⚙️ Your Trip Details</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: "1rem" }}>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#5a7a6a", fontWeight: "600", display: "block", marginBottom: "0.4rem" }}>🗺️ Destination</label>
                <select value={calcSpot.id} onChange={e => setCalcSpot(spots.find(s => s.id === parseInt(e.target.value)))} style={{ width: "100%", padding: "0.65rem", borderRadius: "10px", border: "1.5px solid #c0e0d0", fontSize: "0.9rem", background: "#f8fdfb", color: "#0f3d28", outline: "none" }}>
                  {spots.map(s => <option key={s.id} value={s.id}>{s.image} {s.name}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#5a7a6a", fontWeight: "600", display: "block", marginBottom: "0.4rem" }}>📅 Number of Days</label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <button onClick={() => setCalcDays(Math.max(2, calcDays - 1))} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #c0e0d0", background: "white", cursor: "pointer", fontSize: "1.1rem", color: "#1a6b4a", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ fontSize: "1.4rem", fontWeight: "700", color: "#0f3d28", minWidth: "32px", textAlign: "center" }}>{calcDays}</span>
                  <button onClick={() => setCalcDays(Math.min(14, calcDays + 1))} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #c0e0d0", background: "white", cursor: "pointer", fontSize: "1.1rem", color: "#1a6b4a", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#5a7a6a", fontWeight: "600", display: "block", marginBottom: "0.4rem" }}>👥 Number of People</label>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <button onClick={() => setCalcPeople(Math.max(1, calcPeople - 1))} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #c0e0d0", background: "white", cursor: "pointer", fontSize: "1.1rem", color: "#1a6b4a", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                  <span style={{ fontSize: "1.4rem", fontWeight: "700", color: "#0f3d28", minWidth: "32px", textAlign: "center" }}>{calcPeople}</span>
                  <button onClick={() => setCalcPeople(Math.min(20, calcPeople + 1))} style={{ width: "36px", height: "36px", borderRadius: "50%", border: "1.5px solid #c0e0d0", background: "white", cursor: "pointer", fontSize: "1.1rem", color: "#1a6b4a", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
                </div>
              </div>
              <div>
                <label style={{ fontSize: "0.8rem", color: "#5a7a6a", fontWeight: "600", display: "block", marginBottom: "0.4rem" }}>💰 Budget Type</label>
                <div style={{ display: "flex", gap: "0.4rem" }}>
                  {[["budget", "🎒 Budget"], ["mid", "🏩 Mid"], ["luxury", "💎 Luxury"]].map(([v, l]) => (
                    <button key={v} onClick={() => setCalcBudget(v)} style={{ flex: 1, padding: "0.55rem 0.2rem", borderRadius: "10px", border: "1.5px solid", borderColor: calcBudget === v ? "#1a6b4a" : "#c0e0d0", background: calcBudget === v ? "#1a6b4a" : "white", color: calcBudget === v ? "white" : "#5a7a6a", cursor: "pointer", fontSize: "0.7rem", fontWeight: "600" }}>{l}</button>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={runCalc} style={{ width: "100%", marginTop: "1.25rem", background: "linear-gradient(135deg,#ffd700,#ff9500)", color: "#1a1a1a", border: "none", padding: "0.9rem", borderRadius: "12px", fontSize: "1rem", fontWeight: "700", cursor: "pointer", boxShadow: "0 4px 20px rgba(255,200,0,0.3)" }}>
              🧮 Calculate Full Trip Plan
            </button>
          </div>

          {/* Results */}
          {calcResult && (() => {
            const r = calcResult;
            const perPerson = Math.round(r.total / calcPeople);
            return (
              <>
                {/* Summary */}
                <div style={{ backgroundImage: gradientFor(calcSpot.color), borderRadius: "16px", padding: "1.5rem", marginBottom: "1.25rem", color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div>
                      <div style={{ fontSize: "0.8rem", opacity: 0.8, marginBottom: "0.3rem" }}>{calcSpot.image} {calcSpot.name} · {calcDays} days · {calcPeople} {calcPeople === 1 ? "person" : "people"}</div>
                      <div style={{ fontSize: "2.5rem", fontWeight: "800" }}>{fmt(r.total)}</div>
                      <div style={{ fontSize: "0.85rem", opacity: 0.85 }}>Total estimated cost</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.6rem", fontWeight: "700" }}>{fmt(perPerson)}</div>
                      <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>per person</div>
                    </div>
                  </div>
                </div>

                {/* Breakdown */}
                <div style={{ ...card, padding: "1.25rem", marginBottom: "1.25rem" }}>
                  <h2 style={{ fontSize: "1rem", color: "#0f3d28", marginBottom: "1rem" }}>📊 Cost Breakdown</h2>
                  {[
                    ["🚌 Transport (both ways)", r.transport, "#dbeafe", "#1d4ed8"],
                    ["🏨 Hotel (" + r.nights + " nights)", r.hotel, "#dcfce7", "#15803d"],
                    ["🍽️ Food (" + calcDays + " days)", r.food, "#fef9c3", "#854d0e"],
                    ["🎟️ Activities & Misc", r.misc, "#fce7f3", "#9d174d"],
                  ].map(([label, val, bg, col]) => (
                    <div key={label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.7rem 0.9rem", background: bg, borderRadius: "10px", marginBottom: "0.5rem" }}>
                      <span style={{ fontSize: "0.88rem", color: "#2d3a30", fontWeight: "500" }}>{label}</span>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontWeight: "700", color: col, fontSize: "0.95rem" }}>{fmt(val)}</div>
                        <div style={{ fontSize: "0.7rem", color: "#8a9a90" }}>{fmt(Math.round(val / calcPeople))}/person</div>
                      </div>
                    </div>
                  ))}
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "0.85rem 0.9rem", background: "#f0faf5", borderRadius: "10px", borderTop: "2px solid #1a6b4a", marginTop: "0.25rem" }}>
                    <span style={{ fontWeight: "700", color: "#0f3d28" }}>Total</span>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontWeight: "800", color: "#0f3d28", fontSize: "1.05rem" }}>{fmt(r.total)}</div>
                      <div style={{ fontSize: "0.7rem", color: "#5a7a6a" }}>{fmt(perPerson)}/person</div>
                    </div>
                  </div>
                </div>

                {/* Recommended */}
                <div style={{ ...card, padding: "1.25rem", marginBottom: "1.25rem" }}>
                  <h2 style={{ fontSize: "1rem", color: "#0f3d28", marginBottom: "0.85rem" }}>⭐ Recommended for Your Budget</h2>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div style={{ background: "#f0faf5", borderRadius: "12px", padding: "0.9rem" }}>
                      <div style={{ fontSize: "0.7rem", color: "#5a7a6a", marginBottom: "0.3rem" }}>🚌 TRANSPORT</div>
                      <div style={{ fontWeight: "700", color: "#0f3d28", fontSize: "0.9rem" }}>{r.transportRec.type}</div>
                      <div style={{ fontSize: "0.8rem", color: "#1a8a4a" }}>{r.transportRec.cost}</div>
                    </div>
                    <div style={{ background: "#f0faf5", borderRadius: "12px", padding: "0.9rem" }}>
                      <div style={{ fontSize: "0.7rem", color: "#5a7a6a", marginBottom: "0.3rem" }}>🏨 HOTEL</div>
                      <div style={{ fontWeight: "700", color: "#0f3d28", fontSize: "0.9rem" }}>{r.hotelRec.name}</div>
                      <div style={{ fontSize: "0.8rem", color: "#1a8a4a" }}>{r.hotelRec.price}</div>
                    </div>
                  </div>
                </div>

                {/* Day-by-Day Itinerary */}
                <div style={{ ...card, padding: "1.25rem", marginBottom: "1.25rem" }}>
                  <h2 style={{ fontSize: "1rem", color: "#0f3d28", marginBottom: "1rem" }}>🗓️ Day-by-Day Itinerary</h2>
                  {r.itinerary.map((day, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
                      <div style={{ minWidth: "42px", height: "42px", borderRadius: "50%", backgroundImage: gradientFor(calcSpot.color), display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "800", fontSize: "0.85rem", flexShrink: 0 }}>D{day.day}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: "700", color: "#0f3d28", fontSize: "0.9rem", marginBottom: "0.35rem" }}>{day.title}</div>
                        {day.activities.map((a, j) => (
                          <div key={j} style={{ fontSize: "0.82rem", color: "#5a7a6a", padding: "0.25rem 0", borderBottom: j < day.activities.length - 1 ? "1px dotted #e0f0e8" : "none" }}>• {a}</div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button onClick={() => { setInput(`I'm planning a ${calcDays}-day ${calcBudget} trip to ${calcSpot.name} for ${calcPeople} people with a total budget of ${fmt(r.total)}. Give me more tips!`); setView("ai"); }} style={{ flex: 1, background: "linear-gradient(135deg,#0f4c35,#1a6b4a)", color: "white", border: "none", padding: "0.85rem", borderRadius: "12px", fontSize: "0.9rem", fontWeight: "700", cursor: "pointer" }}>🤖 Get AI Tips for This Plan</button>
                  <button onClick={() => setCalcResult(null)} style={{ background: "white", color: "#1a6b4a", border: "1.5px solid #c0e0d0", padding: "0.85rem 1.2rem", borderRadius: "12px", fontSize: "0.9rem", cursor: "pointer", fontWeight: "600" }}>🔄 Reset</button>
                </div>
              </>
            );
          })()}
        </div>
      </div>
    );
  }

  // ── AI CHAT ─────────────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "#f0faf5", fontFamily: "'Georgia',serif" }}>
      <NAV onHome={() => setView("home")} onExplore={() => setView("list")} onCalc={() => setView("calc")} />
      <div style={{ padding: "0.75rem 1.25rem", background: "white", borderBottom: "1px solid #e0f0e8", display: "flex", gap: "0.4rem", overflowX: "auto" }}>
        {["Best beach under ৳5,000?", "Plan 3-day Sylhet trip", "Best time for Sundarbans?", "Hidden offbeat destinations", "Budget Bandarban trip"].map(q => (
          <button key={q} onClick={() => setInput(q)} style={{ background: "#e8f5ef", border: "1px solid #c0e0d0", color: "#1a6b4a", padding: "0.35rem 0.85rem", borderRadius: "20px", fontSize: "0.75rem", cursor: "pointer", whiteSpace: "nowrap", fontWeight: "600" }}>{q}</button>
        ))}
      </div>
      <div style={{ flex: 1, padding: "1.25rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "80%", padding: "0.85rem 1.1rem", borderRadius: m.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.role === "user" ? "linear-gradient(135deg,#0f4c35,#1a6b4a)" : "white", color: m.role === "user" ? "white" : "#1a3028", fontSize: "0.92rem", lineHeight: 1.7, boxShadow: "0 2px 10px rgba(0,80,40,0.08)", whiteSpace: "pre-wrap" }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex" }}>
            <div style={{ background: "white", padding: "0.85rem 1.1rem", borderRadius: "18px 18px 18px 4px", boxShadow: "0 2px 10px rgba(0,80,40,0.08)", display: "flex", gap: "4px", alignItems: "center" }}>
              {[0, 0.2, 0.4].map(d => <div key={d} style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#1a6b4a", animation: "bounce 0.8s ease infinite", animationDelay: `${d}s` }} />)}
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>
      <div style={{ padding: "0.85rem 1.25rem", background: "white", borderTop: "1px solid #e0f0e8", display: "flex", gap: "0.65rem" }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && !e.shiftKey && sendMessage()} placeholder="Ask about budget, destinations, hotels..." style={{ flex: 1, padding: "0.8rem 1.1rem", borderRadius: "25px", border: "1.5px solid #c0e0d0", fontSize: "0.9rem", outline: "none", background: "#f8fdfb" }} />
        <button onClick={sendMessage} disabled={loading || !input.trim()} style={{ background: "linear-gradient(135deg,#0f4c35,#1a6b4a)", color: "white", border: "none", borderRadius: "50%", width: "44px", height: "44px", fontSize: "1.1rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, opacity: loading || !input.trim() ? 0.5 : 1 }}>↑</button>
      </div>
      <style>{`@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}
