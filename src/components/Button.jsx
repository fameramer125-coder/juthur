import React from "react";
import { themes } from "../tokens/themes.js";

/**
 * Theme-aware button. Pass `theme="juthurCore" | "academicNeutral" | "asdInstitutional"`
 * to switch audience — defaults to Juthur Core.
 */
export function Button({ children, variant = "primary", theme = "juthurCore", ...props }) {
  const { colors } = themes[theme] ?? themes.juthurCore;

  const styles = {
    primary: {
      backgroundColor: colors.ink,
      color: colors.paper,
      border: `1px solid ${colors.ink}`,
    },
    secondary: {
      backgroundColor: "transparent",
      color: colors.ink,
      border: `1px solid ${colors.accent ?? colors.gold ?? colors.ink}`,
    },
  };

  const hoverColor = colors.accent ?? colors.gold ?? colors.ink70;

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
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = styles[variant].backgroundColor)
      }
    >
      {children}
    </button>
  );
}

export default Button;
