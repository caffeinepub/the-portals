import { useState } from "react";

export function PaymentMethodScreen({ onBack }: { onBack: () => void }) {
  const [methods] = useState([
    {
      id: 1,
      type: "Bank Account",
      name: "Meezan Bank",
      number: "0291-0123456789",
      primary: true,
    },
    {
      id: 2,
      type: "JazzCash",
      name: "JazzCash",
      number: "0312-3456789",
      primary: false,
    },
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: "JazzCash",
    number: "",
    name: "",
  });

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <button
          type="button"
          data-ocid="payment-method.nav.button"
          onClick={onBack}
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
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.9rem",
            fontWeight: 700,
            color: "#00ffff",
            letterSpacing: "0.15em",
          }}
        >
          PAYMENT METHODS
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {methods.map((m, i) => (
          <div
            key={m.id}
            data-ocid={`payment-method.item.${i + 1}`}
            style={{
              background: "rgba(0,20,30,0.7)",
              border: m.primary
                ? "1px solid rgba(0,255,255,0.4)"
                : "1px solid rgba(0,255,255,0.15)",
              borderRadius: 14,
              padding: 16,
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 10,
                background: "rgba(0,255,255,0.08)",
                border: "1px solid rgba(0,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                flexShrink: 0,
              }}
            >
              {m.type === "JazzCash" ? "📱" : "🏦"}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 700,
                  color: "#e0f8ff",
                  letterSpacing: "0.08em",
                }}
              >
                {m.name}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.85rem",
                  color: "rgba(176,255,255,0.6)",
                  marginTop: 2,
                }}
              >
                {m.number}
              </div>
            </div>
            {m.primary && (
              <div
                style={{
                  background: "rgba(0,255,255,0.1)",
                  border: "1px solid rgba(0,255,255,0.3)",
                  borderRadius: 6,
                  padding: "3px 8px",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.48rem",
                  color: "#00ffff",
                  letterSpacing: "0.08em",
                }}
              >
                PRIMARY
              </div>
            )}
          </div>
        ))}
      </div>

      {showAdd ? (
        <div
          data-ocid="payment-method.modal"
          style={{
            background: "rgba(0,20,30,0.8)",
            border: "1px solid rgba(0,255,255,0.3)",
            borderRadius: 16,
            padding: 20,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.65rem",
              color: "rgba(0,255,255,0.7)",
              letterSpacing: "0.12em",
              marginBottom: 16,
            }}
          >
            ADD NEW PAYMENT METHOD
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            {["JazzCash", "Easypaisa", "Bank Account"].map((t) => (
              <button
                key={t}
                type="button"
                data-ocid="payment-method.type.radio"
                onClick={() => setNewMethod((p) => ({ ...p, type: t }))}
                style={{
                  flex: 1,
                  padding: "8px 4px",
                  borderRadius: 8,
                  border:
                    newMethod.type === t
                      ? "1px solid rgba(0,255,255,0.5)"
                      : "1px solid rgba(0,255,255,0.15)",
                  background:
                    newMethod.type === t
                      ? "rgba(0,255,255,0.1)"
                      : "transparent",
                  color:
                    newMethod.type === t ? "#00ffff" : "rgba(176,255,255,0.5)",
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.48rem",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          {[
            { key: "name", placeholder: "Account holder name", label: "Name" },
            {
              key: "number",
              placeholder: "Account / Mobile number",
              label: "Number",
            },
          ].map((f) => (
            <div key={f.key} style={{ marginBottom: 12 }}>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.5rem",
                  color: "rgba(0,255,255,0.6)",
                  letterSpacing: "0.1em",
                  marginBottom: 5,
                }}
              >
                {f.label.toUpperCase()}
              </div>
              <input
                type="text"
                data-ocid={`payment-method.${f.key}.input`}
                value={newMethod[f.key as keyof typeof newMethod]}
                onChange={(e) =>
                  setNewMethod((p) => ({ ...p, [f.key]: e.target.value }))
                }
                placeholder={f.placeholder}
                style={{
                  width: "100%",
                  background: "rgba(0,20,30,0.7)",
                  border: "1px solid rgba(0,255,255,0.2)",
                  borderRadius: 10,
                  color: "#e0f8ff",
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.9rem",
                  padding: "10px 12px",
                  outline: "none",
                }}
              />
            </div>
          ))}
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <button
              type="button"
              data-ocid="payment-method.cancel_button"
              onClick={() => setShowAdd(false)}
              style={{
                flex: 1,
                padding: "10px",
                background: "transparent",
                border: "1px solid rgba(0,255,255,0.2)",
                borderRadius: 10,
                color: "rgba(176,255,255,0.6)",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.6rem",
                cursor: "pointer",
                letterSpacing: "0.1em",
              }}
            >
              CANCEL
            </button>
            <button
              type="button"
              data-ocid="payment-method.save_button"
              onClick={() => setShowAdd(false)}
              style={{
                flex: 1,
                padding: "10px",
                background: "rgba(0,255,255,0.12)",
                border: "1px solid rgba(0,255,255,0.4)",
                borderRadius: 10,
                color: "#00ffff",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.6rem",
                cursor: "pointer",
                letterSpacing: "0.1em",
              }}
            >
              ADD METHOD
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          data-ocid="payment-method.primary_button"
          onClick={() => setShowAdd(true)}
          style={{
            width: "100%",
            padding: "14px",
            background: "rgba(0,255,255,0.06)",
            border: "1px dashed rgba(0,255,255,0.3)",
            borderRadius: 14,
            color: "rgba(0,255,255,0.8)",
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.12em",
            cursor: "pointer",
          }}
        >
          + ADD NEW PAYMENT METHOD
        </button>
      )}
    </div>
  );
}
