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
  // UPDATED (23 Aug 2026): synced to the actual production red used in the
  // Masar Operating System tool (#A6192E) — a real deployed color, more
  // authoritative than the earlier standard-school-red placeholder. Gold
  // accent also synced to Masar's corrected gold (was mistakenly grey there
  // too, fixed in the same review pass). Still worth a final check against
  // an official ASD Communications brand guide if one exists.
  asdInstitutional: {
    name: "ASD Institutional",
    colors: {
      ink: "#A6192E", // ASD Red — from Masar (production use), Pantone-adjacent maroon-red
      ink70: "#7E1322", // Masar's --ink-deep
      gold: "#B8923A", // Masar's corrected --gold
      goldSoft: "#E7C570", // Masar's corrected --gold-soft
      accent: "#2B2B2B", // Falcons dark grey/black
      paper: "#F8F1E3", // Masar's warm parchment paper, not pure white
      rule: "#DECFAE",
    },
    typography: {
      arabic: { fontFamily: "'Amiri', serif", direction: "rtl", lineHeightWithTashkeel: 1.8 },
      latin: { fontFamily: "'Spectral', 'EB Garamond', Georgia, serif", direction: "ltr", lineHeight: 1.5 },
    },
  },
};

export default themes;
