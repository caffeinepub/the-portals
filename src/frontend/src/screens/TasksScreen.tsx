import { motion } from "motion/react";
import { useState } from "react";

const CURRENT_TASKS = [
  {
    id: 1,
    service: "Plumber",
    emoji: "🔧",
    provider: "Usman Tariq",
    status: "In Progress",
    statusColor: "#FFD700",
    amount: 850,
    date: "14 Mar 2026",
    eta: "~25 mins",
    category: "Repairs",
  },
  {
    id: 2,
    service: "Doctor Visit",
    emoji: "👨‍⚕️",
    provider: "Dr. Ayesha Malik",
    status: "Provider En Route",
    statusColor: "#00ffff",
    amount: 2000,
    date: "14 Mar 2026",
    eta: "~15 mins",
    category: "Health",
  },
];

const TASK_HISTORY = [
  {
    id: 101,
    service: "Electrician",
    emoji: "⚡",
    provider: "Bilal Hassan",
    status: "Completed",
    statusColor: "#50ffb0",
    amount: 780,
    date: "10 Mar 2026",
    category: "Repairs",
    hasChat: true,
  },
  {
    id: 102,
    service: "Grocery Delivery",
    emoji: "🛒",
    provider: "FreshMart Karachi",
    status: "Completed",
    statusColor: "#50ffb0",
    amount: 1450,
    date: "8 Mar 2026",
    category: "Groceries",
    hasChat: true,
  },
  {
    id: 103,
    service: "Home Tutor",
    emoji: "📚",
    provider: "Tutor Zainab Noor",
    status: "Completed",
    statusColor: "#50ffb0",
    amount: 700,
    date: "5 Mar 2026",
    category: "Education",
    hasChat: false,
  },
  {
    id: 104,
    service: "Car Rental",
    emoji: "🚗",
    provider: "CityDrive Cars",
    status: "Cancelled",
    statusColor: "#ff6b5b",
    amount: 0,
    date: "2 Mar 2026",
    category: "Rentals",
    hasChat: false,
  },
  {
    id: 105,
    service: "Cleaner",
    emoji: "🧹",
    provider: "Cleaner Razia Bibi",
    status: "Completed",
    statusColor: "#50ffb0",
    amount: 500,
    date: "28 Feb 2026",
    category: "Home",
    hasChat: true,
  },
];

export function TasksScreen({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState<"current" | "history">("current");

  return (
    <div style={{ padding: "20px 16px 100px" }}>
      {/* Header */}
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
          data-ocid="tasks.nav.button"
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
          MY TASKS
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
          background: "rgba(0,20,30,0.6)",
          border: "1px solid rgba(0,255,255,0.15)",
          borderRadius: 12,
          padding: 4,
        }}
      >
        {["current", "history"].map((tab) => (
          <button
            key={tab}
            type="button"
            data-ocid={`tasks.${tab}.tab`}
            onClick={() => setActiveTab(tab as "current" | "history")}
            style={{
              flex: 1,
              padding: "10px 8px",
              borderRadius: 9,
              border: "none",
              background:
                activeTab === tab ? "rgba(0,255,255,0.15)" : "transparent",
              color: activeTab === tab ? "#00ffff" : "rgba(176,255,255,0.5)",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow:
                activeTab === tab ? "0 0 10px rgba(0,255,255,0.2)" : "none",
            }}
          >
            {tab === "current" ? "📋 CURRENT TASKS" : "📜 TASKS HISTORY"}
          </button>
        ))}
      </div>

      {/* Current Tasks Tab */}
      {activeTab === "current" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.6rem",
              color: "rgba(0,255,255,0.6)",
              letterSpacing: "0.15em",
              marginBottom: 12,
            }}
          >
            ⚡ {CURRENT_TASKS.length} ACTIVE TASK
            {CURRENT_TASKS.length !== 1 ? "S" : ""}
          </div>
          {CURRENT_TASKS.length === 0 ? (
            <div
              data-ocid="tasks.current.empty_state"
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: "rgba(0,20,30,0.5)",
                border: "1px dashed rgba(0,255,255,0.15)",
                borderRadius: 16,
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>📋</div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(0,255,255,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                NO ACTIVE TASKS
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {CURRENT_TASKS.map((task, i) => (
                <motion.div
                  key={task.id}
                  data-ocid={`tasks.current.item.${i + 1}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    background: "rgba(0,20,30,0.7)",
                    border: "1px solid rgba(0,255,255,0.2)",
                    borderRadius: 16,
                    padding: 16,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        background: "rgba(0,255,255,0.08)",
                        border: "1px solid rgba(0,255,255,0.25)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.4rem",
                        flexShrink: 0,
                      }}
                    >
                      {task.emoji}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "#e0f8ff",
                          letterSpacing: "0.08em",
                          marginBottom: 3,
                        }}
                      >
                        {task.service}
                      </div>
                      <div
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "0.85rem",
                          color: "rgba(176,255,255,0.7)",
                        }}
                      >
                        {task.provider}
                      </div>
                      <div
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "0.75rem",
                          color: "rgba(176,255,255,0.4)",
                          marginTop: 2,
                        }}
                      >
                        📅 {task.date}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "0.7rem",
                          fontWeight: 700,
                          color: "#50ffb0",
                        }}
                      >
                        ₨{task.amount.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  {/* Status Bar */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: "rgba(0,0,0,0.3)",
                      borderRadius: 10,
                      border: `1px solid ${task.statusColor}33`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <div
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: task.statusColor,
                          boxShadow: `0 0 6px ${task.statusColor}`,
                          animation: "ping 1.5s infinite",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "0.58rem",
                          color: task.statusColor,
                          letterSpacing: "0.1em",
                          fontWeight: 700,
                        }}
                      >
                        {task.status.toUpperCase()}
                      </span>
                    </div>
                    <span
                      style={{
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "0.8rem",
                        color: "rgba(176,255,255,0.7)",
                      }}
                    >
                      ⏱ ETA: {task.eta}
                    </span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      marginTop: 10,
                    }}
                  >
                    <button
                      type="button"
                      data-ocid={`tasks.chat.button.${i + 1}`}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "rgba(0,255,255,0.08)",
                        border: "1px solid rgba(0,255,255,0.3)",
                        borderRadius: 8,
                        color: "#00ffff",
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                      }}
                    >
                      💬 MESSAGE
                    </button>
                    <button
                      type="button"
                      data-ocid={`tasks.track.button.${i + 1}`}
                      style={{
                        flex: 1,
                        padding: "8px",
                        background: "rgba(80,255,176,0.08)",
                        border: "1px solid rgba(80,255,176,0.3)",
                        borderRadius: 8,
                        color: "#50ffb0",
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "0.55rem",
                        letterSpacing: "0.08em",
                        cursor: "pointer",
                      }}
                    >
                      📍 TRACK
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* History Tab */}
      {activeTab === "history" && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.6rem",
              color: "rgba(0,255,255,0.6)",
              letterSpacing: "0.15em",
              marginBottom: 12,
            }}
          >
            📜 {TASK_HISTORY.length} PAST TASKS
          </div>
          {TASK_HISTORY.length === 0 ? (
            <div
              data-ocid="tasks.history.empty_state"
              style={{
                textAlign: "center",
                padding: "48px 24px",
                background: "rgba(0,20,30,0.5)",
                border: "1px dashed rgba(0,255,255,0.15)",
                borderRadius: 16,
              }}
            >
              <div style={{ fontSize: "3rem", marginBottom: 12 }}>📜</div>
              <div
                style={{
                  fontFamily: "Orbitron, sans-serif",
                  fontSize: "0.7rem",
                  color: "rgba(0,255,255,0.5)",
                  letterSpacing: "0.1em",
                }}
              >
                NO HISTORY YET
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {TASK_HISTORY.map((task, i) => (
                <motion.div
                  key={task.id}
                  data-ocid={`tasks.history.item.${i + 1}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  style={{
                    background: "rgba(0,15,25,0.7)",
                    border: "1px solid rgba(0,255,255,0.12)",
                    borderRadius: 14,
                    padding: 14,
                    backdropFilter: "blur(12px)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: "rgba(0,255,255,0.06)",
                        border: "1px solid rgba(0,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "1.2rem",
                        flexShrink: 0,
                      }}
                    >
                      {task.emoji}
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
                        {task.service}
                      </div>
                      <div
                        style={{
                          fontFamily: "Rajdhani, sans-serif",
                          fontSize: "0.8rem",
                          color: "rgba(176,255,255,0.6)",
                          marginTop: 2,
                        }}
                      >
                        {task.provider} · {task.date}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontFamily: "Orbitron, sans-serif",
                          fontSize: "0.65rem",
                          fontWeight: 700,
                          color:
                            task.status === "Cancelled"
                              ? "rgba(255,107,91,0.8)"
                              : "#50ffb0",
                          marginBottom: 4,
                        }}
                      >
                        {task.status === "Cancelled"
                          ? "CANCELLED"
                          : `₨${task.amount.toLocaleString()}`}
                      </div>
                      <div
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                          background: `${task.statusColor}15`,
                          border: `1px solid ${task.statusColor}40`,
                          borderRadius: 6,
                          padding: "2px 7px",
                        }}
                      >
                        <div
                          style={{
                            width: 5,
                            height: 5,
                            borderRadius: "50%",
                            background: task.statusColor,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "Orbitron, sans-serif",
                            fontSize: "0.48rem",
                            color: task.statusColor,
                            letterSpacing: "0.08em",
                          }}
                        >
                          {task.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {task.hasChat && (
                    <button
                      type="button"
                      data-ocid={`tasks.history.chat.button.${i + 1}`}
                      style={{
                        width: "100%",
                        marginTop: 10,
                        padding: "7px",
                        background: "rgba(0,255,255,0.06)",
                        border: "1px solid rgba(0,255,255,0.2)",
                        borderRadius: 8,
                        color: "rgba(0,255,255,0.7)",
                        fontFamily: "Orbitron, sans-serif",
                        fontSize: "0.5rem",
                        letterSpacing: "0.1em",
                        cursor: "pointer",
                      }}
                    >
                      💬 VIEW CHAT HISTORY
                    </button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
