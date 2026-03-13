const SIZE_MAP: Record<string, number> = {
  sm: 32,
  md: 48,
  lg: 64,
  xl: 80,
};

interface PortalLogoProps {
  emerald?: boolean;
  size?: number | string;
}

export function PortalLogo({ emerald = false, size = 80 }: PortalLogoProps) {
  const px = typeof size === "string" ? (SIZE_MAP[size] ?? 48) : size;
  const color = emerald ? "#50FFB0" : "#00FFFF";
  const colorDim = emerald ? "#00CC77" : "#00CCCC";

  return (
    <div
      className={`portal-logo${emerald ? " emerald" : ""}`}
      style={{ width: px, height: px }}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="40"
          cy="40"
          r="36"
          stroke={color}
          strokeWidth="1.5"
          strokeOpacity="0.5"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r="28"
          stroke={color}
          strokeWidth="1"
          strokeOpacity="0.3"
          fill="none"
        />
        <circle
          cx="40"
          cy="40"
          r="18"
          fill={`url(#wormhole-grad-${emerald ? "e" : "c"})`}
          opacity="0.6"
        />
        <text
          x="27"
          y="54"
          fontFamily="'Orbitron', sans-serif"
          fontSize="36"
          fontWeight="800"
          fill={color}
        >
          P
        </text>
        <path
          d="M 14 40 Q 27 18 40 18 Q 53 18 62 28"
          stroke={color}
          strokeWidth="1.5"
          fill="none"
          strokeOpacity="0.7"
          strokeLinecap="round"
        />
        <path
          d="M 10 44 Q 22 10 40 10 Q 58 10 68 26"
          stroke={colorDim}
          strokeWidth="1"
          fill="none"
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
        <defs>
          <radialGradient id="wormhole-grad-c" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00FFFF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="wormhole-grad-e" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#50FFB0" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#50FFB0" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}

export default PortalLogo;
