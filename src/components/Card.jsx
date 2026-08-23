import React from "react";
import { colors } from "../tokens/colors.js";

/**
 * Juthur content card — Paper background, GOLD rule border, INK text.
 */
export function Card({ children }) {
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
