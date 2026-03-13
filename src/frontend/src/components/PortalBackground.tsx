export default function PortalBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "#05070A" }}
    >
      {/* Deep space base */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(0,80,100,0.25) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(60,0,120,0.2) 0%, transparent 60%), #05070A",
        }}
      />
      {/* Teal nebula blob top-left */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,255,0.4), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
      {/* Purple nebula blob bottom-right */}
      <div
        className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(120,0,255,0.5), transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Geometric grid overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* Star field */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(1px 1px at 20% 30%, white, transparent), radial-gradient(1px 1px at 70% 15%, white, transparent), radial-gradient(1px 1px at 45% 60%, white, transparent), radial-gradient(1px 1px at 85% 45%, white, transparent), radial-gradient(1px 1px at 10% 75%, white, transparent), radial-gradient(1px 1px at 60% 85%, white, transparent), radial-gradient(1.5px 1.5px at 35% 20%, rgba(0,255,255,0.8), transparent), radial-gradient(1px 1px at 90% 70%, white, transparent)",
        }}
      />
    </div>
  );
}
