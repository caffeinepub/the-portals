import { useState } from "react";

export function EditProfileScreen({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState({
    name: "Ahmed Khan",
    phone: "0312-3456789",
    city: "Karachi",
    email: "ahmed.khan@email.com",
  });
  const [saved, setSaved] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const set = (k: string, v: string) =>
    setForm((prev) => ({ ...prev, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const glassInput = {
    background: "rgba(0,20,30,0.7)",
    border: "1px solid rgba(0,255,255,0.25)",
    borderRadius: 10,
    color: "#e0f8ff",
    fontFamily: "Rajdhani, sans-serif",
    fontSize: "0.95rem",
    padding: "12px 14px",
    width: "100%",
    outline: "none",
  } as React.CSSProperties;

  const label = {
    fontFamily: "Orbitron, sans-serif",
    fontSize: "0.55rem",
    color: "rgba(0,255,255,0.6)",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    marginBottom: 6,
    display: "block",
  } as React.CSSProperties;

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
          data-ocid="edit-profile.nav.button"
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
          EDIT PROFILE
        </div>
      </div>

      {/* Profile Pic */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          {profilePic ? (
            <img
              src={profilePic}
              alt="Profile"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                border: "2px solid rgba(0,255,255,0.5)",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(0,255,255,0.08)",
                border: "2px solid rgba(0,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
              }}
            >
              👤
            </div>
          )}
          <label
            htmlFor="edit-profile-pic-input"
            data-ocid="edit-profile.upload_button"
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "rgba(0,255,255,0.9)",
              border: "2px solid #05070A",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.75rem",
            }}
          >
            📷
            <input
              id="edit-profile-pic-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (ev) =>
                    setProfilePic(ev.target?.result as string);
                  reader.readAsDataURL(file);
                }
              }}
            />
          </label>
        </div>
        <div
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.75rem",
            color: "rgba(176,255,255,0.5)",
            marginTop: 8,
          }}
        >
          Tap camera icon to change photo
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[
          {
            key: "name",
            label: "Full Name",
            type: "text",
            placeholder: "Your full name",
          },
          {
            key: "phone",
            label: "Phone Number",
            type: "tel",
            placeholder: "03XX-XXXXXXX",
          },
          {
            key: "city",
            label: "City",
            type: "text",
            placeholder: "Your city",
          },
          {
            key: "email",
            label: "Email Address",
            type: "email",
            placeholder: "your@email.com",
          },
        ].map((field) => (
          <div key={field.key}>
            <label htmlFor={`edit-profile-${field.key}`} style={label}>
              {field.label}
            </label>
            <input
              id={`edit-profile-${field.key}`}
              type={field.type}
              data-ocid={`edit-profile.${field.key}.input`}
              value={form[field.key as keyof typeof form]}
              onChange={(e) => set(field.key, e.target.value)}
              placeholder={field.placeholder}
              style={glassInput}
            />
          </div>
        ))}
      </div>

      {saved && (
        <div
          data-ocid="edit-profile.success_state"
          style={{
            marginTop: 16,
            padding: "12px 16px",
            background: "rgba(80,255,176,0.1)",
            border: "1px solid rgba(80,255,176,0.4)",
            borderRadius: 10,
            fontFamily: "Orbitron, sans-serif",
            fontSize: "0.65rem",
            color: "#50ffb0",
            letterSpacing: "0.1em",
            textAlign: "center",
          }}
        >
          ✓ PROFILE UPDATED SUCCESSFULLY
        </div>
      )}

      <button
        type="button"
        data-ocid="edit-profile.save_button"
        onClick={handleSave}
        style={{
          width: "100%",
          marginTop: 24,
          padding: "16px",
          background:
            "linear-gradient(135deg, rgba(0,255,255,0.15), rgba(0,200,200,0.1))",
          border: "1px solid rgba(0,255,255,0.5)",
          borderRadius: 14,
          color: "#00ffff",
          fontFamily: "Orbitron, sans-serif",
          fontSize: "0.75rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          cursor: "pointer",
          boxShadow: "0 0 20px rgba(0,255,255,0.2)",
        }}
      >
        SAVE CHANGES
      </button>
    </div>
  );
}
