import React from "react";
import { themes } from "../tokens/themes.js";

/**
 * Theme-aware Arabic heading. `theme` picks the audience palette/typography;
 * `hasTashkeel` controls line-height per the fixed rule (>= project minimum with diacritics).
 */
export function ArabicHeading({ children, level = 1, hasTashkeel = true, theme = "juthurCore" }) {
  const { colors, typography } = themes[theme] ?? themes.juthurCore;
  const Tag = `h${level}`;
  return (
    <Tag
      dir={typography.arabic.direction}
      style={{
        fontFamily: typography.arabic.fontFamily,
        lineHeight: hasTashkeel
          ? typography.arabic.lineHeightWithTashkeel
          : 1.6,
        color: colors.ink,
        margin: 0,
      }}
    >
      {children}
    </Tag>
  );
}

export default ArabicHeading;
