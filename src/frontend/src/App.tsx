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
  | "admin-dashboard";

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
  { name: "Transport", icon: "🚌", color: "#3498DB" },
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
    desc: "Discover verified providers for Home, Health, Transport, and more — all in one place.",
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
        <div style={{ textAlign: "center", marginBottom: 36 }}>
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
}: {
  userName: string;
  userPortalId: string;
  userBalance: number;
  onCategory: (name: string) => void;
}) {
  return (
    <div style={{ ...pageStyle, position: "relative", overflow: "hidden" }}>
      <SpaceBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Header */}
        <div
          style={{
            padding: "20px 20px 16px",
            borderBottom: "1px solid rgba(0,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
                fontSize: "16px",
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
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const refsArr = useRef<(HTMLInputElement | null)[]>([
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

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
    if (val && i < 5) refsArr.current[i + 1]?.focus();
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
            Enter 6-Digit Code
          </h3>
          <p
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "14px",
              color: "rgba(224,255,255,0.5)",
              marginBottom: 28,
            }}
          >
            Code sent to your registered number
          </p>

          <div
            style={{
              display: "flex",
              gap: 8,
              justifyContent: "center",
              marginBottom: 24,
            }}
          >
            {([0, 1, 2, 3, 4, 5] as const).map((i) => (
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
          <button
            type="button"
            onClick={onLogin}
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

function AdminDashboardScreen({ onBack }: { onBack: () => void }) {
  const [tab, setTab] = useState<
    "overview" | "users" | "providers" | "security"
  >("overview");

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
            {(["overview", "users", "providers", "security"] as const).map(
              (t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: "8px 14px",
                    background:
                      tab === t ? "rgba(0,255,255,0.1)" : "transparent",
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
              ),
            )}
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
        </div>
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

// ─── PortalApp ────────────────────────────────────────────────────────────────

export default function PortalApp() {
  const [screen, setScreen] = useState<Screen>("splash");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [userBalance] = useState(5000);
  const [userName, setUserName] = useState("");
  const [userPortalId, setUserPortalId] = useState("");
  const [isProvider, setIsProvider] = useState(false);
  const [activeNav, setActiveNav] = useState<NavTab>("home");

  // Payment context (minimal)
  const [paymentService, setPaymentService] = useState("Service Payment");
  const [paymentAmount, setPaymentAmount] = useState(0);

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

  const handlePayment = (service: string, amount: number) => {
    setPaymentService(service);
    setPaymentAmount(amount);
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
    return <AdminDashboardScreen onBack={() => setScreen("login")} />;
  }

  if (screen === "payment") {
    return (
      <PaymentPlanScreen
        serviceName={paymentService}
        amount={paymentAmount || 500}
        onOtp={() => setScreen("otp")}
        onBack={() => setScreen(isLoggedIn ? "home" : "login")}
      />
    );
  }

  if (screen === "otp") {
    return (
      <OtpScreen
        onVerify={() => setScreen("invoice")}
        onBack={() => setScreen("payment")}
      />
    );
  }

  if (screen === "invoice") {
    return (
      <InvoiceScreen
        serviceName={paymentService}
        providerName="Portal Provider"
        amount={paymentAmount || 500}
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
        />
      )}
      {screen === "category" && (
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
