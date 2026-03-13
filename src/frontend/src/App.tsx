import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertTriangle, CheckCircle, Clock, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { PortalLogo } from "./components/PortalLogo";
import { PrivacyPolicyScreen } from "./components/PrivacyPolicy";
import { useActor } from "./hooks/useActor";

const queryClient = new QueryClient();

// ========================
// DATA
// ========================
const SERVICES = [
  // Repairs
  { id: 1, emoji: "🔧", name: "Plumber", price: 800, category: "Repairs" },
  { id: 2, emoji: "⚡", name: "Electrician", price: 750, category: "Repairs" },
  { id: 3, emoji: "🪚", name: "Carpenter", price: 1200, category: "Repairs" },
  { id: 4, emoji: "🎨", name: "Painter", price: 900, category: "Repairs" },
  { id: 5, emoji: "❄️", name: "HVAC Tech", price: 2500, category: "Repairs" },
  // Home
  { id: 6, emoji: "🧹", name: "Cleaner", price: 500, category: "Home" },
  { id: 7, emoji: "🌿", name: "Gardener", price: 600, category: "Home" },
  { id: 8, emoji: "👨‍🍳", name: "Chef", price: 1500, category: "Home" },
  // Health
  {
    id: 9,
    emoji: "👨‍⚕️",
    name: "Doctor Visit",
    price: 2000,
    category: "Health",
  },
  { id: 10, emoji: "💉", name: "Nurse Care", price: 1200, category: "Health" },
  {
    id: 11,
    emoji: "🧘",
    name: "Physiotherapist",
    price: 1800,
    category: "Health",
  },
  { id: 12, emoji: "🦷", name: "Dental Care", price: 2500, category: "Health" },
  // Rentals
  { id: 13, emoji: "🚗", name: "Car Rental", price: 3500, category: "Rentals" },
  { id: 14, emoji: "🛵", name: "Bike Rental", price: 800, category: "Rentals" },
  {
    id: 15,
    emoji: "🏠",
    name: "Property Rental",
    price: 5000,
    category: "Rentals",
  },
  { id: 16, emoji: "🚐", name: "Van Hire", price: 2500, category: "Rentals" },
  // Education
  { id: 17, emoji: "📚", name: "Tutor", price: 700, category: "Education" },
  {
    id: 18,
    emoji: "🗣️",
    name: "Language Teacher",
    price: 900,
    category: "Education",
  },
  // Security & Tech
  {
    id: 19,
    emoji: "🛡️",
    name: "Security Guard",
    price: 1100,
    category: "Security",
  },
  { id: 20, emoji: "💻", name: "IT Support", price: 800, category: "Tech" },
  // Transport
  { id: 21, emoji: "🚗", name: "Driver", price: 400, category: "Transport" },
  // Health additions
  {
    id: 22,
    emoji: "💊",
    name: "Medical Store",
    price: 500,
    category: "Health",
  },
  { id: 23, emoji: "🏥", name: "Pharmacy", price: 500, category: "Health" },
  // Education additions
  {
    id: 24,
    emoji: "📖",
    name: "Book Store",
    price: 400,
    category: "Education",
  },
  // Groceries
  {
    id: 25,
    emoji: "🛒",
    name: "Grocery Store",
    price: 300,
    category: "Groceries",
  },
  // Shopping
  {
    id: 26,
    emoji: "🛒",
    name: "Supermarket",
    price: 500,
    category: "Shopping",
  },
  {
    id: 27,
    emoji: "👗",
    name: "Clothing Store",
    price: 1200,
    category: "Shopping",
  },
  {
    id: 28,
    emoji: "📱",
    name: "Electronics Shop",
    price: 2000,
    category: "Shopping",
  },
  {
    id: 29,
    emoji: "📝",
    name: "Stationary Shop",
    price: 400,
    category: "Shopping",
  },
  {
    id: 30,
    emoji: "🏪",
    name: "General Store",
    price: 300,
    category: "Shopping",
  },
  // Rentals additions
  {
    id: 31,
    emoji: "✈️",
    name: "Travel Tickets",
    price: 5000,
    category: "Rentals",
  },
  {
    id: 32,
    emoji: "🚐",
    name: "Driver Booking",
    price: 600,
    category: "Rentals",
  },
];

const PROVIDERS = [
  // Repairs
  {
    id: 1,
    name: "Usman Tariq",
    initials: "UT",
    profession: "Plumber",
    category: "Repairs",
    distance: "0.3 km",
    rating: 4.9,
    rate: 850,
  },
  {
    id: 2,
    name: "Bilal Hassan",
    initials: "BH",
    profession: "Electrician",
    category: "Repairs",
    distance: "0.8 km",
    rating: 4.7,
    rate: 780,
  },
  {
    id: 3,
    name: "Zubair Khan",
    initials: "ZK",
    profession: "Carpenter",
    category: "Repairs",
    distance: "1.4 km",
    rating: 4.5,
    rate: 1250,
  },
  {
    id: 4,
    name: "Asad Mehmood",
    initials: "AM",
    profession: "HVAC Tech",
    category: "Repairs",
    distance: "2.1 km",
    rating: 4.2,
    rate: 2600,
  },
  {
    id: 5,
    name: "Naveed Painter",
    initials: "NP",
    profession: "Painter",
    category: "Repairs",
    distance: "1.8 km",
    rating: 4.6,
    rate: 950,
  },
  // Health
  {
    id: 6,
    name: "Dr. Ayesha Malik",
    initials: "AM",
    profession: "Doctor",
    category: "Health",
    distance: "0.5 km",
    rating: 4.9,
    rate: 2000,
  },
  {
    id: 7,
    name: "Nurse Farah Siddiqui",
    initials: "FS",
    profession: "Nurse Care",
    category: "Health",
    distance: "0.9 km",
    rating: 4.8,
    rate: 1200,
  },
  {
    id: 8,
    name: "Dr. Tariq Dental",
    initials: "TD",
    profession: "Dental Care",
    category: "Health",
    distance: "1.3 km",
    rating: 4.7,
    rate: 2500,
  },
  {
    id: 9,
    name: "MedStore Saleem",
    initials: "MS",
    profession: "Medical Store",
    category: "Health",
    distance: "0.4 km",
    rating: 4.6,
    rate: 500,
  },
  {
    id: 10,
    name: "PharmaCare Hussain",
    initials: "PH",
    profession: "Pharmacy",
    category: "Health",
    distance: "0.7 km",
    rating: 4.5,
    rate: 500,
  },
  {
    id: 11,
    name: "Dr. Rehana Physio",
    initials: "RP",
    profession: "Physiotherapist",
    category: "Health",
    distance: "2.0 km",
    rating: 4.8,
    rate: 1800,
  },
  // Home
  {
    id: 12,
    name: "Chef Nadeem Rizvi",
    initials: "NR",
    profession: "Chef",
    category: "Home",
    distance: "1.1 km",
    rating: 4.8,
    rate: 1500,
  },
  {
    id: 13,
    name: "Cleaner Razia Bibi",
    initials: "RB",
    profession: "Cleaner",
    category: "Home",
    distance: "0.6 km",
    rating: 4.5,
    rate: 500,
  },
  {
    id: 14,
    name: "Gardener Tariq Baig",
    initials: "TB",
    profession: "Gardener",
    category: "Home",
    distance: "1.7 km",
    rating: 4.4,
    rate: 600,
  },
  {
    id: 15,
    name: "HomeHelp Nadia",
    initials: "HN",
    profession: "Maid Service",
    category: "Home",
    distance: "0.8 km",
    rating: 4.6,
    rate: 700,
  },
  // Rentals
  {
    id: 16,
    name: "CityDrive Cars",
    initials: "CC",
    profession: "Car Rental",
    category: "Rentals",
    distance: "1.2 km",
    rating: 4.7,
    rate: 3500,
  },
  {
    id: 17,
    name: "SpeedBike Asif",
    initials: "SA",
    profession: "Bike Rental",
    category: "Rentals",
    distance: "0.5 km",
    rating: 4.5,
    rate: 800,
  },
  {
    id: 18,
    name: "TravelPak Tickets",
    initials: "TP",
    profession: "Travel Tickets",
    category: "Rentals",
    distance: "2.3 km",
    rating: 4.8,
    rate: 5000,
  },
  {
    id: 19,
    name: "Driver Imran Khan",
    initials: "IK",
    profession: "Driver",
    category: "Rentals",
    distance: "0.4 km",
    rating: 4.9,
    rate: 600,
  },
  {
    id: 20,
    name: "PakVan Rentals",
    initials: "PV",
    profession: "Van Hire",
    category: "Rentals",
    distance: "3.1 km",
    rating: 4.3,
    rate: 2500,
  },
  // Education
  {
    id: 21,
    name: "Tutor Zainab Noor",
    initials: "ZN",
    profession: "Tutor",
    category: "Education",
    distance: "0.7 km",
    rating: 4.9,
    rate: 700,
  },
  {
    id: 22,
    name: "Language Pro Baig",
    initials: "LB",
    profession: "Language Teacher",
    category: "Education",
    distance: "1.5 km",
    rating: 4.7,
    rate: 900,
  },
  {
    id: 23,
    name: "BookHub Rawalpindi",
    initials: "BR",
    profession: "Book Store",
    category: "Education",
    distance: "1.9 km",
    rating: 4.4,
    rate: 400,
  },
  {
    id: 24,
    name: "Tutor Arif Qureshi",
    initials: "AQ",
    profession: "Math Teacher",
    category: "Education",
    distance: "2.2 km",
    rating: 4.6,
    rate: 800,
  },
  // Security
  {
    id: 25,
    name: "Guard Services Akbar",
    initials: "GA",
    profession: "Security Guard",
    category: "Security",
    distance: "1.0 km",
    rating: 4.5,
    rate: 1100,
  },
  {
    id: 26,
    name: "SecurePak Ahmed",
    initials: "SP",
    profession: "Security Guard",
    category: "Security",
    distance: "2.4 km",
    rating: 4.3,
    rate: 1000,
  },
  {
    id: 27,
    name: "Elite Guards Rana",
    initials: "EG",
    profession: "Armed Guard",
    category: "Security",
    distance: "3.0 km",
    rating: 4.7,
    rate: 1500,
  },
  // Tech
  {
    id: 28,
    name: "TechFix Salman",
    initials: "TS",
    profession: "IT Support",
    category: "Tech",
    distance: "0.8 km",
    rating: 4.8,
    rate: 800,
  },
  {
    id: 29,
    name: "DevPro Kamran",
    initials: "DK",
    profession: "Web Developer",
    category: "Tech",
    distance: "1.6 km",
    rating: 4.9,
    rate: 2500,
  },
  {
    id: 30,
    name: "NetWork Ali",
    initials: "NA",
    profession: "Network Engineer",
    category: "Tech",
    distance: "2.0 km",
    rating: 4.6,
    rate: 1200,
  },
  // Transport
  {
    id: 31,
    name: "Driver Hassan Butt",
    initials: "HB",
    profession: "Driver",
    category: "Transport",
    distance: "0.3 km",
    rating: 4.9,
    rate: 400,
  },
  {
    id: 32,
    name: "Rider Faisal Mirza",
    initials: "FM",
    profession: "Delivery Rider",
    category: "Transport",
    distance: "0.6 km",
    rating: 4.7,
    rate: 300,
  },
  {
    id: 33,
    name: "Captain Shahid",
    initials: "CS",
    profession: "Airport Transfer",
    category: "Transport",
    distance: "4.5 km",
    rating: 4.8,
    rate: 1500,
  },
  // Groceries
  {
    id: 34,
    name: "FreshMart Karachi",
    initials: "FK",
    profession: "Grocery Store",
    category: "Groceries",
    distance: "0.4 km",
    rating: 4.6,
    rate: 300,
  },
  {
    id: 35,
    name: "DailyNeeds Rasheed",
    initials: "DR",
    profession: "Grocery Delivery",
    category: "Groceries",
    distance: "0.9 km",
    rating: 4.5,
    rate: 350,
  },
  {
    id: 36,
    name: "OrganicHub Sana",
    initials: "OS",
    profession: "Organic Grocery",
    category: "Groceries",
    distance: "1.8 km",
    rating: 4.8,
    rate: 400,
  },
  // Shopping
  {
    id: 37,
    name: "FashionZone Lahore",
    initials: "FZ",
    profession: "Clothing Store",
    category: "Shopping",
    distance: "1.3 km",
    rating: 4.5,
    rate: 1200,
  },
  {
    id: 38,
    name: "TechBazaar Online",
    initials: "TB",
    profession: "Electronics Shop",
    category: "Shopping",
    distance: "2.1 km",
    rating: 4.7,
    rate: 2000,
  },
  {
    id: 39,
    name: "Stationery World",
    initials: "SW",
    profession: "Stationary Shop",
    category: "Shopping",
    distance: "0.8 km",
    rating: 4.4,
    rate: 400,
  },
  {
    id: 40,
    name: "SuperStore Uzma",
    initials: "SU",
    profession: "General Store",
    category: "Shopping",
    distance: "1.5 km",
    rating: 4.3,
    rate: 300,
  },
];

const CHATS = [
  {
    id: 1,
    name: "Usman Tariq",
    lastMsg: "I'll be there in 20 minutes",
    time: "2m ago",
    initials: "UT",
  },
  {
    id: 2,
    name: "Bilal Hassan",
    lastMsg: "Work completed, please verify",
    time: "1h ago",
    initials: "BH",
  },
  {
    id: 3,
    name: "Zubair Khan",
    lastMsg: "Thanks for the great rating!",
    time: "3h ago",
    initials: "ZK",
  },
];

const MESSAGES = [
  {
    id: 1,
    from: "provider",
    text: "Assalamualaikum! I have received your request.",
    time: "10:02",
  },
  {
    id: 2,
    from: "provider",
    text: "I will reach your location in about 20-25 minutes. Please keep the main switch accessible.",
    time: "10:04",
  },
  {
    id: 3,
    from: "user",
    text: "Sure, I'll be home. Please call when you arrive!",
    time: "10:06",
  },
];

const PORTALS_BANK = {
  bankName: "Meezan Bank Limited",
  accountTitle: "The Portals (Pvt) Ltd",
  accountNumber: "0291-0123456789",
  iban: "PK36MEZN0000291012345678",
  branch: "Karachi Main Branch",
};

// ========================
// UTILS
// ========================
function generatePortalId(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from(
    { length: 5 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
}

// ========================
// SCREEN TYPES
// ========================
type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "register"
  | "provider-register"
  | "home"
  | "services"
  | "providers"
  | "confirmed"
  | "payment"
  | "locked"
  | "otp"
  | "success"
  | "chat"
  | "profile"
  | "settings"
  | "bank-transfer-confirm"
  | "provider-withdrawal"
  | "provider-deletion"
  | "provider-topup"
  | "customer-register"
  | "invoice"
  | "privacy"
  | "serviceBooking"
  | "provider-pricing";

type NavTab = "home" | "tasks" | "chat" | "profile";

// ========================
// SHARED COMPONENTS
// ========================
function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      data-ocid="nav.button"
      onClick={onClick}
      style={{
        background: "rgba(0,255,255,0.08)",
        border: "1px solid rgba(0,255,255,0.3)",
        borderRadius: 8,
        color: "#00ffff",
        padding: "6px 12px",
        cursor: "pointer",
        fontFamily: "Orbitron, sans-serif",
        fontSize: "0.7rem",
        letterSpacing: "0.08em",
      }}
    >
      ← BACK
    </button>
  );
}

function ScreenHeader({
  title,
  onBack,
}: { title: string; onBack?: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 20,
        paddingTop: 8,
      }}
    >
      {onBack && <BackButton onClick={onBack} />}
      <h2
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.9rem",
          fontWeight: 800,
          color: "#00ffff",
          letterSpacing: "0.15em",
          textShadow: "0 0 12px rgba(0,255,255,0.5)",
          margin: 0,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function BottomNav({
  active,
  onNav,
}: { active: NavTab; onNav: (t: NavTab) => void }) {
  const tabs: { key: NavTab; icon: string; label: string }[] = [
    { key: "home", icon: "🏠", label: "Home" },
    { key: "tasks", icon: "📋", label: "Tasks" },
    { key: "chat", icon: "💬", label: "Chat" },
    { key: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <nav className="bottom-nav">
      {tabs.map((t) => (
        <button
          key={t.key}
          type="button"
          data-ocid={`nav.${t.key}.link`}
          className={`bottom-nav-item${active === t.key ? " active" : ""}`}
          onClick={() => onNav(t.key)}
        >
          <span className="nav-icon">{t.icon}</span>
          {t.label}
        </button>
      ))}
    </nav>
  );
}

// ========================
// SCREEN 0: SPLASH
// ========================
function SplashScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 32,
        padding: 24,
      }}
    >
      {/* Wormhole P Logo */}
      <div style={{ position: "relative", width: 120, height: 120 }}>
        {/* Orbiting rings */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            border: "1px solid rgba(0,255,255,0.3)",
          }}
          className="wormhole-spin"
        />
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: "50%",
            border: "1px dashed rgba(0,255,255,0.2)",
            animationDirection: "reverse",
          }}
          className="wormhole-spin"
        />
        {/* Outer glow ring */}
        <div
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: "50%",
            border: "2px solid rgba(0,255,255,0.1)",
          }}
          className="pulse-ring"
        />
        <div
          style={{
            position: "absolute",
            inset: -20,
            borderRadius: "50%",
            border: "2px solid rgba(0,255,255,0.1)",
          }}
          className="pulse-ring-2"
        />
        {/* P Logo center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PortalLogo size={100} />
        </div>
        {/* Orbiting dots */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 8,
            height: 8,
            marginTop: -4,
            marginLeft: -4,
            animation: "orbit 3s linear infinite",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              background: "#00ffff",
              borderRadius: "50%",
              boxShadow: "0 0 6px #00ffff",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: 6,
            height: 6,
            marginTop: -3,
            marginLeft: -3,
            animation: "orbit2 4s linear infinite reverse",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              background: "#50ffb0",
              borderRadius: "50%",
              boxShadow: "0 0 6px #50ffb0",
            }}
          />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "1.8rem",
            fontWeight: 900,
            color: "#00ffff",
            letterSpacing: "0.2em",
            textShadow: "0 0 20px rgba(0,255,255,0.6)",
            margin: "0 0 4px",
          }}
        >
          THE PORTALS
        </h1>
        <p
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.85rem",
            color: "rgba(176,255,255,0.6)",
            letterSpacing: "0.25em",
            margin: 0,
            textTransform: "uppercase",
          }}
        >
          Portals to Services
        </p>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={`dot-${i}`}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#00ffff",
              animation: `loading-dots 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ========================
// SCREEN 1: ONBOARDING
// ========================
const SLIDES = [
  {
    icon: "📡",
    title: "Find Skilled Experts Nearby",
    desc: "Connect with verified professionals in Karachi. From plumbers to IT experts — just a tap away.",
  },
  {
    icon: "🔒",
    title: "Escrow-Protected Payments",
    desc: "Your PKR stays locked in escrow until work is verified. Safe, transparent, and dispute-free.",
  },
  {
    icon: "⭐",
    title: "Rate & Build Trust",
    desc: "Every job rated. Every provider accountable. Build the city's most trusted service network.",
  },
];

function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [slide, setSlide] = useState(0);
  const cur = SLIDES[slide];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        gap: 40,
      }}
    >
      <div
        style={{
          textAlign: "center",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 24,
        }}
      >
        <div
          className="float-anim"
          style={{
            fontSize: "5rem",
            lineHeight: 1,
            filter: "drop-shadow(0 0 20px rgba(0,255,255,0.5))",
          }}
        >
          {cur.icon}
        </div>
        <h2
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "1.3rem",
            fontWeight: 800,
            color: "#f0f0f0",
            letterSpacing: "0.05em",
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          {cur.title}
        </h2>
        <p
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "1.05rem",
            color: "rgba(176,255,255,0.7)",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {cur.desc}
        </p>
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: 8 }}>
        {SLIDES.map((s, i) => (
          <div
            key={s.title}
            style={{
              width: i === slide ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: i === slide ? "#00ffff" : "rgba(0,255,255,0.25)",
              transition: "all 0.3s ease",
              boxShadow: i === slide ? "0 0 8px #00ffff" : "none",
            }}
          />
        ))}
      </div>

      <div style={{ width: "100%", display: "flex", gap: 12 }}>
        <button
          type="button"
          data-ocid="onboarding.cancel_button"
          className="btn-portal ghost-btn"
          style={{ flex: 1, padding: "14px" }}
          onClick={onDone}
        >
          SKIP
        </button>
        {slide < 2 ? (
          <button
            type="button"
            data-ocid="onboarding.primary_button"
            className="btn-portal"
            style={{ flex: 2 }}
            onClick={() => setSlide((s) => s + 1)}
          >
            NEXT →
          </button>
        ) : (
          <button
            type="button"
            data-ocid="onboarding.submit_button"
            className="btn-portal emerald-btn"
            style={{ flex: 2 }}
            onClick={onDone}
          >
            GET STARTED
          </button>
        )}
      </div>
    </div>
  );
}

// ========================
// SCREEN 2: LOGIN
// ========================
function LoginScreen({
  onDone,
  onRegister,
}: { onDone: () => void; onRegister: () => void }) {
  const [mode, setMode] = useState<"customer" | "provider">("customer");
  const [portalId, setPortalId] = useState("");

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 24,
        gap: 24,
      }}
    >
      {/* Logo */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
        }}
      >
        <PortalLogo size={90} />
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "2rem",
            fontWeight: 900,
            color: "#00ffff",
            textShadow: "0 0 20px rgba(0,255,255,0.6)",
          }}
        >
          THE PORTALS
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            color: "rgba(176,255,255,0.5)",
            fontSize: "0.8rem",
            letterSpacing: "0.2em",
          }}
        >
          PORTALS TO SERVICES
        </div>
      </div>

      {/* Mode tabs */}
      <div
        className="glass"
        style={{ display: "flex", padding: 4, gap: 4, borderRadius: 12 }}
      >
        {(["customer", "provider"] as const).map((m) => (
          <button
            key={m}
            type="button"
            data-ocid={`login.${m}.tab`}
            onClick={() => setMode(m)}
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: 8,
              border: "none",
              background: mode === m ? "rgba(0,255,255,0.15)" : "transparent",
              color: mode === m ? "#00ffff" : "rgba(176,255,255,0.4)",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow: mode === m ? "0 0 8px rgba(0,255,255,0.3)" : "none",
            }}
          >
            {m.toUpperCase()}
          </button>
        ))}
      </div>

      <div
        className="glass"
        style={{
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.75rem",
            color: "rgba(176,255,255,0.6)",
            letterSpacing: "0.15em",
            alignSelf: "flex-start",
          }}
        >
          PORTAL ID
        </div>
        <input
          className="portal-input"
          data-ocid="login.input"
          type="text"
          placeholder="XXXXX"
          maxLength={5}
          value={portalId}
          onChange={(e) => setPortalId(e.target.value.toUpperCase())}
          style={{
            width: "100%",
            textAlign: "center",
            fontFamily: "monospace",
            fontSize: "2rem",
            fontWeight: 700,
            letterSpacing: "0.4em",
            color: "#00ffff",
            textShadow: "0 0 12px rgba(0,255,255,0.6)",
            background: "rgba(0,255,255,0.05)",
            border: "1px solid rgba(0,255,255,0.4)",
            borderRadius: 12,
            padding: "14px 20px",
            outline: "none",
          }}
        />
        <p
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.75rem",
            color: "rgba(176,255,255,0.45)",
            margin: 0,
            textAlign: "center",
          }}
        >
          Enter your 5-character unique Portal ID — no password needed
        </p>

        <button
          type="button"
          data-ocid="login.primary_button"
          className="btn-portal"
          onClick={onDone}
          style={{ width: "100%" }}
        >
          ENTER PORTAL
        </button>

        <div
          style={{
            width: "100%",
            height: 1,
            background: "rgba(0,255,255,0.15)",
          }}
        />

        <button
          type="button"
          data-ocid="login.register.link"
          onClick={onRegister}
          style={{
            background: "none",
            border: "none",
            color: "rgba(0,255,255,0.7)",
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.95rem",
            cursor: "pointer",
            letterSpacing: "0.05em",
            textDecoration: "underline",
          }}
        >
          Not registered? Create Account
        </button>
      </div>
    </div>
  );
}

// ========================
function RegisterScreen({
  onBack,
  onProviderRegister,
  onCustomerRegister,
}: {
  onBack: () => void;
  onProviderRegister: () => void;
  onCustomerRegister: () => void;
}) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
        }}
      >
        {/* Back */}
        <button
          data-ocid="register.back.button"
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#00ffff",
            cursor: "pointer",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.1em",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← BACK
        </button>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(0,255,255,0.3) 0%, rgba(0,255,255,0.05) 70%)",
              border: "2px solid rgba(0,255,255,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px",
              boxShadow: "0 0 30px rgba(0,255,255,0.4)",
            }}
          >
            <span
              style={{
                fontSize: "28px",
                fontFamily: "Orbitron, sans-serif",
                color: "#00ffff",
                fontWeight: 900,
              }}
            >
              P
            </span>
          </div>
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "22px",
              fontWeight: 700,
              color: "#e8f4f8",
              letterSpacing: "0.15em",
              margin: "0 0 8px",
            }}
          >
            CREATE ACCOUNT
          </h1>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "14px",
              color: "rgba(232,244,248,0.6)",
              letterSpacing: "0.05em",
            }}
          >
            How would you like to join The Portals?
          </p>
        </div>

        {/* Option Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Portal User */}
          <button
            data-ocid="register.portal_user.card"
            type="button"
            onClick={onCustomerRegister}
            style={{
              background: "rgba(0,255,255,0.05)",
              border: "1px solid rgba(0,255,255,0.3)",
              borderRadius: "16px",
              padding: "24px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
              backdropFilter: "blur(10px)",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,255,255,0.12)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 20px rgba(0,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,255,255,0.05)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(0,255,255,0.15)",
                  border: "1px solid rgba(0,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <span style={{ fontSize: "22px" }}>👤</span>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#00ffff",
                    letterSpacing: "0.1em",
                    margin: "0 0 4px",
                  }}
                >
                  PORTAL USER
                </p>
                <p
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "14px",
                    color: "rgba(232,244,248,0.7)",
                    margin: 0,
                  }}
                >
                  Book services, track orders & manage payments
                </p>
              </div>
              <span
                style={{
                  color: "#00ffff",
                  fontSize: "18px",
                  marginLeft: "auto",
                }}
              >
                →
              </span>
            </div>
          </button>

          {/* Service Provider */}
          <button
            data-ocid="register.provider.card"
            type="button"
            onClick={onProviderRegister}
            style={{
              background: "rgba(0,255,255,0.08)",
              border: "1px solid rgba(0,255,255,0.5)",
              borderRadius: "16px",
              padding: "24px",
              cursor: "pointer",
              textAlign: "left",
              transition: "all 0.2s",
              backdropFilter: "blur(10px)",
              width: "100%",
              boxShadow: "0 0 15px rgba(0,255,255,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,255,255,0.15)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 30px rgba(0,255,255,0.4)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "rgba(0,255,255,0.08)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow =
                "0 0 15px rgba(0,255,255,0.15)";
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  background: "rgba(0,255,255,0.2)",
                  border: "1px solid rgba(0,255,255,0.6)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 0 12px rgba(0,255,255,0.3)",
                }}
              >
                <span style={{ fontSize: "22px" }}>🔧</span>
              </div>
              <div>
                <p
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#00ffff",
                    letterSpacing: "0.1em",
                    margin: "0 0 4px",
                  }}
                >
                  SERVICE PROVIDER
                </p>
                <p
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "14px",
                    color: "rgba(232,244,248,0.7)",
                    margin: 0,
                  }}
                >
                  Offer services, earn PKR & grow your business
                </p>
                <p
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "12px",
                    color: "rgba(0,255,255,0.8)",
                    margin: "4px 0 0",
                  }}
                >
                  First 2 services FREE · Wallet min PKR 2,000
                </p>
              </div>
              <span
                style={{
                  color: "#00ffff",
                  fontSize: "18px",
                  marginLeft: "auto",
                }}
              >
                →
              </span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ========================
// SCREEN: PROVIDER REGISTER
// ========================
const _PROFESSIONS = [
  "Plumber",
  "Electrician",
  "Carpenter",
  "Painter",
  "Mechanic",
  "Tutor",
  "Doctor",
  "Cleaner",
  "Chef",
  "Driver",
  "Tailor",
  "Security Guard",
];

function ProviderRegisterScreen({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const [step, setStep] = useState(1);
  const [portalId] = useState(() => generatePortalId());
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const providerFileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    cnic: "",
    city: "",
    email: "",
    serviceCategory: "",
    bankName: "",
    accountTitle: "",
    accountNumber: "",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,255,255,0.05)",
    border: "1px solid rgba(0,255,255,0.3)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#e8f4f8",
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "Orbitron, sans-serif",
    fontSize: "10px",
    letterSpacing: "0.12em",
    color: "rgba(0,255,255,0.8)",
    display: "block",
    marginBottom: "6px",
  };

  const fieldStyle: React.CSSProperties = { marginBottom: "16px" };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <button
          data-ocid="provider_register.back.button"
          type="button"
          onClick={step === 1 ? onBack : () => setStep((s) => s - 1)}
          style={{
            background: "none",
            border: "none",
            color: "#00ffff",
            cursor: "pointer",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.1em",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← BACK
        </button>

        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#e8f4f8",
              letterSpacing: "0.12em",
              margin: "0 0 8px",
            }}
          >
            SERVICE PROVIDER REGISTRATION
          </h1>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            {[1, 2].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: "4px",
                  borderRadius: "2px",
                  background: s <= step ? "#00ffff" : "rgba(0,255,255,0.2)",
                  boxShadow: s <= step ? "0 0 8px rgba(0,255,255,0.6)" : "none",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "13px",
              color: "rgba(232,244,248,0.5)",
              marginTop: "8px",
            }}
          >
            Step {step} of 2 —{" "}
            {step === 1 ? "Personal Information" : "Bank Account & Summary"}
          </p>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div data-ocid="provider_register.step.1">
            {/* Profile Photo Upload */}
            <div style={{ ...fieldStyle, textAlign: "center" }}>
              <span style={labelStyle}>PROFILE PHOTO (OPTIONAL)</span>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  marginTop: 8,
                }}
              >
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      border: "3px solid rgba(0,255,255,0.5)",
                      boxShadow: "0 0 24px rgba(0,255,255,0.3)",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(0,60,80,0.95), rgba(0,10,20,0.98))",
                      border: "3px solid rgba(0,255,255,0.3)",
                      boxShadow: "0 0 16px rgba(0,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "2rem",
                      color: "rgba(0,255,255,0.5)",
                    }}
                  >
                    👤
                  </div>
                )}
                <button
                  type="button"
                  data-ocid="provider_register.upload_button"
                  onClick={() => providerFileInputRef.current?.click()}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(0,255,255,0.2)",
                    border: "2px solid rgba(0,255,255,0.6)",
                    boxShadow: "0 0 10px rgba(0,255,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  📷
                </button>
                <input
                  ref={providerFileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) =>
                        setProfilePic(ev.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>FULL NAME</span>
              <input
                data-ocid="provider_register.fullname.input"
                type="text"
                placeholder="Muhammad Ali Khan"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>PHONE NUMBER</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <div
                  style={{
                    ...inputStyle,
                    width: "80px",
                    flexShrink: 0,
                    color: "rgba(0,255,255,0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +92
                </div>
                <input
                  data-ocid="provider_register.phone.input"
                  type="tel"
                  placeholder="3001234567"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  style={{ ...inputStyle }}
                />
              </div>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>CNIC</span>
              <input
                data-ocid="provider_register.cnic.input"
                type="text"
                placeholder="42101-1234567-1"
                value={form.cnic}
                onChange={(e) => handleChange("cnic", e.target.value)}
                maxLength={15}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>EMAIL ADDRESS</span>
              <input
                data-ocid="provider_register.email.input"
                type="email"
                placeholder="provider@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>CITY</span>
              <input
                data-ocid="provider_register.city.input"
                type="text"
                placeholder="Karachi"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>SERVICE CATEGORY</span>
              <select
                data-ocid="provider_register.service_category.select"
                value={form.serviceCategory}
                onChange={(e) =>
                  handleChange("serviceCategory", e.target.value)
                }
                style={{
                  ...inputStyle,
                  appearance: "none" as const,
                  cursor: "pointer",
                }}
              >
                <option value="" style={{ background: "#05070A" }}>
                  Select Category
                </option>
                {[
                  "Repairs",
                  "Health",
                  "Home",
                  "Rentals",
                  "Education",
                  "Security",
                  "Tech",
                  "Transport",
                  "Groceries",
                  "Shopping",
                ].map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    style={{ background: "#05070A" }}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <button
              data-ocid="provider_register.complete_registration.button"
              type="button"
              className="btn-portal"
              onClick={() => setStep(2)}
              style={{ width: "100%", marginTop: "8px" }}
            >
              COMPLETE REGISTRATION
            </button>
          </div>
        )}

        {/* Step 2: Bank Details + Summary */}
        {step === 2 && (
          <div data-ocid="provider_register.step.2">
            <div style={fieldStyle}>
              <span style={labelStyle}>BANK NAME</span>
              <input
                data-ocid="provider_register.bank_name.input"
                type="text"
                placeholder="Meezan Bank"
                value={form.bankName}
                onChange={(e) => handleChange("bankName", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>ACCOUNT TITLE</span>
              <input
                data-ocid="provider_register.account_title.input"
                type="text"
                placeholder="Muhammad Ali Khan"
                value={form.accountTitle}
                onChange={(e) => handleChange("accountTitle", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>ACCOUNT NUMBER</span>
              <input
                data-ocid="provider_register.account_number.input"
                type="text"
                placeholder="0291-0123456789"
                value={form.accountNumber}
                onChange={(e) => handleChange("accountNumber", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Summary Card */}
            <div
              style={{
                background: "rgba(0,255,255,0.06)",
                border: "1px solid rgba(0,255,255,0.4)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(0,255,255,0.7)",
                  margin: "0 0 14px",
                }}
              >
                REGISTRATION SUMMARY
              </p>

              <div style={{ marginBottom: "14px", textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "12px",
                    color: "rgba(232,244,248,0.5)",
                    margin: "0 0 4px",
                  }}
                >
                  YOUR PORTAL ID
                </p>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(0,255,255,0.1)",
                    border: "1px solid rgba(0,255,255,0.6)",
                    borderRadius: "10px",
                    padding: "10px 24px",
                    boxShadow: "0 0 20px rgba(0,255,255,0.3)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#00ffff",
                      textShadow: "0 0 16px rgba(0,255,255,0.8)",
                      letterSpacing: "0.3em",
                    }}
                  >
                    {portalId}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "14px",
                    color: "rgba(232,244,248,0.6)",
                  }}
                >
                  Wallet Balance
                </span>
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "14px",
                    color: "#00ffff",
                  }}
                >
                  PKR 0
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "14px",
                    color: "rgba(232,244,248,0.6)",
                  }}
                >
                  Free Service Tokens
                </span>
                <span
                  style={{
                    background: "rgba(0,200,80,0.15)",
                    border: "1px solid rgba(0,200,80,0.4)",
                    borderRadius: "6px",
                    padding: "2px 10px",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "12px",
                    color: "#00c850",
                  }}
                >
                  🎫 2 FREE
                </span>
              </div>

              <div
                style={{
                  background: "rgba(0,255,255,0.06)",
                  border: "1px solid rgba(0,255,255,0.25)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "12px",
                  color: "rgba(0,255,255,0.8)",
                  lineHeight: 1.5,
                }}
              >
                ⚠️ Your Portal ID is your only login key — keep it safe!
              </div>
            </div>

            <button
              data-ocid="provider_register.submit.button"
              type="button"
              className="btn-portal"
              onClick={onDone}
              style={{ width: "100%" }}
            >
              COMPLETE REGISTRATION
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
// ========================
// SCREEN: CUSTOMER REGISTER
// ========================
function CustomerRegisterScreen({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const [step, setStep] = useState(1);
  const [portalId] = useState(() => generatePortalId());
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const customerFileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    cnic: "",
    email: "",
    city: "",
    serviceCategory: "",
    bankName: "",
    accountTitle: "",
    accountNumber: "",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,255,255,0.05)",
    border: "1px solid rgba(0,255,255,0.3)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#e8f4f8",
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "15px",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "Orbitron, sans-serif",
    fontSize: "10px",
    letterSpacing: "0.12em",
    color: "rgba(0,255,255,0.8)",
    display: "block",
    marginBottom: "6px",
  };

  const fieldStyle: React.CSSProperties = { marginBottom: "16px" };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "24px",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        <button
          data-ocid="customer_register.back.button"
          type="button"
          onClick={step === 1 ? onBack : () => setStep((s) => s - 1)}
          style={{
            background: "none",
            border: "none",
            color: "#00ffff",
            cursor: "pointer",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "12px",
            letterSpacing: "0.1em",
            marginBottom: "24px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          ← BACK
        </button>

        <div style={{ marginBottom: "28px" }}>
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "18px",
              fontWeight: 700,
              color: "#e8f4f8",
              letterSpacing: "0.12em",
              margin: "0 0 8px",
            }}
          >
            PORTAL USER REGISTRATION
          </h1>
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            {[1, 2].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: "4px",
                  borderRadius: "2px",
                  background: s <= step ? "#00ffff" : "rgba(0,255,255,0.2)",
                  boxShadow: s <= step ? "0 0 8px rgba(0,255,255,0.6)" : "none",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "13px",
              color: "rgba(232,244,248,0.5)",
              marginTop: "8px",
            }}
          >
            Step {step} of 2 —{" "}
            {step === 1 ? "Personal Information" : "Bank Account & Summary"}
          </p>
        </div>

        {/* Step 1: Personal Info */}
        {step === 1 && (
          <div data-ocid="customer_register.step.1">
            {/* Profile Photo Upload */}
            <div style={{ ...fieldStyle, textAlign: "center" }}>
              <span style={labelStyle}>PROFILE PHOTO (OPTIONAL)</span>
              <div
                style={{
                  display: "inline-block",
                  position: "relative",
                  marginTop: 8,
                }}
              >
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt="Profile"
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      border: "3px solid rgba(0,255,255,0.5)",
                      boxShadow: "0 0 24px rgba(0,255,255,0.3)",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      borderRadius: "50%",
                      background:
                        "radial-gradient(circle, rgba(0,60,80,0.95), rgba(0,10,20,0.98))",
                      border: "3px solid rgba(0,255,255,0.3)",
                      boxShadow: "0 0 16px rgba(0,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "2rem",
                      color: "rgba(0,255,255,0.5)",
                    }}
                  >
                    👤
                  </div>
                )}
                <button
                  type="button"
                  data-ocid="customer_register.upload_button"
                  onClick={() => customerFileInputRef.current?.click()}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    width: 28,
                    height: 28,
                    borderRadius: "50%",
                    background: "rgba(0,255,255,0.2)",
                    border: "2px solid rgba(0,255,255,0.6)",
                    boxShadow: "0 0 10px rgba(0,255,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    fontSize: "0.8rem",
                  }}
                >
                  📷
                </button>
                <input
                  ref={customerFileInputRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (ev) =>
                        setProfilePic(ev.target?.result as string);
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>FULL NAME</span>
              <input
                data-ocid="customer_register.fullname.input"
                type="text"
                placeholder="Muhammad Ahmed Khan"
                value={form.fullName}
                onChange={(e) => handleChange("fullName", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>PHONE NUMBER</span>
              <div style={{ display: "flex", gap: "8px" }}>
                <div
                  style={{
                    ...inputStyle,
                    width: "80px",
                    flexShrink: 0,
                    color: "rgba(0,255,255,0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +92
                </div>
                <input
                  data-ocid="customer_register.phone.input"
                  type="tel"
                  placeholder="3001234567"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  style={{ ...inputStyle }}
                />
              </div>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>CNIC</span>
              <input
                data-ocid="customer_register.cnic.input"
                type="text"
                placeholder="42101-1234567-1"
                value={form.cnic}
                onChange={(e) => handleChange("cnic", e.target.value)}
                maxLength={15}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>EMAIL ADDRESS</span>
              <input
                data-ocid="customer_register.email.input"
                type="email"
                placeholder="user@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>CITY</span>
              <input
                data-ocid="customer_register.city.input"
                type="text"
                placeholder="Karachi"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>SERVICE CATEGORY</span>
              <select
                data-ocid="customer_register.service_category.select"
                value={form.serviceCategory}
                onChange={(e) =>
                  handleChange("serviceCategory", e.target.value)
                }
                style={{
                  ...inputStyle,
                  appearance: "none" as const,
                  cursor: "pointer",
                }}
              >
                <option value="" style={{ background: "#05070A" }}>
                  Select Category
                </option>
                {[
                  "Repairs",
                  "Health",
                  "Home",
                  "Rentals",
                  "Education",
                  "Security",
                  "Tech",
                  "Transport",
                  "Groceries",
                  "Shopping",
                ].map((cat) => (
                  <option
                    key={cat}
                    value={cat}
                    style={{ background: "#05070A" }}
                  >
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <button
              data-ocid="customer_register.complete_registration.button"
              type="button"
              className="btn-portal"
              onClick={() => setStep(2)}
              style={{ width: "100%", marginTop: "8px" }}
            >
              COMPLETE REGISTRATION
            </button>
          </div>
        )}

        {/* Step 2: Bank Details + Summary */}
        {step === 2 && (
          <div data-ocid="customer_register.step.2">
            <div style={fieldStyle}>
              <span style={labelStyle}>BANK NAME</span>
              <input
                data-ocid="customer_register.bank_name.input"
                type="text"
                placeholder="HBL / Meezan / MCB"
                value={form.bankName}
                onChange={(e) => handleChange("bankName", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>ACCOUNT TITLE</span>
              <input
                data-ocid="customer_register.account_title.input"
                type="text"
                placeholder="Muhammad Ahmed Khan"
                value={form.accountTitle}
                onChange={(e) => handleChange("accountTitle", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>ACCOUNT NUMBER</span>
              <input
                data-ocid="customer_register.account_number.input"
                type="text"
                placeholder="0291-0123456789"
                value={form.accountNumber}
                onChange={(e) => handleChange("accountNumber", e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Summary Card */}
            <div
              style={{
                background: "rgba(0,255,255,0.06)",
                border: "1px solid rgba(0,255,255,0.4)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "20px",
              }}
            >
              <p
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  color: "rgba(0,255,255,0.7)",
                  margin: "0 0 14px",
                }}
              >
                REGISTRATION SUMMARY
              </p>

              <div style={{ marginBottom: "14px", textAlign: "center" }}>
                <p
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "12px",
                    color: "rgba(232,244,248,0.5)",
                    margin: "0 0 4px",
                  }}
                >
                  YOUR PORTAL ID
                </p>
                <div
                  style={{
                    display: "inline-block",
                    background: "rgba(0,255,255,0.1)",
                    border: "1px solid rgba(0,255,255,0.6)",
                    borderRadius: "10px",
                    padding: "10px 24px",
                    boxShadow: "0 0 20px rgba(0,255,255,0.3)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "2rem",
                      fontWeight: 700,
                      color: "#00ffff",
                      textShadow: "0 0 16px rgba(0,255,255,0.8)",
                      letterSpacing: "0.3em",
                    }}
                  >
                    {portalId}
                  </span>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "14px",
                    color: "rgba(232,244,248,0.6)",
                  }}
                >
                  Wallet Balance
                </span>
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "14px",
                    color: "#00ffff",
                  }}
                >
                  PKR 0
                </span>
              </div>

              <div
                style={{
                  background: "rgba(0,255,255,0.06)",
                  border: "1px solid rgba(0,255,255,0.25)",
                  borderRadius: "8px",
                  padding: "10px 14px",
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "12px",
                  color: "rgba(0,255,255,0.8)",
                  lineHeight: 1.5,
                }}
              >
                ⚠️ Your Portal ID is your only login key — keep it safe!
              </div>
            </div>

            <button
              data-ocid="customer_register.submit.button"
              type="button"
              className="btn-portal"
              onClick={onDone}
              style={{ width: "100%" }}
            >
              COMPLETE REGISTRATION
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// SCREEN: PROVIDER TOP-UP
// ========================
function ProviderTopUpScreen({
  onBack,
  onDone,
}: {
  onBack: () => void;
  onDone: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const inputStyle = {
    width: "100%",
    background: "rgba(0,255,255,0.05)",
    border: "1px solid rgba(0,255,255,0.25)",
    borderRadius: "10px",
    padding: "12px 14px",
    color: "#e0f8ff",
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box" as const,
  };

  const labelStyle = {
    fontFamily: "Orbitron, sans-serif",
    fontSize: "10px",
    letterSpacing: "0.12em",
    color: "rgba(0,255,255,0.7)",
    marginBottom: "6px",
    display: "block",
  };

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="TOP UP REQUIRED" onBack={onBack} />

      {/* Warning banner */}
      <div
        style={{
          background: "rgba(255,140,0,0.08)",
          border: "1px solid rgba(255,140,0,0.45)",
          borderRadius: "14px",
          padding: "16px",
          marginBottom: "16px",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          boxShadow: "0 0 18px rgba(255,140,0,0.15)",
        }}
      >
        <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>⚠️</span>
        <div>
          <p
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.1em",
              color: "rgba(255,180,60,0.95)",
              margin: "0 0 6px",
            }}
          >
            FREE SERVICE QUOTA EXHAUSTED
          </p>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "13px",
              color: "rgba(255,200,80,0.85)",
              margin: 0,
              lineHeight: "1.5",
            }}
          >
            You have used your 2 free service deliveries. Top up your portal
            wallet to continue accepting services.
          </p>
        </div>
      </div>

      {/* Usage counter badge */}
      <div
        style={{
          background: "rgba(0,255,255,0.06)",
          border: "1px solid rgba(0,255,255,0.25)",
          borderRadius: "12px",
          padding: "14px 16px",
          marginBottom: "16px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "10px",
              letterSpacing: "0.12em",
              color: "rgba(0,255,255,0.8)",
            }}
          >
            FREE SERVICES USED
          </span>
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "#00ffff",
            }}
          >
            2 / 2
          </span>
        </div>
        <div
          style={{
            width: "100%",
            height: "6px",
            background: "rgba(255,255,255,0.08)",
            borderRadius: "999px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(90deg, #00ffff, #00c8c8)",
              borderRadius: "999px",
              boxShadow: "0 0 10px rgba(0,255,255,0.6)",
            }}
          />
        </div>
      </div>

      {/* Bank + Top-Up Form */}
      <div
        style={{
          background: "rgba(0,255,255,0.04)",
          border: "1px solid rgba(0,255,255,0.2)",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "16px",
        }}
      >
        {/* Saved bank details */}
        <p
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "10px",
            letterSpacing: "0.12em",
            color: "rgba(0,255,255,0.7)",
            margin: "0 0 14px",
          }}
        >
          BANK ACCOUNT DETAILS
        </p>
        {[
          { label: "Bank Name", value: "Meezan Bank" },
          { label: "Account Title", value: "Ali Khan" },
          { label: "Account Number", value: "0123456789012" },
        ].map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "8px 0",
              borderBottom: "1px solid rgba(0,255,255,0.08)",
            }}
          >
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "13px",
                color: "rgba(232,244,248,0.55)",
              }}
            >
              {label}
            </span>
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "13px",
                fontWeight: 600,
                color: "#e0f8ff",
              }}
            >
              {value}
            </span>
          </div>
        ))}
        <button
          type="button"
          data-ocid="provider_topup.edit_bank.button"
          style={{
            background: "none",
            border: "none",
            color: "#00ffff",
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "13px",
            fontWeight: 600,
            cursor: "pointer",
            padding: "10px 0 0",
            textDecoration: "underline",
            textDecorationStyle: "dashed" as const,
          }}
        >
          ✏️ Edit Bank Details
        </button>

        {/* Top-Up Amount */}
        <div style={{ marginTop: "16px" }}>
          <span style={labelStyle}>TOP-UP AMOUNT (PKR)</span>
          <input
            data-ocid="provider_topup.amount.input"
            type="number"
            placeholder="Enter amount (min. PKR 2,000)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={inputStyle}
          />
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "11px",
              color: "rgba(0,255,255,0.5)",
              margin: "5px 0 0",
            }}
          >
            Minimum wallet balance: PKR 2,000
          </p>
        </div>

        {/* Confirmation checkbox */}
        <label
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "10px",
            marginTop: "16px",
            cursor: "pointer",
          }}
        >
          <input
            data-ocid="provider_topup.confirm.checkbox"
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            style={{ marginTop: "3px", accentColor: "#00ffff" }}
          />
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "13px",
              color: "rgba(232,244,248,0.75)",
              lineHeight: "1.5",
            }}
          >
            I authorize The Portals to deduct the above amount from my
            registered bank account
          </span>
        </label>
      </div>

      {/* Confirm button */}
      <button
        type="button"
        data-ocid="provider_topup.submit.button"
        onClick={onDone}
        disabled={!confirmed || !amount}
        style={{
          width: "100%",
          padding: "14px",
          background:
            confirmed && amount
              ? "linear-gradient(135deg, rgba(0,255,255,0.35) 0%, rgba(0,200,200,0.2) 100%)"
              : "rgba(255,255,255,0.04)",
          border: `1px solid ${confirmed && amount ? "rgba(0,255,255,0.7)" : "rgba(255,255,255,0.1)"}`,
          borderRadius: "12px",
          color: confirmed && amount ? "#00ffff" : "rgba(255,255,255,0.25)",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "12px",
          fontWeight: 700,
          letterSpacing: "0.12em",
          cursor: confirmed && amount ? "pointer" : "not-allowed",
          boxShadow:
            confirmed && amount ? "0 0 22px rgba(0,255,255,0.3)" : "none",
          transition: "all 0.2s",
          marginBottom: "12px",
        }}
      >
        CONFIRM TOP-UP ✓
      </button>

      {/* Security note */}
      <p
        style={{
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "11px",
          color: "rgba(232,244,248,0.3)",
          textAlign: "center",
          lineHeight: "1.6",
        }}
      >
        🔒 Secured with bank-grade 256-bit encryption. Your financial data is
        protected by The Portals security protocols.
      </p>
    </div>
  );
}

// ========================
// SCREEN 3: HOME
// ========================
function HomeScreen({
  onServiceTap: _onServiceTap,
  onAllServices,
}: {
  onServiceTap: (s: (typeof SERVICES)[0]) => void;
  onAllServices: (category?: string) => void;
}) {
  const [activeCount, setActiveCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [onlineProviders, setOnlineProviders] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const target = 127;
    const duration = 1500;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setActiveCount(target);
        clearInterval(timer);
      } else {
        setActiveCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const targets = { users: 2847, providers: 1203 };
    const duration = 2000;
    const steps = 40;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setActiveUsers(Math.floor(targets.users * progress));
      setOnlineProviders(Math.floor(targets.providers * progress));
      if (step >= steps) {
        setActiveUsers(targets.users);
        setOnlineProviders(targets.providers);
        clearInterval(timer);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: "Repairs", emoji: "🔧", border: "rgba(251,146,60,0.4)" },
    { name: "Health", emoji: "❤️", border: "rgba(52,211,153,0.4)" },
    { name: "Rentals", emoji: "🔑", border: "rgba(180,180,180,0.4)" },
    { name: "Education", emoji: "📚", border: "rgba(251,191,36,0.4)" },
    { name: "Home", emoji: "🏠", border: "rgba(0,200,255,0.4)" },
    { name: "Transport", emoji: "🚗", border: "rgba(150,100,255,0.4)" },
    { name: "Groceries", emoji: "🛒", border: "rgba(100,220,100,0.4)" },
    { name: "Shopping", emoji: "🛍️", border: "rgba(255,100,200,0.4)" },
  ];

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          minHeight: "100dvh",
          maxWidth: 480,
          margin: "0 auto",
          width: "100%",
          padding: "16px 16px 80px",
        }}
      >
        {/* Top Bar */}
        <div
          className="glass-panel-strong"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "12px 16px",
            borderRadius: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <PortalLogo size="sm" />
            <span
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.8rem",
                fontWeight: 700,
                color: "#b0e0e8",
                letterSpacing: "0.12em",
              }}
            >
              THE PORTALS
            </span>
          </div>
          <div
            className="glass-panel"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 12px",
              borderRadius: 12,
            }}
          >
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.55rem",
                  color: "rgba(176,224,232,0.5)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                Portal Balance:
              </p>
              <p
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  color: "#b0e0e8",
                }}
              >
                ₨ 125,000
              </p>
            </div>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "rgba(0,255,255,0.08)",
                border: "1px solid rgba(0,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "rgba(176,224,232,0.7)",
                }}
              >
                U
              </span>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div
          className="glass-panel-strong"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "12px 16px",
            borderRadius: 16,
            marginTop: 12,
          }}
        >
          <span style={{ fontSize: "1rem", opacity: 0.5 }}>🔍</span>
          <input
            type="text"
            data-ocid="home.search_input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a portal..."
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#e0f8ff",
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.95rem",
              width: "100%",
            }}
          />
        </div>

        {/* Live Stats Bar */}
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <div
            className="glass-panel"
            style={{
              flex: 1,
              borderRadius: 14,
              padding: "10px 14px",
              border: "1px solid rgba(0,255,255,0.25)",
              boxShadow: "0 0 12px rgba(0,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 6px #22c55e",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                  opacity: 0.6,
                }}
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#00ffff",
                  lineHeight: 1,
                  marginBottom: 2,
                }}
              >
                {activeUsers.toLocaleString()}
              </p>
              <p
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.65rem",
                  color: "rgba(176,224,232,0.6)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                👥 Active Users
              </p>
            </div>
          </div>
          <div
            className="glass-panel"
            style={{
              flex: 1,
              borderRadius: 14,
              padding: "10px 14px",
              border: "1px solid rgba(0,255,255,0.25)",
              boxShadow: "0 0 12px rgba(0,255,255,0.1)",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div style={{ position: "relative", flexShrink: 0 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 6px #22c55e",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite 0.5s",
                  opacity: 0.6,
                }}
              />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#00ffff",
                  lineHeight: 1,
                  marginBottom: 2,
                }}
              >
                {onlineProviders.toLocaleString()}
              </p>
              <p
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.65rem",
                  color: "rgba(176,224,232,0.6)",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  lineHeight: 1,
                }}
              >
                ⚡ Providers Online
              </p>
            </div>
          </div>
        </div>

        {/* Center Wormhole */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: -16,
          }}
        >
          <div style={{ position: "relative", width: 280, height: 280 }}>
            <img
              src="/assets/generated/portal-wormhole-transparent.dim_576x576.png"
              alt="Portal Wormhole"
              className="animate-float"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                filter: "drop-shadow(0 0 40px rgba(0,255,255,0.3))",
              }}
            />
          </div>
          <div style={{ textAlign: "center", marginTop: -16 }}>
            <p
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.6rem",
                color: "rgba(176,224,232,0.5)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                marginBottom: 4,
              }}
            >
              Portals to Services
            </p>
            <p
              className="glow-text-cyan"
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1.8rem",
                fontWeight: 700,
                letterSpacing: "0.1em",
              }}
            >
              {activeCount} ACTIVE
            </p>
          </div>
        </div>

        {/* Bottom Category Bar */}
        <div
          className="glass-panel-strong"
          style={{ borderRadius: 16, padding: 16, marginBottom: 8 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat.name}
                data-ocid={`home.${cat.name.toLowerCase()}.button`}
                type="button"
                onClick={() => onAllServices(cat.name)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    background: "rgba(0,20,30,0.7)",
                    border: `1px solid ${cat.border}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
                    transition: "transform 0.15s",
                  }}
                >
                  {cat.emoji}
                </div>
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.55rem",
                    color: "rgba(176,224,232,0.6)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================
// SCREEN 4: ALL SERVICES
// ========================
const CATEGORY_META: Record<string, { emoji: string; color: string }> = {
  Repairs: { emoji: "🔧", color: "rgba(251,146,60,0.25)" },
  Health: { emoji: "🏥", color: "rgba(52,211,153,0.25)" },
  Home: { emoji: "🏠", color: "rgba(0,200,255,0.25)" },
  Rentals: { emoji: "🚗", color: "rgba(180,180,180,0.25)" },
  Education: { emoji: "📚", color: "rgba(251,191,36,0.25)" },
  Security: { emoji: "🛡️", color: "rgba(255,120,120,0.25)" },
  Tech: { emoji: "💻", color: "rgba(150,100,255,0.25)" },
  Transport: { emoji: "🚌", color: "rgba(100,180,255,0.25)" },
  Groceries: { emoji: "🛒", color: "rgba(100,220,100,0.25)" },
  Shopping: { emoji: "🛍️", color: "rgba(255,100,200,0.25)" },
};

const ALL_CATEGORIES = [
  "Repairs",
  "Health",
  "Home",
  "Rentals",
  "Education",
  "Security",
  "Tech",
  "Transport",
  "Groceries",
  "Shopping",
];

function AllServicesScreen({
  onBack,
  onSelect,
  onSelectProvider,
  category,
}: {
  onBack: () => void;
  onSelect: (s: (typeof SERVICES)[0]) => void;
  onSelectProvider?: (p: (typeof PROVIDERS)[0]) => void;
  category?: string;
}) {
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    category,
  );
  const filtered = activeCategory
    ? SERVICES.filter((s) => s.category === activeCategory)
    : SERVICES;
  const categoryProviders = activeCategory
    ? PROVIDERS.filter((p) => p.category === activeCategory)
    : [];
  const title = activeCategory
    ? `${activeCategory.toUpperCase()} SERVICES`
    : "ALL SERVICES";

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title={title} onBack={onBack} />

      {/* Back to categories chip */}
      {activeCategory && (
        <button
          type="button"
          data-ocid="services.tab"
          onClick={() => setActiveCategory(undefined)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(0,255,255,0.08)",
            border: "1px solid rgba(0,255,255,0.3)",
            borderRadius: 999,
            padding: "6px 16px",
            marginBottom: 16,
            cursor: "pointer",
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.85rem",
            color: "#00ffff",
            fontWeight: 600,
          }}
        >
          ← All Categories
        </button>
      )}

      {/* Step 1: Category Cards Grid */}
      {!activeCategory && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {ALL_CATEGORIES.map((cat, idx) => {
            const meta = CATEGORY_META[cat] ?? {
              emoji: "⭐",
              color: "rgba(0,255,255,0.2)",
            };
            const provCount = PROVIDERS.filter(
              (p) => p.category === cat,
            ).length;
            const svcCount = SERVICES.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                data-ocid={`services.item.${idx + 1}`}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: meta.color,
                  border: "1px solid rgba(0,255,255,0.25)",
                  borderRadius: 16,
                  padding: "20px 16px",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: 8,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 4px 20px rgba(0,255,255,0.08)",
                  transition: "all 0.2s",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: "2rem" }}>{meta.emoji}</span>
                <div>
                  <div
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      color: "#e0f8ff",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {cat}
                  </div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: "0.72rem",
                      color: "rgba(176,255,255,0.6)",
                      marginTop: 2,
                    }}
                  >
                    {svcCount} Services
                  </div>
                </div>
                <div
                  style={{
                    background: "rgba(0,255,255,0.12)",
                    border: "1px solid rgba(0,255,255,0.3)",
                    borderRadius: 999,
                    padding: "3px 10px",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.55rem",
                    color: "#00ffff",
                    letterSpacing: "0.08em",
                    fontWeight: 700,
                  }}
                >
                  {provCount} Providers
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Step 2: Services grid when category selected */}
      {activeCategory && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 10,
              marginBottom: 24,
            }}
          >
            {filtered.map((svc, idx) => (
              <button
                key={svc.id}
                type="button"
                data-ocid={`services.item.${idx + 1}`}
                className="glass"
                onClick={() => onSelect(svc)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "16px 8px",
                  gap: 6,
                  cursor: "pointer",
                  border: "1px solid rgba(0,255,255,0.15)",
                  transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>{svc.emoji}</span>
                <span
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "rgba(176,255,255,0.9)",
                    textAlign: "center",
                  }}
                >
                  {svc.name}
                </span>
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.55rem",
                    color: "#50ffb0",
                    letterSpacing: "0.05em",
                  }}
                >
                  ₨{svc.price.toLocaleString()}
                </span>
              </button>
            ))}
          </div>

          {/* Available Providers for this category */}
          {categoryProviders.length > 0 && (
            <div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "rgba(0,255,255,0.7)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: "rgba(0,255,255,0.4)",
                    display: "inline-block",
                  }}
                />
                AVAILABLE PROVIDERS
                <span
                  style={{
                    width: 24,
                    height: 1,
                    background: "rgba(0,255,255,0.4)",
                    display: "inline-block",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  paddingBottom: 8,
                  scrollbarWidth: "none",
                }}
              >
                {categoryProviders.map((p, i) => (
                  <div
                    key={p.id}
                    className="glass"
                    data-ocid={`services.provider.card.${i + 1}`}
                    style={{
                      flexShrink: 0,
                      width: 150,
                      padding: 14,
                      borderRadius: 14,
                      border: "1px solid rgba(0,255,255,0.2)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background:
                          "radial-gradient(circle, rgba(0,60,80,0.9), rgba(0,10,20,0.95))",
                        border: "2px solid rgba(0,255,255,0.4)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "0.7rem",
                        fontWeight: 700,
                        color: "#00ffff",
                      }}
                    >
                      {p.initials}
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <div
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "0.8rem",
                          fontWeight: 700,
                          color: "#f0f0f0",
                          lineHeight: 1.2,
                        }}
                      >
                        {p.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "0.65rem",
                          color: "rgba(176,255,255,0.5)",
                          marginTop: 2,
                        }}
                      >
                        {p.profession}
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        marginTop: 2,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "0.55rem",
                          color: "#ffd700",
                        }}
                      >
                        ⭐ {p.rating}
                      </span>
                      <span
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "0.65rem",
                          color: "rgba(176,255,255,0.5)",
                        }}
                      >
                        {p.distance}
                      </span>
                    </div>
                    <div
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "0.6rem",
                        color: "#50ffb0",
                        fontWeight: 700,
                      }}
                    >
                      ₨{p.rate}/hr
                    </div>
                    <button
                      type="button"
                      data-ocid={`services.provider.select.${i + 1}`}
                      onClick={() =>
                        onSelectProvider
                          ? onSelectProvider(p)
                          : onSelect(
                              SERVICES.find((s) => s.category === p.category) ??
                                SERVICES[0],
                            )
                      }
                      style={{
                        width: "100%",
                        background:
                          "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,180,200,0.15))",
                        border: "1px solid rgba(0,255,255,0.4)",
                        borderRadius: 8,
                        padding: "6px 0",
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "0.55rem",
                        fontWeight: 700,
                        color: "#00ffff",
                        cursor: "pointer",
                        letterSpacing: "0.08em",
                        marginTop: 4,
                      }}
                    >
                      SELECT
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ========================
// SCREEN 5: NEARBY PROVIDERS
// ========================

// ========================
// SERVICE BOOKING FORM SCREEN
// ========================
function ServiceBookingFormScreen({
  service,
  onBack,
  onSubmit,
}: {
  service: (typeof SERVICES)[0];
  onBack: () => void;
  onSubmit: (bookingDetails: Record<string, string>) => void;
}) {
  const [form, setForm] = useState<Record<string, string>>({
    appointmentType: "Clinic Visit",
    vehicleType: "",
    travelClass: "Economy",
    transportType: "Bus",
    propertyType: "Flat",
    duration: "Monthly",
    deliveryTime: "ASAP",
    paymentOnDelivery: "true",
    timeSlot: "",
  });

  const [itemIdCounter, setItemIdCounter] = useState(2);
  const [estimatedDistance, setEstimatedDistance] = useState<number | null>(
    null,
  );
  const [items, setItems] = useState<
    { id: number; name: string; quantity: string; unit: string }[]
  >([{ id: 1, name: "", quantity: "", unit: "" }]);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { id: itemIdCounter, name: "", quantity: "", unit: "" },
    ]);
    setItemIdCounter((c) => c + 1);
  };
  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((item) => item.id !== id));
  const updateItem = (id: number, field: string, val: string) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: val } : item)),
    );

  const set = (key: string, val: string) =>
    setForm((prev) => ({ ...prev, [key]: val }));

  const n = service.name.toLowerCase();
  const c = service.category.toLowerCase();

  const isHealth =
    c === "health" ||
    n.includes("doctor") ||
    n.includes("nurse") ||
    n.includes("dental") ||
    n.includes("home visit") ||
    n.includes("medical");

  const isCarRental =
    (c === "rentals" &&
      (n.includes("car") ||
        n.includes("van") ||
        n.includes("bike") ||
        n.includes("driver"))) ||
    c === "transport";

  const isTravelTicket = n.includes("travel ticket");

  const isProperty = n.includes("property");

  const isOrderable =
    c === "groceries" ||
    c === "shopping" ||
    n.includes("pharmacy") ||
    n.includes("medical store") ||
    n.includes("grocery") ||
    n.includes("stationary") ||
    n.includes("supermarket") ||
    n.includes("store") ||
    n.includes("shop");

  const isMedicine =
    n.includes("pharmacy") ||
    n.includes("medical store") ||
    n.includes("medicine");
  const isStationary = n.includes("stationary");
  const isGrocery = n.includes("grocery") || c === "groceries";
  const isShopping = c === "shopping";

  const isRepairs = c === "repairs";
  const isEducation =
    c === "education" || n.includes("tutor") || n.includes("teacher");
  const isSecurity =
    c === "security" || n.includes("guard") || n.includes("security");
  const isTechSupport =
    c === "tech" ||
    n.includes("it support") ||
    n.includes("laptop") ||
    n.includes("computer") ||
    n.includes("tech");
  const isHomeCleaning =
    (c === "home" ||
      n.includes("clean") ||
      n.includes("garden") ||
      n.includes("chef")) &&
    !isOrderable;

  const RIDER_FEE = 150;
  const PROVIDER_FEE = 500;
  const unitPrices: Record<string, number> = {
    medicine: 50,
    grocery: 100,
    stationary: 80,
    shopping: 200,
    default: 100,
  };
  const getUnitPrice = () => {
    if (isMedicine) return unitPrices.medicine;
    if (isGrocery) return unitPrices.grocery;
    if (isStationary) return unitPrices.stationary;
    if (isShopping) return unitPrices.shopping;
    return unitPrices.default;
  };
  const itemsTotal = items.reduce((sum, it) => {
    const qty = Number.parseFloat(it.quantity) || 0;
    return sum + qty * getUnitPrice();
  }, 0);
  const totalPayment = itemsTotal + RIDER_FEE + PROVIDER_FEE;

  const FARE_RATES: Record<string, number> = {
    Sedan: 45,
    SUV: 65,
    Van: 55,
    Motorcycle: 25,
    default: 40,
  };
  const getPerKmRate = () => FARE_RATES[form.vehicleType] || FARE_RATES.default;
  const estimatedFare = estimatedDistance
    ? Math.round(estimatedDistance * getPerKmRate())
    : null;

  const getItemPlaceholder = () => {
    if (isMedicine) return "e.g. Panadol Extra";
    if (isStationary) return "e.g. A4 Paper Ream";
    if (isGrocery) return "e.g. Basmati Rice";
    if (isShopping) return "e.g. Men's Shirt";
    return "Item name";
  };
  const getUnitOptions = () => {
    if (isMedicine) return ["Tablets", "Strip", "Box", "Bottle", "Syrup"];
    if (isGrocery) return ["kg", "g", "Litre", "Pack", "Pcs"];
    if (isStationary) return ["Pcs", "Pack", "Box", "Ream"];
    if (isShopping) return ["Pcs"];
    return ["Pcs", "Pack", "Box"];
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(0,255,255,0.05)",
    border: "1px solid rgba(0,255,255,0.25)",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#e0f7ff",
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "0.95rem",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "Orbitron, sans-serif",
    fontSize: "0.6rem",
    color: "rgba(0,255,255,0.7)",
    letterSpacing: "0.12em",
    display: "block",
    marginBottom: 6,
  };

  const chipActive: React.CSSProperties = {
    background: "rgba(0,255,255,0.25)",
    border: "1px solid #00ffff",
    borderRadius: 999,
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "0.82rem",
    color: "#00ffff",
    fontWeight: 700,
  };

  const chipInactive: React.CSSProperties = {
    background: "rgba(0,255,255,0.05)",
    border: "1px solid rgba(0,255,255,0.2)",
    borderRadius: 999,
    padding: "6px 14px",
    cursor: "pointer",
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "0.82rem",
    color: "rgba(176,255,255,0.6)",
    fontWeight: 600,
  };

  const fieldGap = 14;

  const renderChips = (fieldKey: string, options: string[]) => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          data-ocid="booking.tab"
          onClick={() => set(fieldKey, opt)}
          style={form[fieldKey] === opt ? chipActive : chipInactive}
        >
          {opt}
        </button>
      ))}
    </div>
  );

  const handleSubmit = () => {
    onSubmit({ ...form, orderItems: JSON.stringify(items) });
  };

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader
        title={`BOOK: ${service.name.toUpperCase()}`}
        onBack={onBack}
      />

      <div
        className="glass-panel"
        style={{
          borderRadius: 16,
          padding: "20px 16px",
          marginBottom: 16,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        <span style={{ fontSize: "2rem" }}>{service.emoji}</span>
        <div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "#00ffff",
            }}
          >
            {service.name}
          </div>
          <div
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.9rem",
              color: "rgba(176,255,255,0.7)",
            }}
          >
            PKR {service.price.toLocaleString()} base price
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: fieldGap }}>
        {/* ---- HEALTH ---- */}
        {isHealth && (
          <>
            <div>
              <span style={labelStyle}>APPOINTMENT TYPE</span>
              <div style={{ display: "flex", gap: 10 }}>
                {["🏥 Clinic Visit", "🏠 Home Visit"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    data-ocid="booking.tab"
                    onClick={() => set("appointmentType", opt)}
                    style={{
                      flex: 1,
                      ...(form.appointmentType === opt
                        ? chipActive
                        : chipInactive),
                      borderRadius: 12,
                      padding: "10px 8px",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span style={labelStyle}>PATIENT NAME</span>
              <input
                data-ocid="booking.input"
                style={inputStyle}
                placeholder="Full name of patient"
                value={form.patientName || ""}
                onChange={(e) => set("patientName", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>PATIENT AGE</span>
              <input
                data-ocid="booking.input"
                type="number"
                style={inputStyle}
                placeholder="Age in years"
                value={form.patientAge || ""}
                onChange={(e) => set("patientAge", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>PREFERRED DATE</span>
              <input
                data-ocid="booking.input"
                type="date"
                style={inputStyle}
                value={form.preferredDate || ""}
                onChange={(e) => set("preferredDate", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>PREFERRED TIME SLOT</span>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {[
                  "9:00 AM",
                  "10:00 AM",
                  "11:00 AM",
                  "12:00 PM",
                  "2:00 PM",
                  "3:00 PM",
                  "4:00 PM",
                  "5:00 PM",
                ].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    data-ocid="booking.tab"
                    onClick={() => set("timeSlot", slot)}
                    style={{
                      ...(form.timeSlot === slot ? chipActive : chipInactive),
                      padding: "5px 11px",
                      fontSize: "0.78rem",
                    }}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span style={labelStyle}>SYMPTOMS / REASON</span>
              <textarea
                data-ocid="booking.textarea"
                style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                placeholder="Describe symptoms or reason for visit"
                value={form.symptoms || ""}
                onChange={(e) => set("symptoms", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>SPECIAL NOTES (OPTIONAL)</span>
              <textarea
                data-ocid="booking.textarea"
                style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                placeholder="Any special requirements or notes"
                value={form.specialNotes || ""}
                onChange={(e) => set("specialNotes", e.target.value)}
              />
            </div>
          </>
        )}

        {/* ---- CAR / DRIVER RENTAL ---- */}
        {!isHealth && isCarRental && !isTravelTicket && !isProperty && (
          <>
            <div>
              <span style={labelStyle}>PICKUP LOCATION</span>
              <input
                data-ocid="booking.input"
                style={inputStyle}
                placeholder="Enter pickup address"
                value={form.pickupLocation || ""}
                onChange={(e) => set("pickupLocation", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>DESTINATION</span>
              <input
                data-ocid="booking.input"
                style={inputStyle}
                placeholder="Enter destination"
                value={form.destination || ""}
                onChange={(e) => set("destination", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>ESTIMATED DISTANCE (KM)</span>
              <input
                data-ocid="booking.input"
                type="number"
                style={inputStyle}
                placeholder="Enter approximate distance in km"
                value={estimatedDistance ?? ""}
                onChange={(e) =>
                  setEstimatedDistance(
                    e.target.value ? Number(e.target.value) : null,
                  )
                }
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <span style={labelStyle}>DATE</span>
                <input
                  data-ocid="booking.input"
                  type="date"
                  style={inputStyle}
                  value={form.rideDate || ""}
                  onChange={(e) => set("rideDate", e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <span style={labelStyle}>TIME</span>
                <input
                  data-ocid="booking.input"
                  type="time"
                  style={inputStyle}
                  value={form.rideTime || ""}
                  onChange={(e) => set("rideTime", e.target.value)}
                />
              </div>
            </div>
            <div>
              <span style={labelStyle}>VEHICLE TYPE</span>
              {renderChips("vehicleType", [
                "Sedan",
                "SUV",
                "Van",
                "Motorcycle",
              ])}
            </div>
            <div>
              <span style={labelStyle}>NUMBER OF PASSENGERS</span>
              <input
                data-ocid="booking.input"
                type="number"
                style={inputStyle}
                placeholder="How many passengers?"
                value={form.passengers || ""}
                onChange={(e) => set("passengers", e.target.value)}
              />
            </div>
            {estimatedFare !== null && estimatedDistance !== null && (
              <div
                data-ocid="booking.card"
                style={{
                  background: "rgba(0,255,255,0.08)",
                  border: "1px solid rgba(0,255,255,0.35)",
                  borderRadius: 14,
                  padding: "14px 16px",
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: 12,
                    color: "#00ffff",
                    letterSpacing: 2,
                    marginBottom: 10,
                  }}
                >
                  FARE ESTIMATE
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <span>Distance</span>
                  <span style={{ color: "#fff" }}>{estimatedDistance} km</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.8)",
                  }}
                >
                  <span>Rate ({form.vehicleType || "Standard"})</span>
                  <span style={{ color: "#fff" }}>PKR {getPerKmRate()}/km</span>
                </div>
                <div
                  style={{
                    borderTop: "1px solid rgba(0,255,255,0.2)",
                    marginTop: 8,
                    paddingTop: 8,
                    display: "flex",
                    justifyContent: "space-between",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: 13,
                    color: "#00ffff",
                  }}
                >
                  <span>Estimated Fare</span>
                  <span style={{ fontWeight: 700 }}>
                    PKR {estimatedFare?.toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: 12,
                    color: "rgba(0,255,255,0.6)",
                    fontStyle: "italic",
                  }}
                >
                  * Final fare may vary based on actual route
                </div>
              </div>
            )}
            <div>
              <span style={labelStyle}>SPECIAL REQUIREMENTS (OPTIONAL)</span>
              <input
                data-ocid="booking.input"
                style={inputStyle}
                placeholder="AC, child seat, etc."
                value={form.specialReq || ""}
                onChange={(e) => set("specialReq", e.target.value)}
              />
            </div>
          </>
        )}

        {/* ---- TRAVEL TICKETS ---- */}
        {isTravelTicket && (
          <>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <span style={labelStyle}>FROM CITY</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="Departure city"
                  value={form.fromCity || ""}
                  onChange={(e) => set("fromCity", e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <span style={labelStyle}>TO CITY</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="Destination city"
                  value={form.toCity || ""}
                  onChange={(e) => set("toCity", e.target.value)}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1 }}>
                <span style={labelStyle}>TRAVEL DATE</span>
                <input
                  data-ocid="booking.input"
                  type="date"
                  style={inputStyle}
                  value={form.travelDate || ""}
                  onChange={(e) => set("travelDate", e.target.value)}
                />
              </div>
              <div style={{ flex: 1 }}>
                <span style={labelStyle}>RETURN DATE (OPTIONAL)</span>
                <input
                  data-ocid="booking.input"
                  type="date"
                  style={inputStyle}
                  value={form.returnDate || ""}
                  onChange={(e) => set("returnDate", e.target.value)}
                />
              </div>
            </div>
            <div>
              <span style={labelStyle}>NUMBER OF PASSENGERS</span>
              <input
                data-ocid="booking.input"
                type="number"
                style={inputStyle}
                placeholder="How many passengers?"
                value={form.travelPassengers || ""}
                onChange={(e) => set("travelPassengers", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>TRAVEL CLASS</span>
              {renderChips("travelClass", [
                "Economy",
                "Business",
                "First Class",
              ])}
            </div>
            <div>
              <span style={labelStyle}>TRANSPORT TYPE</span>
              {renderChips("transportType", ["🚌 Bus", "🚆 Train", "✈️ Air"])}
            </div>
          </>
        )}

        {/* ---- PROPERTY RENTAL ---- */}
        {isProperty && (
          <>
            <div>
              <span style={labelStyle}>AREA / LOCALITY</span>
              <input
                data-ocid="booking.input"
                style={inputStyle}
                placeholder="Preferred area or locality"
                value={form.area || ""}
                onChange={(e) => set("area", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>PROPERTY TYPE</span>
              {renderChips("propertyType", ["Flat", "House", "Room", "Office"])}
            </div>
            <div>
              <span style={labelStyle}>DURATION</span>
              {renderChips("duration", ["Daily", "Weekly", "Monthly"])}
            </div>
            <div>
              <span style={labelStyle}>MOVE-IN DATE</span>
              <input
                data-ocid="booking.input"
                type="date"
                style={inputStyle}
                value={form.moveInDate || ""}
                onChange={(e) => set("moveInDate", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>BUDGET RANGE (PKR)</span>
              <input
                data-ocid="booking.input"
                style={inputStyle}
                placeholder="e.g., PKR 20,000 – 30,000"
                value={form.budget || ""}
                onChange={(e) => set("budget", e.target.value)}
              />
            </div>
            <div>
              <span style={labelStyle}>CONTACT NUMBER</span>
              <input
                data-ocid="booking.input"
                style={inputStyle}
                placeholder="Your phone number"
                value={form.contactNumber || ""}
                onChange={(e) => set("contactNumber", e.target.value)}
              />
            </div>
          </>
        )}

        {/* ---- ORDERABLE / SHOPPING / GROCERIES / MEDICINE ---- */}
        {!isHealth &&
          !isCarRental &&
          !isTravelTicket &&
          !isProperty &&
          isOrderable && (
            <>
              <div>
                <span style={labelStyle}>
                  {isMedicine
                    ? "MEDICINES & ITEMS"
                    : isStationary
                      ? "STATIONARY ITEMS"
                      : isGrocery
                        ? "GROCERY ITEMS"
                        : "ORDER ITEMS"}
                </span>
                {/* Dynamic Item Rows */}
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 10 }}
                >
                  {items.map((item, idx) => (
                    <div
                      key={item.id}
                      data-ocid={`booking.item.${idx + 1}`}
                      style={{
                        display: "flex",
                        gap: 6,
                        alignItems: "center",
                        background: "rgba(0,255,255,0.04)",
                        border: "1px solid rgba(0,255,255,0.15)",
                        borderRadius: 10,
                        padding: "8px 10px",
                      }}
                    >
                      <input
                        data-ocid="booking.item_name.input"
                        style={{
                          ...inputStyle,
                          flex: 2,
                          padding: "8px 10px",
                          fontSize: "0.85rem",
                        }}
                        placeholder={getItemPlaceholder()}
                        value={item.name}
                        onChange={(e) =>
                          updateItem(idx, "name", e.target.value)
                        }
                      />
                      <input
                        data-ocid="booking.item_qty.input"
                        type="number"
                        style={{
                          ...inputStyle,
                          width: 60,
                          padding: "8px 8px",
                          fontSize: "0.85rem",
                          textAlign: "center",
                        }}
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) =>
                          updateItem(idx, "quantity", e.target.value)
                        }
                      />
                      <select
                        style={{
                          ...inputStyle,
                          width: 80,
                          padding: "8px 6px",
                          fontSize: "0.8rem",
                          appearance: "none" as const,
                          cursor: "pointer",
                        }}
                        value={item.unit}
                        onChange={(e) =>
                          updateItem(idx, "unit", e.target.value)
                        }
                      >
                        <option value="" style={{ background: "#05070A" }}>
                          Unit
                        </option>
                        {getUnitOptions().map((u) => (
                          <option
                            key={u}
                            value={u}
                            style={{ background: "#05070A" }}
                          >
                            {u}
                          </option>
                        ))}
                      </select>
                      {items.length > 1 && (
                        <button
                          type="button"
                          data-ocid={`booking.remove_item.button.${idx + 1}`}
                          onClick={() => removeItem(item.id)}
                          style={{
                            background: "rgba(255,60,60,0.15)",
                            border: "1px solid rgba(255,60,60,0.4)",
                            borderRadius: 8,
                            color: "#ff6060",
                            width: 30,
                            height: 30,
                            cursor: "pointer",
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  data-ocid="booking.add_item.button"
                  onClick={addItem}
                  style={{
                    marginTop: 10,
                    width: "100%",
                    padding: "8px",
                    background: "rgba(0,255,255,0.08)",
                    border: "1px dashed rgba(0,255,255,0.4)",
                    borderRadius: 10,
                    color: "#00ffff",
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.08em",
                  }}
                >
                  + ADD ITEM
                </button>
              </div>

              {/* Cost Breakdown Panel */}
              <div
                style={{
                  background: "rgba(0,10,20,0.85)",
                  border: "1px solid rgba(0,255,255,0.35)",
                  borderRadius: 14,
                  padding: "16px",
                  boxShadow: "0 0 20px rgba(0,255,255,0.1)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.6rem",
                    color: "rgba(0,255,255,0.6)",
                    letterSpacing: "0.12em",
                    marginBottom: 12,
                  }}
                >
                  COST BREAKDOWN
                </div>
                {[
                  {
                    icon: "🛵",
                    label: "Rider / Delivery Charges",
                    value: RIDER_FEE,
                  },
                  {
                    icon: "👷",
                    label: "Service Provider Charges",
                    value: PROVIDER_FEE,
                  },
                  {
                    icon: "🛒",
                    label: "Estimated Items Total",
                    value: itemsTotal,
                  },
                ].map(({ icon, label, value }) => (
                  <div
                    key={label}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "6px 0",
                      borderBottom: "1px solid rgba(0,255,255,0.08)",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "0.9rem",
                        color: "rgba(176,255,255,0.8)",
                      }}
                    >
                      {icon} {label}
                    </span>
                    <span
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "0.75rem",
                        color: "#e0f7ff",
                      }}
                    >
                      PKR {value.toLocaleString()}
                    </span>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 12,
                    padding: "10px 0 0",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#00ffff",
                    }}
                  >
                    💰 TOTAL PAYMENT
                  </span>
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "1rem",
                      fontWeight: 700,
                      color: "#00ffff",
                      textShadow: "0 0 10px rgba(0,255,255,0.6)",
                    }}
                  >
                    PKR {totalPayment.toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <span style={labelStyle}>DELIVERY ADDRESS</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="Your delivery address"
                  value={form.deliveryAddress || ""}
                  onChange={(e) => set("deliveryAddress", e.target.value)}
                />
              </div>
              <div>
                <span style={labelStyle}>PREFERRED DELIVERY TIME</span>
                {renderChips("deliveryTime", [
                  "ASAP",
                  "Within 2 Hours",
                  "Today Evening",
                  "Tomorrow",
                ])}
              </div>
              <div>
                <span style={labelStyle}>SPECIAL INSTRUCTIONS (OPTIONAL)</span>
                <textarea
                  data-ocid="booking.textarea"
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                  placeholder="Allergies, alternatives, etc."
                  value={form.specialInstructions || ""}
                  onChange={(e) => set("specialInstructions", e.target.value)}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "10px 14px",
                  background: "rgba(0,255,255,0.05)",
                  border: "1px solid rgba(0,255,255,0.2)",
                  borderRadius: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.95rem",
                    color: "#e0f7ff",
                    fontWeight: 600,
                  }}
                >
                  Payment on Delivery
                </span>
                <button
                  type="button"
                  data-ocid="booking.toggle"
                  onClick={() =>
                    set(
                      "paymentOnDelivery",
                      form.paymentOnDelivery === "true" ? "false" : "true",
                    )
                  }
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 999,
                    background:
                      form.paymentOnDelivery === "true"
                        ? "#00ffff"
                        : "rgba(0,255,255,0.15)",
                    border: "none",
                    cursor: "pointer",
                    position: "relative",
                    transition: "background 0.2s",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: 2,
                      left: form.paymentOnDelivery === "true" ? 22 : 2,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background:
                        form.paymentOnDelivery === "true" ? "#05070A" : "#aaa",
                      transition: "left 0.2s",
                    }}
                  />
                </button>
              </div>
            </>
          )}

        {/* ---- REPAIRS ---- */}
        {!isHealth &&
          !isCarRental &&
          !isTravelTicket &&
          !isProperty &&
          !isOrderable &&
          isRepairs && (
            <>
              <div>
                <span style={labelStyle}>PROBLEM DESCRIPTION</span>
                <textarea
                  data-ocid="booking.textarea"
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                  placeholder="Describe the issue in detail"
                  value={form.description || ""}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>
              <div>
                <span style={labelStyle}>SCOPE OF WORK</span>
                {renderChips("scopeOfWork", [
                  "Inspection Only",
                  "Parts Replacement",
                  "Labour Only",
                  "Full Service",
                  "Emergency Fix",
                ])}
              </div>
              <div>
                <span style={labelStyle}>ESTIMATED MATERIAL COST (PKR)</span>
                <input
                  data-ocid="booking.input"
                  type="number"
                  style={inputStyle}
                  placeholder="e.g. 2500"
                  value={form.materialCost || ""}
                  onChange={(e) => set("materialCost", e.target.value)}
                />
              </div>
              <div>
                <span style={labelStyle}>URGENCY</span>
                {renderChips("urgency", ["Normal", "Urgent", "Emergency"])}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED DATE</span>
                  <input
                    data-ocid="booking.input"
                    type="date"
                    style={inputStyle}
                    value={form.preferredDate || ""}
                    onChange={(e) => set("preferredDate", e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED TIME</span>
                  <input
                    data-ocid="booking.input"
                    type="time"
                    style={inputStyle}
                    value={form.preferredTime || ""}
                    onChange={(e) => set("preferredTime", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <span style={labelStyle}>LOCATION / ADDRESS</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="Service location address"
                  value={form.location || ""}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>
              {form.materialCost && Number(form.materialCost) > 0 && (
                <div
                  data-ocid="repair.card"
                  style={{
                    background: "rgba(0,255,255,0.08)",
                    border: "1px solid rgba(0,255,255,0.35)",
                    borderRadius: 14,
                    padding: "14px 16px",
                    marginBottom: 4,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: 12,
                      color: "#00ffff",
                      letterSpacing: 2,
                      marginBottom: 10,
                    }}
                  >
                    TOTAL COST SUMMARY
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    <span>Base Service Charge</span>
                    <span style={{ color: "#fff" }}>
                      PKR {service.price.toLocaleString()}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: 14,
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    <span>Material Cost</span>
                    <span style={{ color: "#fff" }}>
                      PKR {Number(form.materialCost).toLocaleString()}
                    </span>
                  </div>
                  <div
                    style={{
                      borderTop: "1px solid rgba(0,255,255,0.2)",
                      marginTop: 8,
                      paddingTop: 8,
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: 13,
                      color: "#00ffff",
                    }}
                  >
                    <span>Total Estimate</span>
                    <span style={{ fontWeight: 700 }}>
                      PKR{" "}
                      {(
                        service.price + Number(form.materialCost)
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div
                    style={{
                      marginTop: 8,
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: 12,
                      color: "rgba(0,255,255,0.6)",
                      fontStyle: "italic",
                    }}
                  >
                    * Material cost added to service charges
                  </div>
                </div>
              )}
            </>
          )}

        {/* ---- EDUCATION / TUTOR ---- */}
        {!isHealth &&
          !isCarRental &&
          !isTravelTicket &&
          !isProperty &&
          !isOrderable &&
          !isRepairs &&
          isEducation && (
            <>
              <div>
                <span style={labelStyle}>SUBJECT</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="e.g. Mathematics, Physics, English"
                  value={form.subject || ""}
                  onChange={(e) => set("subject", e.target.value)}
                />
              </div>
              <div>
                <span style={labelStyle}>EDUCATION LEVEL</span>
                {renderChips("educationLevel", [
                  "Primary",
                  "Secondary",
                  "O-Level",
                  "A-Level",
                  "University",
                ])}
              </div>
              <div>
                <span style={labelStyle}>SESSION DURATION</span>
                {renderChips("sessionDuration", [
                  "1 Hour",
                  "2 Hours",
                  "3 Hours",
                ])}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED DATE</span>
                  <input
                    data-ocid="booking.input"
                    type="date"
                    style={inputStyle}
                    value={form.preferredDate || ""}
                    onChange={(e) => set("preferredDate", e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED TIME</span>
                  <input
                    data-ocid="booking.input"
                    type="time"
                    style={inputStyle}
                    value={form.preferredTime || ""}
                    onChange={(e) => set("preferredTime", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <span style={labelStyle}>SPECIAL NOTES (OPTIONAL)</span>
                <textarea
                  data-ocid="booking.textarea"
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                  placeholder="Curriculum, materials needed, etc."
                  value={form.specialNotes || ""}
                  onChange={(e) => set("specialNotes", e.target.value)}
                />
              </div>
            </>
          )}

        {/* ---- SECURITY ---- */}
        {!isHealth &&
          !isCarRental &&
          !isTravelTicket &&
          !isProperty &&
          !isOrderable &&
          !isRepairs &&
          !isEducation &&
          isSecurity && (
            <>
              <div>
                <span style={labelStyle}>PROPERTY TYPE</span>
                {renderChips("securityPropertyType", [
                  "House",
                  "Office",
                  "Shop",
                  "Warehouse",
                ])}
              </div>
              <div>
                <span style={labelStyle}>SECURITY DURATION</span>
                {renderChips("securityDuration", [
                  "Daily",
                  "Weekly",
                  "Monthly",
                ])}
              </div>
              <div>
                <span style={labelStyle}>NUMBER OF GUARDS REQUIRED</span>
                <input
                  data-ocid="booking.input"
                  type="number"
                  style={inputStyle}
                  placeholder="How many security guards?"
                  value={form.guardCount || ""}
                  onChange={(e) => set("guardCount", e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>START DATE</span>
                  <input
                    data-ocid="booking.input"
                    type="date"
                    style={inputStyle}
                    value={form.preferredDate || ""}
                    onChange={(e) => set("preferredDate", e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>START TIME</span>
                  <input
                    data-ocid="booking.input"
                    type="time"
                    style={inputStyle}
                    value={form.preferredTime || ""}
                    onChange={(e) => set("preferredTime", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <span style={labelStyle}>LOCATION / ADDRESS</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="Property address"
                  value={form.location || ""}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>
            </>
          )}

        {/* ---- TECH / IT SUPPORT ---- */}
        {!isHealth &&
          !isCarRental &&
          !isTravelTicket &&
          !isProperty &&
          !isOrderable &&
          !isRepairs &&
          !isEducation &&
          !isSecurity &&
          isTechSupport && (
            <>
              <div>
                <span style={labelStyle}>DEVICE TYPE</span>
                {renderChips("deviceType", [
                  "Laptop",
                  "Desktop",
                  "Phone",
                  "Printer",
                  "Network",
                ])}
              </div>
              <div>
                <span style={labelStyle}>ISSUE DESCRIPTION</span>
                <textarea
                  data-ocid="booking.textarea"
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                  placeholder="Describe the technical issue"
                  value={form.issueDescription || ""}
                  onChange={(e) => set("issueDescription", e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED DATE</span>
                  <input
                    data-ocid="booking.input"
                    type="date"
                    style={inputStyle}
                    value={form.preferredDate || ""}
                    onChange={(e) => set("preferredDate", e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED TIME</span>
                  <input
                    data-ocid="booking.input"
                    type="time"
                    style={inputStyle}
                    value={form.preferredTime || ""}
                    onChange={(e) => set("preferredTime", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <span style={labelStyle}>LOCATION / ADDRESS</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="Service location address"
                  value={form.location || ""}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>
            </>
          )}

        {/* ---- HOME SERVICES (Cleaner / Gardener / Chef) ---- */}
        {!isHealth &&
          !isCarRental &&
          !isTravelTicket &&
          !isProperty &&
          !isOrderable &&
          !isRepairs &&
          !isEducation &&
          !isSecurity &&
          !isTechSupport &&
          isHomeCleaning && (
            <>
              <div>
                <span style={labelStyle}>ROOMS / AREA SIZE</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="e.g. 3 rooms or 1200 sq ft"
                  value={form.areaSize || ""}
                  onChange={(e) => set("areaSize", e.target.value)}
                />
              </div>
              <div>
                <span style={labelStyle}>SERVICE DURATION</span>
                {renderChips("serviceDuration", [
                  "2 Hours",
                  "4 Hours",
                  "Full Day",
                ])}
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED DATE</span>
                  <input
                    data-ocid="booking.input"
                    type="date"
                    style={inputStyle}
                    value={form.preferredDate || ""}
                    onChange={(e) => set("preferredDate", e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED TIME</span>
                  <input
                    data-ocid="booking.input"
                    type="time"
                    style={inputStyle}
                    value={form.preferredTime || ""}
                    onChange={(e) => set("preferredTime", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <span style={labelStyle}>SPECIAL REQUIREMENTS (OPTIONAL)</span>
                <textarea
                  data-ocid="booking.textarea"
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                  placeholder="Special products, equipment needed, pets, etc."
                  value={form.specialReq || ""}
                  onChange={(e) => set("specialReq", e.target.value)}
                />
              </div>
              <div>
                <span style={labelStyle}>LOCATION / ADDRESS</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="Service location address"
                  value={form.location || ""}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>
            </>
          )}

        {/* ---- DEFAULT ---- */}
        {!isHealth &&
          !isCarRental &&
          !isTravelTicket &&
          !isProperty &&
          !isOrderable &&
          !isRepairs &&
          !isEducation &&
          !isSecurity &&
          !isTechSupport &&
          !isHomeCleaning && (
            <>
              <div>
                <span style={labelStyle}>
                  SERVICE DESCRIPTION / REQUIREMENTS
                </span>
                <textarea
                  data-ocid="booking.textarea"
                  style={{ ...inputStyle, minHeight: 80, resize: "vertical" }}
                  placeholder="Describe what you need"
                  value={form.description || ""}
                  onChange={(e) => set("description", e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED DATE</span>
                  <input
                    data-ocid="booking.input"
                    type="date"
                    style={inputStyle}
                    value={form.preferredDate || ""}
                    onChange={(e) => set("preferredDate", e.target.value)}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={labelStyle}>PREFERRED TIME</span>
                  <input
                    data-ocid="booking.input"
                    type="time"
                    style={inputStyle}
                    value={form.preferredTime || ""}
                    onChange={(e) => set("preferredTime", e.target.value)}
                  />
                </div>
              </div>
              <div>
                <span style={labelStyle}>LOCATION / ADDRESS</span>
                <input
                  data-ocid="booking.input"
                  style={inputStyle}
                  placeholder="Service location address"
                  value={form.location || ""}
                  onChange={(e) => set("location", e.target.value)}
                />
              </div>
              <div>
                <span style={labelStyle}>SPECIAL NOTES (OPTIONAL)</span>
                <textarea
                  data-ocid="booking.textarea"
                  style={{ ...inputStyle, minHeight: 60, resize: "vertical" }}
                  placeholder="Any additional information"
                  value={form.specialNotes || ""}
                  onChange={(e) => set("specialNotes", e.target.value)}
                />
              </div>
            </>
          )}
      </div>

      {/* Submit */}
      <button
        type="button"
        data-ocid="booking.submit_button"
        onClick={handleSubmit}
        style={{
          marginTop: 24,
          width: "100%",
          padding: "14px",
          background:
            "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,180,220,0.3))",
          border: "1px solid rgba(0,255,255,0.6)",
          borderRadius: 14,
          color: "#00ffff",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.85rem",
          fontWeight: 700,
          letterSpacing: "0.12em",
          cursor: "pointer",
          boxShadow: "0 0 24px rgba(0,255,255,0.25)",
          transition: "all 0.2s",
        }}
      >
        CONFIRM BOOKING →
      </button>
    </div>
  );
}

function NearbyProvidersScreen({
  service,
  onBack,
  onSelect,
  onLocationUpdate,
}: {
  service: (typeof SERVICES)[0] | null;
  onBack: () => void;
  onSelect: (p: (typeof PROVIDERS)[0]) => void;
  onLocationUpdate?: (loc: { lat: number; lng: number; city: string }) => void;
}) {
  const [_userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    city: string;
  } | null>(null);
  const [locationLoading, setLocationLoading] = useState(true);

  useEffect(() => {
    function onSuccess(pos: GeolocationPosition) {
      const loc = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        city: "Your Location",
      };
      setUserLocation(loc);
      setLocationLoading(false);
      onLocationUpdate?.(loc);
    }
    function onError() {
      const fallback = { lat: 24.8607, lng: 67.0011, city: "Karachi" };
      setUserLocation(fallback);
      setLocationLoading(false);
      onLocationUpdate?.(fallback);
    }
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, [onLocationUpdate]);

  const filteredProviders = service
    ? PROVIDERS.filter((p) => p.category === service.category).length > 0
      ? PROVIDERS.filter((p) => p.category === service.category)
      : PROVIDERS
    : PROVIDERS;
  const screenTitle = service
    ? `${service.category.toUpperCase()} PROVIDERS`
    : "NEARBY PROVIDERS";

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title={screenTitle} onBack={onBack} />

      {/* GPS Banner */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "rgba(0,255,255,0.06)",
          border: "1px solid rgba(0,255,255,0.25)",
          borderRadius: 12,
          padding: "10px 14px",
          marginBottom: 12,
        }}
      >
        <span
          style={{
            fontSize: "1.1rem",
            animation: locationLoading
              ? "pulse-ring 1.5s ease-out infinite"
              : "none",
          }}
        >
          📍
        </span>
        <div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.55rem",
              color: "rgba(0,255,255,0.6)",
              letterSpacing: "0.1em",
            }}
          >
            GPS LOCATION ACTIVE
          </div>
          <div
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.85rem",
              color: "rgba(176,255,255,0.8)",
              fontWeight: 600,
            }}
          >
            {locationLoading
              ? "Locating..."
              : `${_userLocation?.city} (${_userLocation?.lat.toFixed(4)}, ${_userLocation?.lng.toFixed(4)})`}
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.5rem",
            color: "#50ffb0",
            letterSpacing: "0.08em",
          }}
        >
          SHARING
        </div>
      </div>

      {service && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            background: "rgba(0,255,255,0.08)",
            border: "1px solid rgba(0,255,255,0.25)",
            borderRadius: 999,
            padding: "4px 14px",
            marginBottom: 16,
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.85rem",
            color: "#00ffff",
            fontWeight: 600,
          }}
        >
          {service.emoji} {service.name}
        </div>
      )}

      {/* Mini Map */}
      <div
        className="glass"
        style={{
          padding: 16,
          marginBottom: 16,
          height: 140,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle, rgba(0,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        {/* Pulsing provider dots */}
        {[
          [25, 40],
          [60, 30],
          [75, 65],
          [40, 75],
        ].map(([x, y], i) => (
          <div
            key={`dot-${x}-${y}`}
            style={{
              position: "absolute",
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%,-50%)",
            }}
          >
            <div
              style={{
                position: "absolute",
                inset: -6,
                borderRadius: "50%",
                border: "1px solid rgba(0,255,255,0.3)",
                animation: `pulse-ring ${1.5 + i * 0.3}s ease-out infinite`,
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: i === 0 ? "#50ffb0" : "#00ffff",
                boxShadow: `0 0 8px ${i === 0 ? "#50ffb0" : "#00ffff"}`,
              }}
            />
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            bottom: 8,
            right: 12,
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.5rem",
            color: "rgba(0,255,255,0.4)",
            letterSpacing: "0.1em",
          }}
        >
          KARACHI MAP
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {filteredProviders.map((p, i) => (
          <div key={p.id} className="glass" style={{ padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(0,60,80,0.9), rgba(0,10,20,0.95))",
                  border: "2px solid rgba(0,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 700,
                  color: "#00ffff",
                  flexShrink: 0,
                }}
              >
                {p.initials}
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#f0f0f0",
                  }}
                >
                  {p.name}
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(176,255,255,0.6)",
                  }}
                >
                  {p.profession} · {p.distance}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.65rem",
                    color: "#ffd700",
                  }}
                >
                  ⭐ {p.rating}
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.8rem",
                    color: "#50ffb0",
                    fontWeight: 600,
                  }}
                >
                  ₨{p.rate}/hr
                </div>
              </div>
            </div>
            <button
              type="button"
              data-ocid={`providers.item.${i + 1}`}
              className="btn-portal"
              style={{ marginTop: 10, padding: "10px" }}
              onClick={() => onSelect(p)}
            >
              SELECT PROVIDER
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ========================
// SCREEN 6: PROVIDER CONFIRMED
// ========================
function ProviderConfirmedScreen({
  provider,
  service,
  onBack,
  onChat,
  onPay,
}: {
  provider: (typeof PROVIDERS)[0] | null;
  service: (typeof SERVICES)[0] | null;
  onBack: () => void;
  onChat: () => void;
  onPay: () => void;
}) {
  const p = provider ?? PROVIDERS[0];
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="PROVIDER CONFIRMED" onBack={onBack} />

      <div
        className="glass-bright"
        style={{ padding: 24, marginBottom: 16, textAlign: "center" }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,60,80,0.9), rgba(0,10,20,0.95))",
            border: "2px solid rgba(0,255,255,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "1.2rem",
            fontWeight: 700,
            color: "#00ffff",
            boxShadow: "0 0 20px rgba(0,255,255,0.3)",
            margin: "0 auto 12px",
          }}
        >
          {p.initials}
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#f0f0f0",
          }}
        >
          {p.name}
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.9rem",
            color: "rgba(176,255,255,0.6)",
          }}
        >
          {p.profession}
        </div>
        <div style={{ marginTop: 8 }}>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.55rem",
              color: "rgba(0,255,255,0.5)",
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            SERVICE CATEGORY
          </div>
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.65rem",
              fontWeight: 700,
              color: "#00ffff",
              background: "rgba(0,255,255,0.1)",
              border: "1px solid rgba(0,255,255,0.4)",
              borderRadius: 20,
              padding: "3px 12px",
              boxShadow: "0 0 10px rgba(0,255,255,0.2)",
              letterSpacing: "0.08em",
            }}
          >
            {service?.category ??
              (p as typeof p & { category?: string }).category ??
              "General"}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: 8,
          }}
        >
          <span style={{ color: "#ffd700", fontSize: "0.9rem" }}>
            ⭐ {p.rating}
          </span>
          <span
            style={{
              background: "rgba(80,255,176,0.12)",
              border: "1px solid rgba(80,255,176,0.4)",
              color: "#50ffb0",
              borderRadius: 999,
              padding: "2px 10px",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.08em",
            }}
          >
            ✓ VERIFIED
          </span>
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {[
          { label: "JOBS", value: "234" },
          { label: "RATING", value: "4.8★" },
          { label: "EXPERIENCE", value: "3 YRS" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="glass"
            style={{ padding: 12, textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1rem",
                fontWeight: 800,
                color: "#00ffff",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.65rem",
                color: "rgba(176,255,255,0.5)",
                letterSpacing: "0.1em",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Estimated cost */}
      <div className="glass" style={{ padding: 16, marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.65rem",
            color: "rgba(176,255,255,0.5)",
            marginBottom: 8,
            letterSpacing: "0.1em",
          }}
        >
          ESTIMATED COST
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "1.4rem",
            fontWeight: 700,
            color: "#50ffb0",
          }}
        >
          ₨1,400
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.8rem",
            color: "rgba(176,255,255,0.5)",
          }}
        >
          Incl. all applicable taxes
        </div>
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button
          type="button"
          data-ocid="confirmed.secondary_button"
          className="btn-portal ghost-btn"
          style={{ flex: 1 }}
          onClick={onChat}
        >
          💬 CHAT
        </button>
        <button
          type="button"
          data-ocid="confirmed.primary_button"
          className="btn-portal"
          style={{ flex: 2 }}
          onClick={onPay}
        >
          CONFIRM & PAY
        </button>
      </div>
    </div>
  );
}

// ========================
// SCREEN 7: PAYMENT PLAN
// ========================
function PaymentPlanScreen({
  onBack,
  onLock,
  onBankTransfer,
  service,
  userBalance,
  onLowBalance,
}: {
  onBack: () => void;
  onLock: () => void;
  onBankTransfer: () => void;
  service: (typeof SERVICES)[0] | null;
  userBalance: number;
  onLowBalance: () => void;
}) {
  const basePrice = service?.price ?? 1200;
  const total = basePrice;
  const [method, setMethod] = useState("jazzcash");
  const methods = [
    { id: "jazzcash", label: "JazzCash", icon: "📱" },
    { id: "easypaisa", label: "Easypaisa", icon: "💳" },
    { id: "bank", label: "Bank Transfer", icon: "🏦" },
    { id: "portals-bank", label: "The Portals Bank Account", icon: "🏦" },
  ];
  const [copiedField, setCopiedField] = useState<string | null>(null);
  function handleCopy(label: string, value: string) {
    navigator.clipboard.writeText(value).catch(() => {});
    setCopiedField(label);
    setTimeout(() => setCopiedField(null), 2000);
  }

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="PAYMENT PLAN" onBack={onBack} />

      <div className="glass-bright" style={{ padding: 20, marginBottom: 16 }}>
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.65rem",
            color: "rgba(176,255,255,0.5)",
            marginBottom: 12,
            letterSpacing: "0.1em",
          }}
        >
          COST BREAKDOWN
        </div>
        {[
          {
            label: "Service Charges",
            amount: `₨${basePrice.toLocaleString()}`,
          },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 8,
            }}
          >
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.95rem",
                color: "rgba(176,255,255,0.7)",
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.95rem",
                fontWeight: 600,
                color: "#f0f0f0",
              }}
            >
              {row.amount}
            </span>
          </div>
        ))}
        <div
          style={{
            height: 1,
            background: "rgba(0,255,255,0.15)",
            margin: "10px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.75rem",
              color: "#00ffff",
              letterSpacing: "0.08em",
            }}
          >
            TOTAL
          </span>
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "#50ffb0",
            }}
          >
            ₨{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Balance check row */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background:
            userBalance < total
              ? "rgba(255,107,91,0.08)"
              : "rgba(80,255,176,0.06)",
          border: `1px solid ${userBalance < total ? "rgba(255,107,91,0.4)" : "rgba(80,255,176,0.3)"}`,
          borderRadius: 10,
          padding: "10px 14px",
          marginBottom: 12,
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "0.9rem",
        }}
      >
        <span style={{ color: "rgba(176,255,255,0.7)" }}>Your Balance</span>
        <span
          style={{
            fontWeight: 700,
            color: userBalance < total ? "#ff6b5b" : "#50ffb0",
          }}
        >
          ₨{userBalance.toLocaleString()}
          {userBalance < total && " ⚠️ LOW"}
        </span>
      </div>

      {/* Escrow badge */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          background: "rgba(80,255,176,0.08)",
          border: "1px solid rgba(80,255,176,0.3)",
          borderRadius: 12,
          padding: "10px",
          marginBottom: 16,
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.65rem",
          color: "#50ffb0",
          letterSpacing: "0.1em",
        }}
      >
        🔒 ESCROW PROTECTED
      </div>

      {/* Payment methods */}
      <div
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.65rem",
          color: "rgba(176,255,255,0.5)",
          marginBottom: 10,
          letterSpacing: "0.1em",
        }}
      >
        PAYMENT METHOD
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          marginBottom: 20,
        }}
      >
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            data-ocid={`payment.${m.id}.radio`}
            className="glass"
            onClick={() => setMethod(m.id)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 14,
              cursor: "pointer",
              border:
                method === m.id
                  ? "1px solid rgba(0,255,255,0.5)"
                  : "1px solid rgba(0,255,255,0.15)",
              boxShadow:
                method === m.id ? "0 0 8px rgba(0,255,255,0.2)" : "none",
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: "1.4rem" }}>{m.icon}</span>
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#f0f0f0",
                flex: 1,
              }}
            >
              {m.label}
            </span>
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border:
                  method === m.id
                    ? "2px solid #00ffff"
                    : "2px solid rgba(0,255,255,0.3)",
                background:
                  method === m.id ? "rgba(0,255,255,0.2)" : "transparent",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            />
          </button>
        ))}
      </div>

      {/* Bank details panel */}
      {method === "portals-bank" && (
        <div
          className="glass-bright"
          style={{
            padding: 16,
            marginBottom: 16,
            border: "1px solid rgba(0,255,255,0.35)",
          }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.6rem",
              color: "rgba(176,255,255,0.5)",
              marginBottom: 12,
              letterSpacing: "0.1em",
            }}
          >
            OFFICIAL BANK DETAILS
          </div>
          {[
            { label: "Bank Name", value: PORTALS_BANK.bankName },
            { label: "Account Title", value: PORTALS_BANK.accountTitle },
            { label: "Account Number", value: PORTALS_BANK.accountNumber },
            { label: "IBAN", value: PORTALS_BANK.iban },
            { label: "Branch", value: PORTALS_BANK.branch },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
                gap: 8,
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.5rem",
                    color: "rgba(176,255,255,0.4)",
                    letterSpacing: "0.08em",
                    marginBottom: 2,
                  }}
                >
                  {item.label.toUpperCase()}
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    color: "#f0f0f0",
                  }}
                >
                  {item.value}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleCopy(item.label, item.value)}
                style={{
                  background: "rgba(0,255,255,0.08)",
                  border: "1px solid rgba(0,255,255,0.25)",
                  borderRadius: 6,
                  padding: "4px 8px",
                  cursor: "pointer",
                  color: copiedField === item.label ? "#50ffb0" : "#00ffff",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  flexShrink: 0,
                }}
              >
                <Copy size={12} />
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "0.45rem",
                    letterSpacing: "0.08em",
                  }}
                >
                  {copiedField === item.label ? "COPIED!" : "COPY"}
                </span>
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        type="button"
        data-ocid="payment.primary_button"
        className="btn-portal"
        onClick={() => {
          if (userBalance < total) {
            onLowBalance();
            return;
          }
          if (method === "portals-bank") {
            onBankTransfer();
          } else {
            onLock();
          }
        }}
      >
        🔒 LOCK PAYMENT
      </button>
    </div>
  );
}

// ========================
// SCREEN 8: PAYMENT LOCKED
// ========================
function PaymentLockedScreen({
  onBack,
  onOtp,
}: { onBack: () => void; onOtp: () => void }) {
  const [taskOtp, setTaskOtp] = useState<string>("");
  const [otpCopied, setOtpCopied] = useState(false);

  useEffect(() => {
    const code = String(Math.floor(1000 + Math.random() * 9000));
    setTaskOtp(code);
  }, []);

  function copyOtp() {
    navigator.clipboard.writeText(taskOtp).catch(() => {});
    setOtpCopied(true);
    setTimeout(() => setOtpCopied(false), 2000);
  }

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="PAYMENT SECURED" onBack={onBack} />

      {/* Animated lock */}
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div
          className="lock-pulse"
          style={{ fontSize: "5rem", display: "inline-block", lineHeight: 1 }}
        >
          🔐
        </div>
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "1.5rem",
            fontWeight: 900,
            color: "#00ffff",
            marginTop: 16,
            letterSpacing: "0.08em",
            textShadow: "0 0 20px rgba(0,255,255,0.5)",
          }}
        >
          ₨1,400
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.9rem",
            color: "rgba(176,255,255,0.6)",
            marginTop: 4,
          }}
        >
          LOCKED IN ESCROW
        </div>
      </div>

      {/* Status + ETA */}
      <div
        className="glass"
        style={{ padding: 16, marginBottom: 16, textAlign: "center" }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,200,0,0.12)",
            border: "1px solid rgba(255,200,0,0.4)",
            borderRadius: 999,
            padding: "4px 16px",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.6rem",
            color: "#ffd700",
            letterSpacing: "0.12em",
            marginBottom: 10,
          }}
        >
          ⏳ PENDING
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "1rem",
            color: "#f0f0f0",
            fontWeight: 600,
          }}
        >
          Provider arrives in ~25 min
        </div>
      </div>

      {/* Task OTP Display */}
      <div className="glass" style={{ padding: 16, marginBottom: 16 }}>
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.6rem",
            color: "rgba(176,255,255,0.5)",
            marginBottom: 10,
            letterSpacing: "0.12em",
            textAlign: "center",
          }}
        >
          YOUR TASK OTP
        </div>
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            marginBottom: 10,
          }}
        >
          {taskOtp.split("").map((d, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: static OTP digits
              key={`otpd-${i}`}
              style={{
                width: 52,
                height: 64,
                background: "rgba(0,255,255,0.08)",
                border: "2px solid rgba(0,255,255,0.5)",
                borderRadius: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "2rem",
                fontWeight: 900,
                color: "#00ffff",
                textShadow: "0 0 16px rgba(0,255,255,0.8)",
                boxShadow: "0 0 12px rgba(0,255,255,0.2)",
              }}
            >
              {d}
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginBottom: 8 }}>
          <button
            type="button"
            data-ocid="locked.secondary_button"
            onClick={copyOtp}
            style={{
              background: "rgba(0,255,255,0.1)",
              border: "1px solid rgba(0,255,255,0.4)",
              borderRadius: 8,
              color: otpCopied ? "#50ffb0" : "#00ffff",
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              padding: "6px 18px",
              cursor: "pointer",
              letterSpacing: "0.08em",
            }}
          >
            {otpCopied ? "✓ COPIED!" : "📋 COPY OTP"}
          </button>
        </div>
        <p
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.78rem",
            color: "rgba(176,255,255,0.5)",
            textAlign: "center",
            margin: 0,
            lineHeight: 1.5,
          }}
        >
          Share this OTP with your Service Provider to release payment
        </p>
      </div>

      {/* 3-step guide */}
      <div className="glass" style={{ padding: 16, marginBottom: 20 }}>
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.6rem",
            color: "rgba(176,255,255,0.5)",
            marginBottom: 12,
            letterSpacing: "0.1em",
          }}
        >
          HOW IT WORKS
        </div>
        {[
          { num: 1, text: "Provider arrives & completes work" },
          { num: 2, text: "You verify completion with OTP" },
          { num: 3, text: "Payment automatically released" },
        ].map((step) => (
          <div
            key={step.num}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 12,
              marginBottom: 10,
            }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: "rgba(0,255,255,0.12)",
                border: "1px solid rgba(0,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.6rem",
                color: "#00ffff",
                flexShrink: 0,
              }}
            >
              {step.num}
            </div>
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.9rem",
                color: "rgba(176,255,255,0.8)",
                lineHeight: 1.4,
              }}
            >
              {step.text}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        data-ocid="locked.primary_button"
        className="btn-portal emerald-btn"
        onClick={onOtp}
      >
        ENTER OTP TO RELEASE
      </button>
    </div>
  );
}

// ========================
// SCREEN 9: OTP VERIFICATION
// ========================
function OtpScreen({
  onBack,
  onSuccess,
  service,
  userBalance,
  onDebit,
}: {
  onBack: () => void;
  onSuccess: () => void;
  service: (typeof SERVICES)[0] | null;
  userBalance: number;
  onDebit: (amount: number) => void;
}) {
  const basePrice = service?.price ?? 1200;
  const salesTax = Math.round(basePrice * 0.17);
  const incomeTax = Math.round(basePrice * 0.05);
  const portalsCharge = Math.round(basePrice * 0.1);
  const totalDeductions = salesTax + incomeTax + portalsCharge;
  const total = basePrice;
  const providerPayout = basePrice - totalDeductions;

  const [digits, setDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [txState, setTxState] = useState<"idle" | "animating" | "done">("idle");
  const [txStep, setTxStep] = useState(0);
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const { actor } = useActor();

  // biome-ignore lint/correctness/useExhaustiveDependencies: auto-focus on mount only
  useEffect(() => {
    refs[0].current?.focus();
  }, []);

  function handleDigit(i: number, val: string) {
    const clean = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = clean;
    setDigits(next);
    if (clean && i < 3) refs[i + 1].current?.focus();
    if (!clean && i > 0) refs[i - 1].current?.focus();
  }

  async function handleVerify() {
    const code = digits.join("");
    if (code.length < 4) {
      setError("Enter all 4 digits");
      return;
    }
    setLoading(true);
    setError("");
    try {
      if (actor) {
        await actor.verifyHandshake(0n, BigInt(code));
      }
    } catch {
      /* ignore, advance for demo */
    }
    setLoading(false);
    // Start transaction animation
    setTxState("animating");
    setTxStep(0);
    setTimeout(() => setTxStep(1), 600);
    setTimeout(() => setTxStep(2), 1200);
    setTimeout(() => setTxStep(3), 1800);
    setTimeout(() => {
      onDebit(total);
      setTxState("done");
      setTimeout(() => onSuccess(), 600);
    }, 2400);
  }

  if (txState === "animating" || txState === "done") {
    const txRows = [
      {
        icon: "🔴",
        label: "Debited from your account",
        amount: `-₨${basePrice.toLocaleString()}`,
        color: "#ff6b5b",
      },
      {
        icon: "🟢",
        label: "Credited to Provider (after deductions)",
        amount: `+₨${providerPayout.toLocaleString()}`,
        color: "#50ffb0",
      },
      {
        icon: "🔵",
        label: "Portals charges & taxes deducted",
        amount: `-₨${totalDeductions.toLocaleString()}`,
        color: "#00ffff",
      },
    ];
    return (
      <div
        style={{
          padding: "20px 16px 100px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ScreenHeader title="PROCESSING PAYMENT" onBack={() => {}} />
        <div
          style={{
            fontSize: "3rem",
            margin: "24px 0 16px",
            animation: "lock-pulse 1s ease-in-out infinite",
          }}
        >
          💸
        </div>
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.9rem",
            color: "#00ffff",
            letterSpacing: "0.1em",
            marginBottom: 24,
          }}
        >
          TRANSACTION IN PROGRESS
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {txRows.map((row, i) => (
            <div
              key={row.label}
              data-ocid={`otp.${i === 0 ? "error_state" : i === 1 ? "success_state" : "loading_state"}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background:
                  txStep > i
                    ? "rgba(255,255,255,0.05)"
                    : "rgba(255,255,255,0.02)",
                border: `1px solid ${txStep > i ? `${row.color}40` : "rgba(255,255,255,0.08)"}`,
                borderRadius: 12,
                padding: "14px 16px",
                opacity: txStep > i ? 1 : 0.3,
                transition: "all 0.4s ease",
                transform: txStep > i ? "translateX(0)" : "translateX(-20px)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: "1.3rem" }}>{row.icon}</span>
                <span
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(176,255,255,0.8)",
                  }}
                >
                  {row.label}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: row.color,
                }}
              >
                {row.amount}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="VERIFY COMPLETION" onBack={onBack} />

      {/* Service summary card */}
      <div className="glass-bright" style={{ padding: 16, marginBottom: 16 }}>
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.65rem",
            color: "rgba(176,255,255,0.5)",
            marginBottom: 10,
            letterSpacing: "0.12em",
            textAlign: "center",
          }}
        >
          SERVICES RENDERED
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 12,
          }}
        >
          <span style={{ fontSize: "1.8rem" }}>{service?.emoji ?? "🔧"}</span>
          <div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.7rem",
                color: "#00ffff",
                letterSpacing: "0.08em",
              }}
            >
              {service?.name ?? "Service"}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.8rem",
                color: "rgba(176,255,255,0.6)",
              }}
            >
              Category: {service?.category ?? "General"}
            </div>
          </div>
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(0,255,255,0.15)",
            margin: "8px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.85rem",
              color: "rgba(176,255,255,0.6)",
            }}
          >
            Service Charges
          </span>
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#f0f0f0",
            }}
          >
            ₨{basePrice.toLocaleString()}
          </span>
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(0,255,255,0.15)",
            margin: "8px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.85rem",
              color: "rgba(176,255,255,0.6)",
            }}
          >
            Paid From
          </span>
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#00ffff",
            }}
          >
            Portal User Account
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.85rem",
              color: "rgba(176,255,255,0.6)",
            }}
          >
            Paid To
          </span>
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "#00ffff",
            }}
          >
            Service Provider
          </span>
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(0,255,255,0.15)",
            margin: "8px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.7rem",
              color: "#00ffff",
              letterSpacing: "0.08em",
            }}
          >
            AMOUNT DUE
          </span>
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "#50ffb0",
            }}
          >
            ₨{basePrice.toLocaleString()}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 8,
            paddingTop: 8,
            borderTop: "1px solid rgba(0,255,255,0.1)",
          }}
        >
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.85rem",
              color: "rgba(176,255,255,0.6)",
            }}
          >
            Your Balance
          </span>
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#00ffff",
            }}
          >
            ₨{userBalance.toLocaleString()}
          </span>
        </div>
      </div>

      <div
        className="glass"
        style={{ padding: 24, marginBottom: 20, textAlign: "center" }}
      >
        <div style={{ fontSize: "3rem", marginBottom: 12 }}>🔑</div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "1rem",
            color: "rgba(176,255,255,0.7)",
            marginBottom: 24,
            lineHeight: 1.5,
          }}
        >
          Enter the 4-digit OTP code generated for this task to verify and
          release payment securely
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          {([0, 1, 2, 3] as const).map((i) => (
            <input
              key={`otp-${i}`}
              ref={refs[i]}
              className="otp-box"
              data-ocid={`otp.input.${(i + 1) as 1 | 2 | 3 | 4}`}
              type="tel"
              maxLength={1}
              value={digits[i]}
              onChange={(e) => handleDigit(i, e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && !digits[i] && i > 0) {
                  refs[i - 1].current?.focus();
                }
              }}
            />
          ))}
        </div>

        {error && (
          <div
            data-ocid="otp.error_state"
            style={{
              color: "#ff6b5b",
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.9rem",
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Security Trust Bar */}
      <div
        style={{
          display: "flex",
          gap: 8,
          justifyContent: "center",
          marginBottom: 14,
          flexWrap: "wrap",
        }}
      >
        {[
          { icon: "🔒", label: "256-BIT AES" },
          { icon: "🛡️", label: "E2E ENCRYPTED" },
          { icon: "🔐", label: "PAYMENT PROTECTED" },
        ].map((b) => (
          <div
            key={b.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(0,255,255,0.06)",
              border: "1px solid rgba(0,255,255,0.2)",
              borderRadius: 999,
              padding: "4px 10px",
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.72rem",
              fontWeight: 600,
              color: "rgba(0,255,255,0.75)",
              letterSpacing: "0.06em",
            }}
          >
            <span>{b.icon}</span>
            <span>{b.label}</span>
          </div>
        ))}
      </div>
      <button
        type="button"
        data-ocid="otp.primary_button"
        className="btn-portal emerald-btn"
        onClick={handleVerify}
        disabled={loading}
        style={{ opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "VERIFYING..." : "VERIFY & RELEASE PAYMENT"}
      </button>
    </div>
  );
}

// ========================
// SCREEN: INVOICE
// ========================
function InvoiceScreen({
  onHome,
  service,
}: {
  onHome: () => void;
  service: (typeof SERVICES)[0] | null;
}) {
  const txnRef = `TXN-${Math.random().toString(36).toUpperCase().slice(2, 10)}`;
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-PK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-PK", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="FINAL INVOICE" onBack={onHome} />

      {/* Header Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          margin: "16px 0",
        }}
      >
        <PortalLogo size={40} />
        <div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1rem",
              fontWeight: 900,
              color: "#00ffff",
              letterSpacing: "0.15em",
            }}
          >
            THE PORTALS
          </div>
          <div
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.72rem",
              color: "rgba(176,255,255,0.5)",
              letterSpacing: "0.12em",
            }}
          >
            OFFICIAL INVOICE
          </div>
        </div>
      </div>

      {/* Invoice Card */}
      <div className="glass" style={{ padding: 20, marginBottom: 16 }}>
        {/* Reference & Date */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 14,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.55rem",
                color: "rgba(176,255,255,0.45)",
                letterSpacing: "0.1em",
                marginBottom: 3,
              }}
            >
              REFERENCE
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: "0.85rem",
                color: "#00ffff",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              {txnRef}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.8rem",
                color: "rgba(176,255,255,0.6)",
              }}
            >
              {dateStr}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.75rem",
                color: "rgba(176,255,255,0.4)",
              }}
            >
              {timeStr}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: "rgba(0,255,255,0.15)",
            marginBottom: 14,
          }}
        />

        {/* Service */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginBottom: 14,
          }}
        >
          <span style={{ fontSize: "2rem" }}>{service?.emoji ?? "🔧"}</span>
          <div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.7rem",
                color: "#00ffff",
                letterSpacing: "0.08em",
              }}
            >
              {service?.name ?? "Service Rendered"}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.8rem",
                color: "rgba(176,255,255,0.55)",
              }}
            >
              {service?.category ?? "General"}
            </div>
          </div>
        </div>

        <div
          style={{
            height: 1,
            background: "rgba(0,255,255,0.15)",
            marginBottom: 14,
          }}
        />

        {/* Transaction rows */}
        {[
          {
            label: "Service Charges Paid From",
            value: "PU-XXXXX (Portal User)",
            highlight: false,
          },
          {
            label: "Service Charges Paid To",
            value: "Muhammad Ali (Provider)",
            highlight: false,
          },
        ].map((row) => (
          <div
            key={row.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.85rem",
                color: "rgba(176,255,255,0.55)",
              }}
            >
              {row.label}
            </span>
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 600,
                color: "#00ffff",
                maxWidth: "50%",
                textAlign: "right",
              }}
            >
              {row.value}
            </span>
          </div>
        ))}

        <div
          style={{
            height: 1,
            background: "rgba(0,255,255,0.15)",
            margin: "10px 0",
          }}
        />

        {/* Amount */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.7rem",
              color: "#00ffff",
              letterSpacing: "0.08em",
            }}
          >
            AMOUNT
          </span>
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1.2rem",
              fontWeight: 900,
              color: "#50ffb0",
            }}
          >
            ₨{(service?.price ?? 1200).toLocaleString()}
          </span>
        </div>

        {/* Status */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(80,255,176,0.1)",
              border: "1px solid rgba(80,255,176,0.4)",
              borderRadius: 999,
              padding: "6px 18px",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.6rem",
              color: "#50ffb0",
              letterSpacing: "0.1em",
            }}
          >
            ✓ COMPLETED
          </div>
        </div>
      </div>

      {/* Security Watermark */}
      <div
        style={{
          textAlign: "center",
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "0.7rem",
          color: "rgba(0,255,255,0.3)",
          letterSpacing: "0.12em",
          marginBottom: 20,
          padding: "8px 0",
          borderTop: "1px dashed rgba(0,255,255,0.15)",
          borderBottom: "1px dashed rgba(0,255,255,0.15)",
        }}
      >
        🔒 END-TO-END ENCRYPTED | THE PORTALS
      </div>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 12 }}>
        <button
          type="button"
          data-ocid="invoice.secondary_button"
          onClick={() => window.print()}
          style={{
            flex: 1,
            padding: "14px",
            background: "rgba(0,255,255,0.08)",
            border: "1px solid rgba(0,255,255,0.4)",
            borderRadius: 12,
            color: "#00ffff",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.6rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            cursor: "pointer",
          }}
        >
          📄 SAVE INVOICE
        </button>
        <button
          type="button"
          data-ocid="invoice.primary_button"
          className="btn-portal"
          onClick={onHome}
          style={{ flex: 1 }}
        >
          ↩ BACK TO HOME
        </button>
      </div>
    </div>
  );
}

// ========================
// SCREEN 10: SUCCESS
// ========================
function SuccessScreen({
  onHome,
  onInvoice,
}: { onHome: () => void; onInvoice?: () => void }) {
  const [stars, setStars] = useState(0);
  const [rated, setRated] = useState(false);
  const { actor } = useActor();

  async function handleRate(s: number) {
    setStars(s);
    try {
      if (actor) await actor.rateTask(0n, BigInt(s));
    } catch {
      /* ignore */
    }
    setRated(true);
  }

  return (
    <div
      style={{
        padding: "20px 16px 100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Checkmark */}
      <div
        className="checkmark-anim"
        style={{
          width: 100,
          height: 100,
          borderRadius: "50%",
          background: "rgba(80,255,176,0.12)",
          border: "3px solid #50ffb0",
          boxShadow:
            "0 0 30px rgba(80,255,176,0.4), 0 0 60px rgba(80,255,176,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "3rem",
          margin: "24px auto 20px",
        }}
      >
        ✓
      </div>

      <h2
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "1.3rem",
          fontWeight: 900,
          color: "#50ffb0",
          textShadow: "0 0 20px rgba(80,255,176,0.5)",
          letterSpacing: "0.1em",
          margin: "0 0 24px",
          textAlign: "center",
        }}
      >
        SERVICE COMPLETED!
      </h2>

      {/* Badges */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          width: "100%",
          marginBottom: 24,
        }}
      >
        {[
          { icon: "✓", text: "Handshake Verified" },
          { icon: "✓", text: "Payment Released ₨1,400" },
          { icon: "✓", text: "Escrow Cleared" },
        ].map((b) => (
          <div
            key={b.text}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(80,255,176,0.08)",
              border: "1px solid rgba(80,255,176,0.25)",
              borderRadius: 12,
              padding: "12px 16px",
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "1rem",
              color: "#50ffb0",
              fontWeight: 600,
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{b.icon}</span>
            {b.text}
          </div>
        ))}
      </div>

      {/* Star rating */}
      <div
        className="glass"
        style={{
          padding: 20,
          width: "100%",
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.65rem",
            color: "rgba(176,255,255,0.5)",
            marginBottom: 12,
            letterSpacing: "0.1em",
          }}
        >
          RATE YOUR EXPERIENCE
        </div>
        {rated ? (
          <div
            data-ocid="success.success_state"
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "1rem",
              color: "#50ffb0",
              fontWeight: 600,
            }}
          >
            Thanks for your {stars}★ rating!
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", gap: 4 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <button
                key={s}
                type="button"
                className="star-btn"
                data-ocid={`success.toggle.${s as 1 | 2 | 3 | 4 | 5}`}
                onClick={() => handleRate(s)}
              >
                <span
                  style={{
                    fontSize: "2rem",
                    filter: s <= stars ? "none" : "grayscale(1) opacity(0.3)",
                  }}
                >
                  ⭐
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {onInvoice && (
        <button
          type="button"
          data-ocid="success.secondary_button"
          onClick={onInvoice}
          style={{
            width: "100%",
            padding: "14px",
            background: "rgba(0,255,255,0.06)",
            border: "1px solid rgba(0,255,255,0.4)",
            borderRadius: 12,
            color: "#00ffff",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.65rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          📄 VIEW INVOICE
        </button>
      )}
      <button
        type="button"
        data-ocid="success.primary_button"
        className="btn-portal"
        onClick={onHome}
      >
        BACK TO HOME
      </button>
    </div>
  );
}

// ========================
// SCREEN 11: CHAT
// ========================
function ChatScreen({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<"conversations" | "live">("conversations");
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  function sendMsg() {
    if (!msg.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: prev.length + 1, from: "user", text: msg, time: "Now" },
    ]);
    setMsg("");
  }

  return (
    <div
      style={{
        padding: "20px 16px 0",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <ScreenHeader title="MESSAGES" onBack={onBack} />

      {/* Tabs */}
      <div style={{ display: "flex", marginBottom: 16, gap: 2 }}>
        {(["conversations", "live"] as const).map((t) => (
          <button
            key={t}
            type="button"
            data-ocid={`chat.${t}.tab`}
            className={`nav-tab${tab === t ? " active" : ""}`}
            onClick={() => setTab(t)}
          >
            {t === "conversations" ? "CONVERSATIONS" : "LIVE CHAT"}
          </button>
        ))}
      </div>

      {tab === "conversations" ? (
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            paddingBottom: 90,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {CHATS.map((c, i) => (
            <button
              key={c.id}
              type="button"
              data-ocid={`chat.item.${(i + 1) as 1 | 2 | 3}`}
              className="glass"
              onClick={() => setTab("live")}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: 14,
                cursor: "pointer",
                textAlign: "left",
                width: "100%",
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(0,60,80,0.9), rgba(0,10,20,0.95))",
                  border: "2px solid rgba(0,255,255,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#00ffff",
                  flexShrink: 0,
                }}
              >
                {c.initials}
              </div>
              <div style={{ flex: 1, overflow: "hidden" }}>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#f0f0f0",
                  }}
                >
                  {c.name}
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(176,255,255,0.5)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {c.lastMsg}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(176,255,255,0.4)",
                  flexShrink: 0,
                }}
              >
                {c.time}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              paddingBottom: 8,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {messages.map((m) => (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  justifyContent: m.from === "user" ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    maxWidth: "78%",
                    padding: "10px 14px",
                    borderRadius:
                      m.from === "user"
                        ? "16px 16px 4px 16px"
                        : "16px 16px 16px 4px",
                    background:
                      m.from === "user"
                        ? "rgba(0,255,255,0.12)"
                        : "rgba(0,20,30,0.6)",
                    border:
                      m.from === "user"
                        ? "1px solid rgba(0,255,255,0.3)"
                        : "1px solid rgba(0,255,255,0.1)",
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.95rem",
                    color: "#f0f0f0",
                    lineHeight: 1.4,
                  }}
                >
                  {m.text}
                  <div
                    style={{
                      fontSize: "0.65rem",
                      color: "rgba(176,255,255,0.4)",
                      marginTop: 4,
                      textAlign: "right",
                    }}
                  >
                    {m.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              paddingBottom: 90,
              paddingTop: 8,
            }}
          >
            <input
              className="portal-input"
              data-ocid="chat.input"
              placeholder="Type a message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              style={{ flex: 1 }}
            />
            <button
              type="button"
              data-ocid="chat.primary_button"
              className="btn-portal"
              style={{
                width: 48,
                padding: 0,
                flexShrink: 0,
                fontSize: "1.2rem",
              }}
              onClick={sendMsg}
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ========================
// SCREEN 12: PROFILE
// ========================
function ProfileScreen({
  onSettings,
  onBack,
  onDeleteAccount,
  onTopUp,
}: {
  onSettings: () => void;
  onBack: () => void;
  onDeleteAccount: () => void;
  onTopUp: () => void;
}) {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfilePic(ev.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="MY PROFILE" onBack={onBack} />

      {/* Avatar */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div
          style={{
            position: "relative",
            display: "inline-block",
            marginBottom: 12,
          }}
        >
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                border: "3px solid rgba(0,255,255,0.5)",
                boxShadow: "0 0 24px rgba(0,255,255,0.3)",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(0,60,80,0.95), rgba(0,10,20,0.98))",
                border: "3px solid rgba(0,255,255,0.5)",
                boxShadow: "0 0 24px rgba(0,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1.8rem",
                fontWeight: 900,
                color: "#00ffff",
              }}
            >
              A
            </div>
          )}
          <button
            type="button"
            data-ocid="profile.upload_button"
            onClick={() => fileInputRef.current?.click()}
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(0,255,255,0.9)",
              border: "2px solid #05070A",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
              boxShadow: "0 0 10px rgba(0,255,255,0.6)",
            }}
          >
            📷
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "1.3rem",
            fontWeight: 700,
            color: "#f0f0f0",
          }}
        >
          Ahmed Khan
        </div>
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.6rem",
            color: "rgba(0,255,255,0.6)",
            letterSpacing: "0.15em",
          }}
        >
          CUSTOMER ACCOUNT
        </div>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
          marginBottom: 20,
        }}
      >
        {[
          { val: "12", lbl: "Tasks" },
          { val: "4.9★", lbl: "Rating" },
          { val: "₨14,200", lbl: "Saved" },
        ].map((s) => (
          <div
            key={s.lbl}
            className="glass"
            style={{ padding: 12, textAlign: "center" }}
          >
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.85rem",
                fontWeight: 800,
                color: "#00ffff",
              }}
            >
              {s.val}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.65rem",
                color: "rgba(176,255,255,0.5)",
                letterSpacing: "0.08em",
              }}
            >
              {s.lbl.toUpperCase()}
            </div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div
        style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}
      >
        {["PIONEER", "TRUSTED", "VERIFIED"].map((b) => (
          <div
            key={b}
            style={{
              background: "rgba(0,255,255,0.08)",
              border: "1px solid rgba(0,255,255,0.3)",
              borderRadius: 999,
              padding: "5px 14px",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.55rem",
              color: "#00ffff",
              letterSpacing: "0.12em",
            }}
          >
            ✦ {b}
          </div>
        ))}
      </div>

      {/* Menu */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { label: "Edit Profile", icon: "✏️", ocid: "profile.edit_button" },
          {
            label: "Payment Methods",
            icon: "💳",
            ocid: "profile.secondary_button",
          },
          { label: "Transaction History", icon: "📊", ocid: "profile.item.1" },
          {
            label: "Top Up Wallet",
            icon: "💰",
            ocid: "profile.item.2",
            action: onTopUp,
          },
          { label: "Help & Support", icon: "❓", ocid: "profile.item.3" },
          {
            label: "Settings",
            icon: "⚙️",
            ocid: "profile.item.4",
            action: onSettings,
          },
        ].map((item) => (
          <button
            key={item.label}
            type="button"
            data-ocid={item.ocid}
            className="glass"
            onClick={item.action}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: 14,
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
              border: "1px solid rgba(0,255,255,0.12)",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>{item.icon}</span>
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "1rem",
                fontWeight: 600,
                color: "#f0f0f0",
                flex: 1,
              }}
            >
              {item.label}
            </span>
            <span style={{ color: "rgba(0,255,255,0.4)" }}>›</span>
          </button>
        ))}
        <button
          type="button"
          data-ocid="profile.delete_button"
          className="glass"
          onClick={onDeleteAccount}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: 14,
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
            border: "1px solid rgba(255,80,60,0.25)",
            background: "rgba(255,80,60,0.05)",
          }}
        >
          <span style={{ fontSize: "1.2rem" }}>🗑️</span>
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#ff6b5b",
              flex: 1,
            }}
          >
            Delete Account
          </span>
        </button>
      </div>
    </div>
  );
}

// ========================
// SCREEN: BANK TRANSFER CONFIRM
// ========================
function BankTransferConfirmScreen({
  onBack,
  onConfirm,
}: { onBack: () => void; onConfirm: () => void }) {
  const [ref, setRef] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!ref.trim()) {
      setError("Please enter your transaction reference.");
      return;
    }
    setError("");
    setSubmitted(true);
  }

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="BANK TRANSFER" onBack={onBack} />

      <div
        style={{
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "0.95rem",
          color: "rgba(176,255,255,0.75)",
          marginBottom: 16,
          lineHeight: 1.5,
        }}
      >
        Transfer{" "}
        <span style={{ color: "#50ffb0", fontWeight: 700 }}>PKR 1,400</span> to
        The Portals official account, then enter your transaction reference
        below.
      </div>

      <div className="glass-bright" style={{ padding: 16, marginBottom: 16 }}>
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.6rem",
            color: "rgba(176,255,255,0.5)",
            marginBottom: 12,
            letterSpacing: "0.1em",
          }}
        >
          OFFICIAL BANK DETAILS
        </div>
        {[
          { label: "Bank Name", value: PORTALS_BANK.bankName },
          { label: "Account Title", value: PORTALS_BANK.accountTitle },
          { label: "Account Number", value: PORTALS_BANK.accountNumber },
          { label: "IBAN", value: PORTALS_BANK.iban },
          { label: "Branch", value: PORTALS_BANK.branch },
        ].map((item) => (
          <div key={item.label} style={{ marginBottom: 10 }}>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.5rem",
                color: "rgba(176,255,255,0.4)",
                letterSpacing: "0.08em",
                marginBottom: 2,
              }}
            >
              {item.label.toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.9rem",
                fontWeight: 600,
                color: "#f0f0f0",
              }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="glass" style={{ padding: 16, marginBottom: 12 }}>
        <label
          htmlFor="trx-ref-input"
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.6rem",
            color: "rgba(176,255,255,0.5)",
            letterSpacing: "0.1em",
            display: "block",
            marginBottom: 8,
          }}
        >
          TRANSACTION REFERENCE / TRX ID
        </label>
        <input
          id="trx-ref-input"
          type="text"
          data-ocid="bank_transfer.ref.input"
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="Enter TRX ID or reference number"
          style={{
            width: "100%",
            background: "rgba(0,255,255,0.05)",
            border: "1px solid rgba(0,255,255,0.25)",
            borderRadius: 8,
            padding: "10px 12px",
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.95rem",
            color: "#f0f0f0",
            outline: "none",
            boxSizing: "border-box",
          }}
        />
        {error && (
          <div
            data-ocid="bank_transfer.error_state"
            style={{
              marginTop: 8,
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.8rem",
              color: "#ff6b5b",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <AlertTriangle size={14} /> {error}
          </div>
        )}
      </div>

      {!submitted ? (
        <button
          type="button"
          data-ocid="bank_transfer.submit.button"
          className="btn-portal"
          onClick={handleSubmit}
        >
          📤 SUBMIT FOR VERIFICATION
        </button>
      ) : (
        <div>
          <div
            data-ocid="bank_transfer.success_state"
            style={{
              background: "rgba(255,180,70,0.08)",
              border: "1px solid rgba(255,180,70,0.4)",
              borderRadius: 12,
              padding: 16,
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 800,
                color: "#ffb347",
                letterSpacing: "0.12em",
                textShadow: "0 0 10px rgba(255,180,70,0.5)",
                marginBottom: 8,
              }}
            >
              ⏳ PENDING VERIFICATION
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.9rem",
                color: "rgba(255,180,70,0.8)",
              }}
            >
              Your payment is under review. Service will be unlocked once
              verified.
            </div>
          </div>
          <button
            type="button"
            data-ocid="bank_transfer.continue.button"
            className="btn-portal"
            onClick={onConfirm}
          >
            ✅ CONTINUE
          </button>
        </div>
      )}
    </div>
  );
}

// ========================
// SCREEN: PROVIDER WITHDRAWAL
// ========================
function ProviderWithdrawalScreen({
  onBack,
  onSubmit,
}: { onBack: () => void; onSubmit: () => void }) {
  const balance = 38500;
  const deduction = Math.round(balance * 0.03);
  const netPayout = balance - deduction;
  const [bankName, setBankName] = useState("");
  const [accountTitle, setAccountTitle] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="WITHDRAWAL REQUEST" onBack={onBack} />

      {/* Balance summary cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 20,
        }}
      >
        <div
          className="glass-bright"
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.55rem",
                color: "rgba(176,255,255,0.5)",
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              CURRENT BALANCE
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "1rem",
                color: "rgba(176,255,255,0.7)",
              }}
            >
              Your total earnings
            </div>
          </div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "#f0f0f0",
            }}
          >
            ₨{balance.toLocaleString()}
          </div>
        </div>

        <div
          className="glass"
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid rgba(255,180,70,0.3)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.55rem",
                color: "rgba(255,180,70,0.6)",
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              PLATFORM DEDUCTION (3%)
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "1rem",
                color: "rgba(255,180,70,0.7)",
              }}
            >
              Service & admin fee
            </div>
          </div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1.1rem",
              fontWeight: 800,
              color: "#ffb347",
              textShadow: "0 0 10px rgba(255,180,70,0.4)",
            }}
          >
            -₨{deduction.toLocaleString()}
          </div>
        </div>

        <div
          className="glass-bright"
          style={{
            padding: 16,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            border: "1px solid rgba(0,255,255,0.4)",
            boxShadow: "0 0 16px rgba(0,255,255,0.15)",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.55rem",
                color: "rgba(0,255,255,0.5)",
                letterSpacing: "0.1em",
                marginBottom: 4,
              }}
            >
              NET PAYOUT
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "1rem",
                color: "rgba(176,255,255,0.7)",
              }}
            >
              Amount you receive
            </div>
          </div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1.2rem",
              fontWeight: 800,
              color: "#00ffff",
              textShadow: "0 0 14px rgba(0,255,255,0.5)",
            }}
          >
            ₨{netPayout.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Bank details form */}
      <div
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.65rem",
          color: "rgba(176,255,255,0.5)",
          marginBottom: 12,
          letterSpacing: "0.1em",
        }}
      >
        YOUR BANK DETAILS
      </div>
      <div
        className="glass"
        style={{
          padding: 16,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {[
          {
            label: "BANK NAME",
            value: bankName,
            set: setBankName,
            placeholder: "e.g. Meezan Bank",
            ocid: "withdrawal.bank_name.input",
          },
          {
            label: "ACCOUNT TITLE",
            value: accountTitle,
            set: setAccountTitle,
            placeholder: "Full name on account",
            ocid: "withdrawal.account_title.input",
          },
          {
            label: "ACCOUNT NUMBER / IBAN",
            value: accountNumber,
            set: setAccountNumber,
            placeholder: "PK xx XXXX ...",
            ocid: "withdrawal.account_number.input",
          },
        ].map((field) => (
          <div key={field.label}>
            <label
              htmlFor={field.ocid}
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.5rem",
                color: "rgba(176,255,255,0.4)",
                letterSpacing: "0.1em",
                display: "block",
                marginBottom: 6,
              }}
            >
              {field.label}
            </label>
            <input
              id={field.ocid}
              type="text"
              data-ocid={field.ocid}
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              placeholder={field.placeholder}
              style={{
                width: "100%",
                background: "rgba(0,255,255,0.05)",
                border: "1px solid rgba(0,255,255,0.2)",
                borderRadius: 8,
                padding: "10px 12px",
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.95rem",
                color: "#f0f0f0",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        data-ocid="withdrawal.submit.button"
        onClick={onSubmit}
        style={{
          width: "100%",
          padding: "14px 20px",
          borderRadius: 12,
          background:
            "linear-gradient(135deg, rgba(220,50,40,0.8) 0%, rgba(255,140,30,0.8) 100%)",
          border: "1px solid rgba(255,100,50,0.5)",
          color: "#fff",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.75rem",
          fontWeight: 800,
          letterSpacing: "0.1em",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(220,50,40,0.3)",
          marginBottom: 16,
        }}
      >
        🗑️ REQUEST WITHDRAWAL & DELETE ACCOUNT
      </button>

      <div
        style={{
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "0.8rem",
          color: "rgba(255,180,70,0.7)",
          textAlign: "center",
          lineHeight: 1.5,
          padding: "0 8px",
        }}
      >
        ⚠️ After submitting, your account will enter deletion pending state. It
        will be permanently deleted once all financial obligations are cleared.
      </div>
    </div>
  );
}

// ========================
// SCREEN: PROVIDER ACCOUNT DELETION
// ========================
function ProviderAccountDeletionScreen({
  onBack,
  onHome,
}: { onBack: () => void; onHome: () => void }) {
  const today = new Date().toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const balance = 38500;
  const deduction = Math.round(balance * 0.03);
  const netPayout = balance - deduction;

  const constraints = [
    { label: "Withdrawal request submitted", done: true },
    { label: "Withdrawal processed & transferred", done: false },
    { label: "No active bookings", done: false },
    { label: "No pending disputes", done: false },
    { label: "Account statement generated", done: false },
  ];

  const statement = [
    {
      date: today,
      desc: "Total Earnings",
      amount: `+₨${balance.toLocaleString()}`,
    },
    {
      date: today,
      desc: "Platform Deduction (3%)",
      amount: `-₨${deduction.toLocaleString()}`,
    },
    {
      date: today,
      desc: "Withdrawal Requested",
      amount: `-₨${netPayout.toLocaleString()}`,
    },
    { date: "—", desc: "Closing Balance", amount: "₨0" },
  ];

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="ACCOUNT DELETION" onBack={onBack} />

      {/* Deletion pending badge */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: "inline-block",
            background: "rgba(255,140,0,0.12)",
            border: "2px solid rgba(255,140,0,0.5)",
            borderRadius: 16,
            padding: "12px 28px",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "1rem",
            fontWeight: 900,
            color: "#ffb347",
            letterSpacing: "0.15em",
            textShadow: "0 0 16px rgba(255,180,70,0.6)",
            boxShadow: "0 0 24px rgba(255,140,0,0.2)",
            marginBottom: 12,
          }}
        >
          ⏳ DELETION PENDING
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.9rem",
            color: "rgba(176,255,255,0.65)",
            lineHeight: 1.5,
            padding: "0 8px",
          }}
        >
          Your withdrawal request has been submitted. Your account will be
          automatically deleted once all conditions below are met.
        </div>
      </div>

      {/* Financial constraint checklist */}
      <div
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.6rem",
          color: "rgba(176,255,255,0.5)",
          marginBottom: 10,
          letterSpacing: "0.1em",
        }}
      >
        DELETION CHECKLIST
      </div>
      <div
        className="glass"
        style={{
          padding: 16,
          marginBottom: 20,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        }}
      >
        {constraints.map((c) => (
          <div
            key={c.label}
            style={{ display: "flex", alignItems: "center", gap: 12 }}
          >
            <div
              style={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                background: c.done
                  ? "rgba(80,255,176,0.15)"
                  : "rgba(255,180,70,0.1)",
                border: c.done
                  ? "1px solid rgba(80,255,176,0.5)"
                  : "1px solid rgba(255,180,70,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {c.done ? (
                <CheckCircle size={14} color="#50ffb0" />
              ) : (
                <Clock size={14} color="#ffb347" />
              )}
            </div>
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.9rem",
                color: c.done ? "#50ffb0" : "rgba(255,180,70,0.8)",
                fontWeight: 600,
              }}
            >
              {c.label}
            </span>
          </div>
        ))}
      </div>

      {/* Final transaction statement */}
      <div
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.6rem",
          color: "rgba(176,255,255,0.5)",
          marginBottom: 10,
          letterSpacing: "0.1em",
        }}
      >
        FINAL TRANSACTION STATEMENT
      </div>
      <div
        className="glass-bright"
        style={{
          padding: 0,
          marginBottom: 20,
          overflow: "hidden",
          borderRadius: 12,
        }}
      >
        {/* Table header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 2fr 1fr",
            padding: "10px 14px",
            background: "rgba(0,255,255,0.06)",
            borderBottom: "1px solid rgba(0,255,255,0.12)",
          }}
        >
          {["DATE", "DESCRIPTION", "AMOUNT"].map((h) => (
            <div
              key={h}
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.45rem",
                color: "rgba(176,255,255,0.4)",
                letterSpacing: "0.08em",
              }}
            >
              {h}
            </div>
          ))}
        </div>
        {statement.map((row, i) => (
          <div
            key={row.desc}
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 2fr 1fr",
              padding: "10px 14px",
              borderBottom:
                i < statement.length - 1
                  ? "1px solid rgba(0,255,255,0.06)"
                  : "none",
              background:
                i === statement.length - 1
                  ? "rgba(0,255,255,0.05)"
                  : "transparent",
            }}
          >
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.75rem",
                color: "rgba(176,255,255,0.5)",
              }}
            >
              {row.date}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.75rem",
                color: "#f0f0f0",
                fontWeight: i === statement.length - 1 ? 700 : 400,
              }}
            >
              {row.desc}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.75rem",
                fontWeight: 700,
                color: row.amount.startsWith("+")
                  ? "#50ffb0"
                  : row.amount === "₨0"
                    ? "#00ffff"
                    : "#ffb347",
              }}
            >
              {row.amount}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom note */}
      <div
        style={{
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "0.75rem",
          color: "rgba(176,255,255,0.4)",
          textAlign: "center",
          marginBottom: 20,
          lineHeight: 1.5,
          padding: "0 8px",
        }}
      >
        📱 This account is scheduled for automatic deletion. You will receive an
        SMS confirmation once deletion is complete.
      </div>

      <button
        type="button"
        data-ocid="deletion.home.button"
        className="btn-portal"
        onClick={onHome}
      >
        🏠 RETURN TO HOME
      </button>
    </div>
  );
}

// ========================
// SCREEN 13: SETTINGS
// ========================
function SettingsScreen({
  onBack,
  onPrivacy,
}: { onBack: () => void; onPrivacy: () => void }) {
  const [gps, setGps] = useState(true);
  const [notifs, setNotifs] = useState(true);
  const [twoFa, setTwoFa] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const toggles = [
    {
      label: "GPS Location",
      desc: "Allow location access for nearby providers",
      val: gps,
      set: setGps,
      ocid: "settings.gps.switch",
    },
    {
      label: "Push Notifications",
      desc: "Receive alerts for bookings & updates",
      val: notifs,
      set: setNotifs,
      ocid: "settings.notifs.switch",
    },
    {
      label: "Two-Factor Auth",
      desc: "Extra security for your account",
      val: twoFa,
      set: setTwoFa,
      ocid: "settings.twofa.switch",
    },
    {
      label: "Dark Mode",
      desc: "Celestial dark theme",
      val: darkMode,
      set: setDarkMode,
      ocid: "settings.dark.switch",
    },
  ];

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="SETTINGS" onBack={onBack} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {toggles.map((t) => (
          <div
            key={t.label}
            className="glass"
            style={{
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#f0f0f0",
                }}
              >
                {t.label}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.8rem",
                  color: "rgba(176,255,255,0.5)",
                }}
              >
                {t.desc}
              </div>
            </div>
            <button
              type="button"
              data-ocid={t.ocid}
              onClick={() => t.set(!t.val)}
              style={{
                width: 48,
                height: 26,
                borderRadius: 13,
                background: t.val
                  ? "rgba(0,255,255,0.25)"
                  : "rgba(255,255,255,0.08)",
                border: t.val
                  ? "1px solid rgba(0,255,255,0.5)"
                  : "1px solid rgba(255,255,255,0.15)",
                position: "relative",
                cursor: "pointer",
                transition: "all 0.25s",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 3,
                  left: t.val ? 24 : 3,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: t.val ? "#00ffff" : "rgba(255,255,255,0.4)",
                  boxShadow: t.val ? "0 0 6px #00ffff" : "none",
                  transition: "all 0.25s",
                }}
              />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        data-ocid="settings.privacy.button"
        onClick={onPrivacy}
        style={{
          width: "100%",
          padding: "14px",
          background: "rgba(0,255,255,0.05)",
          border: "1px solid rgba(0,255,255,0.2)",
          borderRadius: 12,
          color: "rgba(0,255,255,0.8)",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.7rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          cursor: "pointer",
          marginBottom: 16,
        }}
      >
        🔒 PRIVACY POLICY
      </button>
      <div
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.6rem",
          color: "rgba(255,80,60,0.6)",
          letterSpacing: "0.1em",
          marginBottom: 10,
        }}
      >
        DANGER ZONE
      </div>
      <button
        type="button"
        data-ocid="settings.delete_button"
        style={{
          width: "100%",
          padding: "14px",
          background: "rgba(255,80,60,0.08)",
          border: "1px solid rgba(255,80,60,0.35)",
          borderRadius: 12,
          color: "#ff6b5b",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          cursor: "pointer",
        }}
      >
        DELETE ACCOUNT
      </button>
    </div>
  );
}

// ========================
// MAIN APP
// ========================
// LOW BALANCE MODAL
// ========================
function LowBalanceModal({
  userBalance,
  total,
  onTopUp,
  onCancel,
}: {
  userBalance: number;
  total: number;
  onTopUp: () => void;
  onCancel: () => void;
}) {
  const shortfall = total - userBalance;
  return (
    <div
      data-ocid="balance.modal"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 24px",
        backdropFilter: "blur(6px)",
      }}
    >
      <div
        className="glass-bright"
        style={{
          width: "100%",
          maxWidth: 380,
          padding: 28,
          border: "1px solid rgba(255,200,0,0.4)",
          boxShadow: "0 0 40px rgba(255,200,0,0.15)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ fontSize: "3rem", marginBottom: 12 }}>⚠️</div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "1rem",
              fontWeight: 900,
              color: "#ffd700",
              letterSpacing: "0.08em",
              textShadow: "0 0 16px rgba(255,215,0,0.4)",
            }}
          >
            INSUFFICIENT BALANCE
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {[
            {
              label: "Your Balance",
              val: `₨${userBalance.toLocaleString()}`,
              color: "#ff6b5b",
            },
            {
              label: "Service Cost",
              val: `₨${total.toLocaleString()}`,
              color: "#f0f0f0",
            },
            {
              label: "Shortfall",
              val: `₨${shortfall.toLocaleString()}`,
              color: "#ffd700",
            },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 14px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <span
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.95rem",
                  color: "rgba(176,255,255,0.7)",
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: row.color,
                }}
              >
                {row.val}
              </span>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            type="button"
            data-ocid="balance.cancel_button"
            className="btn-portal ghost-btn"
            style={{ flex: 1 }}
            onClick={onCancel}
          >
            CANCEL
          </button>
          <button
            type="button"
            data-ocid="balance.primary_button"
            className="btn-portal"
            style={{ flex: 2 }}
            onClick={onTopUp}
          >
            💳 TOP UP WALLET
          </button>
        </div>
      </div>
    </div>
  );
}

// ========================
// PROVIDER PRICING SCREEN
// ========================
function ProviderPricingScreen({
  items,
  serviceName,
  onBack,
  onConfirm,
}: {
  items: Array<{ name: string; quantity: string; unit: string; price: string }>;
  serviceName: string;
  onBack: () => void;
  onConfirm: (
    pricedItems: Array<{
      name: string;
      quantity: string;
      unit: string;
      price: string;
    }>,
  ) => void;
}) {
  const [localItems, setLocalItems] = useState(
    items.map((i) => ({ ...i, price: "" })),
  );
  const [activeTab, setActiveTab] = useState<"provider" | "user">("provider");
  const [confirmed, setConfirmed] = useState(false);

  const RIDER_CHARGE = 150;
  const SERVICE_FEE = 500;

  const allPriced =
    localItems.length > 0 &&
    localItems.every((i) => i.price && Number.parseFloat(i.price) > 0);

  const itemsTotal = localItems.reduce((sum, i) => {
    const qty = Number.parseFloat(i.quantity) || 1;
    const price = Number.parseFloat(i.price) || 0;
    return sum + qty * price;
  }, 0);

  const grandTotal = itemsTotal + RIDER_CHARGE + SERVICE_FEE;

  const handleConfirm = () => {
    setConfirmed(true);
    setActiveTab("user");
    onConfirm(localItems);
  };

  const glassBg = "rgba(0,255,255,0.06)";
  const glassBorder = "1px solid rgba(0,255,255,0.3)";
  const activeTabStyle: React.CSSProperties = {
    background: "rgba(0,255,255,0.2)",
    border: "1px solid #00ffff",
    color: "#00ffff",
    borderRadius: "999px",
    padding: "8px 20px",
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    cursor: "pointer",
  };
  const inactiveTabStyle: React.CSSProperties = {
    background: "rgba(0,255,255,0.05)",
    border: "1px solid rgba(0,255,255,0.2)",
    color: "rgba(176,255,255,0.6)",
    borderRadius: "999px",
    padding: "8px 20px",
    fontFamily: "'Orbitron', sans-serif",
    fontSize: "11px",
    fontWeight: 700,
    letterSpacing: "0.05em",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05070A",
        color: "#fff",
        padding: "0 0 80px",
        fontFamily: "'Rajdhani', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          background: "rgba(0,255,255,0.06)",
          borderBottom: "1px solid rgba(0,255,255,0.2)",
          padding: "16px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={onBack}
          style={{
            background: "none",
            border: "none",
            color: "#00ffff",
            cursor: "pointer",
            fontSize: 20,
          }}
        >
          ←
        </button>
        <div>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontSize: "13px",
              fontWeight: 700,
              color: "#00ffff",
              letterSpacing: "0.08em",
            }}
          >
            PROVIDER PRICING
          </div>
          <div style={{ fontSize: "12px", color: "rgba(176,255,255,0.6)" }}>
            {serviceName}
          </div>
        </div>
      </div>

      <div style={{ padding: "20px 16px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
          <button
            type="button"
            data-ocid="provider_pricing.provider_tab.tab"
            onClick={() => setActiveTab("provider")}
            style={activeTab === "provider" ? activeTabStyle : inactiveTabStyle}
          >
            PROVIDER VIEW
          </button>
          <button
            type="button"
            data-ocid="provider_pricing.user_tab.tab"
            onClick={() => setActiveTab("user")}
            style={activeTab === "user" ? activeTabStyle : inactiveTabStyle}
          >
            YOUR QUOTE
          </button>
        </div>

        {activeTab === "provider" && (
          <div>
            {/* Header card */}
            <div
              style={{
                background: glassBg,
                border: glassBorder,
                borderRadius: 16,
                padding: "16px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: "#00ffff",
                    display: "inline-block",
                    animation: "pulse 1.5s infinite",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#00ffff",
                    letterSpacing: "0.06em",
                  }}
                >
                  SERVICE PROVIDER IS PRICING YOUR ORDER
                </span>
              </div>
              <div style={{ fontSize: "12px", color: "rgba(176,255,255,0.6)" }}>
                Simulating provider response — prices update in real-time
              </div>
            </div>

            {/* Items */}
            {localItems.map((item, idx) => (
              <div
                key={item.name}
                style={{
                  background: glassBg,
                  border: glassBorder,
                  borderRadius: 16,
                  padding: "14px 16px",
                  marginBottom: 10,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <div
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "13px",
                        fontWeight: 700,
                        color: "#fff",
                        letterSpacing: "0.04em",
                      }}
                    >
                      {item.name}
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        color: "rgba(176,255,255,0.6)",
                        marginTop: 2,
                      }}
                    >
                      {item.quantity} {item.unit}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "rgba(0,255,255,0.7)",
                      background: "rgba(0,255,255,0.1)",
                      borderRadius: 8,
                      padding: "4px 10px",
                    }}
                  >
                    Item {idx + 1}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: "12px",
                      color: "rgba(176,255,255,0.6)",
                      fontFamily: "'Orbitron', sans-serif",
                    }}
                  >
                    PKR / {item.unit || "unit"}
                  </span>
                  <input
                    type="number"
                    data-ocid={`provider_pricing.item_price.input.${idx + 1}`}
                    placeholder="Enter price"
                    value={localItems[idx].price}
                    onChange={(e) => {
                      const updated = [...localItems];
                      updated[idx] = { ...updated[idx], price: e.target.value };
                      setLocalItems(updated);
                    }}
                    style={{
                      flex: 1,
                      background: "rgba(0,255,255,0.08)",
                      border: "1px solid rgba(0,255,255,0.4)",
                      borderRadius: 10,
                      padding: "10px 14px",
                      color: "#00ffff",
                      fontFamily: "'Rajdhani', sans-serif",
                      fontSize: "15px",
                      fontWeight: 600,
                      outline: "none",
                    }}
                  />
                </div>
              </div>
            ))}

            {/* Confirm button */}
            <button
              type="button"
              data-ocid="provider_pricing.confirm.button"
              onClick={handleConfirm}
              disabled={!allPriced}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: 14,
                background: allPriced
                  ? "linear-gradient(135deg, rgba(0,255,255,0.3), rgba(0,200,200,0.2))"
                  : "rgba(0,255,255,0.05)",
                border: allPriced
                  ? "1px solid #00ffff"
                  : "1px solid rgba(0,255,255,0.2)",
                color: allPriced ? "#00ffff" : "rgba(176,255,255,0.3)",
                fontFamily: "'Orbitron', sans-serif",
                fontSize: "13px",
                fontWeight: 700,
                letterSpacing: "0.08em",
                cursor: allPriced ? "pointer" : "not-allowed",
                marginTop: 8,
              }}
            >
              {allPriced
                ? "CONFIRM & SEND TO USER ✓"
                : "FILL ALL PRICES TO CONFIRM"}
            </button>
          </div>
        )}

        {activeTab === "user" && (
          <div>
            {!confirmed && !allPriced ? (
              <div
                style={{
                  background: "rgba(255,180,0,0.08)",
                  border: "1px solid rgba(255,180,0,0.3)",
                  borderRadius: 16,
                  padding: "20px",
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: 8 }}>⏳</div>
                <div
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "12px",
                    color: "#FFB400",
                    letterSpacing: "0.06em",
                  }}
                >
                  Waiting for provider to price your items...
                </div>
                <div
                  style={{
                    fontSize: "12px",
                    color: "rgba(176,255,255,0.5)",
                    marginTop: 6,
                  }}
                >
                  Switch to Provider View to enter prices
                </div>
              </div>
            ) : null}

            {/* Item breakdown */}
            {localItems.map((item, _idx) => {
              const qty = Number.parseFloat(item.quantity) || 1;
              const price = Number.parseFloat(item.price) || 0;
              const lineTotal = qty * price;
              return (
                <div
                  key={item.name}
                  style={{
                    background: glassBg,
                    border: glassBorder,
                    borderRadius: 14,
                    padding: "14px 16px",
                    marginBottom: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 4,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "12px",
                        fontWeight: 700,
                        color: "#fff",
                      }}
                    >
                      {item.name}
                    </span>
                    <span
                      style={{
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "12px",
                        color: price > 0 ? "#00ffff" : "rgba(176,255,255,0.4)",
                      }}
                    >
                      {price > 0 ? `PKR ${lineTotal.toLocaleString()}` : "—"}
                    </span>
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <span
                      style={{
                        fontSize: "12px",
                        color: "rgba(176,255,255,0.6)",
                      }}
                    >
                      {item.quantity} {item.unit} × PKR{" "}
                      {price > 0 ? price : "?"}
                    </span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "rgba(176,255,255,0.4)",
                      }}
                    >
                      Line total
                    </span>
                  </div>
                </div>
              );
            })}

            {/* Cost breakdown */}
            <div
              style={{
                background: "rgba(0,255,255,0.06)",
                border: "1px solid rgba(0,255,255,0.35)",
                borderRadius: 16,
                padding: "18px 16px",
                marginTop: 12,
              }}
            >
              <div
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "rgba(0,255,255,0.7)",
                  letterSpacing: "0.08em",
                  marginBottom: 14,
                }}
              >
                COST BREAKDOWN
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{ fontSize: "14px", color: "rgba(176,255,255,0.8)" }}
                >
                  🛒 Items Total
                </span>
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "13px",
                    color: "#fff",
                  }}
                >
                  PKR {allPriced ? itemsTotal.toLocaleString() : "—"}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <span
                  style={{ fontSize: "14px", color: "rgba(176,255,255,0.8)" }}
                >
                  🛵 Rider / Delivery Charges
                </span>
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "13px",
                    color: "#fff",
                  }}
                >
                  PKR {RIDER_CHARGE.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 14,
                  paddingBottom: 14,
                  borderBottom: "1px solid rgba(0,255,255,0.15)",
                }}
              >
                <span
                  style={{ fontSize: "14px", color: "rgba(176,255,255,0.8)" }}
                >
                  👷 Service Provider Fee
                </span>
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "13px",
                    color: "#fff",
                  }}
                >
                  PKR {SERVICE_FEE.toLocaleString()}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#00ffff",
                    letterSpacing: "0.06em",
                  }}
                >
                  💰 TOTAL PAYMENT
                </span>
                <span
                  style={{
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "20px",
                    fontWeight: 900,
                    color: "#00ffff",
                    textShadow: "0 0 16px rgba(0,255,255,0.6)",
                  }}
                >
                  {allPriced ? `PKR ${grandTotal.toLocaleString()}` : "PKR —"}
                </span>
              </div>
            </div>

            {confirmed && (
              <button
                type="button"
                onClick={() => onConfirm(localItems)}
                style={{
                  width: "100%",
                  padding: "16px",
                  borderRadius: 14,
                  background:
                    "linear-gradient(135deg, rgba(0,255,255,0.3), rgba(0,200,200,0.2))",
                  border: "1px solid #00ffff",
                  color: "#00ffff",
                  fontFamily: "'Orbitron', sans-serif",
                  fontSize: "13px",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  cursor: "pointer",
                  marginTop: 16,
                }}
              >
                PROCEED TO PROVIDERS →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function PortalApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [selectedService, setSelectedService] = useState<
    (typeof SERVICES)[0] | null
  >(null);
  const [selectedProvider, setSelectedProvider] = useState<
    (typeof PROVIDERS)[0] | null
  >(null);
  const [navActive, setNavActive] = useState<NavTab>("home");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined,
  );
  const [userBalance, setUserBalance] = useState(8500);
  const [_bookingDetails, setBookingDetails] = useState<Record<string, string>>(
    {},
  );
  const [showLowBalance, setShowLowBalance] = useState(false);
  const [pricedItems, setPricedItems] = useState<
    Array<{ name: string; quantity: string; unit: string; price: string }>
  >([]);
  const [_userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
    city: string;
  } | null>(null);

  const showBottomNav = [
    "home",
    "services",
    "providers",
    "confirmed",
    "payment",
    "locked",
    "otp",
    "success",
    "chat",
    "profile",
    "settings",
  ];

  function handleNav(tab: NavTab) {
    setNavActive(tab);
    if (tab === "home") setScreen("home");
    else if (tab === "tasks") setScreen("services");
    else if (tab === "chat") setScreen("chat");
    else if (tab === "profile") setScreen("profile");
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05070a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div className="nebula-blob nebula-teal" />
      <div className="nebula-blob nebula-violet" />
      <div className="gateway-grid" />
      <div
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: 430,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          overflowX: "hidden",
        }}
      >
        <main style={{ flex: 1 }}>
          {screen === "splash" && (
            <SplashScreen onDone={() => setScreen("login")} />
          )}
          {screen === "onboarding" && (
            <OnboardingScreen onDone={() => setScreen("login")} />
          )}
          {screen === "login" && (
            <LoginScreen
              onDone={() => {
                setScreen("home");
                setNavActive("home");
              }}
              onRegister={() => setScreen("register")}
            />
          )}
          {screen === "register" && (
            <RegisterScreen
              onBack={() => setScreen("login")}
              onProviderRegister={() => setScreen("provider-register")}
              onCustomerRegister={() => setScreen("customer-register")}
            />
          )}
          {screen === "provider-register" && (
            <ProviderRegisterScreen
              onBack={() => setScreen("register")}
              onDone={() => {
                setScreen("home");
                setNavActive("home");
              }}
            />
          )}
          {screen === "customer-register" && (
            <CustomerRegisterScreen
              onBack={() => setScreen("register")}
              onDone={() => {
                setScreen("home");
                setNavActive("home");
              }}
            />
          )}
          {screen === "home" && (
            <HomeScreen
              onServiceTap={(s) => {
                setSelectedService(s);
                setScreen("providers");
              }}
              onAllServices={(category) => {
                setSelectedCategory(category);
                setScreen("services");
                setNavActive("tasks");
              }}
            />
          )}
          {screen === "services" && (
            <AllServicesScreen
              onBack={() => {
                setScreen("home");
                setNavActive("home");
              }}
              onSelectProvider={(p) => {
                setSelectedProvider(p);
                const catSvc =
                  SERVICES.find((s) => s.category === p.category) ??
                  SERVICES[0];
                setSelectedService(catSvc);
                setScreen("confirmed");
              }}
              onSelect={(s) => {
                setSelectedService(s);
                const n = s.name.toLowerCase();
                const c = s.category.toLowerCase();
                const needs =
                  c === "health" ||
                  c === "groceries" ||
                  c === "shopping" ||
                  n.includes("doctor") ||
                  n.includes("nurse") ||
                  n.includes("dental") ||
                  n.includes("car rental") ||
                  n.includes("van") ||
                  n.includes("bike rental") ||
                  n.includes("driver") ||
                  n.includes("travel") ||
                  n.includes("property") ||
                  n.includes("pharmacy") ||
                  n.includes("medical") ||
                  n.includes("grocery") ||
                  n.includes("stationary") ||
                  n.includes("store") ||
                  n.includes("shop");
                setScreen(needs ? "serviceBooking" : "providers");
              }}
              category={selectedCategory}
            />
          )}
          {screen === "serviceBooking" && selectedService && (
            <ServiceBookingFormScreen
              service={selectedService}
              onBack={() => setScreen("services")}
              onSubmit={(details) => {
                setBookingDetails(details);
                const sn = selectedService?.name?.toLowerCase() ?? "";
                const sc = selectedService?.category ?? "";
                const isOrderable =
                  sc === "Groceries" ||
                  sc === "Shopping" ||
                  sn.includes("pharmacy") ||
                  sn.includes("medical store") ||
                  sn.includes("stationary");
                if (isOrderable) {
                  try {
                    const items = JSON.parse(details.orderItems || "[]");
                    setPricedItems(
                      items.map((i: Record<string, string>) => ({
                        ...i,
                        price: "",
                      })),
                    );
                  } catch {
                    setPricedItems([]);
                  }
                  setScreen("provider-pricing");
                } else {
                  setScreen("providers");
                }
              }}
            />
          )}
          {screen === "provider-pricing" && selectedService && (
            <ProviderPricingScreen
              items={pricedItems}
              serviceName={selectedService.name}
              onBack={() => setScreen("serviceBooking")}
              onConfirm={(priced) => {
                setPricedItems(priced);
                setScreen("providers");
              }}
            />
          )}
          {screen === "providers" && (
            <NearbyProvidersScreen
              service={selectedService}
              onBack={() => setScreen(selectedService ? "services" : "home")}
              onSelect={(p) => {
                setSelectedProvider(p);
                setScreen("confirmed");
              }}
              onLocationUpdate={(loc) => setUserLocation(loc)}
            />
          )}
          {screen === "confirmed" && (
            <ProviderConfirmedScreen
              provider={selectedProvider}
              service={selectedService}
              onBack={() => setScreen("providers")}
              onChat={() => {
                setScreen("chat");
                setNavActive("chat");
              }}
              onPay={() => setScreen("payment")}
            />
          )}
          {screen === "payment" && (
            <PaymentPlanScreen
              onBack={() => setScreen("confirmed")}
              onLock={() => setScreen("locked")}
              onBankTransfer={() => setScreen("bank-transfer-confirm")}
              service={selectedService}
              userBalance={userBalance}
              onLowBalance={() => setShowLowBalance(true)}
            />
          )}
          {screen === "bank-transfer-confirm" && (
            <BankTransferConfirmScreen
              onBack={() => setScreen("payment")}
              onConfirm={() => setScreen("locked")}
            />
          )}
          {screen === "locked" && (
            <PaymentLockedScreen
              onBack={() => setScreen("payment")}
              onOtp={() => setScreen("otp")}
            />
          )}
          {screen === "otp" && (
            <OtpScreen
              onBack={() => setScreen("locked")}
              onSuccess={() => setScreen("success")}
              service={selectedService}
              userBalance={userBalance}
              onDebit={(amt) => setUserBalance((b) => b - amt)}
            />
          )}
          {screen === "success" && (
            <SuccessScreen
              onHome={() => {
                setScreen("home");
                setNavActive("home");
              }}
              onInvoice={() => setScreen("invoice")}
            />
          )}
          {screen === "invoice" && (
            <InvoiceScreen
              onHome={() => {
                setScreen("home");
                setNavActive("home");
              }}
              service={selectedService}
            />
          )}
          {screen === "chat" && (
            <ChatScreen
              onBack={() => {
                setScreen("home");
                setNavActive("home");
              }}
            />
          )}
          {screen === "profile" && (
            <ProfileScreen
              onBack={() => {
                setScreen("home");
                setNavActive("home");
              }}
              onSettings={() => setScreen("settings")}
              onDeleteAccount={() => setScreen("provider-withdrawal")}
              onTopUp={() => setScreen("provider-topup")}
            />
          )}
          {screen === "provider-withdrawal" && (
            <ProviderWithdrawalScreen
              onBack={() => setScreen("profile")}
              onSubmit={() => setScreen("provider-deletion")}
            />
          )}
          {screen === "provider-deletion" && (
            <ProviderAccountDeletionScreen
              onBack={() => setScreen("provider-withdrawal")}
              onHome={() => {
                setScreen("home");
                setNavActive("home");
              }}
            />
          )}
          {screen === "provider-topup" && (
            <ProviderTopUpScreen
              onBack={() => setScreen("profile")}
              onDone={() => setScreen("home")}
            />
          )}
          {screen === "settings" && (
            <SettingsScreen
              onBack={() => {
                setScreen("profile");
                setNavActive("profile");
              }}
              onPrivacy={() => setScreen("privacy")}
            />
          )}
          {screen === "privacy" && (
            <PrivacyPolicyScreen onBack={() => setScreen("settings")} />
          )}
        </main>

        {/* Footer on main screens */}
        {screen === "home" && (
          <footer
            style={{
              textAlign: "center",
              padding: "8px 24px 100px",
              color: "rgba(176,255,255,0.3)",
              fontSize: "0.5rem",
              letterSpacing: "0.1em",
            }}
          >
            © {new Date().getFullYear()}. Built with{" "}
            <span style={{ color: "rgba(0,255,255,0.5)" }}>♥</span> using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "rgba(0,255,255,0.5)", textDecoration: "none" }}
            >
              caffeine.ai
            </a>
          </footer>
        )}
      </div>
      {showBottomNav.includes(screen) && (
        <BottomNav active={navActive} onNav={handleNav} />
      )}
      {showLowBalance && (
        <LowBalanceModal
          userBalance={userBalance}
          total={
            (selectedService?.price ?? 1200) +
            Math.round((selectedService?.price ?? 1200) * 0.1) +
            Math.round((selectedService?.price ?? 1200) * 0.05)
          }
          onTopUp={() => {
            setShowLowBalance(false);
            setScreen("provider-topup");
          }}
          onCancel={() => setShowLowBalance(false)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <PortalApp />
    </QueryClientProvider>
  );
}
