import { motion } from "motion/react";

const TRANSACTIONS = [
  {
    id: "TXN-A7KX2",
    service: "Plumber - Usman Tariq",
    date: "10 Mar 2026",
    time: "14:32",
    amount: 850,
    type: "debit",
    status: "Completed",
    emoji: "🔧",
  },
  {
    id: "TXN-B9MQ4",
    service: "Wallet Top-Up",
    date: "8 Mar 2026",
    time: "09:15",
    amount: 5000,
    type: "credit",
    status: "Credited",
    emoji: "💰",
  },
  {
    id: "TXN-C3RW7",
    service: "Grocery Delivery - FreshMart",
    date: "5 Mar 2026",
    time: "18:45",
    amount: 1450,
    type: "debit",
    status: "Completed",
    emoji: "🛒",
  },
  {
    id: "TXN-D5KP1",
    service: "Doctor Visit - Dr. Ayesha Malik",
    date: "1 Mar 2026",
    time: "11:20",
    amount: 2000,
    type: "debit",
    status: "Completed",
    emoji: "👨‍⚕️",
  },
  {
    id: "TXN-E8LS3",
    service: "Wallet Top-Up",
    date: "25 Feb 2026",
    time: "10:05",
    amount: 3000,
    type: "credit",
    status: "Credited",
    emoji: "💰",
  },
  {
    id: "TXN-F2NY6",
    service: "Car Rental - CityDrive",
    date: "20 Feb 2026",
    time: "08:30",
    amount: 3500,
    type: "debit",
    status: "Completed",
    emoji: "🚗",
  },
];

export function TransactionHistoryScreen({ onBack }: { onBack: () => void }) {
  const totalDebits = TRANSACTIONS.filter((t) => t.type === "debit").reduce(
    (s, t) => s + t.amount,
    0,
  );
  const totalCredits = TRANSACTIONS.filter((t) => t.type === "credit").reduce(
    (s, t) => s + t.amount,
    0,
  );

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <button
          type="button"
          data-ocid="transactions.nav.button"
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
          TRANSACTION HISTORY
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div
          style={{
            flex: 1,
            background: "rgba(255,107,91,0.08)",
            border: "1px solid rgba(255,107,91,0.25)",
            borderRadius: 12,
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.5rem",
              color: "rgba(255,107,91,0.7)",
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            TOTAL SPENT
          </div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#ff6b5b",
            }}
          >
            ₨{totalDebits.toLocaleString()}
          </div>
        </div>
        <div
          style={{
            flex: 1,
            background: "rgba(80,255,176,0.06)",
            border: "1px solid rgba(80,255,176,0.25)",
            borderRadius: 12,
            padding: "12px 14px",
          }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.5rem",
              color: "rgba(80,255,176,0.7)",
              letterSpacing: "0.1em",
              marginBottom: 4,
            }}
          >
            TOTAL CREDITED
          </div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.85rem",
              fontWeight: 700,
              color: "#50ffb0",
            }}
          >
            ₨{totalCredits.toLocaleString()}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {TRANSACTIONS.map((txn, i) => (
          <motion.div
            key={txn.id}
            data-ocid={`transactions.item.${i + 1}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            style={{
              background: "rgba(0,20,30,0.7)",
              border: "1px solid rgba(0,255,255,0.1)",
              borderRadius: 12,
              padding: 14,
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: "50%",
                background:
                  txn.type === "credit"
                    ? "rgba(80,255,176,0.08)"
                    : "rgba(255,107,91,0.08)",
                border: `1px solid ${
                  txn.type === "credit"
                    ? "rgba(80,255,176,0.2)"
                    : "rgba(255,107,91,0.2)"
                }`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.3rem",
                flexShrink: 0,
              }}
            >
              {txn.emoji}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.9rem",
                  fontWeight: 700,
                  color: "#e0f8ff",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {txn.service}
              </div>
              <div
                style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(176,255,255,0.5)",
                  marginTop: 2,
                }}
              >
                {txn.date} · {txn.time} · {txn.id}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: txn.type === "credit" ? "#50ffb0" : "#ff6b5b",
                }}
              >
                {txn.type === "credit" ? "+" : "-"}₨
                {txn.amount.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.45rem",
                  color:
                    txn.type === "credit"
                      ? "rgba(80,255,176,0.6)"
                      : "rgba(255,107,91,0.6)",
                  letterSpacing: "0.08em",
                  marginTop: 3,
                }}
              >
                {txn.status.toUpperCase()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
