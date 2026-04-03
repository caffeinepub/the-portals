import { useEffect, useRef, useState } from "react";
import { PortalLogo } from "./components/PortalLogo";
import { PrivacyPolicyScreen } from "./components/PrivacyPolicy";
import { useActor } from "./hooks/useActor";
import { EditProfileScreen } from "./screens/EditProfileScreen";
import { HelpSupportScreen } from "./screens/HelpSupportScreen";
import { PaymentMethodScreen } from "./screens/PaymentMethodScreen";
import { TasksScreen } from "./screens/TasksScreen";
import { TransactionHistoryScreen } from "./screens/TransactionHistoryScreen";

// ─── Types ────────────────────────────────────────────────────────────────────

type Screen =
  | "splash"
  | "onboarding"
  | "login"
  | "register"
  | "customer-register"
  | "provider-register"
  | "home"
  | "category"
  | "profile"
  | "settings"
  | "chat"
  | "tasks"
  | "edit-profile"
  | "payment-method"
  | "transaction-history"
  | "help-support"
  | "privacy"
  | "payment"
  | "otp"
  | "invoice"
  | "success"
  | "admin-login"
  | "admin-dashboard"
  | "userDashboard"
  | "providerDashboard"
  | "lowBalanceAlert";

interface User {
  name: string;
  portalId: string;
  phone: string;
  address: string;
  isProvider: boolean;
  category: string;
  wages: string;
}

// ─── Style Constants ──────────────────────────────────────────────────────────

const glassCard: React.CSSProperties = {
  background: "rgba(0, 255, 255, 0.03)",
  border: "1px solid rgba(0, 255, 255, 0.15)",
  borderRadius: "16px",
  backdropFilter: "blur(10px)",
  padding: "20px",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "rgba(0,255,255,0.05)",
  border: "1px solid rgba(0,255,255,0.3)",
  borderRadius: "10px",
  padding: "12px 16px",
  color: "#E0FFFF",
  fontFamily: "Rajdhani, sans-serif",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box" as const,
};

const primaryBtn: React.CSSProperties = {
  width: "100%",
  padding: "14px",
  background: "linear-gradient(135deg, #00FFFF, #0080FF)",
  border: "none",
  borderRadius: "12px",
  color: "#05070A",
  fontFamily: "Orbitron, sans-serif",
  fontWeight: 700,
  fontSize: "14px",
  letterSpacing: "1px",
  cursor: "pointer",
};

const pageStyle: React.CSSProperties = {
  minHeight: "100vh",
  background: "#05070A",
  color: "#E0FFFF",
  fontFamily: "Rajdhani, sans-serif",
  paddingBottom: "80px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "Orbitron, sans-serif",
  fontSize: "10px",
  color: "rgba(0,255,255,0.6)",
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  marginBottom: "6px",
};

// ─── Categories ───────────────────────────────────────────────────────────────

const CATEGORIES = [
  { name: "General Store", icon: "🏪", color: "#00FFFF" },
  { name: "Health", icon: "❤️", color: "#FF6B9D" },
  { name: "House", icon: "🏠", color: "#00FFAA" },
  { name: "Rentals", icon: "🔑", color: "#FFD700" },
  { name: "Stationary", icon: "✏️", color: "#9B59B6" },
  { name: "Travel", icon: "✈️", color: "#3498DB" },
  { name: "Workforce", icon: "👷", color: "#E67E22" },
];

const ALL_CATEGORY_NAMES = CATEGORIES.map((c) => c.name);

// ─── Helper: generate portal id ──────────────────────────────────────────────

function genPortalId() {
  return `PRT-${Math.floor(100000 + Math.random() * 900000)}`;
}

const STAR_DATA = Array.from({ length: 60 }, (_, i) => ({
  id: `s${i}`,
  width: i % 5 === 0 ? 2 : 1,
  height: i % 5 === 0 ? 2 : 1,
  left: `${(i * 17.3) % 100}%`,
  top: `${(i * 13.7) % 100}%`,
  opacity: 0.3 + (i % 4) * 0.15,
}));

// ─── SpaceBackground ──────────────────────────────────────────────────────────

function SpaceBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 20% 20%, rgba(0,255,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 80%, rgba(0,80,255,0.04) 0%, transparent 60%)",
        }}
      />
      {STAR_DATA.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            width: s.width,
            height: s.height,
            background: "rgba(0,255,255,0.6)",
            borderRadius: "50%",
            left: s.left,
            top: s.top,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}

// ─── ScreenHeader ─────────────────────────────────────────────────────────────

function ScreenHeader({
  title,
  onBack,
}: {
  title: string;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "20px 20px 16px",
        borderBottom: "1px solid rgba(0,255,255,0.1)",
        marginBottom: 8,
      }}
    >
      <button
        type="button"
        onClick={onBack}
        style={{
          background: "rgba(0,255,255,0.08)",
          border: "1px solid rgba(0,255,255,0.2)",
          borderRadius: 8,
          color: "#00FFFF",
          cursor: "pointer",
          fontSize: 18,
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        data-ocid="header.back_button"
      >
        ←
      </button>
      <h2
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "15px",
          color: "#00FFFF",
          margin: 0,
          letterSpacing: "1px",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

// ─── SplashScreen ─────────────────────────────────────────────────────────────

function SplashScreen({ onDone }: { onDone: () => void }) {
  const [opacity, setOpacity] = useState(0);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setOpacity(1);
      setScale(1);
    }, 100);
    const t2 = setTimeout(onDone, 2500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onDone]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05070A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      {/* Wormhole rings */}
      {[200, 160, 120, 80].map((size, i) => (
        <div
          key={size}
          style={{
            position: "absolute",
            width: size,
            height: size,
            borderRadius: "50%",
            border: `1px solid rgba(0,255,255,${0.05 + i * 0.04})`,
            animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
          }}
        />
      ))}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          opacity,
          transform: `scale(${scale})`,
          transition: "all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <PortalLogo size={80} />
        <h1
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "28px",
            color: "#00FFFF",
            letterSpacing: "4px",
            margin: "20px 0 8px",
            textShadow: "0 0 20px rgba(0,255,255,0.5)",
          }}
        >
          THE PORTALS
        </h1>
        <p
          style={{
            fontFamily: "Rajdhani, sans-serif",
            color: "rgba(0,255,255,0.6)",
            fontSize: "13px",
            letterSpacing: "3px",
          }}
        >
          CONNECT · SERVE · THRIVE
        </p>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ─── OnboardingScreen ─────────────────────────────────────────────────────────

const ONBOARDING_SLIDES = [
  {
    icon: "🌌",
    title: "Welcome to The Portals",
    desc: "Pakistan's premier marketplace connecting customers with trusted local service providers.",
  },
  {
    icon: "📍",
    title: "Find Services Near You",
    desc: "Discover verified providers for Home, Health, Travel, and more — all in one place.",
  },
  {
    icon: "🔐",
    title: "Secure Payments",
    desc: "End-to-end encrypted transactions with Portal ID to Portal ID instant transfers.",
  },
];

function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const [slide, setSlide] = useState(0);
  const current = ONBOARDING_SLIDES[slide];

  const next = () => {
    if (slide < ONBOARDING_SLIDES.length - 1) setSlide(slide + 1);
    else onDone();
  };

  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 28px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 400,
        }}
      >
        {/* Slide indicator */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            marginBottom: 48,
          }}
        >
          {ONBOARDING_SLIDES.map((s, i) => (
            <div
              key={s.title}
              style={{
                width: i === slide ? 24 : 8,
                height: 4,
                borderRadius: 4,
                background: i === slide ? "#00FFFF" : "rgba(0,255,255,0.2)",
                transition: "all 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 64, marginBottom: 24 }}>{current.icon}</div>
          <h2
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "20px",
              color: "#00FFFF",
              marginBottom: 16,
              letterSpacing: "1px",
            }}
          >
            {current.title}
          </h2>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "16px",
              color: "rgba(224,255,255,0.7)",
              lineHeight: 1.6,
            }}
          >
            {current.desc}
          </p>
        </div>

        {/* Buttons */}
        <button
          type="button"
          onClick={next}
          style={primaryBtn}
          data-ocid="onboarding.primary_button"
        >
          {slide < ONBOARDING_SLIDES.length - 1 ? "NEXT →" : "GET STARTED"}
        </button>
        {slide < ONBOARDING_SLIDES.length - 1 && (
          <button
            type="button"
            onClick={onDone}
            style={{
              ...primaryBtn,
              marginTop: 12,
              background: "transparent",
              color: "rgba(0,255,255,0.5)",
              border: "none",
              fontSize: "13px",
            }}
            data-ocid="onboarding.secondary_button"
          >
            SKIP
          </button>
        )}
      </div>
    </div>
  );
}

// ─── LoginScreen ──────────────────────────────────────────────────────────────

function LoginScreen({
  onLogin,
  onRegister,
  onAdmin,
}: {
  onLogin: (name: string, portalId: string) => void;
  onRegister: () => void;
  onAdmin: () => void;
}) {
  const [portalId, setPortalId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (!portalId.trim() || pin.length < 4) {
      setError("Please enter your Portal ID and PIN.");
      return;
    }
    setError("");
    onLogin("Portal User", portalId);
  };

  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 380,
        }}
      >
        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 36,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <PortalLogo size={64} />
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "22px",
              color: "#00FFFF",
              letterSpacing: "3px",
              margin: "16px 0 4px",
              textShadow: "0 0 20px rgba(0,255,255,0.4)",
            }}
          >
            THE PORTALS
          </h1>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              color: "rgba(0,255,255,0.5)",
              fontSize: "12px",
              letterSpacing: "2px",
            }}
          >
            ENTER YOUR CREDENTIALS
          </p>
        </div>

        {/* Form */}
        <div style={glassCard}>
          <div style={{ marginBottom: 16 }}>
            <div style={labelStyle}>Portal ID</div>
            <input
              style={inputStyle}
              placeholder="e.g. PRT-123456"
              value={portalId}
              onChange={(e) => setPortalId(e.target.value)}
              data-ocid="login.input"
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <div style={labelStyle}>PIN</div>
            <input
              style={inputStyle}
              type="password"
              placeholder="Enter your PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              maxLength={6}
              data-ocid="login.input"
            />
          </div>
          {error && (
            <p
              style={{
                color: "#FF6B6B",
                fontFamily: "Rajdhani",
                fontSize: "13px",
                marginBottom: 12,
              }}
              data-ocid="login.error_state"
            >
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleLogin}
            style={{ ...primaryBtn, padding: "13px" }}
            data-ocid="login.primary_button"
          >
            ENTER PORTAL
          </button>
        </div>

        {/* Links */}
        <div
          style={{
            textAlign: "center",
            marginTop: 20,
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          <button
            type="button"
            onClick={onRegister}
            style={{
              background: "none",
              border: "none",
              color: "rgba(0,255,255,0.7)",
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "14px",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
            data-ocid="login.secondary_button"
          >
            New here? Create Account
          </button>
          <button
            type="button"
            onClick={onAdmin}
            style={{
              background: "none",
              border: "none",
              color: "rgba(0,255,255,0.3)",
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "12px",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
            data-ocid="login.link"
          >
            Admin Portal
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── RegisterScreen ───────────────────────────────────────────────────────────

function RegisterScreen({
  onCustomer,
  onProvider,
  onBack,
}: {
  onCustomer: () => void;
  onProvider: () => void;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 380,
        }}
      >
        <ScreenHeader title="CREATE ACCOUNT" onBack={onBack} />
        <p
          style={{
            fontFamily: "Rajdhani, sans-serif",
            color: "rgba(224,255,255,0.6)",
            textAlign: "center",
            marginBottom: 32,
            fontSize: "15px",
          }}
        >
          How will you use The Portals?
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button
            type="button"
            onClick={onCustomer}
            style={
              {
                ...glassCard,
                display: "flex",
                alignItems: "center",
                gap: 20,
                cursor: "pointer",
                border: "1px solid rgba(0,255,255,0.25)",
                textAlign: "left",
              } as React.CSSProperties
            }
            data-ocid="register.primary_button"
          >
            <span style={{ fontSize: 36 }}>👤</span>
            <div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "13px",
                  color: "#00FFFF",
                  marginBottom: 4,
                }}
              >
                CUSTOMER
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "13px",
                  color: "rgba(224,255,255,0.6)",
                }}
              >
                Browse and book services
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={onProvider}
            style={
              {
                ...glassCard,
                display: "flex",
                alignItems: "center",
                gap: 20,
                cursor: "pointer",
                border: "1px solid rgba(0,255,255,0.25)",
                textAlign: "left",
              } as React.CSSProperties
            }
            data-ocid="register.secondary_button"
          >
            <span style={{ fontSize: 36 }}>🛠️</span>
            <div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "13px",
                  color: "#00FFAA",
                  marginBottom: 4,
                }}
              >
                SERVICE PROVIDER
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "13px",
                  color: "rgba(224,255,255,0.6)",
                }}
              >
                Offer your skills & services
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CustomerRegisterScreen ───────────────────────────────────────────────────

function CustomerRegisterScreen({
  onDone,
  onBack,
}: {
  onDone: (user: User) => void;
  onBack: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    pin: "",
    confirmPin: "",
  });
  const portalId = useRef(genPortalId());
  const [error, setError] = useState("");

  const set = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.pin) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.pin !== form.confirmPin) {
      setError("PINs do not match.");
      return;
    }
    if (form.pin.length < 4) {
      setError("PIN must be at least 4 digits.");
      return;
    }
    onDone({
      name: form.name,
      phone: form.phone,
      address: form.address,
      portalId: portalId.current,
      isProvider: false,
      category: "",
      wages: "",
    });
  };

  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1, padding: "0 0 40px" }}>
        <ScreenHeader title="CUSTOMER REGISTRATION" onBack={onBack} />
        <div style={{ padding: "0 20px" }}>
          <div
            style={{
              ...glassCard,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {/* Portal ID (auto-generated) */}
            <div>
              <div style={labelStyle}>Portal ID (Auto-generated)</div>
              <div style={{ ...inputStyle, color: "#00FFFF", opacity: 0.8 }}>
                {portalId.current}
              </div>
            </div>
            <div>
              <div style={labelStyle}>Full Name *</div>
              <input
                style={inputStyle}
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                data-ocid="customer_register.input"
              />
            </div>
            <div>
              <div style={labelStyle}>Phone Number *</div>
              <input
                style={inputStyle}
                placeholder="03XX-XXXXXXX"
                value={form.phone}
                onChange={(e) => set("phone", e.target.value)}
                data-ocid="customer_register.input"
              />
            </div>
            <div>
              <div style={labelStyle}>Address</div>
              <input
                style={inputStyle}
                placeholder="City, Area"
                value={form.address}
                onChange={(e) => set("address", e.target.value)}
                data-ocid="customer_register.input"
              />
            </div>
            <div>
              <div style={labelStyle}>Set PIN *</div>
              <input
                style={inputStyle}
                type="password"
                placeholder="4–6 digit PIN"
                maxLength={6}
                value={form.pin}
                onChange={(e) => set("pin", e.target.value)}
                data-ocid="customer_register.input"
              />
            </div>
            <div>
              <div style={labelStyle}>Confirm PIN *</div>
              <input
                style={inputStyle}
                type="password"
                placeholder="Re-enter PIN"
                maxLength={6}
                value={form.confirmPin}
                onChange={(e) => set("confirmPin", e.target.value)}
                data-ocid="customer_register.input"
              />
            </div>
            {error && (
              <p
                style={{
                  color: "#FF6B6B",
                  fontFamily: "Rajdhani",
                  fontSize: "13px",
                }}
                data-ocid="customer_register.error_state"
              >
                {error}
              </p>
            )}
            <button
              type="button"
              onClick={handleSubmit}
              style={primaryBtn}
              data-ocid="customer_register.submit_button"
            >
              CREATE ACCOUNT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ProviderRegisterScreen ────────────────────────────────────────────────────

function ProviderRegisterScreen({
  onDone,
  onBack,
}: {
  onDone: (user: User) => void;
  onBack: () => void;
}) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    pin: "",
    confirmPin: "",
    category: "",
    wages: "",
  });
  const portalId = useRef(genPortalId());
  const [error, setError] = useState("");

  const set = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleStep1 = () => {
    if (!form.name || !form.phone || !form.pin) {
      setError("Please fill all required fields.");
      return;
    }
    if (form.pin !== form.confirmPin) {
      setError("PINs do not match.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = () => {
    if (!form.category || !form.wages) {
      setError("Please select category and set your wages.");
      return;
    }
    onDone({
      name: form.name,
      phone: form.phone,
      address: "",
      portalId: portalId.current,
      isProvider: true,
      category: form.category,
      wages: form.wages,
    });
  };

  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1, padding: "0 0 40px" }}>
        <ScreenHeader
          title="PROVIDER REGISTRATION"
          onBack={
            step === 2
              ? () => {
                  setStep(1);
                  setError("");
                }
              : onBack
          }
        />
        <div style={{ padding: "0 20px" }}>
          {/* Step indicator */}
          <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
            {[1, 2].map((s) => (
              <div
                key={s}
                style={{
                  flex: 1,
                  height: 3,
                  borderRadius: 3,
                  background: s <= step ? "#00FFFF" : "rgba(0,255,255,0.15)",
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>

          <div
            style={{
              ...glassCard,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            {step === 1 ? (
              <>
                <div>
                  <div style={labelStyle}>Portal ID (Auto-generated)</div>
                  <div
                    style={{ ...inputStyle, color: "#00FFFF", opacity: 0.8 }}
                  >
                    {portalId.current}
                  </div>
                </div>
                <div>
                  <div style={labelStyle}>Full Name *</div>
                  <input
                    style={inputStyle}
                    placeholder="Your full name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    data-ocid="provider_register.input"
                  />
                </div>
                <div>
                  <div style={labelStyle}>Phone Number *</div>
                  <input
                    style={inputStyle}
                    placeholder="03XX-XXXXXXX"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    data-ocid="provider_register.input"
                  />
                </div>
                <div>
                  <div style={labelStyle}>Set PIN *</div>
                  <input
                    style={inputStyle}
                    type="password"
                    placeholder="4–6 digit PIN"
                    maxLength={6}
                    value={form.pin}
                    onChange={(e) => set("pin", e.target.value)}
                    data-ocid="provider_register.input"
                  />
                </div>
                <div>
                  <div style={labelStyle}>Confirm PIN *</div>
                  <input
                    style={inputStyle}
                    type="password"
                    placeholder="Re-enter PIN"
                    maxLength={6}
                    value={form.confirmPin}
                    onChange={(e) => set("confirmPin", e.target.value)}
                    data-ocid="provider_register.input"
                  />
                </div>
                {error && (
                  <p
                    style={{
                      color: "#FF6B6B",
                      fontFamily: "Rajdhani",
                      fontSize: "13px",
                    }}
                    data-ocid="provider_register.error_state"
                  >
                    {error}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleStep1}
                  style={primaryBtn}
                  data-ocid="provider_register.primary_button"
                >
                  NEXT STEP →
                </button>
              </>
            ) : (
              <>
                <div>
                  <div style={labelStyle}>Service Category *</div>
                  <select
                    style={{ ...inputStyle, appearance: "none" as const }}
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    data-ocid="provider_register.select"
                  >
                    <option value="">Select category</option>
                    {ALL_CATEGORY_NAMES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <div style={labelStyle}>Wages (PKR/day) *</div>
                  <input
                    style={inputStyle}
                    type="number"
                    placeholder="e.g. 1500"
                    value={form.wages}
                    onChange={(e) => set("wages", e.target.value)}
                    data-ocid="provider_register.input"
                  />
                </div>
                {error && (
                  <p
                    style={{
                      color: "#FF6B6B",
                      fontFamily: "Rajdhani",
                      fontSize: "13px",
                    }}
                    data-ocid="provider_register.error_state"
                  >
                    {error}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleSubmit}
                  style={primaryBtn}
                  data-ocid="provider_register.submit_button"
                >
                  CREATE PROVIDER ACCOUNT
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── HomeScreen ───────────────────────────────────────────────────────────────

function HomeScreen({
  userName,
  userPortalId,
  userBalance,
  onCategory,
  onDashboard,
  isProvider,
}: {
  userName: string;
  userPortalId: string;
  userBalance: number;
  onCategory: (name: string) => void;
  onDashboard: () => void;
  isProvider: boolean;
}) {
  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            padding: "16px 20px 12px",
            borderBottom: "1px solid rgba(0,255,255,0.08)",
          }}
        >
          {/* Top row: user info + centered logo + balance */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  color: "rgba(0,255,255,0.5)",
                  fontSize: "11px",
                  letterSpacing: "2px",
                }}
              >
                WELCOME BACK
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  color: "#00FFFF",
                  fontSize: "15px",
                  letterSpacing: "1px",
                }}
              >
                {userName || "Portal User"}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  color: "rgba(224,255,255,0.4)",
                  fontSize: "11px",
                  marginTop: 2,
                }}
              >
                {userPortalId}
              </div>
            </div>
            {/* Centered Logo */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <PortalLogo size={44} />
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  color: "rgba(0,255,255,0.5)",
                  fontSize: "10px",
                  letterSpacing: "1px",
                }}
              >
                BALANCE
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  color: "#00FFFF",
                  fontSize: "16px",
                }}
              >
                PKR {userBalance.toLocaleString()}
              </div>
            </div>
          </div>
          {/* My Dashboard button */}
          <button
            type="button"
            onClick={onDashboard}
            style={{
              background: "rgba(0,255,255,0.07)",
              border: "1px solid rgba(0,255,255,0.2)",
              borderRadius: 8,
              color: "#00FFFF",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "9px",
              letterSpacing: "0.5px",
              padding: "6px 14px",
              cursor: "pointer",
              display: "block",
              width: "100%",
            }}
            data-ocid="home.primary_button"
          >
            {isProvider ? "📊 PROVIDER DASHBOARD" : "📊 MY DASHBOARD"}
          </button>
        </div>

        {/* Wormhole graphic */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "28px 20px 20px",
            gap: 12,
          }}
        >
          <div style={{ position: "relative", width: 80, height: 80 }}>
            {[80, 60, 44, 30].map((size, i) => (
              <div
                key={size}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: size,
                  height: size,
                  transform: "translate(-50%, -50%)",
                  borderRadius: "50%",
                  border: `1px solid rgba(0,255,255,${0.1 + i * 0.08})`,
                  boxShadow: i === 3 ? "0 0 12px rgba(0,255,255,0.3)" : "none",
                }}
              />
            ))}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: "#00FFFF",
                boxShadow: "0 0 16px #00FFFF",
              }}
            />
          </div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "11px",
              color: "rgba(0,255,255,0.6)",
              letterSpacing: "2px",
            }}
          >
            7 SERVICE CATEGORIES
          </div>
        </div>

        {/* Category grid */}
        <div style={{ padding: "0 16px" }}>
          <h3
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "11px",
              color: "rgba(0,255,255,0.5)",
              letterSpacing: "2px",
              margin: "0 0 14px",
            }}
          >
            SELECT A CATEGORY
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.name}
                onClick={() => onCategory(cat.name)}
                style={{
                  background: "rgba(0,255,255,0.03)",
                  border: `1px solid ${cat.color}30`,
                  borderRadius: "16px",
                  padding: "20px 16px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                  backdropFilter: "blur(10px)",
                }}
                data-ocid={`home.${cat.name.toLowerCase().replace(/ /g, "_")}.button`}
              >
                <div style={{ fontSize: 28, marginBottom: 8 }}>{cat.icon}</div>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "10px",
                    color: cat.color,
                    letterSpacing: "0.5px",
                    lineHeight: 1.3,
                  }}
                >
                  {cat.name.toUpperCase()}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Footer branding */}
        <div
          style={{
            textAlign: "center",
            padding: "24px 20px 0",
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "11px",
            color: "rgba(0,255,255,0.25)",
          }}
        >
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "rgba(0,255,255,0.35)", textDecoration: "none" }}
          >
            Built with ♥ using caffeine.ai
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── CategoryScreen (placeholder) ────────────────────────────────────────────

function CategoryScreen({
  category,
  onBack,
  onPayment,
}: {
  category: string;
  onBack: () => void;
  onPayment: () => void;
}) {
  const cat = CATEGORIES.find((c) => c.name === category);
  const color = cat?.color ?? "#00FFFF";
  const icon = cat?.icon ?? "🔧";

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title={category.toUpperCase()} onBack={onBack} />
        <div style={{ padding: "40px 20px", textAlign: "center" }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: `${color}15`,
              border: `2px solid ${color}40`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              margin: "0 auto 24px",
              boxShadow: `0 0 24px ${color}30`,
            }}
          >
            {icon}
          </div>
          <h2
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "18px",
              color,
              letterSpacing: "2px",
              marginBottom: 12,
            }}
          >
            {category.toUpperCase()}
          </h2>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "15px",
              color: "rgba(224,255,255,0.55)",
              lineHeight: 1.6,
              marginBottom: 32,
            }}
          >
            Building {category}...{"\n"}Select a service to continue.
          </p>
          <div
            style={{
              ...glassCard,
              border: `1px solid ${color}20`,
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "11px",
                color: `${color}80`,
                letterSpacing: "1px",
                margin: 0,
              }}
            >
              🚧 COMING SOON
            </p>
            <p
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "14px",
                color: "rgba(224,255,255,0.5)",
                marginTop: 8,
              }}
            >
              This category is being built. Check back for the full service
              flow.
            </p>
          </div>
          <button
            type="button"
            onClick={onPayment}
            style={{
              ...primaryBtn,
              background: `linear-gradient(135deg, ${color}, ${color}99)`,
            }}
            data-ocid="category.primary_button"
          >
            TEST PAYMENT FLOW →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ProfileScreen ────────────────────────────────────────────────────────────

function ProfileScreen({
  userName,
  userPortalId,
  userBalance,
  isProvider,
  onTopUp,
  onEditProfile,
  onTransactions,
  onBack,
}: {
  userName: string;
  userPortalId: string;
  userBalance: number;
  isProvider: boolean;
  onTopUp: () => void;
  onEditProfile: () => void;
  onTransactions: () => void;
  onBack: () => void;
}) {
  const [activeTab, setActiveTab] = useState<"active" | "completed">("active");

  const demoActive = [
    {
      id: 1,
      service: "Plumber",
      provider: "Usman Tariq",
      status: "In Progress",
      amount: 850,
    },
  ];
  const demoCompleted = [
    {
      id: 1,
      service: "Grocery Delivery",
      provider: "FreshMart",
      status: "Completed",
      amount: 1200,
    },
    {
      id: 2,
      service: "AC Service",
      provider: "CoolBreeze",
      status: "Completed",
      amount: 2500,
    },
  ];
  const bookings = activeTab === "active" ? demoActive : demoCompleted;

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title="MY PROFILE" onBack={onBack} />
        <div style={{ padding: "0 20px" }}>
          {/* Profile card */}
          <div
            style={{
              ...glassCard,
              textAlign: "center",
              marginBottom: 16,
              border: "1px solid rgba(0,255,255,0.2)",
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00FFFF22, #0080FF22)",
                border: "2px solid rgba(0,255,255,0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                margin: "0 auto 12px",
              }}
            >
              {isProvider ? "🛠️" : "👤"}
            </div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "14px",
                color: "#00FFFF",
                marginBottom: 4,
              }}
            >
              {userName || "Portal User"}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "12px",
                color: "rgba(0,255,255,0.5)",
                marginBottom: 4,
              }}
            >
              {userPortalId}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "11px",
                color: "rgba(224,255,255,0.3)",
              }}
            >
              {isProvider ? "SERVICE PROVIDER" : "CUSTOMER"}
            </div>
          </div>

          {/* Balance */}
          <div
            style={{
              ...glassCard,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "11px",
                  color: "rgba(0,255,255,0.5)",
                  letterSpacing: "1px",
                }}
              >
                WALLET BALANCE
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "20px",
                  color: "#00FFFF",
                }}
              >
                PKR {userBalance.toLocaleString()}
              </div>
            </div>
            <button
              type="button"
              onClick={onTopUp}
              style={{
                padding: "10px 20px",
                background: "linear-gradient(135deg, #00FFFF, #0080FF)",
                border: "none",
                borderRadius: "10px",
                color: "#05070A",
                fontFamily: "Orbitron, sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
              data-ocid="profile.primary_button"
            >
              TOP UP
            </button>
          </div>

          {/* Quick actions */}
          <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
            <button
              type="button"
              onClick={onEditProfile}
              style={
                {
                  flex: 1,
                  ...glassCard,
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "14px 8px",
                  border: "1px solid rgba(0,255,255,0.15)",
                } as React.CSSProperties
              }
              data-ocid="profile.edit_button"
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>✏️</div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "9px",
                  color: "rgba(0,255,255,0.7)",
                  letterSpacing: "0.5px",
                }}
              >
                EDIT
              </div>
            </button>
            <button
              type="button"
              onClick={onTransactions}
              style={
                {
                  flex: 1,
                  ...glassCard,
                  cursor: "pointer",
                  textAlign: "center",
                  padding: "14px 8px",
                  border: "1px solid rgba(0,255,255,0.15)",
                } as React.CSSProperties
              }
              data-ocid="profile.secondary_button"
            >
              <div style={{ fontSize: 20, marginBottom: 4 }}>📋</div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "9px",
                  color: "rgba(0,255,255,0.7)",
                  letterSpacing: "0.5px",
                }}
              >
                HISTORY
              </div>
            </button>
          </div>

          {/* Bookings tabs */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            {(["active", "completed"] as const).map((tab) => (
              <button
                type="button"
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "10px",
                  background:
                    activeTab === tab ? "rgba(0,255,255,0.1)" : "transparent",
                  border:
                    activeTab === tab
                      ? "1px solid rgba(0,255,255,0.35)"
                      : "1px solid rgba(0,255,255,0.1)",
                  borderRadius: "8px",
                  color:
                    activeTab === tab ? "#00FFFF" : "rgba(224,255,255,0.4)",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "9px",
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  transition: "all 0.2s",
                }}
                data-ocid={`profile.${tab}.tab`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {bookings.map((b, i) => (
            <div
              key={b.id}
              style={{
                ...glassCard,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              data-ocid={`profile.bookings.item.${i + 1}`}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "14px",
                    color: "#E0FFFF",
                  }}
                >
                  {b.service}
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "12px",
                    color: "rgba(224,255,255,0.4)",
                  }}
                >
                  {b.provider}
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "13px",
                    color: "#00FFFF",
                  }}
                >
                  PKR {b.amount}
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "11px",
                    color: activeTab === "active" ? "#FFD700" : "#00FFAA",
                  }}
                >
                  {b.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── SettingsScreen ───────────────────────────────────────────────────────────

function SettingsScreen({
  onBack,
  onEditProfile,
  onPaymentMethod,
  onTransactionHistory,
  onHelpSupport,
  onPrivacy,
  onLogout,
}: {
  onBack: () => void;
  onEditProfile: () => void;
  onPaymentMethod: () => void;
  onTransactionHistory: () => void;
  onHelpSupport: () => void;
  onPrivacy: () => void;
  onLogout: () => void;
}) {
  const items = [
    {
      label: "Edit Profile",
      icon: "✏️",
      action: onEditProfile,
      ocid: "settings.edit_button",
    },
    {
      label: "Payment Method",
      icon: "💳",
      action: onPaymentMethod,
      ocid: "settings.link",
    },
    {
      label: "Transaction History",
      icon: "📋",
      action: onTransactionHistory,
      ocid: "settings.link",
    },
    {
      label: "Help & Support",
      icon: "💬",
      action: onHelpSupport,
      ocid: "settings.link",
    },
    {
      label: "Privacy Policy",
      icon: "🔐",
      action: onPrivacy,
      ocid: "settings.link",
    },
  ];

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title="SETTINGS" onBack={onBack} />
        <div style={{ padding: "0 20px" }}>
          {items.map((item) => (
            <button
              type="button"
              key={item.label}
              onClick={item.action}
              style={
                {
                  ...glassCard,
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 10,
                  width: "100%",
                  cursor: "pointer",
                  border: "1px solid rgba(0,255,255,0.1)",
                  textAlign: "left",
                } as React.CSSProperties
              }
              data-ocid={item.ocid}
            >
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <span
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "16px",
                  color: "#E0FFFF",
                  flex: 1,
                }}
              >
                {item.label}
              </span>
              <span style={{ color: "rgba(0,255,255,0.4)", fontSize: 16 }}>
                ›
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={onLogout}
            style={
              {
                ...glassCard,
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginTop: 16,
                width: "100%",
                cursor: "pointer",
                border: "1px solid rgba(255,80,80,0.2)",
                background: "rgba(255,80,80,0.03)",
                textAlign: "left",
              } as React.CSSProperties
            }
            data-ocid="settings.delete_button"
          >
            <span style={{ fontSize: 20 }}>🚪</span>
            <span
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "16px",
                color: "#FF6B6B",
                flex: 1,
              }}
            >
              Logout
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ChatScreen ───────────────────────────────────────────────────────────────

function ChatScreen({ onBack }: { onBack: () => void }) {
  const chats = [
    {
      id: 1,
      name: "Usman Tariq",
      lastMsg: "On my way, 10 mins",
      time: "2m ago",
      unread: 1,
      avatar: "🔧",
    },
    {
      id: 2,
      name: "Dr. Ayesha Malik",
      lastMsg: "Your appointment is confirmed",
      time: "1h ago",
      unread: 0,
      avatar: "👩‍⚕️",
    },
    {
      id: 3,
      name: "FreshMart Store",
      lastMsg: "Order packed, out for delivery",
      time: "3h ago",
      unread: 2,
      avatar: "🏪",
    },
  ];

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title="MESSAGES" onBack={onBack} />
        <div style={{ padding: "0 20px" }}>
          {chats.map((chat, i) => (
            <div
              key={chat.id}
              style={{
                ...glassCard,
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 10,
                cursor: "pointer",
              }}
              data-ocid={`chat.item.${i + 1}`}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "rgba(0,255,255,0.1)",
                  border: "1px solid rgba(0,255,255,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 20,
                  flexShrink: 0,
                }}
              >
                {chat.avatar}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: "15px",
                      color: "#E0FFFF",
                      fontWeight: 600,
                    }}
                  >
                    {chat.name}
                  </span>
                  <span
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: "11px",
                      color: "rgba(0,255,255,0.4)",
                    }}
                  >
                    {chat.time}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "13px",
                    color: "rgba(224,255,255,0.5)",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chat.lastMsg}
                </div>
              </div>
              {chat.unread > 0 && (
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: "#00FFFF",
                    color: "#05070A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 10,
                    fontFamily: "Orbitron, sans-serif",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
          {chats.length === 0 && (
            <div
              style={{ textAlign: "center", padding: "40px 20px" }}
              data-ocid="chat.empty_state"
            >
              <div style={{ fontSize: 40, marginBottom: 12 }}>💬</div>
              <p
                style={{
                  fontFamily: "Rajdhani",
                  color: "rgba(224,255,255,0.4)",
                }}
              >
                No messages yet
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PaymentPlanScreen ────────────────────────────────────────────────────────

type PaymentMethod = "portal" | "jazzcash" | "easypaisa" | "bank";

function PaymentPlanScreen({
  serviceName,
  amount,
  onOtp,
  onBack,
}: {
  serviceName: string;
  amount: number;
  onOtp: () => void;
  onBack: () => void;
}) {
  const [method, setMethod] = useState<PaymentMethod>("portal");
  const [recipientId, setRecipientId] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");

  const methods: {
    key: PaymentMethod;
    label: string;
    icon: string;
    color: string;
  }[] = [
    { key: "portal", label: "Portal ID", icon: "🌐", color: "#00FFFF" },
    { key: "jazzcash", label: "JazzCash", icon: "📱", color: "#FF6B9D" },
    { key: "easypaisa", label: "Easypaisa", icon: "💚", color: "#00FFAA" },
    { key: "bank", label: "Other Bank", icon: "🏦", color: "#FFD700" },
  ];

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title="PAYMENT PLAN" onBack={onBack} />
        <div style={{ padding: "0 20px" }}>
          {/* Amount summary */}
          <div
            style={{
              ...glassCard,
              textAlign: "center",
              marginBottom: 20,
              border: "1px solid rgba(0,255,255,0.2)",
            }}
          >
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "12px",
                color: "rgba(0,255,255,0.6)",
                letterSpacing: "1px",
                marginBottom: 4,
              }}
            >
              {serviceName}
            </div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "28px",
                color: "#00FFFF",
              }}
            >
              PKR {amount.toLocaleString()}
            </div>
          </div>

          {/* Method selector */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 20,
            }}
          >
            {methods.map((m) => (
              <button
                type="button"
                key={m.key}
                onClick={() => setMethod(m.key)}
                style={{
                  padding: "14px 8px",
                  background:
                    method === m.key ? `${m.color}15` : "rgba(0,255,255,0.02)",
                  border:
                    method === m.key
                      ? `1px solid ${m.color}60`
                      : "1px solid rgba(0,255,255,0.1)",
                  borderRadius: "12px",
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s",
                }}
                data-ocid={`payment.${m.key}.toggle`}
              >
                <div style={{ fontSize: 22, marginBottom: 4 }}>{m.icon}</div>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "9px",
                    color: method === m.key ? m.color : "rgba(224,255,255,0.4)",
                    letterSpacing: "0.5px",
                  }}
                >
                  {m.label}
                </div>
              </button>
            ))}
          </div>

          {/* Method-specific fields */}
          <div
            style={{
              ...glassCard,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              marginBottom: 20,
            }}
          >
            {method === "portal" && (
              <div>
                <div style={labelStyle}>Recipient Portal ID</div>
                <input
                  style={inputStyle}
                  placeholder="PRT-XXXXXX"
                  value={recipientId}
                  onChange={(e) => setRecipientId(e.target.value)}
                  data-ocid="payment.input"
                />
              </div>
            )}
            {method === "bank" && (
              <>
                <div>
                  <div style={labelStyle}>Bank Name</div>
                  <input
                    style={inputStyle}
                    placeholder="e.g. Meezan Bank"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    data-ocid="payment.input"
                  />
                </div>
                <div>
                  <div style={labelStyle}>Account Number</div>
                  <input
                    style={inputStyle}
                    placeholder="XXXX-XXXXXXXXXX"
                    value={accountNo}
                    onChange={(e) => setAccountNo(e.target.value)}
                    data-ocid="payment.input"
                  />
                </div>
              </>
            )}
            {(method === "jazzcash" || method === "easypaisa") && (
              <div>
                <div style={labelStyle}>Mobile Number</div>
                <input
                  style={inputStyle}
                  placeholder="03XX-XXXXXXX"
                  data-ocid="payment.input"
                />
              </div>
            )}
            <div>
              <div style={labelStyle}>Amount (PKR)</div>
              <div style={{ ...inputStyle, color: "#00FFFF" }}>
                {amount.toLocaleString()}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onOtp}
            style={primaryBtn}
            data-ocid="payment.submit_button"
          >
            PAY NOW →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── OtpScreen ────────────────────────────────────────────────────────────────

function OtpScreen({
  onVerify,
  onBack,
}: { onVerify: () => void; onBack: () => void }) {
  const [otp, setOtp] = useState(["", "", ""]);
  const [timer, setTimer] = useState(60);
  const refsArr = useRef<(HTMLInputElement | null)[]>([null, null, null]);

  useEffect(() => {
    if (timer <= 0) return;
    const t = setTimeout(() => setTimer((v) => v - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleInput = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 2) refsArr.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[i] && i > 0)
      refsArr.current[i - 1]?.focus();
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 360,
        }}
      >
        <ScreenHeader title="VERIFY OTP" onBack={onBack} />
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <h3
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "14px",
              color: "#00FFFF",
              marginBottom: 8,
            }}
          >
            Enter 3-Digit Code
          </h3>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "14px",
              color: "rgba(224,255,255,0.5)",
              marginBottom: 28,
            }}
          >
            Code sent via SMS to your registered number
          </p>

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            {([0, 1, 2] as const).map((i) => (
              <input
                key={`pos${i}`}
                ref={(el) => {
                  refsArr.current[i] = el;
                }}
                value={otp[i]}
                onChange={(e) => handleInput(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                maxLength={1}
                style={{
                  width: 44,
                  height: 52,
                  textAlign: "center",
                  background: otp[i]
                    ? "rgba(0,255,255,0.1)"
                    : "rgba(0,255,255,0.03)",
                  border: `1px solid ${otp[i] ? "rgba(0,255,255,0.5)" : "rgba(0,255,255,0.2)"}`,
                  borderRadius: 10,
                  color: "#00FFFF",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "20px",
                  outline: "none",
                }}
                data-ocid="otp.input"
              />
            ))}
          </div>

          <div
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "13px",
              color: "rgba(0,255,255,0.4)",
              marginBottom: 20,
            }}
          >
            {timer > 0 ? (
              `Resend in ${timer}s`
            ) : (
              <button
                type="button"
                onClick={() => setTimer(60)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#00FFFF",
                  cursor: "pointer",
                  fontFamily: "Rajdhani",
                  fontSize: "13px",
                }}
              >
                Resend OTP
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={isComplete ? onVerify : undefined}
            style={{
              ...primaryBtn,
              opacity: isComplete ? 1 : 0.5,
              cursor: isComplete ? "pointer" : "not-allowed",
            }}
            data-ocid="otp.submit_button"
          >
            VERIFY & PROCEED
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── InvoiceScreen ────────────────────────────────────────────────────────────

function InvoiceScreen({
  serviceName,
  providerName,
  amount,
  onDone,
}: {
  serviceName: string;
  providerName: string;
  amount: number;
  onDone: () => void;
}) {
  const today = new Date().toLocaleDateString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
  const invId = `INV-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 380,
        }}
      >
        <div style={{ ...glassCard, border: "1px solid rgba(0,255,255,0.25)" }}>
          {/* Header */}
          <div
            style={{
              textAlign: "center",
              borderBottom: "1px solid rgba(0,255,255,0.1)",
              paddingBottom: 16,
              marginBottom: 20,
            }}
          >
            <PortalLogo size={40} />
            <h2
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "14px",
                color: "#00FFFF",
                margin: "12px 0 4px",
                letterSpacing: "1px",
              }}
            >
              {serviceName.toUpperCase()}
            </h2>
            <div
              style={{
                fontFamily: "Rajdhani",
                fontSize: "11px",
                color: "rgba(0,255,255,0.4)",
              }}
            >
              {invId}
            </div>
          </div>

          {/* Details */}
          {[
            { label: "Provider", value: providerName },
            { label: "Start Date", value: today },
            { label: "End Date", value: today },
          ].map((row) => (
            <div
              key={row.label}
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "Rajdhani",
                  fontSize: "13px",
                  color: "rgba(224,255,255,0.5)",
                }}
              >
                {row.label}
              </span>
              <span
                style={{
                  fontFamily: "Rajdhani",
                  fontSize: "13px",
                  color: "#E0FFFF",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}

          <div
            style={{
              borderTop: "1px solid rgba(0,255,255,0.1)",
              paddingTop: 14,
              marginTop: 4,
            }}
          >
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
                  fontSize: "11px",
                  color: "rgba(0,255,255,0.6)",
                  letterSpacing: "1px",
                }}
              >
                TOTAL AMOUNT
              </span>
              <span
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "20px",
                  color: "#00FFFF",
                }}
              >
                PKR {amount.toLocaleString()}
              </span>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <button
              type="button"
              style={{
                flex: 1,
                padding: "12px",
                background: "rgba(0,255,255,0.08)",
                border: "1px solid rgba(0,255,255,0.25)",
                borderRadius: "10px",
                color: "#00FFFF",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
              data-ocid="invoice.secondary_button"
            >
              💾 SAVE
            </button>
            <button
              type="button"
              style={{
                flex: 1,
                padding: "12px",
                background: "rgba(0,255,255,0.08)",
                border: "1px solid rgba(0,255,255,0.25)",
                borderRadius: "10px",
                color: "#00FFFF",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
              data-ocid="invoice.secondary_button"
            >
              📤 SHARE
            </button>
          </div>

          <button
            type="button"
            onClick={onDone}
            style={{ ...primaryBtn, marginTop: 12 }}
            data-ocid="invoice.confirm_button"
          >
            DONE
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── SuccessScreen ────────────────────────────────────────────────────────────

function SuccessScreen({
  message,
  onDone,
}: { message: string; onDone: () => void }) {
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setScale(1), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
      data-ocid="success.success_state"
    >
      <SpaceBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          transform: `scale(${scale})`,
          transition: "transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: "50%",
            background: "rgba(0,255,170,0.1)",
            border: "2px solid rgba(0,255,170,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            margin: "0 auto 24px",
            boxShadow: "0 0 32px rgba(0,255,170,0.3)",
          }}
        >
          ✓
        </div>
        <h2
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "18px",
            color: "#00FFAA",
            marginBottom: 12,
            letterSpacing: "1px",
          }}
        >
          SUCCESS
        </h2>
        <p
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "15px",
            color: "rgba(224,255,255,0.6)",
            marginBottom: 36,
            lineHeight: 1.5,
          }}
        >
          {message}
        </p>
        <button
          type="button"
          onClick={onDone}
          style={primaryBtn}
          data-ocid="success.confirm_button"
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
}

// ─── AdminLoginScreen ─────────────────────────────────────────────────────────

function AdminLoginScreen({
  onLogin,
  onBack,
}: { onLogin: () => void; onBack: () => void }) {
  const [portalId, setPortalId] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleAccess = () => {
    if (portalId === "PortalAdmin" && pin === "Portal@123") {
      setError("");
      onLogin();
    } else {
      setError("Invalid credentials. Access denied.");
    }
  };

  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 380,
        }}
      >
        <ScreenHeader title="ADMIN PORTAL" onBack={onBack} />
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>🛡️</div>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "13px",
              color: "rgba(224,255,255,0.4)",
            }}
          >
            Restricted Access — Authorized Personnel Only
          </p>
        </div>
        <div
          style={{
            ...glassCard,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            border: "1px solid rgba(255,80,80,0.2)",
          }}
        >
          <div>
            <div style={labelStyle}>Admin Portal ID</div>
            <input
              style={inputStyle}
              placeholder="ADMIN-XXXXXX"
              value={portalId}
              onChange={(e) => setPortalId(e.target.value)}
              data-ocid="admin_login.input"
            />
          </div>
          <div>
            <div style={labelStyle}>Admin PIN</div>
            <input
              style={inputStyle}
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              data-ocid="admin_login.input"
            />
          </div>
          {error && (
            <p
              style={{
                color: "#FF6B6B",
                fontFamily: "Rajdhani",
                fontSize: "13px",
                marginBottom: 12,
              }}
              data-ocid="admin_login.error_state"
            >
              {error}
            </p>
          )}
          <button
            type="button"
            onClick={handleAccess}
            style={{
              ...primaryBtn,
              background: "linear-gradient(135deg, #FF6B6B, #FF0080)",
            }}
            data-ocid="admin_login.primary_button"
          >
            ACCESS ADMIN PORTAL
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AdminDashboardScreen ─────────────────────────────────────────────────────

function AdminDashboardScreen({
  onBack,
  serviceChargesCollected,
}: { onBack: () => void; serviceChargesCollected: number }) {
  const [tab, setTab] = useState<
    "overview" | "users" | "providers" | "security" | "charges" | "credentials"
  >("overview");
  const [adminUsername, setAdminUsername] = useState("PortalAdmin");
  const [adminPassword, setAdminPassword] = useState("Portal@123");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [credMsg, setCredMsg] = useState("");

  const stats = [
    { label: "Total Users", value: "1,248", icon: "👥" },
    { label: "Providers", value: "347", icon: "🛠️" },
    { label: "Active Sessions", value: "89", icon: "⚡" },
    { label: "Transactions", value: "4,521", icon: "💳" },
  ];

  const users = [
    {
      id: "PRT-110234",
      name: "Ahmed Khan",
      status: "Active",
      type: "Customer",
    },
    {
      id: "PRT-220891",
      name: "Fatima Malik",
      status: "Active",
      type: "Customer",
    },
    {
      id: "PRT-330567",
      name: "Bilal Tariq",
      status: "Suspended",
      type: "Provider",
    },
  ];

  const threats = [
    {
      level: "LOW",
      msg: "3 failed login attempts from IP 192.168.1.45",
      time: "2m ago",
    },
    {
      level: "MEDIUM",
      msg: "Unusual payment pattern detected for PRT-445621",
      time: "15m ago",
    },
  ];

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title="ADMIN DASHBOARD" onBack={onBack} />
        <div style={{ padding: "0 20px" }}>
          {/* Tab bar */}
          <div
            style={{
              display: "flex",
              gap: 6,
              marginBottom: 20,
              overflowX: "auto" as const,
            }}
          >
            {(
              [
                "overview",
                "users",
                "providers",
                "security",
                "charges",
                "credentials",
              ] as const
            ).map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setTab(t)}
                style={{
                  padding: "8px 14px",
                  background: tab === t ? "rgba(0,255,255,0.1)" : "transparent",
                  border:
                    tab === t
                      ? "1px solid rgba(0,255,255,0.35)"
                      : "1px solid rgba(0,255,255,0.1)",
                  borderRadius: "8px",
                  color: tab === t ? "#00FFFF" : "rgba(224,255,255,0.4)",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "9px",
                  cursor: "pointer",
                  letterSpacing: "0.5px",
                  whiteSpace: "nowrap" as const,
                  flexShrink: 0,
                }}
                data-ocid={`admin.${t}.tab`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>

          {tab === "overview" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 16,
              }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  style={{ ...glassCard, textAlign: "center" }}
                  data-ocid={`admin.stats.item.${i + 1}`}
                >
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                  <div
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "16px",
                      color: "#00FFFF",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "Rajdhani",
                      fontSize: "11px",
                      color: "rgba(224,255,255,0.4)",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

          {(tab === "users" || tab === "providers") && (
            <>
              {users
                .filter((u) =>
                  tab === "users"
                    ? u.type === "Customer"
                    : u.type === "Provider",
                )
                .map((u, i) => (
                  <div
                    key={u.id}
                    style={{
                      ...glassCard,
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                    data-ocid={`admin.${tab}.item.${i + 1}`}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: "Rajdhani",
                          fontSize: "14px",
                          color: "#E0FFFF",
                        }}
                      >
                        {u.name}
                      </div>
                      <div
                        style={{
                          fontFamily: "Rajdhani",
                          fontSize: "11px",
                          color: "rgba(0,255,255,0.5)",
                        }}
                      >
                        {u.id}
                      </div>
                    </div>
                    <div
                      style={{ display: "flex", gap: 8, alignItems: "center" }}
                    >
                      <span
                        style={{
                          fontFamily: "Rajdhani",
                          fontSize: "11px",
                          color: u.status === "Active" ? "#00FFAA" : "#FF6B6B",
                          padding: "3px 8px",
                          borderRadius: 6,
                          background:
                            u.status === "Active"
                              ? "rgba(0,255,170,0.1)"
                              : "rgba(255,107,107,0.1)",
                          border: `1px solid ${u.status === "Active" ? "rgba(0,255,170,0.3)" : "rgba(255,107,107,0.3)"}`,
                        }}
                      >
                        {u.status}
                      </span>
                    </div>
                  </div>
                ))}
              {tab === "providers" &&
                users.filter((u) => u.type === "Provider").length === 0 && (
                  <div
                    style={{ textAlign: "center", padding: 40 }}
                    data-ocid="admin.providers.empty_state"
                  >
                    <p
                      style={{
                        fontFamily: "Rajdhani",
                        color: "rgba(224,255,255,0.4)",
                      }}
                    >
                      No providers found
                    </p>
                  </div>
                )}
            </>
          )}

          {tab === "security" && (
            <>
              <div
                style={{
                  ...glassCard,
                  marginBottom: 16,
                  border: "1px solid rgba(0,255,255,0.2)",
                }}
              >
                <div
                  style={{
                    fontFamily: "Orbitron",
                    fontSize: "11px",
                    color: "#00FFAA",
                    marginBottom: 8,
                    letterSpacing: "1px",
                  }}
                >
                  🛡️ CYBER SECURITY AGENT
                </div>
                <p
                  style={{
                    fontFamily: "Rajdhani",
                    fontSize: "13px",
                    color: "rgba(224,255,255,0.6)",
                    lineHeight: 1.5,
                  }}
                >
                  AI-powered threat detection is active. Monitoring all
                  sessions, transactions, and access patterns in real-time.
                </p>
              </div>
              <div
                style={{
                  fontFamily: "Orbitron",
                  fontSize: "10px",
                  color: "rgba(0,255,255,0.5)",
                  letterSpacing: "1px",
                  marginBottom: 10,
                }}
              >
                RECENT ALERTS
              </div>
              {threats.map((t) => (
                <div
                  key={t.msg}
                  style={{
                    ...glassCard,
                    marginBottom: 10,
                    border: `1px solid ${t.level === "MEDIUM" ? "rgba(255,165,0,0.3)" : "rgba(0,255,255,0.1)"}`,
                  }}
                  data-ocid="admin.security.item"
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
                        fontFamily: "Orbitron",
                        fontSize: "9px",
                        color: t.level === "MEDIUM" ? "#FFA500" : "#00FFAA",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {t.level}
                    </span>
                    <span
                      style={{
                        fontFamily: "Rajdhani",
                        fontSize: "11px",
                        color: "rgba(224,255,255,0.3)",
                      }}
                    >
                      {t.time}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: "Rajdhani",
                      fontSize: "13px",
                      color: "rgba(224,255,255,0.7)",
                      margin: 0,
                    }}
                  >
                    {t.msg}
                  </p>
                </div>
              ))}
            </>
          )}
          {tab === "charges" && (
            <div
              style={{
                ...glassCard,
                border: "1px solid rgba(255,215,0,0.3)",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "11px",
                  color: "#FFD700",
                  letterSpacing: "1px",
                  marginBottom: 16,
                }}
              >
                🏦 SERVICE CHARGES ACCOUNT
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "12px",
                  color: "rgba(224,255,255,0.4)",
                  marginBottom: 8,
                }}
              >
                Total Service Charges Collected (Hidden from Users)
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "28px",
                  color: "#FFD700",
                  textShadow: "0 0 20px rgba(255,215,0,0.4)",
                  marginBottom: 8,
                }}
              >
                PKR {serviceChargesCollected.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "12px",
                  color: "rgba(0,255,255,0.5)",
                }}
              >
                This amount is automatically deducted from each transaction and
                accumulated here. Visible to admin only.
              </div>
            </div>
          )}

          {tab === "credentials" && (
            <div
              style={{
                ...glassCard,
                border: "1px solid rgba(0,255,255,0.3)",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "11px",
                  color: "#00FFFF",
                  letterSpacing: "1px",
                  marginBottom: 16,
                }}
              >
                🔑 UPDATE CREDENTIALS
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={labelStyle}>Current Username</div>
                <div
                  style={
                    {
                      ...inputStyle,
                      color: "rgba(0,255,255,0.5)",
                      cursor: "not-allowed",
                    } as React.CSSProperties
                  }
                >
                  {adminUsername}
                </div>
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={labelStyle}>New Username</div>
                <input
                  style={inputStyle}
                  placeholder="Enter new username"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                  data-ocid="admin.credentials.input"
                />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={labelStyle}>New Password</div>
                <input
                  style={inputStyle}
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  data-ocid="admin.credentials.input"
                />
              </div>
              {credMsg && (
                <p
                  style={{
                    color: "#00FFAA",
                    fontFamily: "Rajdhani",
                    fontSize: "13px",
                    marginBottom: 12,
                  }}
                >
                  {credMsg}
                </p>
              )}
              <button
                type="button"
                onClick={() => {
                  if (newUsername.trim() && newPassword.trim()) {
                    setAdminUsername(newUsername.trim());
                    setAdminPassword(newPassword.trim());
                    setNewUsername("");
                    setNewPassword("");
                    setCredMsg("✓ Credentials updated successfully");
                  } else {
                    setCredMsg("Please fill both fields.");
                  }
                }}
                style={{
                  ...primaryBtn,
                  background: "linear-gradient(135deg, #00FFFF, #0080FF)",
                }}
                data-ocid="admin.credentials.save_button"
              >
                UPDATE CREDENTIALS
              </button>
              <div
                style={{
                  marginTop: 12,
                  fontFamily: "Rajdhani",
                  fontSize: "11px",
                  color: "rgba(224,255,255,0.3)",
                }}
              >
                Note: Admin Password used: {adminPassword.replace(/./g, "•")}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── UserDashboardScreen ─────────────────────────────────────────────────────

function UserDashboardScreen({
  userName,
  userPortalId,
  userBalance,
  onBack,
  onTopUp,
}: {
  userName: string;
  userPortalId: string;
  userBalance: number;
  onBack: () => void;
  onTopUp: () => void;
}) {
  const daysRemaining = 23;
  const bonusAmount = 500;
  const mockHistory = [
    { service: "Medical Store", date: "2026-03-18", amount: 850 },
    { service: "Workforce – Plumber", date: "2026-03-15", amount: 1200 },
    { service: "General Store", date: "2026-03-10", amount: 560 },
    { service: "Travel – Coach", date: "2026-03-05", amount: 2300 },
    { service: "House – Drinking Water", date: "2026-02-28", amount: 450 },
  ];

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1, padding: "0 20px 100px" }}>
        <ScreenHeader title="MY DASHBOARD" onBack={onBack} />

        {/* Low balance warning */}
        {userBalance < 100 && (
          <div
            style={{
              background: "rgba(255,107,107,0.1)",
              border: "1px solid rgba(255,107,107,0.4)",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 16,
            }}
            data-ocid="user_dashboard.error_state"
          >
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                color: "#FF6B6B",
                marginBottom: 4,
              }}
            >
              ⚠ INSUFFICIENT BALANCE
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "13px",
                color: "rgba(255,107,107,0.8)",
              }}
            >
              Your balance is critically low. Please Top-Up immediately.
            </div>
          </div>
        )}

        {/* Top-Up reminder banner */}
        {userBalance < 500 && userBalance >= 100 && (
          <div
            style={{
              background: "rgba(0,255,255,0.07)",
              border: "1px solid rgba(0,255,255,0.3)",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 16,
            }}
            data-ocid="user_dashboard.success_state"
          >
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                color: "#00FFFF",
                marginBottom: 4,
              }}
            >
              📱 TOP-UP REMINDER
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "13px",
                color: "rgba(0,255,255,0.8)",
              }}
            >
              Your balance is low. Top-Up now to avoid service interruption. SMS
              reminder has been sent to your registered number.
            </div>
          </div>
        )}

        {/* Profile summary */}
        <div style={{ ...glassCard, marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "14px",
                  color: "#00FFFF",
                }}
              >
                {userName || "Portal User"}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "12px",
                  color: "rgba(0,255,255,0.5)",
                  marginTop: 2,
                }}
              >
                {userPortalId}
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "Rajdhani",
                  fontSize: "10px",
                  color: "rgba(0,255,255,0.4)",
                }}
              >
                BALANCE
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "18px",
                  color: "#00FFFF",
                }}
              >
                PKR {userBalance.toLocaleString()}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onTopUp}
            style={{ ...primaryBtn, padding: "10px" }}
            data-ocid="user_dashboard.primary_button"
          >
            TOP UP NOW
          </button>
        </div>

        {/* Bonus + Free Trial */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              ...glassCard,
              border: "1px solid rgba(0,255,170,0.3)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>🎁</div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                color: "#00FFAA",
                marginBottom: 4,
              }}
            >
              BONUS
            </div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "16px",
                color: "#00FFAA",
              }}
            >
              PKR {bonusAmount}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani",
                fontSize: "10px",
                color: "rgba(224,255,255,0.4)",
                marginTop: 2,
              }}
            >
              Welcome Bonus
            </div>
          </div>
          <div
            style={{
              ...glassCard,
              border: "1px solid rgba(255,215,0,0.3)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>⏳</div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                color: "#FFD700",
                marginBottom: 4,
              }}
            >
              FREE TRIAL
            </div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "16px",
                color: "#FFD700",
              }}
            >
              {daysRemaining} days
            </div>
            <div
              style={{
                fontFamily: "Rajdhani",
                fontSize: "10px",
                color: "rgba(224,255,255,0.4)",
                marginTop: 2,
              }}
            >
              remaining
            </div>
          </div>
        </div>

        {/* Subscription notice */}
        <div
          style={{
            ...glassCard,
            border: "1px solid rgba(255,165,0,0.25)",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "10px",
              color: "#FFA500",
              marginBottom: 6,
            }}
          >
            📅 SUBSCRIPTION NOTICE
          </div>
          <div
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "13px",
              color: "rgba(224,255,255,0.7)",
            }}
          >
            After your free trial expires ({daysRemaining} days), a monthly
            subscription of{" "}
            <span style={{ color: "#FFA500", fontWeight: 700 }}>PKR 299</span>{" "}
            will be charged automatically. Initial amount is added after one
            month of free usage.
          </div>
        </div>

        {/* Order History */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "11px",
              color: "rgba(0,255,255,0.6)",
              letterSpacing: "1px",
              marginBottom: 12,
            }}
          >
            ORDER HISTORY
          </div>
          {mockHistory.map((h, i) => (
            <div
              key={h.date + h.service}
              style={{
                ...glassCard,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              data-ocid={`user_dashboard.item.${i + 1}`}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "14px",
                    color: "#E0FFFF",
                  }}
                >
                  {h.service}
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "11px",
                    color: "rgba(0,255,255,0.4)",
                  }}
                >
                  {h.date}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "13px",
                  color: "#00FFFF",
                }}
              >
                PKR {h.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ProviderDashboardScreen ──────────────────────────────────────────────────

function ProviderDashboardScreen({
  userName,
  userPortalId,
  userBalance,
  onBack,
  onTopUp,
}: {
  userName: string;
  userPortalId: string;
  userBalance: number;
  onBack: () => void;
  onTopUp: () => void;
}) {
  const daysRemaining = 19;
  const bonusAmount = 500;
  const mockJobs = [
    { service: "Plumber – Ahmed Shah", date: "2026-03-20", earnings: 2400 },
    { service: "Plumber – Tariq House", date: "2026-03-17", earnings: 1800 },
    { service: "Plumber – Farooq Plaza", date: "2026-03-12", earnings: 3200 },
    { service: "Plumber – Gulshan", date: "2026-03-08", earnings: 1500 },
    { service: "Plumber – DHA Block 5", date: "2026-03-02", earnings: 2800 },
  ];

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1, padding: "0 20px 100px" }}>
        <ScreenHeader title="PROVIDER DASHBOARD" onBack={onBack} />

        {/* Low balance warning */}
        {userBalance < 100 && (
          <div
            style={{
              background: "rgba(255,107,107,0.1)",
              border: "1px solid rgba(255,107,107,0.4)",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 16,
            }}
            data-ocid="provider_dashboard.error_state"
          >
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                color: "#FF6B6B",
                marginBottom: 4,
              }}
            >
              ⚠ INSUFFICIENT BALANCE
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "13px",
                color: "rgba(255,107,107,0.8)",
              }}
            >
              Your balance is critically low. Please Top-Up immediately.
            </div>
          </div>
        )}

        {/* Top-Up reminder banner */}
        {userBalance < 500 && userBalance >= 100 && (
          <div
            style={{
              background: "rgba(0,255,255,0.07)",
              border: "1px solid rgba(0,255,255,0.3)",
              borderRadius: 12,
              padding: "12px 16px",
              marginBottom: 16,
            }}
            data-ocid="provider_dashboard.success_state"
          >
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                color: "#00FFFF",
                marginBottom: 4,
              }}
            >
              📱 TOP-UP REMINDER
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "13px",
                color: "rgba(0,255,255,0.8)",
              }}
            >
              Your balance is low. Top-Up now to avoid service interruption. SMS
              reminder has been sent to your registered number.
            </div>
          </div>
        )}

        {/* Profile summary */}
        <div style={{ ...glassCard, marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "14px",
                  color: "#00FFFF",
                }}
              >
                {userName || "Provider"}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "12px",
                  color: "rgba(0,255,255,0.5)",
                  marginTop: 2,
                }}
              >
                {userPortalId}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "11px",
                  color: "rgba(0,255,170,0.6)",
                  marginTop: 2,
                }}
              >
                Service Provider
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div
                style={{
                  fontFamily: "Rajdhani",
                  fontSize: "10px",
                  color: "rgba(0,255,255,0.4)",
                }}
              >
                BALANCE
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "18px",
                  color: "#00FFFF",
                }}
              >
                PKR {userBalance.toLocaleString()}
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onTopUp}
            style={{ ...primaryBtn, padding: "10px" }}
            data-ocid="provider_dashboard.primary_button"
          >
            TOP UP NOW
          </button>
        </div>

        {/* Bonus + Free Trial */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              ...glassCard,
              border: "1px solid rgba(0,255,170,0.3)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>🎁</div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                color: "#00FFAA",
                marginBottom: 4,
              }}
            >
              BONUS
            </div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "16px",
                color: "#00FFAA",
              }}
            >
              PKR {bonusAmount}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani",
                fontSize: "10px",
                color: "rgba(224,255,255,0.4)",
                marginTop: 2,
              }}
            >
              Welcome Bonus
            </div>
          </div>
          <div
            style={{
              ...glassCard,
              border: "1px solid rgba(255,215,0,0.3)",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 6 }}>⏳</div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "10px",
                color: "#FFD700",
                marginBottom: 4,
              }}
            >
              FREE TRIAL
            </div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "16px",
                color: "#FFD700",
              }}
            >
              {daysRemaining} days
            </div>
            <div
              style={{
                fontFamily: "Rajdhani",
                fontSize: "10px",
                color: "rgba(224,255,255,0.4)",
                marginTop: 2,
              }}
            >
              remaining
            </div>
          </div>
        </div>

        {/* Subscription notice */}
        <div
          style={{
            ...glassCard,
            border: "1px solid rgba(255,165,0,0.25)",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "10px",
              color: "#FFA500",
              marginBottom: 6,
            }}
          >
            📅 SUBSCRIPTION NOTICE
          </div>
          <div
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "13px",
              color: "rgba(224,255,255,0.7)",
            }}
          >
            After your free trial expires ({daysRemaining} days), a monthly
            subscription of{" "}
            <span style={{ color: "#FFA500", fontWeight: 700 }}>PKR 299</span>{" "}
            will be charged automatically.
          </div>
        </div>

        {/* Earnings History */}
        <div style={{ marginBottom: 16 }}>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "11px",
              color: "rgba(0,255,255,0.6)",
              letterSpacing: "1px",
              marginBottom: 12,
            }}
          >
            EARNINGS HISTORY
          </div>
          {mockJobs.map((h, i) => (
            <div
              key={h.date + h.service}
              style={{
                ...glassCard,
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              data-ocid={`provider_dashboard.item.${i + 1}`}
            >
              <div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "14px",
                    color: "#E0FFFF",
                  }}
                >
                  {h.service}
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "11px",
                    color: "rgba(0,255,255,0.4)",
                  }}
                >
                  {h.date}
                </div>
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "13px",
                  color: "#00FFAA",
                }}
              >
                PKR {h.earnings}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── LowBalanceAlertScreen ────────────────────────────────────────────────────

function LowBalanceAlertScreen({
  userBalance,
  onTopUp,
  onBack,
}: {
  userBalance: number;
  onTopUp: () => void;
  onBack: () => void;
}) {
  return (
    <div
      style={{
        ...pageStyle,
        paddingBottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <SpaceBackground />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 380,
        }}
      >
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 72, marginBottom: 16 }}>⚠️</div>
          <h1
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "20px",
              color: "#FF6B6B",
              letterSpacing: "2px",
              marginBottom: 12,
              textShadow: "0 0 20px rgba(255,107,107,0.4)",
            }}
          >
            INSUFFICIENT BALANCE
          </h1>
          <div
            style={{
              ...glassCard,
              border: "1px solid rgba(255,107,107,0.3)",
              marginBottom: 20,
            }}
          >
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "13px",
                color: "rgba(224,255,255,0.5)",
                marginBottom: 8,
              }}
            >
              CURRENT BALANCE
            </div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "28px",
                color: "#FF6B6B",
              }}
            >
              PKR {userBalance.toLocaleString()}
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "13px",
                color: "rgba(224,255,255,0.6)",
                marginTop: 12,
              }}
            >
              Please Top-Up to continue using The Portals services.
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={onTopUp}
          style={{
            ...primaryBtn,
            background: "linear-gradient(135deg, #00FFFF, #0080FF)",
            marginBottom: 12,
          }}
          data-ocid="low_balance.primary_button"
        >
          TOP UP NOW
        </button>
        <button
          type="button"
          onClick={onBack}
          style={{
            ...primaryBtn,
            background: "transparent",
            border: "1px solid rgba(0,255,255,0.2)",
            color: "rgba(0,255,255,0.5)",
          }}
          data-ocid="low_balance.secondary_button"
        >
          GO BACK
        </button>
      </div>
    </div>
  );
}

// ─── BottomNav ────────────────────────────────────────────────────────────────

type NavTab = "home" | "tasks" | "chat" | "profile";

function BottomNav({
  active,
  onTab,
}: { active: NavTab; onTab: (tab: NavTab) => void }) {
  const tabs: { key: NavTab; label: string; icon: string }[] = [
    { key: "home", label: "Home", icon: "🏠" },
    { key: "tasks", label: "Tasks", icon: "📋" },
    { key: "chat", label: "Chat", icon: "💬" },
    { key: "profile", label: "Profile", icon: "👤" },
  ];

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 72,
        background: "rgba(5,7,10,0.95)",
        borderTop: "1px solid rgba(0,255,255,0.1)",
        display: "flex",
        backdropFilter: "blur(20px)",
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => (
        <button
          type="button"
          key={tab.key}
          onClick={() => onTab(tab.key)}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 3,
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "8px 0",
          }}
          data-ocid={`nav.${tab.key}.link`}
        >
          <span style={{ fontSize: 20, opacity: active === tab.key ? 1 : 0.4 }}>
            {tab.icon}
          </span>
          <span
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "8px",
              color: active === tab.key ? "#00FFFF" : "rgba(224,255,255,0.3)",
              letterSpacing: "0.5px",
              transition: "color 0.2s",
            }}
          >
            {tab.label.toUpperCase()}
          </span>
          {active === tab.key && (
            <div
              style={{
                position: "absolute",
                bottom: 0,
                width: 24,
                height: 2,
                background: "#00FFFF",
                borderRadius: 2,
                boxShadow: "0 0 8px #00FFFF",
              }}
            />
          )}
        </button>
      ))}
    </nav>
  );
}

// ─── Chip Component ───────────────────────────────────────────────────────────

function Chip({
  label,
  selected,
  onClick,
  color = "#00FFFF",
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        padding: "8px 14px",
        borderRadius: "20px",
        border: `1px solid ${selected ? color : "rgba(0,255,255,0.2)"}`,
        background: selected ? `${color}22` : "rgba(0,255,255,0.04)",
        color: selected ? color : "rgba(224,255,255,0.6)",
        fontFamily: "Rajdhani, sans-serif",
        fontSize: "13px",
        cursor: "pointer",
        transition: "all 0.2s",
        letterSpacing: "0.3px",
      }}
    >
      {label}
    </button>
  );
}

// ─── SubCategoryPicker ────────────────────────────────────────────────────────

function SubCategoryPicker({
  title,
  subtitle,
  items,
  color,
  onSelect,
  onBack,
}: {
  title: string;
  subtitle?: string;
  items: { name: string; icon: string; color?: string }[];
  color: string;
  onSelect: (name: string) => void;
  onBack: () => void;
}) {
  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title={title} onBack={onBack} />
        {subtitle && (
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "14px",
              color: "rgba(224,255,255,0.5)",
              padding: "0 20px",
              marginBottom: 16,
            }}
          >
            {subtitle}
          </p>
        )}
        <div
          style={{
            padding: "0 16px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
          }}
        >
          {items.map((item) => (
            <button
              type="button"
              key={item.name}
              onClick={() => onSelect(item.name)}
              style={{
                background: "rgba(0,255,255,0.03)",
                border: `1px solid ${item.color || color}30`,
                borderRadius: "16px",
                padding: "24px 16px",
                cursor: "pointer",
                textAlign: "center",
                backdropFilter: "blur(10px)",
              }}
              data-ocid={`subcat.${item.name.toLowerCase().replace(/ /g, "_")}.button`}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{item.icon}</div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "10px",
                  color: item.color || color,
                  letterSpacing: "0.5px",
                  lineHeight: 1.3,
                }}
              >
                {item.name.toUpperCase()}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ProviderListScreen ───────────────────────────────────────────────────────

interface ProviderCard {
  name: string;
  detail1?: string;
  detail2?: string;
  detail3?: string;
  amount?: string;
  wages?: string;
  wageAmount?: number;
  experience?: string;
  distance?: string;
  profileInitials?: string;
}

const MOCK_PROVIDERS: ProviderCard[] = [
  {
    name: "Muhammad Ali",
    detail1: "5 years exp",
    detail2: "3.2 km away",
    amount: "PKR 1,800",
    wages: "PKR 1,800/day",
    wageAmount: 1800,
    experience: "5 years",
    distance: "3.2 km",
    profileInitials: "MA",
  },
  {
    name: "Ahmed Hassan",
    detail1: "8 years exp",
    detail2: "1.5 km away",
    amount: "PKR 2,200",
    wages: "PKR 2,200/day",
    wageAmount: 2200,
    experience: "8 years",
    distance: "1.5 km",
    profileInitials: "AH",
  },
  {
    name: "Usman Tariq",
    detail1: "3 years exp",
    detail2: "4.7 km away",
    amount: "PKR 1,500",
    wages: "PKR 1,500/day",
    wageAmount: 1500,
    experience: "3 years",
    distance: "4.7 km",
    profileInitials: "UT",
  },
];

function WorkforceProviderList({
  role,
  onSelect,
  onBack,
}: {
  role: string;
  onSelect: (p: ProviderCard) => void;
  onBack: () => void;
}) {
  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title={role.toUpperCase()} onBack={onBack} />
        <div style={{ padding: "0 16px" }}>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "13px",
              color: "rgba(0,255,255,0.5)",
              letterSpacing: "1px",
              marginBottom: 14,
            }}
          >
            AVAILABLE PROVIDERS NEAR YOU
          </p>
          {MOCK_PROVIDERS.map((p, i) => (
            <div
              key={p.name}
              style={{
                ...glassCard,
                marginBottom: 12,
                border: "1px solid rgba(0,255,255,0.15)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  marginBottom: 12,
                }}
              >
                {/* Profile avatar */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, rgba(0,255,255,0.2), rgba(0,128,255,0.2))",
                    border: "2px solid rgba(0,255,255,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "14px",
                    color: "#00FFFF",
                    flexShrink: 0,
                  }}
                >
                  {p.profileInitials}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "13px",
                      color: "#E0FFFF",
                      marginBottom: 2,
                    }}
                  >
                    {p.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "14px",
                      color: "#00FFFF",
                      marginBottom: 4,
                    }}
                  >
                    {p.wages}
                  </div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: "13px",
                      color: "rgba(224,255,255,0.5)",
                    }}
                  >
                    Experience: {p.experience} &nbsp;|&nbsp; {p.distance} from
                    you
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: "rgba(0,255,255,0.08)",
                    border: "1px solid rgba(0,255,255,0.3)",
                    borderRadius: "8px",
                    color: "#00FFFF",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "10px",
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                  }}
                  data-ocid={`workforce.message.${i}`}
                >
                  💬 MESSAGE
                </button>
                <button
                  type="button"
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: "rgba(0,255,255,0.08)",
                    border: "1px solid rgba(0,255,255,0.3)",
                    borderRadius: "8px",
                    color: "#00FFFF",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "10px",
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                  }}
                  data-ocid={`workforce.call.${i}`}
                >
                  📞 CALL
                </button>
                <button
                  type="button"
                  onClick={() => onSelect(p)}
                  style={{
                    flex: 1,
                    padding: "10px 0",
                    background: "linear-gradient(135deg, #00FFFF, #0080FF)",
                    border: "none",
                    borderRadius: "8px",
                    color: "#05070A",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "10px",
                    cursor: "pointer",
                    fontWeight: 700,
                    letterSpacing: "0.5px",
                  }}
                  data-ocid={`workforce.select.${i}`}
                >
                  SELECT
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── WorkforceScreen ──────────────────────────────────────────────────────────

function WorkforceScreen({
  onBack,
  onPayment,
}: {
  onBack: () => void;
  onPayment: (amount: number, providerName: string) => void;
}) {
  const [subScreen, setSubScreen] = useState<
    "main" | "skilled" | "unskilled" | string
  >("main");
  const [selectedRole, setSelectedRole] = useState("");

  if (subScreen === "provider-list") {
    return (
      <WorkforceProviderList
        role={selectedRole}
        onSelect={(p) => onPayment(p.wageAmount ?? 1500, p.name)}
        onBack={() =>
          setSubScreen(
            [
              "Plumber",
              "Electrician",
              "AC Technician",
              "Mason",
              "Solar Technician",
              "Carpenter",
              "Painter",
            ].includes(selectedRole)
              ? "skilled"
              : "unskilled",
          )
        }
      />
    );
  }

  if (subScreen === "skilled") {
    return (
      <SubCategoryPicker
        title="SKILLED WORKFORCE"
        color="#E67E22"
        items={[
          { name: "Plumber", icon: "🔧" },
          { name: "Electrician", icon: "⚡" },
          { name: "AC Technician", icon: "❄️" },
          { name: "Mason", icon: "🧱" },
          { name: "Solar Technician", icon: "☀️" },
          { name: "Carpenter", icon: "🪚" },
          { name: "Painter", icon: "🎨" },
        ]}
        onSelect={(name) => {
          setSelectedRole(name);
          setSubScreen("provider-list");
        }}
        onBack={() => setSubScreen("main")}
      />
    );
  }

  if (subScreen === "unskilled") {
    return (
      <SubCategoryPicker
        title="UNSKILLED WORKFORCE"
        color="#E67E22"
        items={[
          { name: "Cleaner", icon: "🧹" },
          { name: "Gardener", icon: "🌱" },
          { name: "Labour", icon: "💪" },
        ]}
        onSelect={(name) => {
          setSelectedRole(name);
          setSubScreen("provider-list");
        }}
        onBack={() => setSubScreen("main")}
      />
    );
  }

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title="WORKFORCE" onBack={onBack} />
        <div style={{ padding: "0 16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <button
              type="button"
              onClick={() => setSubScreen("skilled")}
              style={
                {
                  ...glassCard,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  border: "1px solid rgba(230,126,34,0.3)",
                  textAlign: "left",
                } as React.CSSProperties
              }
            >
              <span style={{ fontSize: 36 }}>🛠️</span>
              <div>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "13px",
                    color: "#E67E22",
                    marginBottom: 4,
                  }}
                >
                  SKILLED WORKFORCE
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "13px",
                    color: "rgba(224,255,255,0.5)",
                  }}
                >
                  Plumber, Electrician, AC Tech, Mason, Solar Tech, Carpenter,
                  Painter
                </div>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setSubScreen("unskilled")}
              style={
                {
                  ...glassCard,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  border: "1px solid rgba(230,126,34,0.3)",
                  textAlign: "left",
                } as React.CSSProperties
              }
            >
              <span style={{ fontSize: 36 }}>👐</span>
              <div>
                <div
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "13px",
                    color: "#E67E22",
                    marginBottom: 4,
                  }}
                >
                  UNSKILLED WORKFORCE
                </div>
                <div
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "13px",
                    color: "rgba(224,255,255,0.5)",
                  }}
                >
                  Cleaner, Gardener, Labour
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── ItemOrderFlow (reusable) ─────────────────────────────────────────────────

interface OrderItem {
  name: string;
  qty: number;
  unit: string;
  price: number;
}

function ItemOrderFlow({
  title,
  items,
  serviceCharge,
  deliveryCharge,
  onConfirm,
  onBack,
}: {
  title: string;
  items: { name: string; unit: string; price: number }[];
  serviceCharge: number;
  deliveryCharge: number;
  onConfirm: (amount: number, providerName: string) => void;
  onBack: () => void;
}) {
  const [subStep, setSubStep] = useState<"order" | "provider">("order");
  const [selectedItem, setSelectedItem] = useState("");
  const [qty, setQty] = useState(1);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const currentItemData = items.find((i) => i.name === selectedItem);

  const addItem = () => {
    if (!selectedItem || qty < 1) return;
    const existing = orderItems.findIndex((o) => o.name === selectedItem);
    const unit = currentItemData?.unit ?? "pcs";
    const price = currentItemData?.price ?? 0;
    if (existing >= 0) {
      const updated = [...orderItems];
      updated[existing].qty += qty;
      setOrderItems(updated);
    } else {
      setOrderItems([...orderItems, { name: selectedItem, qty, unit, price }]);
    }
    setSelectedItem("");
    setQty(1);
  };

  const total = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const grandTotal = total + serviceCharge + deliveryCharge;

  if (subStep === "provider") {
    return (
      <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
        <SpaceBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScreenHeader
            title="SELECT PROVIDER"
            onBack={() => setSubStep("order")}
          />
          <div style={{ padding: "0 16px" }}>
            <p
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "13px",
                color: "rgba(0,255,255,0.5)",
                letterSpacing: "1px",
                marginBottom: 14,
              }}
            >
              NEARBY SERVICE PROVIDERS
            </p>
            {["FreshMart Store", "QuickShop", "DoorStep Delivery"].map(
              (store, i) => (
                <div
                  key={store}
                  style={{
                    ...glassCard,
                    marginBottom: 12,
                    border: "1px solid rgba(0,255,255,0.15)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "12px",
                      color: "#00FFFF",
                      marginBottom: 4,
                    }}
                  >
                    {["Rizwan Ahmed", "Salman Khan", "Tariq Mehmood"][i]}
                  </div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      fontSize: "13px",
                      color: "rgba(224,255,255,0.6)",
                      marginBottom: 8,
                    }}
                  >
                    {store}
                  </div>
                  {orderItems.map((o) => (
                    <div
                      key={o.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "12px",
                        color: "rgba(224,255,255,0.5)",
                        marginBottom: 3,
                      }}
                    >
                      <span>
                        {o.name} x{o.qty} {o.unit}
                      </span>
                      <span>PKR {(o.price * o.qty).toLocaleString()}</span>
                    </div>
                  ))}
                  <div
                    style={{
                      borderTop: "1px solid rgba(0,255,255,0.1)",
                      marginTop: 8,
                      paddingTop: 8,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "13px",
                        color: "rgba(224,255,255,0.5)",
                      }}
                    >
                      <span>Service Charges</span>
                      <span>PKR {serviceCharge}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "13px",
                        color: "rgba(224,255,255,0.5)",
                      }}
                    >
                      <span>Delivery Charges</span>
                      <span>PKR {deliveryCharge}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "13px",
                        color: "#00FFFF",
                        marginTop: 4,
                      }}
                    >
                      <span>TOTAL</span>
                      <span>PKR {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onConfirm(grandTotal, store)}
                    style={{ ...primaryBtn, marginTop: 12 }}
                    data-ocid={`provider.select.${i}`}
                  >
                    CONFIRM ORDER →
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title={title} onBack={onBack} />
        <div style={{ padding: "0 16px" }}>
          <div style={{ ...glassCard, marginBottom: 16 }}>
            <div style={{ marginBottom: 14 }}>
              <div style={labelStyle}>Item Name</div>
              <select
                style={{ ...inputStyle, appearance: "none" as const }}
                value={selectedItem}
                onChange={(e) => setSelectedItem(e.target.value)}
                data-ocid="order.item_select"
              >
                <option value="">Select item...</option>
                {items.map((i) => (
                  <option key={i.name} value={i.name}>
                    {i.name}
                  </option>
                ))}
              </select>
            </div>
            {selectedItem && (
              <div style={{ display: "flex", gap: 12, marginBottom: 14 }}>
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Unit</div>
                  <div style={{ ...inputStyle, color: "#00FFFF" }}>
                    {currentItemData?.unit ?? "-"}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Price (PKR)</div>
                  <div style={{ ...inputStyle, color: "#00FFFF" }}>
                    {currentItemData?.price ?? 0}
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Qty</div>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <button
                      type="button"
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      style={{
                        width: 34,
                        height: 42,
                        background: "rgba(0,255,255,0.1)",
                        border: "1px solid rgba(0,255,255,0.3)",
                        borderRadius: 8,
                        color: "#00FFFF",
                        cursor: "pointer",
                        fontSize: 18,
                      }}
                    >
                      -
                    </button>
                    <span
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "16px",
                        color: "#E0FFFF",
                        minWidth: 24,
                        textAlign: "center",
                      }}
                    >
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty(qty + 1)}
                      style={{
                        width: 34,
                        height: 42,
                        background: "rgba(0,255,255,0.1)",
                        border: "1px solid rgba(0,255,255,0.3)",
                        borderRadius: 8,
                        color: "#00FFFF",
                        cursor: "pointer",
                        fontSize: 18,
                      }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            )}
            <button
              type="button"
              onClick={addItem}
              style={{
                ...primaryBtn,
                background: "rgba(0,255,255,0.1)",
                border: "1px solid rgba(0,255,255,0.3)",
                color: "#00FFFF",
                padding: "10px",
              }}
              data-ocid="order.add_item"
            >
              + ADD ITEM
            </button>
          </div>

          {orderItems.length > 0 && (
            <div
              style={{
                ...glassCard,
                marginBottom: 16,
                border: "1px solid rgba(0,255,255,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "11px",
                  color: "rgba(0,255,255,0.6)",
                  letterSpacing: "1px",
                  marginBottom: 10,
                }}
              >
                ORDER SUMMARY
              </div>
              {orderItems.map((o) => (
                <div
                  key={o.name}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 6,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "14px",
                    color: "#E0FFFF",
                  }}
                >
                  <span>
                    {o.name} x{o.qty} {o.unit}
                  </span>
                  <span style={{ color: "#00FFFF" }}>
                    PKR {(o.price * o.qty).toLocaleString()}
                  </span>
                </div>
              ))}
              <div
                style={{
                  borderTop: "1px solid rgba(0,255,255,0.1)",
                  paddingTop: 8,
                  marginTop: 6,
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "13px",
                  color: "#00FFFF",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>SUBTOTAL</span>
                <span>PKR {total.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div style={{ ...glassCard, marginBottom: 16 }}>
            <div style={labelStyle}>
              Delivery Address (GPS Current Location)
            </div>
            <input
              style={inputStyle}
              placeholder="📍 Tap to use current location..."
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              data-ocid="order.delivery_address"
            />
          </div>

          <button
            type="button"
            onClick={() => {
              if (orderItems.length > 0) setSubStep("provider");
            }}
            style={{
              ...primaryBtn,
              marginBottom: 20,
              opacity: orderItems.length > 0 ? 1 : 0.5,
            }}
            data-ocid="order.book_order"
          >
            BOOK ORDER →
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── GeneralStoreScreen ───────────────────────────────────────────────────────

// ─── Stationary Items ─────────────────────────────────────────────────────────

const BOOKSTORE_ITEMS = [
  { name: "Textbook", unit: "pcs", price: 450 },
  { name: "Notebook", unit: "pcs", price: 80 },
  { name: "Copy", unit: "pcs", price: 40 },
  { name: "Drawing Book", unit: "pcs", price: 60 },
  { name: "Register", unit: "pcs", price: 120 },
  { name: "Pen", unit: "pcs", price: 15 },
  { name: "Pencil", unit: "pcs", price: 10 },
  { name: "Marker", unit: "pcs", price: 25 },
  { name: "Highlighter", unit: "pcs", price: 35 },
  { name: "Ruler", unit: "pcs", price: 20 },
  { name: "Geometry Set", unit: "pcs", price: 150 },
  { name: "Eraser", unit: "pcs", price: 10 },
  { name: "Sharpener", unit: "pcs", price: 15 },
  { name: "Stapler", unit: "pcs", price: 200 },
  { name: "File Folder", unit: "pcs", price: 50 },
  { name: "Binder", unit: "pcs", price: 180 },
  { name: "Sticky Notes", unit: "pcs", price: 45 },
  { name: "Correction Pen", unit: "pcs", price: 30 },
  { name: "Glue Stick", unit: "pcs", price: 35 },
  { name: "Scissor", unit: "pcs", price: 60 },
];

const STATIONARY_ACCESSORIES_ITEMS = [
  { name: "School Bag", unit: "pcs", price: 1200 },
  { name: "Backpack", unit: "pcs", price: 1800 },
  { name: "Pencil Case", unit: "pcs", price: 150 },
  { name: "Lunch Box", unit: "pcs", price: 350 },
  { name: "Water Bottle", unit: "pcs", price: 250 },
  { name: "Calculator", unit: "pcs", price: 800 },
  { name: "USB Drive", unit: "pcs", price: 600 },
  { name: "Headphones", unit: "pcs", price: 1500 },
  { name: "Earphones", unit: "pcs", price: 400 },
  { name: "Mouse Pad", unit: "pcs", price: 200 },
  { name: "Laptop Bag", unit: "pcs", price: 2200 },
  { name: "Tiffin Box", unit: "pcs", price: 280 },
  { name: "Compass", unit: "pcs", price: 120 },
  { name: "Protractor", unit: "pcs", price: 50 },
  { name: "Color Pencils", unit: "pcs", price: 200 },
  { name: "Crayons", unit: "pcs", price: 180 },
  { name: "Paints Set", unit: "pcs", price: 450 },
  { name: "Drawing Kit", unit: "pcs", price: 650 },
  { name: "Wall Clock", unit: "pcs", price: 850 },
  { name: "Desk Organizer", unit: "pcs", price: 600 },
];

function StationaryScreen({
  onBack,
  onPayment,
}: {
  onBack: () => void;
  onPayment: (amount: number, providerName: string) => void;
}) {
  const [subCat, setSubCat] = useState<"" | "Book Store" | "Accessories">("");

  if (subCat === "Book Store") {
    return (
      <ItemOrderFlow
        title="BOOK STORE"
        items={BOOKSTORE_ITEMS}
        serviceCharge={50}
        deliveryCharge={150}
        onConfirm={(amount, providerName) => onPayment(amount, providerName)}
        onBack={() => setSubCat("")}
      />
    );
  }
  if (subCat === "Accessories") {
    return (
      <ItemOrderFlow
        title="ACCESSORIES"
        items={STATIONARY_ACCESSORIES_ITEMS}
        serviceCharge={50}
        deliveryCharge={150}
        onConfirm={(amount, providerName) => onPayment(amount, providerName)}
        onBack={() => setSubCat("")}
      />
    );
  }

  return (
    <SubCategoryPicker
      title="STATIONARY"
      color="#9B59B6"
      items={[
        { name: "Book Store", icon: "📚" },
        { name: "Accessories", icon: "🎒" },
      ]}
      onSelect={(name) => setSubCat(name as "Book Store" | "Accessories")}
      onBack={onBack}
    />
  );
}

// ─── Travel (formerly Transport) ─────────────────────────────────────────────

type TravelSubCat =
  | ""
  | "Air Travel"
  | "Train Travel"
  | "Road Travel"
  | "Coach Travel"
  | "Dome Travel";

const TRAVEL_FARES: Record<string, number> = {
  "Air Travel-Economy": 8000,
  "Air Travel-Business": 15000,
  "Train Travel-Economy": 2500,
  "Train Travel-Business": 5000,
  "Coach Travel-Economy": 1200,
  "Coach Travel-Business": 2200,
  "Dome Travel-Economy": 1400,
  "Dome Travel-Business": 2500,
};

function TravelBookingForm({
  travelType,
  onConfirm,
  onBack,
}: {
  travelType: string;
  onConfirm: (amount: number, providerName: string) => void;
  onBack: () => void;
}) {
  const [fromCity, setFromCity] = useState("");
  const [toCity, setToCity] = useState("");
  const [passengerName, setPassengerName] = useState("");
  const [contact, setContact] = useState("");
  const [serviceType, setServiceType] = useState<"Economy" | "Business">(
    "Economy",
  );
  const [totalPassengers, setTotalPassengers] = useState(1);
  const [showCard, setShowCard] = useState(false);

  const fareKey = `${travelType}-${serviceType}`;
  const farePerSeat = TRAVEL_FARES[fareKey] ?? 1000;
  const totalFare = farePerSeat * totalPassengers;
  const serviceCharges = 200;
  const grandTotal = totalFare + serviceCharges;

  const seats = Array.from({ length: totalPassengers }, (_, i) => {
    const row = String.fromCharCode(65 + Math.floor(i / 6));
    const col = (i % 6) + 1;
    return `${row}${col}`;
  }).join(", ");

  if (showCard) {
    return (
      <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
        <SpaceBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScreenHeader
            title="SERVICE PROVIDER"
            onBack={() => setShowCard(false)}
          />
          <div style={{ padding: "0 16px 100px" }}>
            <div
              style={{
                ...glassCard,
                border: "1px solid rgba(52,152,219,0.4)",
                marginBottom: 16,
              }}
            >
              <h3
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "13px",
                  color: "#3498DB",
                  letterSpacing: "1px",
                  marginBottom: 16,
                }}
              >
                ✈️ {travelType.toUpperCase()} — BOOKING DETAILS
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "10px",
                  marginBottom: 12,
                }}
              >
                <div>
                  <div style={{ ...labelStyle }}>From City</div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      color: "#E0FFFF",
                      fontSize: "15px",
                    }}
                  >
                    {fromCity}
                  </div>
                </div>
                <div>
                  <div style={{ ...labelStyle }}>To City</div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      color: "#E0FFFF",
                      fontSize: "15px",
                    }}
                  >
                    {toCity}
                  </div>
                </div>
                <div>
                  <div style={{ ...labelStyle }}>Passenger</div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      color: "#E0FFFF",
                      fontSize: "15px",
                    }}
                  >
                    {passengerName}
                  </div>
                </div>
                <div>
                  <div style={{ ...labelStyle }}>Contact</div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      color: "#E0FFFF",
                      fontSize: "15px",
                    }}
                  >
                    {contact}
                  </div>
                </div>
                <div>
                  <div style={{ ...labelStyle }}>Service Type</div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      color: "#00FFFF",
                      fontSize: "15px",
                    }}
                  >
                    {serviceType}
                  </div>
                </div>
                <div>
                  <div style={{ ...labelStyle }}>Seat(s)</div>
                  <div
                    style={{
                      fontFamily: "Rajdhani, sans-serif",
                      color: "#00FFFF",
                      fontSize: "14px",
                    }}
                  >
                    {seats}
                  </div>
                </div>
              </div>
              <div
                style={{
                  borderTop: "1px solid rgba(52,152,219,0.2)",
                  paddingTop: 12,
                  marginTop: 4,
                }}
              >
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
                      color: "rgba(224,255,255,0.6)",
                      fontSize: "14px",
                    }}
                  >
                    Fare / Per Seat
                  </span>
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      color: "#E0FFFF",
                      fontSize: "13px",
                    }}
                  >
                    PKR {farePerSeat.toLocaleString()}
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
                      color: "rgba(224,255,255,0.6)",
                      fontSize: "14px",
                    }}
                  >
                    Total Fare ({totalPassengers} seats)
                  </span>
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      color: "#E0FFFF",
                      fontSize: "13px",
                    }}
                  >
                    PKR {totalFare.toLocaleString()}
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
                      color: "rgba(224,255,255,0.6)",
                      fontSize: "14px",
                    }}
                  >
                    Service Charges
                  </span>
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      color: "#E0FFFF",
                      fontSize: "13px",
                    }}
                  >
                    PKR {serviceCharges}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(0,255,255,0.2)",
                    paddingTop: 10,
                    marginTop: 6,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      color: "#00FFFF",
                      fontSize: "13px",
                    }}
                  >
                    GRAND TOTAL
                  </span>
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      color: "#00FFFF",
                      fontSize: "15px",
                      fontWeight: 700,
                    }}
                  >
                    PKR {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onConfirm(grandTotal, `${travelType} Provider`)}
              style={{ ...primaryBtn }}
              data-ocid="travel.confirm_button"
            >
              CONFIRM BOOKING → PAYMENT
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isValid = fromCity && toCity && passengerName && contact;

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title={travelType.toUpperCase()} onBack={onBack} />
        <div style={{ padding: "0 16px 100px" }}>
          <div
            style={{
              ...glassCard,
              border: "1px solid rgba(52,152,219,0.3)",
              marginBottom: 16,
            }}
          >
            <p
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "11px",
                color: "#3498DB",
                letterSpacing: "1px",
                marginBottom: 16,
              }}
            >
              ✈️ {travelType.toUpperCase()} BOOKING
            </p>

            <label htmlFor="travel-from" style={labelStyle}>
              From City
            </label>
            <input
              id="travel-from"
              style={{ ...inputStyle, marginBottom: 12 }}
              placeholder="Departure city"
              value={fromCity}
              onChange={(e) => setFromCity(e.target.value)}
              data-ocid="travel.input"
            />

            <label htmlFor="travel-to" style={labelStyle}>
              To City
            </label>
            <input
              id="travel-to"
              style={{ ...inputStyle, marginBottom: 12 }}
              placeholder="Destination city"
              value={toCity}
              onChange={(e) => setToCity(e.target.value)}
            />

            <label htmlFor="travel-pax" style={labelStyle}>
              Name of Passenger
            </label>
            <input
              id="travel-pax"
              style={{ ...inputStyle, marginBottom: 12 }}
              placeholder="Full name"
              value={passengerName}
              onChange={(e) => setPassengerName(e.target.value)}
            />

            <label htmlFor="travel-contact" style={labelStyle}>
              Contact Number
            </label>
            <input
              id="travel-contact"
              style={{ ...inputStyle, marginBottom: 12 }}
              type="tel"
              placeholder="03xx-xxxxxxx"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />

            <p style={labelStyle}>Service Type</p>
            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              {(["Economy", "Business"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setServiceType(t)}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "10px",
                    border: `1px solid ${serviceType === t ? "#3498DB" : "rgba(52,152,219,0.25)"}`,
                    background:
                      serviceType === t
                        ? "rgba(52,152,219,0.2)"
                        : "rgba(52,152,219,0.04)",
                    color:
                      serviceType === t ? "#3498DB" : "rgba(224,255,255,0.5)",
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "11px",
                    cursor: "pointer",
                    letterSpacing: "0.5px",
                  }}
                  data-ocid="travel.toggle"
                >
                  {t}
                </button>
              ))}
            </div>

            <p style={labelStyle}>Total Passengers</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 4,
              }}
            >
              <button
                type="button"
                onClick={() => setTotalPassengers((v) => Math.max(1, v - 1))}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(0,255,255,0.1)",
                  border: "1px solid rgba(0,255,255,0.3)",
                  color: "#00FFFF",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                −
              </button>
              <span
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  color: "#E0FFFF",
                  fontSize: "18px",
                  minWidth: 30,
                  textAlign: "center",
                }}
              >
                {totalPassengers}
              </span>
              <button
                type="button"
                onClick={() => setTotalPassengers((v) => v + 1)}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: "50%",
                  background: "rgba(0,255,255,0.1)",
                  border: "1px solid rgba(0,255,255,0.3)",
                  color: "#00FFFF",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                +
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCard(true)}
            disabled={!isValid}
            style={{
              ...primaryBtn,
              opacity: isValid ? 1 : 0.5,
              cursor: isValid ? "pointer" : "not-allowed",
            }}
            data-ocid="travel.primary_button"
          >
            FIND PROVIDERS
          </button>
        </div>
      </div>
    </div>
  );
}

function TravelScreen({
  onBack,
  onPayment,
}: {
  onBack: () => void;
  onPayment: (amount: number, providerName: string) => void;
}) {
  const [subCat, setSubCat] = useState<TravelSubCat>("");
  const [roadSubCat, setRoadSubCat] = useState<
    "" | "Coach Travel" | "Dome Travel"
  >("");

  if (subCat === "Road Travel") {
    if (roadSubCat === "Coach Travel" || roadSubCat === "Dome Travel") {
      return (
        <TravelBookingForm
          travelType={roadSubCat}
          onConfirm={(amount, providerName) => onPayment(amount, providerName)}
          onBack={() => setRoadSubCat("")}
        />
      );
    }
    return (
      <SubCategoryPicker
        title="ROAD TRAVEL"
        color="#3498DB"
        items={[
          { name: "Coach Travel", icon: "🚌" },
          { name: "Dome Travel", icon: "🚐" },
        ]}
        onSelect={(name) =>
          setRoadSubCat(name as "Coach Travel" | "Dome Travel")
        }
        onBack={() => setSubCat("")}
      />
    );
  }

  if (subCat === "Air Travel" || subCat === "Train Travel") {
    return (
      <TravelBookingForm
        travelType={subCat}
        onConfirm={(amount, providerName) => onPayment(amount, providerName)}
        onBack={() => setSubCat("")}
      />
    );
  }

  return (
    <SubCategoryPicker
      title="TRAVEL"
      color="#3498DB"
      items={[
        { name: "Air Travel", icon: "✈️" },
        { name: "Train Travel", icon: "🚂" },
        { name: "Road Travel", icon: "🚌" },
      ]}
      onSelect={(name) => setSubCat(name as TravelSubCat)}
      onBack={onBack}
    />
  );
}

const GROCERY_ITEMS = [
  { name: "Basmati Rice", unit: "kg", price: 280 },
  { name: "Cooking Oil", unit: "L", price: 450 },
  { name: "Wheat Flour (Atta)", unit: "kg", price: 130 },
  { name: "Sugar", unit: "kg", price: 140 },
  { name: "Milk", unit: "L", price: 160 },
  { name: "Eggs", unit: "dozen", price: 320 },
  { name: "Onions", unit: "kg", price: 80 },
  { name: "Tomatoes", unit: "kg", price: 120 },
  { name: "Chicken", unit: "kg", price: 650 },
  { name: "Lentils (Daal)", unit: "kg", price: 250 },
  { name: "Tea (Chai Patti)", unit: "250g", price: 180 },
  { name: "Salt", unit: "kg", price: 60 },
  { name: "Bread", unit: "pcs", price: 70 },
  { name: "Butter", unit: "pcs", price: 220 },
  { name: "Yogurt (Dahi)", unit: "kg", price: 190 },
];

const ACCESSORIES_ITEMS = [
  { name: "School Bag", unit: "pcs", price: 850 },
  { name: "Laptop Bag", unit: "pcs", price: 1200 },
  { name: "Backpack", unit: "pcs", price: 700 },
  { name: "Water Cooler (Small)", unit: "pcs", price: 2500 },
  { name: "Water Bottle", unit: "pcs", price: 350 },
  { name: "Headphones", unit: "pcs", price: 1500 },
  { name: "Watch (Casual)", unit: "pcs", price: 1800 },
  { name: "Umbrella", unit: "pcs", price: 450 },
  { name: "Belt", unit: "pcs", price: 300 },
  { name: "Wallet", unit: "pcs", price: 400 },
  { name: "Sunglasses", unit: "pcs", price: 600 },
  { name: "Travel Bag", unit: "pcs", price: 2200 },
];

function GeneralStoreScreen({
  onBack,
  onPayment,
}: {
  onBack: () => void;
  onPayment: (amount: number, providerName: string) => void;
}) {
  const [subCat, setSubCat] = useState<"" | "Grocery" | "Accessories">("");

  if (subCat === "Grocery") {
    return (
      <ItemOrderFlow
        title="GROCERY"
        items={GROCERY_ITEMS}
        serviceCharge={50}
        deliveryCharge={150}
        onConfirm={(amount, providerName) => onPayment(amount, providerName)}
        onBack={() => setSubCat("")}
      />
    );
  }
  if (subCat === "Accessories") {
    return (
      <ItemOrderFlow
        title="ACCESSORIES"
        items={ACCESSORIES_ITEMS}
        serviceCharge={50}
        deliveryCharge={150}
        onConfirm={(amount, providerName) => onPayment(amount, providerName)}
        onBack={() => setSubCat("")}
      />
    );
  }

  return (
    <SubCategoryPicker
      title="GENERAL STORE"
      color="#00FFFF"
      items={[
        { name: "Grocery", icon: "🛒" },
        { name: "Accessories", icon: "👜" },
      ]}
      onSelect={(name) => setSubCat(name as "Grocery" | "Accessories")}
      onBack={onBack}
    />
  );
}

// ─── HealthScreen ─────────────────────────────────────────────────────────────

const MEDICINE_ITEMS = [
  { name: "Panadol 500mg", unit: "Tablets", price: 25 },
  { name: "Brufen 400mg", unit: "Tablets", price: 30 },
  { name: "Disprin", unit: "Tablets", price: 20 },
  { name: "Flagyl 400mg", unit: "Tablets", price: 35 },
  { name: "Amoxicillin 500mg", unit: "Capsules", price: 85 },
  { name: "Augmentin 625mg", unit: "Tablets", price: 150 },
  { name: "Calpol Syrup", unit: "Syrup", price: 95 },
  { name: "ORS Sachet", unit: "Sachet", price: 15 },
  { name: "Omeprazole 20mg", unit: "Capsules", price: 45 },
  { name: "Metformin 500mg", unit: "Tablets", price: 30 },
  { name: "Amlodipine 5mg", unit: "Tablets", price: 40 },
  { name: "Aspirin 75mg", unit: "Tablets", price: 22 },
  { name: "Cetirizine 10mg", unit: "Tablets", price: 28 },
  { name: "Vitamin C 500mg", unit: "Tablets", price: 55 },
  { name: "Zinc 50mg", unit: "Tablets", price: 60 },
  { name: "Calcium+D3", unit: "Tablets", price: 75 },
  { name: "B-Complex", unit: "Tablets", price: 65 },
  { name: "Multivitamin", unit: "Tablets", price: 90 },
  { name: "Antacid Syrup", unit: "Syrup", price: 80 },
  { name: "Imodium", unit: "Tablets", price: 45 },
];

function HealthScreen({
  onBack,
  onPayment,
}: {
  onBack: () => void;
  onPayment: (amount: number, providerName: string) => void;
}) {
  const [subCat, setSubCat] = useState<"" | "Medical Store">("");

  if (subCat === "Medical Store") {
    return (
      <ItemOrderFlow
        title="MEDICAL STORE"
        items={MEDICINE_ITEMS}
        serviceCharge={50}
        deliveryCharge={150}
        onConfirm={(amount, providerName) => onPayment(amount, providerName)}
        onBack={() => setSubCat("")}
      />
    );
  }

  return (
    <SubCategoryPicker
      title="HEALTH"
      color="#FF6B9D"
      items={[{ name: "Medical Store", icon: "💊" }]}
      onSelect={() => setSubCat("Medical Store")}
      onBack={onBack}
    />
  );
}

// ─── HouseScreen ──────────────────────────────────────────────────────────────

function HouseScreen({
  onBack,
  onPayment,
}: {
  onBack: () => void;
  onPayment: (amount: number, providerName: string) => void;
}) {
  const [subCat, setSubCat] = useState<"" | "Drinking Water" | "Gas Cylinder">(
    "",
  );
  const [step, setStep] = useState<"form" | "provider">("form");

  // Drinking Water state
  const [dwBrand, setDwBrand] = useState("");
  const [dwSize, setDwSize] = useState("");
  const [dwBottles, setDwBottles] = useState(1);
  const [dwAddress, setDwAddress] = useState("📍 Current Location");

  // Gas Cylinder state
  const [gcGasType, setGcGasType] = useState("");
  const [gcSize, setGcSize] = useState("");
  const [gcCylinders, setGcCylinders] = useState(1);
  const [gcAddress, setGcAddress] = useState("📍 Current Location");

  if (subCat === "Drinking Water") {
    if (step === "provider") {
      const bottlePrice: Record<string, number> = {
        "500ml": 25,
        "1L": 45,
        "1.5L": 60,
        "6L": 130,
        "16L": 280,
      };
      const pricePerBottle = bottlePrice[dwSize] || 45;
      const dwSubtotal = pricePerBottle * dwBottles;
      const dwDelivery = 150;
      const dwServiceCharge = 50;
      const total = dwSubtotal + dwDelivery + dwServiceCharge;
      return (
        <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
          <SpaceBackground />
          <div style={{ position: "relative", zIndex: 1 }}>
            <ScreenHeader
              title="SELECT PROVIDER"
              onBack={() => setStep("form")}
            />
            <div style={{ padding: "0 16px" }}>
              {["AquaDrop Services", "ClearWater Co.", "PureFlow Delivery"].map(
                (store, i) => (
                  <div
                    key={store}
                    style={{
                      ...glassCard,
                      marginBottom: 12,
                      border: "1px solid rgba(0,255,170,0.2)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "12px",
                        color: "#00FFAA",
                        marginBottom: 4,
                      }}
                    >
                      {["Imran Malik", "Faisal Shah", "Khalid Mehmood"][i]}
                    </div>
                    <div
                      style={{
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "13px",
                        color: "rgba(224,255,255,0.6)",
                        marginBottom: 8,
                      }}
                    >
                      {store}
                    </div>
                    <div
                      style={{
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "13px",
                        color: "rgba(224,255,255,0.5)",
                        marginBottom: 4,
                      }}
                    >
                      Brand: {dwBrand} | Size: {dwSize} | Qty: {dwBottles}
                    </div>
                    <div
                      style={{
                        borderTop: "1px solid rgba(0,255,170,0.15)",
                        marginTop: 8,
                        paddingTop: 8,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "13px",
                          color: "rgba(224,255,255,0.5)",
                          marginBottom: 3,
                        }}
                      >
                        <span>
                          Price ({dwBottles} × PKR {pricePerBottle})
                        </span>
                        <span>PKR {dwSubtotal.toLocaleString()}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "13px",
                          color: "rgba(224,255,255,0.5)",
                          marginBottom: 3,
                        }}
                      >
                        <span>Delivery Charges</span>
                        <span>PKR {dwDelivery}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "13px",
                          color: "rgba(224,255,255,0.5)",
                          marginBottom: 3,
                        }}
                      >
                        <span>Service Charges</span>
                        <span>PKR {dwServiceCharge}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "13px",
                          color: "#00FFAA",
                          marginTop: 4,
                          marginBottom: 12,
                        }}
                      >
                        <span>GRAND TOTAL</span>
                        <span>PKR {total.toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onPayment(
                          total,
                          ["Imran Malik", "Faisal Shah", "Khalid Mehmood"][i],
                        )
                      }
                      style={{
                        ...primaryBtn,
                        background: "linear-gradient(135deg, #00FFAA, #00AAFF)",
                      }}
                      data-ocid={`house.water.select.${i}`}
                    >
                      SELECT PROVIDER →
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
        <SpaceBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScreenHeader title="DRINKING WATER" onBack={() => setSubCat("")} />
          <div style={{ padding: "0 16px" }}>
            <div style={{ ...glassCard, marginBottom: 16 }}>
              <div style={labelStyle}>Brand Name</div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap" as const,
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                {["Aquafina", "Nestle", "Local Brand"].map((b) => (
                  <Chip
                    key={b}
                    label={b}
                    selected={dwBrand === b}
                    onClick={() => setDwBrand(b)}
                    color="#00FFAA"
                  />
                ))}
              </div>
              <div style={labelStyle}>Bottle Size</div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap" as const,
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                {["500ml", "1L", "1.5L", "6L", "16L"].map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    selected={dwSize === s}
                    onClick={() => setDwSize(s)}
                    color="#00FFAA"
                  />
                ))}
              </div>
              <div style={labelStyle}>Total Bottles</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <button
                  type="button"
                  onClick={() => setDwBottles(Math.max(1, dwBottles - 1))}
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(0,255,170,0.1)",
                    border: "1px solid rgba(0,255,170,0.3)",
                    borderRadius: 8,
                    color: "#00FFAA",
                    cursor: "pointer",
                    fontSize: 20,
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "20px",
                    color: "#E0FFFF",
                    minWidth: 30,
                    textAlign: "center",
                  }}
                >
                  {dwBottles}
                </span>
                <button
                  type="button"
                  onClick={() => setDwBottles(dwBottles + 1)}
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(0,255,170,0.1)",
                    border: "1px solid rgba(0,255,170,0.3)",
                    borderRadius: 8,
                    color: "#00FFAA",
                    cursor: "pointer",
                    fontSize: 20,
                  }}
                >
                  +
                </button>
              </div>
              <div style={labelStyle}>Delivery Address</div>
              <input
                style={inputStyle}
                value={dwAddress}
                onChange={(e) => setDwAddress(e.target.value)}
                data-ocid="house.water.address"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (dwBrand && dwSize) setStep("provider");
              }}
              style={{
                ...primaryBtn,
                marginBottom: 20,
                opacity: dwBrand && dwSize ? 1 : 0.5,
              }}
              data-ocid="house.water.book"
            >
              FIND PROVIDERS →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (subCat === "Gas Cylinder") {
    if (step === "provider") {
      const sizeKg: Record<string, number> = {
        "1kg": 1,
        "2kg": 2,
        "3kg": 3,
        "4kg": 4,
        "5kg": 5,
        "10kg": 10,
      };
      const pricePerKg =
        gcGasType === "CNG" ? 120 : gcGasType === "LNG" ? 180 : 220;
      const cylinderKg = sizeKg[gcSize] || 5;
      const deliveryTotal = gcCylinders * 150;
      const gasTotal = cylinderKg * gcCylinders * pricePerKg;
      const gcServiceCharge = 50;
      const total = gasTotal + deliveryTotal + gcServiceCharge;
      return (
        <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
          <SpaceBackground />
          <div style={{ position: "relative", zIndex: 1 }}>
            <ScreenHeader
              title="SELECT PROVIDER"
              onBack={() => setStep("form")}
            />
            <div style={{ padding: "0 16px" }}>
              {["SafeGas Co.", "PakGas Delivery", "HomeGas Services"].map(
                (store, i) => (
                  <div
                    key={store}
                    style={{
                      ...glassCard,
                      marginBottom: 12,
                      border: "1px solid rgba(0,255,170,0.2)",
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "12px",
                        color: "#00FFAA",
                        marginBottom: 4,
                      }}
                    >
                      {["Asif Raza", "Junaid Baig", "Aamir Sohail"][i]}
                    </div>
                    <div
                      style={{
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "13px",
                        color: "rgba(224,255,255,0.6)",
                        marginBottom: 8,
                      }}
                    >
                      {store}
                    </div>
                    <div
                      style={{
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "13px",
                        color: "rgba(224,255,255,0.5)",
                        marginBottom: 4,
                      }}
                    >
                      Gas: {gcGasType} | Size: {gcSize} | Cylinders:{" "}
                      {gcCylinders}
                    </div>
                    <div
                      style={{
                        borderTop: "1px solid rgba(0,255,170,0.15)",
                        marginTop: 8,
                        paddingTop: 8,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "13px",
                          color: "rgba(224,255,255,0.5)",
                          marginBottom: 3,
                        }}
                      >
                        <span>
                          Gas Cost ({cylinderKg}kg × {gcCylinders} × PKR{" "}
                          {pricePerKg}/kg)
                        </span>
                        <span>PKR {gasTotal.toLocaleString()}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "13px",
                          color: "rgba(224,255,255,0.5)",
                          marginBottom: 3,
                        }}
                      >
                        <span>Delivery (PKR 150 × {gcCylinders})</span>
                        <span>PKR {deliveryTotal.toLocaleString()}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "13px",
                          color: "rgba(224,255,255,0.5)",
                          marginBottom: 3,
                        }}
                      >
                        <span>Service Charges</span>
                        <span>PKR {gcServiceCharge}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "13px",
                          color: "#00FFAA",
                          marginTop: 4,
                          marginBottom: 12,
                        }}
                      >
                        <span>GRAND TOTAL</span>
                        <span>PKR {total.toLocaleString()}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        onPayment(
                          total,
                          ["Asif Raza", "Junaid Baig", "Aamir Sohail"][i],
                        )
                      }
                      style={{
                        ...primaryBtn,
                        background: "linear-gradient(135deg, #00FFAA, #00AAFF)",
                      }}
                      data-ocid={`house.gas.select.${i}`}
                    >
                      SELECT PROVIDER →
                    </button>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      );
    }
    return (
      <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
        <SpaceBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScreenHeader title="GAS CYLINDER" onBack={() => setSubCat("")} />
          <div style={{ padding: "0 16px" }}>
            <div style={{ ...glassCard, marginBottom: 16 }}>
              <div style={labelStyle}>Gas Type</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
                {["LPG", "LNG", "CNG"].map((g) => (
                  <Chip
                    key={g}
                    label={g}
                    selected={gcGasType === g}
                    onClick={() => setGcGasType(g)}
                    color="#00FFAA"
                  />
                ))}
              </div>
              <div style={labelStyle}>Cylinder Size</div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap" as const,
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                {["1kg", "2kg", "3kg", "4kg", "5kg", "10kg"].map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    selected={gcSize === s}
                    onClick={() => setGcSize(s)}
                    color="#00FFAA"
                  />
                ))}
              </div>
              <div style={labelStyle}>Total Cylinders</div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <button
                  type="button"
                  onClick={() => setGcCylinders(Math.max(1, gcCylinders - 1))}
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(0,255,170,0.1)",
                    border: "1px solid rgba(0,255,170,0.3)",
                    borderRadius: 8,
                    color: "#00FFAA",
                    cursor: "pointer",
                    fontSize: 20,
                  }}
                >
                  -
                </button>
                <span
                  style={{
                    fontFamily: "Orbitron, sans-serif",
                    fontSize: "20px",
                    color: "#E0FFFF",
                    minWidth: 30,
                    textAlign: "center",
                  }}
                >
                  {gcCylinders}
                </span>
                <button
                  type="button"
                  onClick={() => setGcCylinders(gcCylinders + 1)}
                  style={{
                    width: 40,
                    height: 40,
                    background: "rgba(0,255,170,0.1)",
                    border: "1px solid rgba(0,255,170,0.3)",
                    borderRadius: 8,
                    color: "#00FFAA",
                    cursor: "pointer",
                    fontSize: 20,
                  }}
                >
                  +
                </button>
              </div>
              <div style={labelStyle}>Delivery Address</div>
              <input
                style={inputStyle}
                value={gcAddress}
                onChange={(e) => setGcAddress(e.target.value)}
                data-ocid="house.gas.address"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                if (gcGasType && gcSize) setStep("provider");
              }}
              style={{
                ...primaryBtn,
                marginBottom: 20,
                opacity: gcGasType && gcSize ? 1 : 0.5,
              }}
              data-ocid="house.gas.book"
            >
              FIND PROVIDERS →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SubCategoryPicker
      title="HOUSE"
      color="#00FFAA"
      items={[
        { name: "Drinking Water", icon: "💧", color: "#00FFAA" },
        { name: "Gas Cylinder", icon: "🔥", color: "#00FFAA" },
      ]}
      onSelect={(name) => {
        setSubCat(name as "Drinking Water" | "Gas Cylinder");
        setStep("form");
      }}
      onBack={onBack}
    />
  );
}

// ─── RentalsScreen ────────────────────────────────────────────────────────────

function RentalsScreen({
  onBack,
  onPayment,
}: {
  onBack: () => void;
  onPayment: (amount: number, providerName: string) => void;
}) {
  const [subScreen, setSubScreen] = useState<
    | "main"
    | "vehicles"
    | "property"
    | "passenger"
    | "commercial-vehicle"
    | "residential"
    | "commercial-property"
  >("main");
  const [step, setStep] = useState<"form" | "providers">("form");

  // Passenger state
  const [pDestination, setPDestination] = useState("");
  const [pPickup, setPPickup] = useState("📍 Current Location");
  const [pDate, setPDate] = useState("");
  const [pTime, setPTime] = useState("");
  const [pVehicleType, setPVehicleType] = useState("");
  const [pPassengers, setPPassengers] = useState(1);
  const [pComfort, setPComfort] = useState<"Comfort" | "Economy">("Economy");

  // Commercial Vehicle state
  const [cvArea, setCvArea] = useState("");
  const [cvLoading, setCvLoading] = useState("");
  const [cvUnloading, setCvUnloading] = useState("");
  const [cvLoad, setCvLoad] = useState("");
  const [cvVehicleType, setCvVehicleType] = useState("");
  const [cvDate, setCvDate] = useState("");
  const [cvTime, setCvTime] = useState("");

  // Residential state
  const [rArea, setRArea] = useState("");
  const [rPropType, setRPropType] = useState("");
  const [rRooms, setRRooms] = useState("");
  const [rDuration, setRDuration] = useState("");

  // Commercial Property state
  const [cpArea, setCpArea] = useState("");
  const [cpPropType, setCpPropType] = useState("");
  const [cpRooms, setCpRooms] = useState("");
  const [cpDuration, setCpDuration] = useState("");

  const renderProviders = (
    providers: {
      name: string;
      detail: string;
      amount: string;
      numericAmount: number;
    }[],
    onSelect: (name: string, amount: number) => void,
    headerTitle: string,
    backFn: () => void,
  ) => (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title={headerTitle} onBack={backFn} />
        <div style={{ padding: "0 16px" }}>
          {providers.map((p, i) => (
            <div
              key={p.name}
              style={{
                ...glassCard,
                marginBottom: 12,
                border: "1px solid rgba(255,215,0,0.2)",
              }}
            >
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "12px",
                  color: "#FFD700",
                  marginBottom: 4,
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "13px",
                  color: "rgba(224,255,255,0.6)",
                  marginBottom: 8,
                }}
              >
                {p.detail}
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "13px",
                  color: "#FFD700",
                  marginBottom: 12,
                }}
              >
                {p.amount}
              </div>
              <button
                type="button"
                onClick={() => onSelect(p.name, p.numericAmount)}
                style={{
                  ...primaryBtn,
                  background: "linear-gradient(135deg, #FFD700, #FF8C00)",
                  color: "#05070A",
                }}
                data-ocid={`rentals.select.${i}`}
              >
                BOOK SERVICE →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (subScreen === "passenger") {
    if (step === "providers") {
      const passengerFares: Record<string, number> = {
        Bike: 80,
        Rikshaw: 60,
        Car: 120,
        Van: 150,
      };
      const estKm = 5;
      const ratePerKm = passengerFares[pVehicleType] ?? 100;
      const baseFare = ratePerKm * estKm;
      const pFare = baseFare * pPassengers;
      const providers = [
        {
          name: "Bilal Ahmed",
          detail: `${pVehicleType} | ${pComfort} | 2.3 km away`,
          amount: `PKR ${pFare.toLocaleString()} (${pPassengers} pax)`,
          numericAmount: pFare,
        },
        {
          name: "Tariq Hassan",
          detail: `${pVehicleType} | ${pComfort} | 4.1 km away`,
          amount: `PKR ${pFare.toLocaleString()} (${pPassengers} pax)`,
          numericAmount: pFare,
        },
        {
          name: "Nadeem Iqbal",
          detail: `${pVehicleType} | ${pComfort} | 1.8 km away`,
          amount: `PKR ${pFare.toLocaleString()} (${pPassengers} pax)`,
          numericAmount: pFare,
        },
      ];
      return renderProviders(
        providers,
        (name, amount) => onPayment(amount, name),
        "NEARBY PROVIDERS",
        () => setStep("form"),
      );
    }
    return (
      <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
        <SpaceBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScreenHeader
            title="PASSENGER VEHICLE"
            onBack={() => {
              setSubScreen("vehicles");
              setStep("form");
            }}
          />
          <div style={{ padding: "0 16px" }}>
            <div
              style={{
                ...glassCard,
                marginBottom: 16,
                display: "flex",
                flexDirection: "column" as const,
                gap: 14,
              }}
            >
              <div>
                <div style={labelStyle}>Destination (GPS)</div>
                <input
                  style={inputStyle}
                  placeholder="Enter destination..."
                  value={pDestination}
                  onChange={(e) => setPDestination(e.target.value)}
                  data-ocid="passenger.destination"
                />
              </div>
              <div>
                <div style={labelStyle}>Pick-Up Location</div>
                <input
                  style={inputStyle}
                  value={pPickup}
                  onChange={(e) => setPPickup(e.target.value)}
                  data-ocid="passenger.pickup"
                />
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Date</div>
                  <input
                    style={inputStyle}
                    type="date"
                    value={pDate}
                    onChange={(e) => setPDate(e.target.value)}
                    data-ocid="passenger.date"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Time</div>
                  <input
                    style={inputStyle}
                    type="time"
                    value={pTime}
                    onChange={(e) => setPTime(e.target.value)}
                    data-ocid="passenger.time"
                  />
                </div>
              </div>
              <div>
                <div style={labelStyle}>Vehicle Type</div>
                <div
                  style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}
                >
                  {["Bike", "Rikshaw", "Car", "Van"].map((v) => (
                    <Chip
                      key={v}
                      label={v}
                      selected={pVehicleType === v}
                      onClick={() => setPVehicleType(v)}
                      color="#FFD700"
                    />
                  ))}
                </div>
              </div>
              <div>
                <div style={labelStyle}>Total Passengers</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <button
                    type="button"
                    onClick={() => setPPassengers(Math.max(1, pPassengers - 1))}
                    style={{
                      width: 40,
                      height: 40,
                      background: "rgba(255,215,0,0.1)",
                      border: "1px solid rgba(255,215,0,0.3)",
                      borderRadius: 8,
                      color: "#FFD700",
                      cursor: "pointer",
                      fontSize: 20,
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontSize: "20px",
                      color: "#E0FFFF",
                      minWidth: 30,
                      textAlign: "center",
                    }}
                  >
                    {pPassengers}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPPassengers(pPassengers + 1)}
                    style={{
                      width: 40,
                      height: 40,
                      background: "rgba(255,215,0,0.1)",
                      border: "1px solid rgba(255,215,0,0.3)",
                      borderRadius: 8,
                      color: "#FFD700",
                      cursor: "pointer",
                      fontSize: 20,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <div style={labelStyle}>Comfort Level</div>
                <div style={{ display: "flex", gap: 8 }}>
                  <Chip
                    label="Comfort (AC)"
                    selected={pComfort === "Comfort"}
                    onClick={() => setPComfort("Comfort")}
                    color="#FFD700"
                  />
                  <Chip
                    label="Economy (Non-AC)"
                    selected={pComfort === "Economy"}
                    onClick={() => setPComfort("Economy")}
                    color="#FFD700"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (pDestination && pVehicleType) setStep("providers");
              }}
              style={{
                ...primaryBtn,
                background: "linear-gradient(135deg, #FFD700, #FF8C00)",
                color: "#05070A",
                marginBottom: 20,
                opacity: pDestination && pVehicleType ? 1 : 0.5,
              }}
              data-ocid="passenger.find"
            >
              FIND PROVIDERS →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (subScreen === "commercial-vehicle") {
    if (step === "providers") {
      const cvBaseFare = 10 * 150; // 10km × PKR 150 = PKR 1,500
      const cvSurcharge = 200; // loading/unloading surcharge
      const cvTotal = cvBaseFare + cvSurcharge;
      const providers = [
        {
          name: "Ghulam Transport",
          detail: `${cvVehicleType} | Cargo Services | Base: PKR ${cvBaseFare} + Surcharge PKR ${cvSurcharge}`,
          amount: `PKR ${cvTotal.toLocaleString()}`,
          numericAmount: cvTotal,
        },
        {
          name: "Allied Cargo",
          detail: `${cvVehicleType} | Heavy Load | Base: PKR ${cvBaseFare} + Surcharge PKR ${cvSurcharge}`,
          amount: `PKR ${cvTotal.toLocaleString()}`,
          numericAmount: cvTotal,
        },
        {
          name: "National Movers",
          detail: `${cvVehicleType} | Logistics | Base: PKR ${cvBaseFare} + Surcharge PKR ${cvSurcharge}`,
          amount: `PKR ${cvTotal.toLocaleString()}`,
          numericAmount: cvTotal,
        },
      ];
      return renderProviders(
        providers,
        (name, amount) => onPayment(amount, name),
        "SERVICE PROVIDERS",
        () => setStep("form"),
      );
    }
    return (
      <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
        <SpaceBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScreenHeader
            title="COMMERCIAL VEHICLE"
            onBack={() => {
              setSubScreen("vehicles");
              setStep("form");
            }}
          />
          <div style={{ padding: "0 16px" }}>
            <div
              style={{
                ...glassCard,
                marginBottom: 16,
                display: "flex",
                flexDirection: "column" as const,
                gap: 14,
              }}
            >
              <div>
                <div style={labelStyle}>Area</div>
                <input
                  style={inputStyle}
                  placeholder="Your area..."
                  value={cvArea}
                  onChange={(e) => setCvArea(e.target.value)}
                  data-ocid="cv.area"
                />
              </div>
              <div>
                <div style={labelStyle}>Loading Point</div>
                <input
                  style={inputStyle}
                  placeholder="Pick-up address..."
                  value={cvLoading}
                  onChange={(e) => setCvLoading(e.target.value)}
                  data-ocid="cv.loading"
                />
              </div>
              <div>
                <div style={labelStyle}>Un-Loading Point</div>
                <input
                  style={inputStyle}
                  placeholder="Drop-off address..."
                  value={cvUnloading}
                  onChange={(e) => setCvUnloading(e.target.value)}
                  data-ocid="cv.unloading"
                />
              </div>
              <div>
                <div style={labelStyle}>Type of Load</div>
                <input
                  style={inputStyle}
                  placeholder="e.g. Furniture, Electronics..."
                  value={cvLoad}
                  onChange={(e) => setCvLoad(e.target.value)}
                  data-ocid="cv.load"
                />
              </div>
              <div>
                <div style={labelStyle}>Type of Vehicle</div>
                <div
                  style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}
                >
                  {["Mazsah", "Loader", "Truck", "Trolley", "Pickup"].map(
                    (v) => (
                      <Chip
                        key={v}
                        label={v}
                        selected={cvVehicleType === v}
                        onClick={() => setCvVehicleType(v)}
                        color="#FFD700"
                      />
                    ),
                  )}
                </div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Date</div>
                  <input
                    style={inputStyle}
                    type="date"
                    value={cvDate}
                    onChange={(e) => setCvDate(e.target.value)}
                    data-ocid="cv.date"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={labelStyle}>Time</div>
                  <input
                    style={inputStyle}
                    type="time"
                    value={cvTime}
                    onChange={(e) => setCvTime(e.target.value)}
                    data-ocid="cv.time"
                  />
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (cvLoading && cvVehicleType) setStep("providers");
              }}
              style={{
                ...primaryBtn,
                background: "linear-gradient(135deg, #FFD700, #FF8C00)",
                color: "#05070A",
                marginBottom: 20,
                opacity: cvLoading && cvVehicleType ? 1 : 0.5,
              }}
              data-ocid="cv.book"
            >
              BOOK SERVICE →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (subScreen === "residential") {
    if (step === "providers") {
      const resPropRates: Record<string, number> = {
        Flat: 20000,
        House: 35000,
        "Guest House": 15000,
        Hostel: 8000,
      };
      const resMonthly = resPropRates[rPropType] ?? 20000;
      const resAdvance = resMonthly * 2; // 2 months advance
      const resTotalDue = resMonthly + resAdvance;
      const providers = [
        {
          name: "Sana Properties",
          detail: `${rPropType} | ${rArea} | Monthly: PKR ${resMonthly.toLocaleString()} + Advance (2mo): PKR ${resAdvance.toLocaleString()}`,
          amount: `Total Due: PKR ${resTotalDue.toLocaleString()}`,
          numericAmount: resTotalDue,
        },
        {
          name: "Green Homes",
          detail: `${rPropType} | ${rArea} | Monthly: PKR ${resMonthly.toLocaleString()} + Advance (2mo): PKR ${resAdvance.toLocaleString()}`,
          amount: `Total Due: PKR ${resTotalDue.toLocaleString()}`,
          numericAmount: resTotalDue,
        },
        {
          name: "Capital Estates",
          detail: `${rPropType} | ${rArea} | Monthly: PKR ${resMonthly.toLocaleString()} + Advance (2mo): PKR ${resAdvance.toLocaleString()}`,
          amount: `Total Due: PKR ${resTotalDue.toLocaleString()}`,
          numericAmount: resTotalDue,
        },
      ];
      return renderProviders(
        providers,
        (name, amount) => onPayment(amount, name),
        "AVAILABLE PROPERTIES",
        () => setStep("form"),
      );
    }
    return (
      <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
        <SpaceBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScreenHeader
            title="RESIDENTIAL"
            onBack={() => {
              setSubScreen("property");
              setStep("form");
            }}
          />
          <div style={{ padding: "0 16px" }}>
            <div
              style={{
                ...glassCard,
                marginBottom: 16,
                display: "flex",
                flexDirection: "column" as const,
                gap: 14,
              }}
            >
              <div>
                <div style={labelStyle}>Area</div>
                <input
                  style={inputStyle}
                  placeholder="City / Area..."
                  value={rArea}
                  onChange={(e) => setRArea(e.target.value)}
                  data-ocid="res.area"
                />
              </div>
              <div>
                <div style={labelStyle}>Type of Property</div>
                <div
                  style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}
                >
                  {["Flat", "House", "Guest House", "Hostel"].map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      selected={rPropType === t}
                      onClick={() => setRPropType(t)}
                      color="#FFD700"
                    />
                  ))}
                </div>
              </div>
              <div>
                <div style={labelStyle}>Total Rooms</div>
                <input
                  style={inputStyle}
                  type="number"
                  placeholder="Number of rooms..."
                  value={rRooms}
                  onChange={(e) => setRRooms(e.target.value)}
                  data-ocid="res.rooms"
                />
              </div>
              <div>
                <div style={labelStyle}>Duration (Months)</div>
                <select
                  style={{ ...inputStyle, appearance: "none" as const }}
                  value={rDuration}
                  onChange={(e) => setRDuration(e.target.value)}
                  data-ocid="res.duration"
                >
                  <option value="">Select duration...</option>
                  {[1, 2, 3, 6, 12, 24].map((m) => (
                    <option key={m} value={`${m}`}>
                      {m} Month{m > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (rArea && rPropType) setStep("providers");
              }}
              style={{
                ...primaryBtn,
                background: "linear-gradient(135deg, #FFD700, #FF8C00)",
                color: "#05070A",
                marginBottom: 20,
                opacity: rArea && rPropType ? 1 : 0.5,
              }}
              data-ocid="res.book"
            >
              BOOK SERVICE →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (subScreen === "commercial-property") {
    if (step === "providers") {
      const cpPropRates: Record<string, number> = {
        Office: 50000,
        School: 80000,
        Showroom: 60000,
        Warehouse: 45000,
        "Coaching Centre": 35000,
        Shop: 30000,
      };
      const cpMonthly = cpPropRates[cpPropType] ?? 50000;
      const cpAdvance = cpMonthly * 3; // 3 months advance
      const cpTotalDue = cpMonthly + cpAdvance;
      const providers = [
        {
          name: "Prime Business Hub",
          detail: `${cpPropType} | ${cpArea} | Monthly: PKR ${cpMonthly.toLocaleString()} + Advance (3mo): PKR ${cpAdvance.toLocaleString()}`,
          amount: `Total Due: PKR ${cpTotalDue.toLocaleString()}`,
          numericAmount: cpTotalDue,
        },
        {
          name: "City Commerce Park",
          detail: `${cpPropType} | ${cpArea} | Monthly: PKR ${cpMonthly.toLocaleString()} + Advance (3mo): PKR ${cpAdvance.toLocaleString()}`,
          amount: `Total Due: PKR ${cpTotalDue.toLocaleString()}`,
          numericAmount: cpTotalDue,
        },
        {
          name: "Trade Center Spaces",
          detail: `${cpPropType} | ${cpArea} | Monthly: PKR ${cpMonthly.toLocaleString()} + Advance (3mo): PKR ${cpAdvance.toLocaleString()}`,
          amount: `Total Due: PKR ${cpTotalDue.toLocaleString()}`,
          numericAmount: cpTotalDue,
        },
      ];
      return renderProviders(
        providers,
        (name, amount) => onPayment(amount, name),
        "AVAILABLE PROPERTIES",
        () => setStep("form"),
      );
    }
    return (
      <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
        <SpaceBackground />
        <div style={{ position: "relative", zIndex: 1 }}>
          <ScreenHeader
            title="COMMERCIAL PROPERTY"
            onBack={() => {
              setSubScreen("property");
              setStep("form");
            }}
          />
          <div style={{ padding: "0 16px" }}>
            <div
              style={{
                ...glassCard,
                marginBottom: 16,
                display: "flex",
                flexDirection: "column" as const,
                gap: 14,
              }}
            >
              <div>
                <div style={labelStyle}>Area</div>
                <input
                  style={inputStyle}
                  placeholder="City / Area..."
                  value={cpArea}
                  onChange={(e) => setCpArea(e.target.value)}
                  data-ocid="cp.area"
                />
              </div>
              <div>
                <div style={labelStyle}>Type of Property</div>
                <div
                  style={{ display: "flex", flexWrap: "wrap" as const, gap: 8 }}
                >
                  {[
                    "Office",
                    "School",
                    "Showroom",
                    "Warehouse",
                    "Coaching Centre",
                    "Shop",
                  ].map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      selected={cpPropType === t}
                      onClick={() => setCpPropType(t)}
                      color="#FFD700"
                    />
                  ))}
                </div>
              </div>
              <div>
                <div style={labelStyle}>Total Rooms</div>
                <input
                  style={inputStyle}
                  type="number"
                  placeholder="Number of rooms..."
                  value={cpRooms}
                  onChange={(e) => setCpRooms(e.target.value)}
                  data-ocid="cp.rooms"
                />
              </div>
              <div>
                <div style={labelStyle}>Duration (Months)</div>
                <select
                  style={{ ...inputStyle, appearance: "none" as const }}
                  value={cpDuration}
                  onChange={(e) => setCpDuration(e.target.value)}
                  data-ocid="cp.duration"
                >
                  <option value="">Select duration...</option>
                  {[1, 3, 6, 12, 24, 36].map((m) => (
                    <option key={m} value={`${m}`}>
                      {m} Month{m > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (cpArea && cpPropType) setStep("providers");
              }}
              style={{
                ...primaryBtn,
                background: "linear-gradient(135deg, #FFD700, #FF8C00)",
                color: "#05070A",
                marginBottom: 20,
                opacity: cpArea && cpPropType ? 1 : 0.5,
              }}
              data-ocid="cp.book"
            >
              BOOK SERVICE →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (subScreen === "vehicles") {
    return (
      <SubCategoryPicker
        title="VEHICLES"
        color="#FFD700"
        items={[
          { name: "Passenger", icon: "🚗", color: "#FFD700" },
          { name: "Commercial", icon: "🚛", color: "#FFD700" },
        ]}
        onSelect={(name) => {
          setSubScreen(
            name === "Passenger" ? "passenger" : "commercial-vehicle",
          );
          setStep("form");
        }}
        onBack={() => setSubScreen("main")}
      />
    );
  }

  if (subScreen === "property") {
    return (
      <SubCategoryPicker
        title="PROPERTY"
        color="#FFD700"
        items={[
          { name: "Residential", icon: "🏡", color: "#FFD700" },
          { name: "Commercial", icon: "🏢", color: "#FFD700" },
        ]}
        onSelect={(name) => {
          setSubScreen(
            name === "Residential" ? "residential" : "commercial-property",
          );
          setStep("form");
        }}
        onBack={() => setSubScreen("main")}
      />
    );
  }

  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <ScreenHeader title="RENTALS" onBack={onBack} />
        <div
          style={{
            padding: "0 16px",
            display: "flex",
            flexDirection: "column" as const,
            gap: 16,
          }}
        >
          <button
            type="button"
            onClick={() => setSubScreen("vehicles")}
            style={
              {
                ...glassCard,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 16,
                border: "1px solid rgba(255,215,0,0.3)",
                textAlign: "left",
              } as React.CSSProperties
            }
          >
            <span style={{ fontSize: 36 }}>🚗</span>
            <div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "13px",
                  color: "#FFD700",
                  marginBottom: 4,
                }}
              >
                VEHICLES
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "13px",
                  color: "rgba(224,255,255,0.5)",
                }}
              >
                Passenger & Commercial vehicles
              </div>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setSubScreen("property")}
            style={
              {
                ...glassCard,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 16,
                border: "1px solid rgba(255,215,0,0.3)",
                textAlign: "left",
              } as React.CSSProperties
            }
          >
            <span style={{ fontSize: 36 }}>🏢</span>
            <div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "13px",
                  color: "#FFD700",
                  marginBottom: 4,
                }}
              >
                PROPERTY
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "13px",
                  color: "rgba(224,255,255,0.5)",
                }}
              >
                Residential & Commercial properties
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PortalApp ────────────────────────────────────────────────────────────────

export default function PortalApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userBalance] = useState(5000);
  const [userName, setUserName] = useState("");
  const [userPortalId, setUserPortalId] = useState("");
  const [isProvider, setIsProvider] = useState(false);
  const [activeNav, setActiveNav] = useState<NavTab>("home");
  const [serviceChargesCollected, setServiceChargesCollected] = useState(0);

  // Payment context
  const [paymentService, setPaymentService] = useState("Service Payment");
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentProviderName, setPaymentProviderName] =
    useState("Portal Provider");

  const isLoggedIn = !!userPortalId;

  const showNav =
    isLoggedIn &&
    ["home", "category", "profile", "settings", "chat", "tasks"].includes(
      screen,
    );

  const handleLogin = (name: string, portalId: string) => {
    setUserName(name);
    setUserPortalId(portalId);
    setScreen("home");
    setActiveNav("home");
  };

  const handleRegisterDone = (user: User) => {
    setUserName(user.name);
    setUserPortalId(user.portalId);
    setIsProvider(user.isProvider);
    setScreen("home");
    setActiveNav("home");
  };

  const handleNav = (tab: NavTab) => {
    setActiveNav(tab);
    if (tab === "home") setScreen("home");
    else if (tab === "tasks") setScreen("tasks");
    else if (tab === "chat") setScreen("chat");
    else if (tab === "profile") setScreen("profile");
  };

  const handleCategory = (name: string) => {
    setSelectedCategory(name);
    setScreen("category");
  };

  const handlePayment = (
    service: string,
    amount: number,
    providerName = "Portal Provider",
  ) => {
    setPaymentService(service);
    setPaymentAmount(amount);
    setPaymentProviderName(providerName);
    setScreen("payment");
  };

  const handleLogout = () => {
    setUserName("");
    setUserPortalId("");
    setIsProvider(false);
    setScreen("login");
  };

  // ── Render ────────────────────────────────────────────────────────────────

  if (screen === "splash") {
    return <SplashScreen onDone={() => setScreen("onboarding")} />;
  }

  if (screen === "onboarding") {
    return <OnboardingScreen onDone={() => setScreen("login")} />;
  }

  if (screen === "login") {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onRegister={() => setScreen("register")}
        onAdmin={() => setScreen("admin-login")}
      />
    );
  }

  if (screen === "register") {
    return (
      <RegisterScreen
        onCustomer={() => setScreen("customer-register")}
        onProvider={() => setScreen("provider-register")}
        onBack={() => setScreen("login")}
      />
    );
  }

  if (screen === "customer-register") {
    return (
      <CustomerRegisterScreen
        onDone={handleRegisterDone}
        onBack={() => setScreen("register")}
      />
    );
  }

  if (screen === "provider-register") {
    return (
      <ProviderRegisterScreen
        onDone={handleRegisterDone}
        onBack={() => setScreen("register")}
      />
    );
  }

  if (screen === "admin-login") {
    return (
      <AdminLoginScreen
        onLogin={() => setScreen("admin-dashboard")}
        onBack={() => setScreen("login")}
      />
    );
  }

  if (screen === "admin-dashboard") {
    return (
      <AdminDashboardScreen
        onBack={() => setScreen("login")}
        serviceChargesCollected={serviceChargesCollected}
      />
    );
  }

  if (screen === "payment") {
    return (
      <PaymentPlanScreen
        serviceName={paymentService}
        amount={paymentAmount > 0 ? paymentAmount : 500}
        onOtp={() => setScreen("otp")}
        onBack={() => setScreen(isLoggedIn ? "home" : "login")}
      />
    );
  }

  if (screen === "otp") {
    return (
      <OtpScreen
        onVerify={() => {
          // Silently collect service charges (PKR 50 per transaction)
          setServiceChargesCollected((prev) => prev + 50);
          setScreen("invoice");
        }}
        onBack={() => setScreen("payment")}
      />
    );
  }

  if (screen === "invoice") {
    return (
      <InvoiceScreen
        serviceName={paymentService}
        providerName={paymentProviderName}
        amount={paymentAmount > 0 ? paymentAmount : 500}
        onDone={() => setScreen("success")}
      />
    );
  }

  if (screen === "success") {
    return (
      <SuccessScreen
        message="Your payment has been processed successfully. Receipt shared with provider."
        onDone={() => {
          setScreen("home");
          setActiveNav("home");
        }}
      />
    );
  }

  if (screen === "userDashboard") {
    return (
      <UserDashboardScreen
        userName={userName}
        userPortalId={userPortalId}
        userBalance={userBalance}
        onBack={() => setScreen("home")}
        onTopUp={() => setScreen("payment")}
      />
    );
  }

  if (screen === "providerDashboard") {
    return (
      <ProviderDashboardScreen
        userName={userName}
        userPortalId={userPortalId}
        userBalance={userBalance}
        onBack={() => setScreen("home")}
        onTopUp={() => setScreen("payment")}
      />
    );
  }

  if (screen === "lowBalanceAlert") {
    return (
      <LowBalanceAlertScreen
        userBalance={userBalance}
        onTopUp={() => setScreen("payment")}
        onBack={() => setScreen("home")}
      />
    );
  }

  // ── Authenticated screens (with BottomNav) ─────────────────────────────────

  if (screen === "edit-profile") {
    return <EditProfileScreen onBack={() => setScreen("settings")} />;
  }
  if (screen === "payment-method") {
    return <PaymentMethodScreen onBack={() => setScreen("settings")} />;
  }
  if (screen === "transaction-history") {
    return <TransactionHistoryScreen onBack={() => setScreen("settings")} />;
  }
  if (screen === "help-support") {
    return <HelpSupportScreen onBack={() => setScreen("settings")} />;
  }
  if (screen === "privacy") {
    return <PrivacyPolicyScreen onBack={() => setScreen("settings")} />;
  }
  if (screen === "tasks") {
    return (
      <>
        <TasksScreen onBack={() => setScreen("home")} />
        {showNav && <BottomNav active={activeNav} onTab={handleNav} />}
      </>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      {screen === "home" && (
        <HomeScreen
          userName={userName}
          userPortalId={userPortalId}
          userBalance={userBalance}
          onCategory={handleCategory}
          onDashboard={() =>
            setScreen(isProvider ? "providerDashboard" : "userDashboard")
          }
          isProvider={isProvider}
        />
      )}
      {screen === "category" && selectedCategory === "General Store" && (
        <GeneralStoreScreen
          onBack={() => setScreen("home")}
          onPayment={(amount, providerName) =>
            handlePayment("General Store", amount, providerName)
          }
        />
      )}
      {screen === "category" && selectedCategory === "Health" && (
        <HealthScreen
          onBack={() => setScreen("home")}
          onPayment={(amount, providerName) =>
            handlePayment("Medical Store", amount, providerName)
          }
        />
      )}
      {screen === "category" && selectedCategory === "House" && (
        <HouseScreen
          onBack={() => setScreen("home")}
          onPayment={(amount, providerName) =>
            handlePayment("House Service", amount, providerName)
          }
        />
      )}
      {screen === "category" && selectedCategory === "Rentals" && (
        <RentalsScreen
          onBack={() => setScreen("home")}
          onPayment={(amount, providerName) =>
            handlePayment("Rental Service", amount, providerName)
          }
        />
      )}
      {screen === "category" && selectedCategory === "Workforce" && (
        <WorkforceScreen
          onBack={() => setScreen("home")}
          onPayment={(amount, providerName) =>
            handlePayment("Workforce Service", amount, providerName)
          }
        />
      )}
      {screen === "category" && selectedCategory === "Stationary" && (
        <StationaryScreen
          onBack={() => setScreen("home")}
          onPayment={(amount, providerName) =>
            handlePayment("Stationary", amount, providerName)
          }
        />
      )}
      {screen === "category" && selectedCategory === "Travel" && (
        <TravelScreen
          onBack={() => setScreen("home")}
          onPayment={(amount, providerName) =>
            handlePayment("Travel Service", amount, providerName)
          }
        />
      )}
      {screen === "category" &&
        ![
          "General Store",
          "Health",
          "House",
          "Rentals",
          "Workforce",
          "Stationary",
          "Travel",
        ].includes(selectedCategory) && (
          <CategoryScreen
            category={selectedCategory}
            onBack={() => setScreen("home")}
            onPayment={() => handlePayment(selectedCategory, 1000)}
          />
        )}
      {screen === "profile" && (
        <ProfileScreen
          userName={userName}
          userPortalId={userPortalId}
          userBalance={userBalance}
          isProvider={isProvider}
          onTopUp={() => setScreen("payment")}
          onEditProfile={() => setScreen("edit-profile")}
          onTransactions={() => setScreen("transaction-history")}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "settings" && (
        <SettingsScreen
          onBack={() => setScreen("profile")}
          onEditProfile={() => setScreen("edit-profile")}
          onPaymentMethod={() => setScreen("payment-method")}
          onTransactionHistory={() => setScreen("transaction-history")}
          onHelpSupport={() => setScreen("help-support")}
          onPrivacy={() => setScreen("privacy")}
          onLogout={handleLogout}
        />
      )}
      {screen === "chat" && <ChatScreen onBack={() => setScreen("home")} />}
      {showNav && <BottomNav active={activeNav} onTab={handleNav} />}
    </div>
  );
}
