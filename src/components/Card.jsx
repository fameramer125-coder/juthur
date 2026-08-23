import React from "react";
import { themes } from "../tokens/themes.js";

/**
 * Theme-aware content card. Works identically across all three audiences.
 */
export function Card({ children, theme = "juthurCore" }) {
  const { colors } = themes[theme] ?? themes.juthurCore;
  return (
    <div
      style={{
        backgroundColor: colors.paper,
        border: `1px solid ${colors.rule}`,
        borderRadius: "4px",
        padding: "1.5rem",
        color: colors.ink,
      }}
    >
      {children}
    </div>
  );
}

export default Card;
