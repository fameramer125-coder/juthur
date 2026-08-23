import React from "react";
import { colors } from "../tokens/colors.js";
import { typography } from "../tokens/typography.js";

/**
 * Juthur Arabic heading — Amiri, RTL, INK color, line-height 2.0 for tashkeel.
 */
export function ArabicHeading({ children, level = 1, hasTashkeel = true }) {
  const Tag = `h${level}`;
  return (
    <Tag
      dir={typography.arabic.direction}
      style={{
        fontFamily: typography.arabic.fontFamily,
        lineHeight: hasTashkeel
          ? typography.arabic.lineHeightWithTashkeel
          : typography.arabic.lineHeightPlain,
        color: colors.ink,
        margin: 0,
      }}
    >
      {children}
    </Tag>
  );
}

export default ArabicHeading;
