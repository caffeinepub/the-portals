import { useRef, useState } from "react";
import { PortalLogo } from "../components/PortalLogo";
import { useActor } from "../hooks/useActor";

const CATEGORIES = [
  "Cleaning",
  "Plumbing",
  "Electrical",
  "Landscaping",
  "Carpentry",
  "Painting",
  "HVAC",
  "Moving",
];

const PULSE_RINGS = ["pulse-ring", "pulse-ring-2", "pulse-ring-3"];

interface GatewayScreenProps {
  onComplete: (taskId: bigint) => void;
}

export function GatewayScreen({ onComplete }: GatewayScreenProps) {
  const { actor } = useActor();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [synced, setSynced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleGpsSync() {
    setSynced(false);
    setTimeout(() => setSynced(true), 1200);
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(() => setSynced(false), 4000);
  }

  async function handleActivate() {
    if (!name.trim() || !category) {
      setError("Please fill in all fields.");
      return;
    }
    if (!actor) return;
    setLoading(true);
    setError("");
    try {
      await actor.registerProvider(name.trim(), category);
      const taskId = await actor.createTask(name.trim(), category);
      onComplete(taskId);
    } catch {
      setError("Failed to activate portal. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "24px 16px 32px", overflowY: "auto" }}>
      <PortalLogo />

      <h1
        style={{
          textAlign: "center",
          color: "#F0F0F0",
          fontSize: "0.9rem",
          letterSpacing: "0.18em",
          marginTop: 20,
          marginBottom: 32,
          textShadow: "0 0 12px rgba(0,255,255,0.4)",
        }}
      >
        THE GATEWAY ONBOARDING
      </h1>

      <div className="glass" style={{ padding: "28px 22px", marginBottom: 24 }}>
        {/* Full Name */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="reg-name"
            style={{
              display: "block",
              color: "#B0FFFF",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              marginBottom: 8,
            }}
          >
            FULL NAME
          </label>
          <input
            id="reg-name"
            data-ocid="registration.input"
            className="portal-input"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Service Category */}
        <div style={{ marginBottom: 28 }}>
          <label
            htmlFor="reg-category"
            style={{
              display: "block",
              color: "#B0FFFF",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              marginBottom: 8,
            }}
          >
            SERVICE CATEGORY
          </label>
          <select
            id="reg-category"
            data-ocid="registration.select"
            className="portal-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled>
              Select a category
            </option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* GPS Sync */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 28,
            gap: 10,
          }}
        >
          <div style={{ position: "relative", width: 80, height: 80 }}>
            {PULSE_RINGS.map((cls) => (
              <div
                key={cls}
                className={cls}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: "1.5px solid rgba(0,255,255,0.5)",
                  pointerEvents: "none",
                }}
              />
            ))}
            <button
              type="button"
              data-ocid="registration.button"
              onClick={handleGpsSync}
              style={{
                position: "relative",
                zIndex: 2,
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(0,255,255,0.08)",
                border: "1.5px solid #00FFFF",
                boxShadow: "0 0 12px #00FFFF, 0 0 24px rgba(0,255,255,0.3)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label="Sync GPS location"
            >
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                aria-hidden="true"
              >
                <circle
                  cx="21"
                  cy="21"
                  r="18"
                  stroke="#00FFFF"
                  strokeWidth="1"
                  strokeOpacity="0.4"
                />
                <circle
                  cx="21"
                  cy="21"
                  r="12"
                  stroke="#00FFFF"
                  strokeWidth="1"
                  strokeOpacity="0.5"
                />
                <circle
                  cx="21"
                  cy="21"
                  r="6"
                  stroke="#00FFFF"
                  strokeWidth="1"
                  strokeOpacity="0.7"
                />
                <circle cx="21" cy="21" r="2" fill="#00FFFF" />
                <line
                  x1="21"
                  y1="3"
                  x2="21"
                  y2="9"
                  stroke="#00FFFF"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <line
                  x1="21"
                  y1="33"
                  x2="21"
                  y2="39"
                  stroke="#00FFFF"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <line
                  x1="3"
                  y1="21"
                  x2="9"
                  y2="21"
                  stroke="#00FFFF"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <line
                  x1="33"
                  y1="21"
                  x2="39"
                  y2="21"
                  stroke="#00FFFF"
                  strokeWidth="1.2"
                  strokeOpacity="0.6"
                />
                <line
                  className="radar-sweep"
                  x1="21"
                  y1="21"
                  x2="21"
                  y2="4"
                  stroke="#00FFFF"
                  strokeWidth="1.5"
                  strokeOpacity="0.9"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <span
            style={{
              color: "#B0FFFF",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            SYNC LOCATION
          </span>
          {synced && (
            <div
              data-ocid="registration.success_state"
              style={{
                color: "#50FFB0",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textShadow: "0 0 8px rgba(80,255,176,0.6)",
                animation: "checkmark-appear 0.4s ease forwards",
              }}
            >
              ✓ LOCATION SYNCED
            </div>
          )}
        </div>

        {error && (
          <div
            style={{
              color: "#FF6B5B",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}

        <button
          type="button"
          data-ocid="registration.submit_button"
          className="btn-portal"
          onClick={handleActivate}
          disabled={loading}
        >
          {loading ? "ACTIVATING..." : "ACTIVATE MY PORTAL"}
        </button>
      </div>
    </div>
  );
}
