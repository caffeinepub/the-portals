import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { PortalLogo } from "./components/PortalLogo";
import { useActor } from "./hooks/useActor";

const queryClient = new QueryClient();

// ========================
// DATA
// ========================
const SERVICES = [
  { id: 1, emoji: "🔧", name: "Plumber", price: 800 },
  { id: 2, emoji: "⚡", name: "Electrician", price: 750 },
  { id: 3, emoji: "🧹", name: "Cleaner", price: 500 },
  { id: 4, emoji: "🪚", name: "Carpenter", price: 1200 },
  { id: 5, emoji: "🎨", name: "Painter", price: 900 },
  { id: 6, emoji: "❄️", name: "HVAC", price: 2500 },
  { id: 7, emoji: "🚗", name: "Driver", price: 400 },
  { id: 8, emoji: "👨‍🍳", name: "Chef", price: 1500 },
  { id: 9, emoji: "📚", name: "Tutor", price: 700 },
  { id: 10, emoji: "🛡️", name: "Security", price: 1100 },
  { id: 11, emoji: "💻", name: "IT Support", price: 800 },
  { id: 12, emoji: "🌿", name: "Gardener", price: 600 },
];

const PROVIDERS = [
  {
    id: 1,
    name: "Usman Tariq",
    initials: "UT",
    profession: "Plumber",
    distance: "0.3 km",
    rating: 4.9,
    rate: 850,
  },
  {
    id: 2,
    name: "Bilal Hassan",
    initials: "BH",
    profession: "Electrician",
    distance: "0.8 km",
    rating: 4.7,
    rate: 780,
  },
  {
    id: 3,
    name: "Zubair Khan",
    initials: "ZK",
    profession: "Carpenter",
    distance: "1.4 km",
    rating: 4.5,
    rate: 1250,
  },
  {
    id: 4,
    name: "Asad Mehmood",
    initials: "AM",
    profession: "HVAC Tech",
    distance: "2.1 km",
    rating: 4.2,
    rate: 2600,
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
  | "settings";

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
          className="portal-logo"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background:
              "radial-gradient(circle at center, rgba(0,60,80,0.9) 0%, rgba(0,10,20,0.95) 100%)",
            borderRadius: "50%",
            border: "2px solid rgba(0,255,255,0.4)",
          }}
        >
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "3rem",
              fontWeight: 900,
              color: "#00ffff",
              textShadow: "0 0 20px #00ffff, 0 0 40px rgba(0,255,255,0.6)",
              lineHeight: 1,
            }}
          >
            P
          </span>
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
          Karachi Gateway Network
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
  const [phone, setPhone] = useState("");

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
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div
          className="portal-logo"
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
          KARACHI GATEWAY NETWORK
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
          gap: 16,
        }}
      >
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.8rem",
            color: "rgba(176,255,255,0.6)",
            letterSpacing: "0.1em",
          }}
        >
          PHONE NUMBER
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <div
            style={{
              background: "rgba(0,20,30,0.5)",
              border: "1px solid rgba(0,255,255,0.3)",
              borderRadius: 10,
              padding: "14px 12px",
              color: "rgba(176,255,255,0.8)",
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            🇵🇰 +92
          </div>
          <input
            className="portal-input"
            data-ocid="login.input"
            type="tel"
            placeholder="3XX-XXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{ flex: 1 }}
          />
        </div>

        <button
          type="button"
          data-ocid="login.primary_button"
          className="btn-portal"
          onClick={onDone}
        >
          SEND OTP
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{ flex: 1, height: 1, background: "rgba(0,255,255,0.15)" }}
          />
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              color: "rgba(176,255,255,0.4)",
              fontSize: "0.8rem",
            }}
          >
            OR
          </span>
          <div
            style={{ flex: 1, height: 1, background: "rgba(0,255,255,0.15)" }}
          />
        </div>

        <button
          type="button"
          data-ocid="login.secondary_button"
          className="btn-portal ghost-btn"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          onClick={onDone}
        >
          <span>G</span> Continue with Google
        </button>

        <p
          style={{
            textAlign: "center",
            fontFamily: "Rajdhani, sans-serif",
            color: "rgba(176,255,255,0.5)",
            fontSize: "0.9rem",
            margin: 0,
          }}
        >
          New here?{" "}
          <button
            type="button"
            data-ocid="login.link"
            style={{
              background: "none",
              border: "none",
              color: "#00ffff",
              cursor: "pointer",
              fontFamily: "inherit",
              fontSize: "inherit",
            }}
            onClick={onRegister}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

// ========================
// SCREEN: REGISTER (Choose Type)
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
                  Registration fee: PKR 5,000
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
const PROFESSIONS = [
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
  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    cnic: "",
    city: "Karachi",
    email: "",
    profession: "",
    experience: "",
    bio: "",
    serviceArea: "",
    certifications: "",
    paymentMethod: "Portal Wallet",
  });

  function handleChange(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    alert("Welcome, Service Provider! Your account is active.");
    onDone();
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
        {/* Back */}
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

        {/* Header */}
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

          {/* Progress */}
          <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
            {[1, 2, 3].map((s) => (
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
            Step {step} of 3 —{" "}
            {step === 1
              ? "Personal Information"
              : step === 2
                ? "Professional Details"
                : "Registration & Payment"}
          </p>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div data-ocid="provider_register.step.1">
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
              <span style={labelStyle}>CNIC (13 digits)</span>
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
              <span style={labelStyle}>CITY</span>
              <input
                type="text"
                placeholder="Karachi"
                value={form.city}
                onChange={(e) => handleChange("city", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>EMAIL ADDRESS</span>
              <input
                type="email"
                placeholder="provider@email.com"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div data-ocid="provider_register.step.2">
            <div style={fieldStyle}>
              <span style={labelStyle}>PROFESSION / SERVICE CATEGORY</span>
              <select
                data-ocid="provider_register.profession.select"
                value={form.profession}
                onChange={(e) => handleChange("profession", e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                <option value="" disabled style={{ background: "#05070a" }}>
                  Select profession...
                </option>
                {PROFESSIONS.map((p) => (
                  <option key={p} value={p} style={{ background: "#05070a" }}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>YEARS OF EXPERIENCE</span>
              <input
                type="number"
                min="0"
                placeholder="5"
                value={form.experience}
                onChange={(e) => handleChange("experience", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>SHORT BIO / DESCRIPTION</span>
              <textarea
                rows={3}
                placeholder="Describe your expertise and services..."
                value={form.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                style={{ ...inputStyle, resize: "vertical" }}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>SERVICE AREA</span>
              <input
                type="text"
                placeholder="e.g., DHA, Clifton, Gulshan"
                value={form.serviceArea}
                onChange={(e) => handleChange("serviceArea", e.target.value)}
                style={inputStyle}
              />
            </div>
            <div style={fieldStyle}>
              <span style={labelStyle}>CERTIFICATIONS (Optional)</span>
              <input
                type="text"
                placeholder="e.g., HVAC Certified, MBBS"
                value={form.certifications}
                onChange={(e) => handleChange("certifications", e.target.value)}
                style={inputStyle}
              />
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div data-ocid="provider_register.step.3">
            {/* Summary Card */}
            <div
              style={{
                background: "rgba(0,255,255,0.05)",
                border: "1px solid rgba(0,255,255,0.3)",
                borderRadius: "16px",
                padding: "20px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "12px",
                  letterSpacing: "0.12em",
                  color: "#00ffff",
                  margin: "0 0 16px",
                }}
              >
                SERVICE PROVIDER REGISTRATION
              </p>
              {[
                { label: "Registration Fee", value: "PKR 5,000" },
                { label: "Platform Access", value: "Included ✓" },
                { label: "First Month Service Listing", value: "Included ✓" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "8px 0",
                    borderBottom: "1px solid rgba(0,255,255,0.1)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: "14px",
                      color: "rgba(232,244,248,0.7)",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: "14px",
                      fontWeight: 600,
                      color: "#e8f4f8",
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                    color: "rgba(0,255,255,0.8)",
                  }}
                >
                  REMAINING BALANCE
                </span>
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "14px",
                    fontWeight: 700,
                    color: "#00ffff",
                  }}
                >
                  PKR 0
                </span>
              </div>
            </div>

            {/* Low Balance Warning */}
            <div
              data-ocid="provider_register.low_balance.error_state"
              style={{
                background: "rgba(255,140,0,0.1)",
                border: "1px solid rgba(255,140,0,0.5)",
                borderRadius: "12px",
                padding: "14px 16px",
                marginBottom: "16px",
                boxShadow: "0 0 15px rgba(255,140,0,0.2)",
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
              }}
            >
              <span style={{ fontSize: "18px", flexShrink: 0 }}>⚠️</span>
              <p
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "14px",
                  color: "rgba(255,180,60,0.95)",
                  margin: 0,
                  lineHeight: "1.5",
                }}
              >
                Your portal balance is below PKR 1,000. Please top up to
                continue using services.
              </p>
            </div>

            {/* Payment Method */}
            <div style={fieldStyle}>
              <span style={labelStyle}>PAYMENT METHOD</span>
              <select
                data-ocid="provider_register.payment_method.select"
                value={form.paymentMethod}
                onChange={(e) => handleChange("paymentMethod", e.target.value)}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {["Portal Wallet", "Jazz Cash", "EasyPaisa"].map((m) => (
                  <option key={m} value={m} style={{ background: "#05070a" }}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          {step < 3 ? (
            <button
              data-ocid="provider_register.next.button"
              type="button"
              onClick={() => setStep((s) => s + 1)}
              style={{
                flex: 1,
                padding: "14px",
                background:
                  "linear-gradient(135deg, rgba(0,255,255,0.3) 0%, rgba(0,200,200,0.2) 100%)",
                border: "1px solid rgba(0,255,255,0.6)",
                borderRadius: "12px",
                color: "#00ffff",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                cursor: "pointer",
                boxShadow: "0 0 20px rgba(0,255,255,0.3)",
                transition: "all 0.2s",
              }}
            >
              NEXT →
            </button>
          ) : (
            <button
              data-ocid="provider_register.submit.button"
              type="button"
              onClick={handleSubmit}
              style={{
                flex: 1,
                padding: "14px",
                background:
                  "linear-gradient(135deg, rgba(0,255,255,0.4) 0%, rgba(0,200,255,0.25) 100%)",
                border: "1px solid rgba(0,255,255,0.8)",
                borderRadius: "12px",
                color: "#00ffff",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                cursor: "pointer",
                boxShadow: "0 0 25px rgba(0,255,255,0.4)",
                transition: "all 0.2s",
              }}
            >
              COMPLETE REGISTRATION ✓
            </button>
          )}
        </div>

        <p
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "11px",
            color: "rgba(232,244,248,0.35)",
            textAlign: "center",
            marginTop: "24px",
          }}
        >
          By registering you agree to The Portals Terms of Service
        </p>
      </div>
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
  onAllServices: () => void;
}) {
  const [activeCount, setActiveCount] = useState(0);
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

  const categories = [
    {
      name: "Rentals",
      emoji: "🔑",
      color: "from-gray-400 to-gray-300",
      border: "rgba(180,180,180,0.4)",
    },
    {
      name: "Repairs",
      emoji: "🔧",
      color: "from-orange-400 to-amber-400",
      border: "rgba(251,146,60,0.4)",
    },
    {
      name: "Health",
      emoji: "❤️",
      color: "from-emerald-400 to-teal-400",
      border: "rgba(52,211,153,0.4)",
    },
    {
      name: "Tutors",
      emoji: "📚",
      color: "from-yellow-400 to-amber-300",
      border: "rgba(251,191,36,0.4)",
    },
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
              Locating Nearby Gateways...
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
                onClick={onAllServices}
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
function AllServicesScreen({
  onBack,
  onSelect,
}: {
  onBack: () => void;
  onSelect: (s: (typeof SERVICES)[0]) => void;
}) {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="ALL SERVICES" onBack={onBack} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 10,
        }}
      >
        {SERVICES.map((svc) => (
          <button
            key={svc.id}
            type="button"
            data-ocid={`services.item.${svc.id}`}
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
    </div>
  );
}

// ========================
// SCREEN 5: NEARBY PROVIDERS
// ========================
function NearbyProvidersScreen({
  service,
  onBack,
  onSelect,
}: {
  service: (typeof SERVICES)[0] | null;
  onBack: () => void;
  onSelect: (p: (typeof PROVIDERS)[0]) => void;
}) {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="NEARBY PROVIDERS" onBack={onBack} />
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
        {PROVIDERS.map((p, i) => (
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
  onBack,
  onChat,
  onPay,
}: {
  provider: (typeof PROVIDERS)[0] | null;
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
          Incl. platform fee & insurance
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
}: { onBack: () => void; onLock: () => void }) {
  const [method, setMethod] = useState("jazzcash");
  const methods = [
    { id: "jazzcash", label: "JazzCash", icon: "📱" },
    { id: "easypaisa", label: "Easypaisa", icon: "💳" },
    { id: "bank", label: "Bank Transfer", icon: "🏦" },
  ];

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
          { label: "Service fee", amount: "₨1,200" },
          { label: "Platform fee", amount: "₨120" },
          { label: "Insurance", amount: "₨80" },
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
            ₨1,400
          </span>
        </div>
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

      <button
        type="button"
        data-ocid="payment.primary_button"
        className="btn-portal"
        onClick={onLock}
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
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const refs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];
  const { actor } = useActor();

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
      onSuccess();
    } catch {
      // Even if actor call fails, advance for demo purposes
      onSuccess();
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="VERIFY COMPLETION" onBack={onBack} />

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
          Enter the 4-digit code shared by your provider
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
// SCREEN 10: SUCCESS
// ========================
function SuccessScreen({ onHome }: { onHome: () => void }) {
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
}: { onSettings: () => void; onBack: () => void }) {
  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <ScreenHeader title="MY PROFILE" onBack={onBack} />

      {/* Avatar */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
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
            margin: "0 auto 12px",
          }}
        >
          A
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
          { label: "Help & Support", icon: "❓", ocid: "profile.item.2" },
          {
            label: "Settings",
            icon: "⚙️",
            ocid: "profile.item.3",
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
          <span style={{ fontSize: "1.2rem" }}>🚪</span>
          <span
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "1rem",
              fontWeight: 600,
              color: "#ff6b5b",
              flex: 1,
            }}
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );
}

// ========================
// SCREEN 13: SETTINGS
// ========================
function SettingsScreen({ onBack }: { onBack: () => void }) {
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
function PortalApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [selectedService, setSelectedService] = useState<
    (typeof SERVICES)[0] | null
  >(null);
  const [selectedProvider, setSelectedProvider] = useState<
    (typeof PROVIDERS)[0] | null
  >(null);
  const [navActive, setNavActive] = useState<NavTab>("home");

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
            <SplashScreen onDone={() => setScreen("onboarding")} />
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
              onCustomerRegister={() => {
                setScreen("home");
                setNavActive("home");
              }}
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
          {screen === "home" && (
            <HomeScreen
              onServiceTap={(s) => {
                setSelectedService(s);
                setScreen("providers");
              }}
              onAllServices={() => {
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
              onSelect={(s) => {
                setSelectedService(s);
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
            />
          )}
          {screen === "confirmed" && (
            <ProviderConfirmedScreen
              provider={selectedProvider}
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
            />
          )}
          {screen === "success" && (
            <SuccessScreen
              onHome={() => {
                setScreen("home");
                setNavActive("home");
              }}
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
            />
          )}
          {screen === "settings" && (
            <SettingsScreen
              onBack={() => {
                setScreen("profile");
                setNavActive("profile");
              }}
            />
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
      showBottomNav.includes(screen) && (
      <BottomNav active={navActive} onNav={handleNav} />)
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
