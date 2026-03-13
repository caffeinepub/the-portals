import React from "react";

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
        padding: "16px 16px 12px",
        borderBottom: "1px solid rgba(0,255,255,0.1)",
        marginBottom: 8,
      }}
    >
      <button
        type="button"
        data-ocid="privacy.back_button"
        onClick={onBack}
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(0,255,255,0.08)",
          border: "1px solid rgba(0,255,255,0.25)",
          color: "#00ffff",
          fontSize: "1.1rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        ←
      </button>
      <div
        style={{
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.75rem",
          fontWeight: 700,
          color: "#f0f0f0",
          letterSpacing: "0.15em",
        }}
      >
        {title}
      </div>
    </div>
  );
}

const sections = [
  {
    title: "INFORMATION WE COLLECT",
    content: [
      "Personal Information: Full name, phone number, CNIC (National Identity Card), email address, and city.",
      "Bank Account Details: Bank name, account title, and account number for payment processing and withdrawals.",
      "Location Data: GPS coordinates collected when you use Nearby Providers feature to match you with service providers in your locality.",
      "Service Data: Booking history, OTP verification records, transaction logs, and service completion records.",
      "Device Information: Device type, operating system, and app usage analytics for service improvement.",
    ],
  },
  {
    title: "HOW WE USE YOUR DATA",
    content: [
      "Service Matching: Your GPS location and city are used to connect you with nearby service providers.",
      "Payment Processing: Bank account details are used to process service payments, wallet top-ups, and provider withdrawals.",
      "Identity Verification: CNIC and personal details are used to verify user identity and prevent fraud.",
      "Account Management: Your Portal ID and profile information enable secure, passwordless login.",
      "Communication: Phone and email are used to send OTP codes, booking confirmations, and service updates.",
    ],
  },
  {
    title: "DATA SECURITY",
    content: [
      "256-bit AES End-to-End Encryption: All personal and financial data is encrypted in transit and at rest.",
      "Secure Payment Gateways: Bank account details are processed through PCI-DSS compliant payment infrastructure.",
      "Portal ID Authentication: Passwordless login via unique 5-character Portal ID reduces credential theft risk.",
      "Escrow Protection: Service payments are held in escrow until OTP-verified service completion.",
      "Regular Security Audits: Our systems undergo periodic security reviews and vulnerability assessments.",
    ],
  },
  {
    title: "THIRD-PARTY SHARING",
    content: [
      "We do NOT sell your personal data to third parties under any circumstances.",
      "Payment Processors: Bank details are shared only with authorized payment processors (e.g., Meezan Bank) to complete transactions.",
      "Legal Compliance: We may disclose data if required by Pakistani law, court orders, or regulatory authorities (FBR, SECP, SBP).",
      "Service Providers: Anonymized, aggregated data may be shared with analytics partners for app improvement.",
    ],
  },
  {
    title: "YOUR RIGHTS",
    content: [
      "Access: You may request a copy of all personal data we hold about you at any time.",
      "Correction: You may update or correct inaccurate personal information through your Profile settings.",
      "Deletion: You may request account deletion. Provider accounts undergo a financial clearance process before deletion.",
      "Data Portability: You may request your transaction history and service records in a portable format.",
      "Withdrawal of Consent: You may disable GPS location access at any time through Settings without affecting core app functionality.",
    ],
  },
  {
    title: "DATA RETENTION",
    content: [
      "Active Accounts: Data is retained for the duration of your account lifetime.",
      "Deleted Accounts: Personal data is purged within 30 days of account deletion, subject to legal retention requirements.",
      "Transaction Records: Financial records are retained for 7 years as required by Pakistani tax and financial regulations.",
      "Anonymized Analytics: Aggregated, non-identifiable usage data may be retained indefinitely.",
    ],
  },
  {
    title: "CHILDREN'S PRIVACY",
    content: [
      "The Portals is intended for users aged 18 and above.",
      "We do not knowingly collect personal information from minors.",
      "If you believe a minor has registered, please contact us immediately at info@theportals.pk.",
    ],
  },
  {
    title: "CONTACT & GRIEVANCES",
    content: [
      "Data Controller: The Portals, Pakistan",
      "Email: info@theportals.pk",
      "For privacy concerns, data requests, or complaints, email us with subject line 'Privacy Request' and your Portal ID.",
      "We aim to respond to all privacy requests within 14 business days.",
    ],
  },
];

export function PrivacyPolicyScreen({ onBack }: { onBack: () => void }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#05070a",
        color: "#f0f0f0",
        paddingBottom: 60,
      }}
    >
      <ScreenHeader title="PRIVACY POLICY" onBack={onBack} />
      <div style={{ padding: "16px 16px 40px" }}>
        {/* Effective date banner */}
        <div
          className="glass"
          style={{
            padding: "12px 16px",
            marginBottom: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.55rem",
                color: "rgba(0,255,255,0.6)",
                letterSpacing: "0.12em",
                marginBottom: 3,
              }}
            >
              THE PORTALS · PAKISTAN
            </div>
            <div
              style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.85rem",
                color: "rgba(176,255,255,0.7)",
              }}
            >
              Effective Date: March 2026
            </div>
          </div>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "rgba(0,255,255,0.1)",
              border: "1px solid rgba(0,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            🔒
          </div>
        </div>

        {/* Intro */}
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.9rem",
            color: "rgba(176,255,255,0.65)",
            lineHeight: 1.7,
            marginBottom: 20,
            padding: "0 4px",
          }}
        >
          The Portals is committed to protecting your privacy and personal data.
          This Privacy Policy explains how we collect, use, store, and safeguard
          your information when you use our service marketplace platform in
          Pakistan.
        </div>

        {/* Sections */}
        {sections.map((sec, i) => (
          <div
            key={sec.title}
            className="glass"
            data-ocid={`privacy.section.${i + 1}`}
            style={{ padding: 16, marginBottom: 12 }}
          >
            <div
              style={{
                fontFamily: "Orbitron, sans-serif",
                fontSize: "0.6rem",
                color: "#00ffff",
                letterSpacing: "0.12em",
                marginBottom: 12,
                textShadow: "0 0 8px rgba(0,255,255,0.4)",
              }}
            >
              {sec.title}
            </div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {sec.content.map((item, j) => (
                <li
                  key={item.slice(0, 20)}
                  style={{
                    display: "flex",
                    gap: 8,
                    marginBottom: j < sec.content.length - 1 ? 10 : 0,
                    fontFamily: "Rajdhani, sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(176,255,255,0.7)",
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: "rgba(0,255,255,0.5)", flexShrink: 0 }}>
                    ▸
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Contact CTA */}
        <div
          className="glass"
          style={{
            padding: 16,
            marginTop: 8,
            textAlign: "center",
            border: "1px solid rgba(0,255,255,0.25)",
          }}
        >
          <div
            style={{
              fontFamily: "Orbitron, sans-serif",
              fontSize: "0.6rem",
              color: "#00ffff",
              letterSpacing: "0.12em",
              marginBottom: 8,
            }}
          >
            QUESTIONS ABOUT YOUR DATA?
          </div>
          <a
            href="mailto:info@theportals.pk"
            data-ocid="privacy.link"
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "1rem",
              color: "#00ffff",
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            info@theportals.pk
          </a>
        </div>
      </div>
    </div>
  );
}
