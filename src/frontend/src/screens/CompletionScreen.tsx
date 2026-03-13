import { useState } from "react";
import { PortalLogo } from "../components/PortalLogo";
import { useActor } from "../hooks/useActor";

interface CompletionScreenProps {
  taskId: bigint | null;
  onClose: () => void;
}

export function CompletionScreen({ taskId, onClose }: CompletionScreenProps) {
  const { actor } = useActor();
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);

  async function handleRate(stars: number) {
    setRating(stars);
    if (actor && taskId !== null) {
      try {
        await actor.rateTask(taskId, BigInt(stars));
      } catch {
        // fail silently for rating
      }
    }
  }

  const displayRating = hovered || rating;

  return (
    <div style={{ padding: "24px 16px 32px" }}>
      <PortalLogo emerald />

      {/* Holographic checkmark */}
      <div
        data-ocid="completion.success_state"
        className="checkmark-anim"
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "20px 0 12px",
        }}
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 72 72"
          fill="none"
          aria-hidden="true"
          style={{
            filter:
              "drop-shadow(0 0 8px #50FFB0) drop-shadow(0 0 24px rgba(80,255,176,0.5))",
          }}
        >
          <circle
            cx="36"
            cy="36"
            r="34"
            stroke="#50FFB0"
            strokeWidth="1.5"
            fill="rgba(80,255,176,0.06)"
          />
          <circle
            cx="36"
            cy="36"
            r="26"
            stroke="#50FFB0"
            strokeWidth="1"
            strokeOpacity="0.4"
            fill="none"
          />
          <path
            d="M20 36 L31 47 L52 25"
            stroke="#50FFB0"
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <h1
        style={{
          textAlign: "center",
          color: "#50FFB0",
          fontSize: "1rem",
          letterSpacing: "0.16em",
          marginBottom: 28,
          textShadow:
            "0 0 12px rgba(80,255,176,0.7), 0 0 30px rgba(80,255,176,0.3)",
        }}
      >
        HANDSHAKE VERIFIED
      </h1>

      {/* Financial Summary */}
      <div
        data-ocid="completion.panel"
        className="glass"
        style={{
          padding: "20px 24px",
          marginBottom: 24,
          textAlign: "center",
          borderColor: "rgba(80,255,176,0.6)",
          boxShadow: "0 0 3px #50FFB0, 0 0 8px rgba(80,255,176,0.5)",
        }}
      >
        <div
          style={{
            color: "#F0F0F0",
            fontSize: "1.3rem",
            fontWeight: 700,
            letterSpacing: "0.1em",
            marginBottom: 6,
          }}
        >
          TOTAL: $60.00
        </div>
        <div
          style={{
            color: "#B0FFFF",
            fontSize: "0.65rem",
            letterSpacing: "0.15em",
          }}
        >
          (PROVIDER PAID)
        </div>
      </div>

      {/* Star Rating */}
      <div
        className="glass"
        style={{ padding: "20px", marginBottom: 24, textAlign: "center" }}
      >
        <div
          style={{
            color: "#B0FFFF",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            marginBottom: 14,
          }}
        >
          RATE YOUR PROVIDER
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          {[1, 2, 3, 4, 5].map((star) => {
            const active = displayRating >= star;
            return (
              <button
                key={star}
                type="button"
                data-ocid={`completion.toggle.${star}`}
                className="star-btn"
                onClick={() => handleRate(star)}
                onMouseEnter={() => setHovered(star)}
                onMouseLeave={() => setHovered(0)}
                aria-label={`Rate ${star} stars`}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <radialGradient
                      id={`star-grad-${star}`}
                      cx="50%"
                      cy="40%"
                      r="60%"
                    >
                      <stop
                        offset="0%"
                        stopColor={active ? "#80FFD0" : "#B0FFFF"}
                        stopOpacity="0.9"
                      />
                      <stop
                        offset="100%"
                        stopColor={active ? "#50FFB0" : "transparent"}
                        stopOpacity={active ? "0.6" : "0"}
                      />
                    </radialGradient>
                  </defs>
                  <path
                    d="M16 3 L19.5 11.5 L29 12.5 L22 19 L24 28.5 L16 24 L8 28.5 L10 19 L3 12.5 L12.5 11.5 Z"
                    fill={active ? `url(#star-grad-${star})` : "none"}
                    stroke={active ? "#50FFB0" : "rgba(176,255,255,0.6)"}
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    style={{
                      filter: active
                        ? "drop-shadow(0 0 4px #50FFB0) drop-shadow(0 0 8px rgba(80,255,176,0.6))"
                        : "none",
                    }}
                  />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        data-ocid="completion.button"
        className="btn-portal emerald-btn"
        onClick={onClose}
      >
        CLOSE PORTAL AND ARCHIVE TASK
      </button>
    </div>
  );
}
