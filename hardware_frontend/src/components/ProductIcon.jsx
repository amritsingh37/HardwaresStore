// Renders a simple line-icon per product type. Swap any of these for a real
// photo later — see the "using real photos" note below.
export default function ProductIcon({ icon }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.4",
  };

  switch (icon) {
    case "gitti": // crushed stone / aggregate
      return (
        <svg {...common}>
          <path d="M3 17l3-5 4 1 2-4 5 3-1 5-6 2z" />
          <path d="M13 14l3-3 4 2-1 4-4 1z" />
        </svg>
      );
    case "balu": // sand
      return (
        <svg {...common}>
          <path d="M2 18c3-7 7-10 10-10s7 3 10 10" />
          <circle cx="9" cy="14" r="0.6" fill="currentColor" />
          <circle cx="13" cy="12" r="0.6" fill="currentColor" />
          <circle cx="16" cy="15" r="0.6" fill="currentColor" />
          <circle cx="7" cy="16" r="0.6" fill="currentColor" />
        </svg>
      );
    case "tank": // water storage tank
      return (
        <svg {...common}>
          <ellipse cx="12" cy="5" rx="7" ry="2" />
          <path d="M5 5v13c0 1.1 3.1 2 7 2s7-.9 7-2V5" />
          <path d="M5 11c0 1.1 3.1 2 7 2s7-.9 7-2" />
        </svg>
      );
    case "cement": // cement bag
      return (
        <svg {...common}>
          <path d="M5 8h14l-1.2 12H6.2z" />
          <path d="M8 8V6.5a4 1.8 0 018 0V8" />
          <path d="M6.5 11h11M6 14h12M6.5 17h11" />
        </svg>
      );
    case "tmt": // TMT steel bars, end-on view
      return (
        <svg {...common}>
          <circle cx="8" cy="9" r="2.6" />
          <circle cx="14" cy="9" r="2.6" />
          <circle cx="11" cy="14" r="2.6" />
          <circle cx="17" cy="14" r="2.6" />
          <circle cx="5" cy="14" r="2.6" />
        </svg>
      );
    case "brick":
      return (
        <svg {...common}>
          <rect x="3" y="6" width="8" height="4.5" />
          <rect x="13" y="6" width="8" height="4.5" />
          <rect x="8" y="13" width="8" height="4.5" />
        </svg>
      );
    case "pipe":
      return (
        <svg {...common}>
          <ellipse cx="12" cy="6" rx="6" ry="2.2" />
          <path d="M6 6v11a6 2.2 0 0012 0V6" />
          <ellipse cx="12" cy="6" rx="2.5" ry="0.9" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <path d="M6 12l9-9 3 3-9 9-4 1z" />
        </svg>
      );
  }
}
