import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const USER_FAQS = [
  {
    q: "How do I book a service?",
    a: "Go to Home screen, browse categories or use the search bar to find your desired service. Tap on a service, fill in required details, then select a nearby provider and confirm the booking.",
  },
  {
    q: "How does payment work?",
    a: "After confirming a provider, you'll see the Payment Plan screen. You can pay via The Portals official bank account (Meezan Bank), JazzCash, Easypaisa, or direct bank transfer. Payment is held in escrow and released only after OTP verification.",
  },
  {
    q: "What is a Portal ID?",
    a: "Your Portal ID is a unique 5-character code generated at registration. It's used to log in to your account — no password required. Keep it safe and do not share it with anyone.",
  },
  {
    q: "How do I top up my wallet?",
    a: "Go to Profile → Top Up Wallet. Minimum top-up is PKR 2,000. Transfer the amount to The Portals Meezan Bank account and enter the transaction reference. Your balance will be updated after verification.",
  },
  {
    q: "Can I cancel a service?",
    a: "You can cancel a booking before the service provider starts the task. After the provider is en route, cancellation may incur a small fee. Contact the provider via in-app chat to discuss.",
  },
  {
    q: "How does OTP verification work?",
    a: "When a service is completed, a 4-digit OTP is generated and shown to you. Share this OTP with the service provider to confirm task completion and release payment. Never share OTP before service is done.",
  },
  {
    q: "Is my personal information safe?",
    a: "Yes. The Portals uses 256-bit AES encryption for all data. Your bank details, CNIC, and personal information are stored securely and never shared with third parties.",
  },
  {
    q: "What are Qiks?",
    a: "Qiks are reward tokens for service providers. As a user, you also accumulate Qiks for activity. 10 Qiks = 1 free service delivery where The Portals charges are waived.",
  },
  {
    q: "How do I rate a service provider?",
    a: "After successful task completion and OTP verification, you'll see the Success screen where you can rate the provider from 1 to 5 stars. Ratings help maintain quality on the platform.",
  },
  {
    q: "What if the provider doesn't show up?",
    a: "Contact support via Help & Support. If a provider is unresponsive, you can cancel the booking without penalty and select another nearby provider. Repeated no-shows are penalized.",
  },
];

const PROVIDER_FAQS = [
  {
    q: "How do I register as a Service Provider?",
    a: "Tap 'Create Account' on the login screen, select 'Service Provider', fill in your personal details, select your service category, upload a profile picture, and add your bank account details. You'll receive a unique Portal ID.",
  },
  {
    q: "How much does it cost to join?",
    a: "Registration is completely free. You get 2 FREE service tokens to start. After that, a minimum wallet top-up of PKR 2,000 is required to continue receiving bookings.",
  },
  {
    q: "How do I receive payments?",
    a: "After task completion, the user verifies with an OTP. Payment is then automatically processed to your registered bank account. Deductions include platform charges and applicable taxes.",
  },
  {
    q: "What are the platform charges?",
    a: "The Portals deducts a service fee (10%) plus applicable taxes from provider payouts. These are deducted automatically — you don't need to handle tax separately.",
  },
  {
    q: "How do I earn Qiks tokens?",
    a: "You earn 1 Qik for every 20 successful, completed service deliveries. Once you accumulate 10 Qiks, your next service delivery is free — The Portals charges are completely waived.",
  },
  {
    q: "What happens if I reject too many bookings?",
    a: "After 5 rejections, you receive 1 warning. After 3 warnings, your account may be suspended, blocked, or charged 2% from your wallet balance. Always respond to bookings promptly.",
  },
  {
    q: "Can I set my own rates?",
    a: "Yes! You set your service rates during registration. Rates are private — other providers cannot see your rates. Rates are reviewed and can be updated monthly.",
  },
  {
    q: "How does GPS location work?",
    a: "The Portals uses your GPS location to match you with nearby customers. Always keep location services enabled to receive relevant booking requests in your area.",
  },
  {
    q: "Can I withdraw my balance?",
    a: "Yes. Go to Profile → Delete Account or contact support for withdrawals. A 3% processing fee applies. Withdrawals are processed after all pending tasks are completed.",
  },
  {
    q: "How do I handle customer complaints?",
    a: "Always communicate professionally through The Portals in-app chat. Never share contact numbers directly. If you receive a complaint, respond promptly via chat. Repeated complaints result in warnings.",
  },
];

function AccordionItem({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div
      data-ocid={`help.faq.item.${index + 1}`}
      style={{
        background: "rgba(0,20,30,0.6)",
        border: `1px solid ${
          open ? "rgba(0,255,255,0.3)" : "rgba(0,255,255,0.1)"
        }`,
        borderRadius: 12,
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <button
        type="button"
        data-ocid={`help.faq.toggle.${index + 1}`}
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          gap: 12,
          textAlign: "left",
        }}
      >
        <span
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.9rem",
            fontWeight: 700,
            color: open ? "#00ffff" : "#e0f8ff",
            lineHeight: 1.4,
            flex: 1,
            transition: "color 0.2s",
          }}
        >
          {question}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            color: "rgba(0,255,255,0.5)",
            fontSize: "1rem",
            flexShrink: 0,
          }}
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: "hidden" }}
          >
            <div
              style={{
                padding: "0 16px 14px",
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.85rem",
                color: "rgba(176,255,255,0.75)",
                lineHeight: 1.6,
                borderTop: "1px solid rgba(0,255,255,0.1)",
                paddingTop: 12,
                marginTop: -1,
              }}
            >
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function HelpSupportScreen({ onBack }: { onBack: () => void }) {
  const [section, setSection] = useState<"user" | "provider">("user");

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
          data-ocid="help.nav.button"
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
        <div>
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.9rem",
              fontWeight: 700,
              color: "#00ffff",
              letterSpacing: "0.15em",
            }}
          >
            HELP & SUPPORT
          </div>
          <div
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.75rem",
              color: "rgba(176,255,255,0.5)",
              marginTop: 2,
            }}
          >
            Frequently Asked Questions
          </div>
        </div>
      </div>

      {/* Section toggle */}
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
        {(["user", "provider"] as const).map((s) => (
          <button
            key={s}
            type="button"
            data-ocid={`help.${s}.tab`}
            onClick={() => setSection(s)}
            style={{
              flex: 1,
              padding: "10px 8px",
              borderRadius: 9,
              border: "none",
              background:
                section === s ? "rgba(0,255,255,0.15)" : "transparent",
              color: section === s ? "#00ffff" : "rgba(176,255,255,0.5)",
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.58rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              cursor: "pointer",
              transition: "all 0.2s",
              boxShadow:
                section === s ? "0 0 10px rgba(0,255,255,0.2)" : "none",
            }}
          >
            {s === "user" ? "👤 END USERS" : "🛠️ SERVICE PROVIDERS"}
          </button>
        ))}
      </div>

      <motion.div
        key={section}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        style={{ display: "flex", flexDirection: "column", gap: 8 }}
      >
        {(section === "user" ? USER_FAQS : PROVIDER_FAQS).map((faq, i) => (
          <AccordionItem
            key={`${section}-${faq.q.slice(0, 20)}`}
            question={faq.q}
            answer={faq.a}
            index={i}
          />
        ))}
      </motion.div>

      {/* Contact support */}
      <div
        style={{
          marginTop: 24,
          padding: 16,
          background: "rgba(0,255,255,0.04)",
          border: "1px solid rgba(0,255,255,0.15)",
          borderRadius: 14,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.6rem",
            color: "rgba(0,255,255,0.7)",
            letterSpacing: "0.12em",
            marginBottom: 8,
          }}
        >
          STILL NEED HELP?
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.85rem",
            color: "rgba(176,255,255,0.6)",
            lineHeight: 1.5,
          }}
        >
          Contact us via in-app chat or email:
          <br />
          <span style={{ color: "#00ffff" }}>support@theportals.pk</span>
        </div>
      </div>
    </div>
  );
}
