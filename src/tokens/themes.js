// Unified design system across all of Dr. Amer's work — three themes sharing
// one component library. Each theme swaps palette + typography; components
// stay identical. Pick by audience, not by project.

import { colors as juthurColors } from "./colors.js";

export const themes = {
  // Default. Juthur books, website, brand-facing material.
  juthurCore: {
    name: "Juthur Core",
    colors: juthurColors,
    typography: {
      arabic: { fontFamily: "'Amiri', serif", direction: "rtl", lineHeightWithTashkeel: 2.0 },
      latin: { fontFamily: "'EB Garamond', serif", direction: "ltr", lineHeight: 1.5 },
    },
  },

  // Research papers, the Research Hub, conference materials — neutral,
  // journal-appropriate, no brand color pressure.
  academicNeutral: {
    name: "Academic Neutral",
    colors: {
      ink: "#1A1A1A",
      ink70: "#4D4D4D",
      accent: "#1B3A2F", // Juthur INK reused as a single restrained accent
      paper: "#FFFFFF",
      rule: "#D0D0D0",
    },
    typography: {
      arabic: { fontFamily: "'Amiri', serif", direction: "rtl", lineHeightWithTashkeel: 1.8 },
      latin: { fontFamily: "'Times New Roman', serif", direction: "ltr", lineHeight: 1.5 },
    },
  },

  // ASD department documents, lectures, student worksheets — institutional,
  // legible at a glance, classroom-appropriate.
  // Sourced from confirmed ASD brand facts (23 Aug 2026): primary Red + White
  // (logo, uniform, official print), Falcons athletics identity adds
  // dark grey/black. Exact HEX not yet confirmed against an official brand
  // guide — this is a reasonable standard-school-red placeholder; replace
  // with the verified HEX if/when the official guide or logo file is available.
  asdInstitutional: {
    name: "ASD Institutional",
    colors: {
      ink: "#C8102E", // ASD Red — PLACEHOLDER, verify against official brand guide
      ink70: "#7A0A1C",
      accent: "#2B2B2B", // Falcons dark grey/black
      paper: "#FFFFFF", // ASD White — confirmed primary
      rule: "#D9D9D9",
    },
    typography: {
      arabic: { fontFamily: "'Amiri', serif", direction: "rtl", lineHeightWithTashkeel: 1.8 },
      latin: { fontFamily: "system-ui, sans-serif", direction: "ltr", lineHeight: 1.5 },
    },
  },
};

export default themes;
