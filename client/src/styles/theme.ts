export const theme = {
  colors: {
    background: "#111111",
    surface: "#161616",
    border: "#222222",
    borderLight: "#2e2e2e",
    borderAccent: "#333333",
    text: {
      primary: "#ffffff",
      secondary: "#d1d5db",
      muted: "#6b7280",
      dim: "#9ca3af",
    },
    accent: {
      primary: "#60a5fa",
      dark: "#346eb6",
      hover: "#82baff",
    },
    danger: {
      primary: "#ef4444",
      dark: "#7f1d1d",
      light: "#fecaca",
      dim: "#fca5a5",
    },
    tag: {
      background: "#1a2a3a",
      border: "#3071c1",
    },
    genre: {
      background: "#252525",
      border: "#383838",
      borderHover: "#555555",
      selected: "rgba(19, 38, 207, 0.05)",
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "40px",
  },

  borderRadius: {
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    full: "9999px",
  },

  fontSize: {
    xs: "11px",
    sm: "12px",
    base: "13px",
    md: "14px",
    lg: "15px",
    xl: "18px",
    "2xl": "20px",
    "3xl": "28px",
    "4xl": "32px",
  },

  fontWeight: {
    normal: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    extrabold: "800",
  },

  shadows: {
    sm: "0 1px 8px rgba(0,0,0,0.4)",
    md: "0 4px 12px rgba(0,0,0,0.6)",
    lg: "0 8px 24px rgba(0,0,0,0.5)",
    xl: "0 8px 24px rgba(0,0,0,0.4)",
  },

  transitions: {
    fast: "0.1s ease",
    normal: "0.15s ease",
    slow: "0.3s ease",
  },

  layout: {
    maxWidth: "1100px",
    padding: "40px",
    mobilePadding: "16px",
  },
} as const;

export const getResponsivePadding = () => {
  if (typeof window !== "undefined" && window.innerWidth < 640) {
    return theme.layout.mobilePadding;
  }
  return theme.layout.padding;
};

export type Theme = typeof theme;
