import { useEffect, useState } from "react";
import { PortalLogo } from "../components/PortalLogo";
import { useActor } from "../hooks/useActor";

interface EscrowScreenProps {
  taskId: bigint | null;
  onComplete: () => void;
}

function DigitDisplay({ digit, showSep }: { digit: string; showSep: boolean }) {
  return (
    <span>
      <span className="key-digit">{digit}</span>
      {showSep && (
        <span
          style={{
            color: "rgba(0,255,255,0.5)",
            fontSize: "1.5rem",
            margin: "0 2px",
          }}
        >
          -
        </span>
      )}
    </span>
  );
}

export function EscrowScreen({ taskId, onComplete }: EscrowScreenProps) {
  const { actor } = useActor();
  const [handshakeKey, setHandshakeKey] = useState<string | null>(null);
  const [enteredKey, setEnteredKey] = useState("");
  const [fundsReleased, setFundsReleased] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [keyLoading, setKeyLoading] = useState(false);

  useEffect(() => {
    if (!actor || taskId === null) return;
    setKeyLoading(true);
    actor
      .generateHandshakeKey(taskId)
      .then((key) => {
        const keyStr = key.toString().padStart(4, "0");
        setHandshakeKey(keyStr);
      })
      .catch(() => setHandshakeKey("----"))
      .finally(() => setKeyLoading(false));
  }, [actor, taskId]);

  async function handleRelease() {
    if (!actor || taskId === null || !enteredKey.trim()) {
      setError("Please enter the handshake key.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const keyNum = BigInt(Number.parseInt(enteredKey, 10));
      const verified = await actor.verifyHandshake(taskId, keyNum);
      if (verified) {
        setFundsReleased(true);
        setSuccess(true);
        setTimeout(() => onComplete(), 1200);
      } else {
        setError("INVALID KEY — ESCROW LOCKED");
      }
    } catch {
      setError("Verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  }

  const pad = handshakeKey ?? "????";
  const d0 = pad[0] ?? "?";
  const d1 = pad[1] ?? "?";
  const d2 = pad[2] ?? "?";
  const d3 = pad[3] ?? "?";

  return (
    <div style={{ padding: "24px 16px 32px" }}>
      <PortalLogo />

      <div className="glass" style={{ padding: "28px 22px", marginTop: 24 }}>
        {/* Shield icon */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <svg
            width="48"
            height="54"
            viewBox="0 0 48 54"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{
              filter:
                "drop-shadow(0 0 6px #00FFFF) drop-shadow(0 0 16px rgba(0,255,255,0.5))",
            }}
          >
            <path
              d="M24 2 L44 10 L44 26 C44 39 24 52 24 52 C24 52 4 39 4 26 L4 10 Z"
              stroke="#00FFFF"
              strokeWidth="1.5"
              fill="rgba(0,255,255,0.08)"
              strokeLinejoin="round"
            />
            <path
              d="M24 10 L36 16 L36 26 C36 34 24 44 24 44 C24 44 12 34 12 26 L12 16 Z"
              stroke="#00FFFF"
              strokeWidth="1"
              fill="rgba(0,255,255,0.05)"
              strokeOpacity="0.6"
              strokeLinejoin="round"
            />
            <path
              d="M17 26 L22 31 L31 20"
              stroke="#00FFFF"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2
          style={{
            textAlign: "center",
            color: "#F0F0F0",
            fontSize: "0.8rem",
            letterSpacing: "0.16em",
            marginBottom: 8,
          }}
        >
          SECURE ESCROW STATUS
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#B0FFFF",
            fontSize: "0.6rem",
            letterSpacing: "0.1em",
            marginBottom: 24,
          }}
        >
          Share this code only when the portal task is complete.
        </p>

        {/* Handshake Key Display */}
        <div
          data-ocid="escrow.panel"
          style={{ textAlign: "center", marginBottom: 20 }}
        >
          <div
            style={{
              fontSize: "0.6rem",
              color: "#B0FFFF",
              letterSpacing: "0.15em",
              marginBottom: 12,
            }}
          >
            HANDSHAKE KEY
          </div>
          {keyLoading ? (
            <div
              style={{
                color: "#00FFFF",
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
              }}
            >
              GENERATING...
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 12,
              }}
            >
              <DigitDisplay digit={d0} showSep />
              <DigitDisplay digit={d1} showSep />
              <DigitDisplay digit={d2} showSep />
              <DigitDisplay digit={d3} showSep={false} />
            </div>
          )}
        </div>

        {/* Funds badge */}
        <div
          data-ocid="escrow.card"
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 28,
          }}
        >
          <span className={fundsReleased ? "funds-released" : "funds-frozen"}>
            {fundsReleased ? "FUNDS: RELEASED" : "FUNDS: FROZEN"}
          </span>
        </div>

        {/* Code input */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="escrow-key-input"
            style={{
              display: "block",
              color: "#B0FFFF",
              fontSize: "0.6rem",
              letterSpacing: "0.15em",
              marginBottom: 8,
            }}
          >
            ENTER HANDSHAKE CODE
          </label>
          <input
            id="escrow-key-input"
            data-ocid="escrow.input"
            className="portal-input"
            type="number"
            placeholder="0000"
            value={enteredKey}
            onChange={(e) => {
              const val = e.target.value.slice(0, 4);
              setEnteredKey(val);
              setError("");
            }}
            style={{
              textAlign: "center",
              fontSize: "1.4rem",
              letterSpacing: "0.3em",
            }}
          />
        </div>

        {error && (
          <div
            data-ocid="escrow.error_state"
            style={{
              color: "#FF6B5B",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              marginBottom: 14,
              textAlign: "center",
              textShadow: "0 0 6px rgba(255,80,60,0.5)",
            }}
          >
            {error}
          </div>
        )}

        {success && (
          <div
            data-ocid="escrow.success_state"
            style={{
              color: "#50FFB0",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              marginBottom: 14,
              textAlign: "center",
              textShadow: "0 0 8px rgba(80,255,176,0.6)",
            }}
          >
            ✓ ESCROW RELEASED — PORTAL OPENING
          </div>
        )}

        <button
          type="button"
          data-ocid="escrow.submit_button"
          className="btn-portal"
          onClick={handleRelease}
          disabled={loading || success}
        >
          {loading ? "VERIFYING..." : "RELEASE ESCROW"}
        </button>
      </div>
    </div>
  );
}
