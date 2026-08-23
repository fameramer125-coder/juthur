import React from "react";
import { colors } from "../tokens/colors.js";

/**
 * Juthur primary button — INK fill, Paper text, GOLD on hover/focus.
 */
export function Button({ children, variant = "primary", ...props }) {
  const styles = {
    primary: {
      backgroundColor: colors.ink,
      color: colors.paper,
      border: `1px solid ${colors.ink}`,
    },
    secondary: {
      backgroundColor: "transparent",
      color: colors.ink,
      border: `1px solid ${colors.gold}`,
    },
  };

  return (
    <button
      {...props}
      style={{
        ...styles[variant],
        fontFamily: "'EB Garamond', serif",
        padding: "0.6rem 1.4rem",
        borderRadius: "2px",
        cursor: "pointer",
        transition: "background-color 150ms ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = colors.gold)}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = styles[variant].backgroundColor)
      }
    >
      {children}
    </button>
  );
}

export default Button;
