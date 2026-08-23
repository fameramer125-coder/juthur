// Juthur Project — typography tokens.
// Arabic: always Amiri, RTL, line-height >= 2.0 when tashkeel is present.
// Latin: EB Garamond. Never mix Eastern and Western numerals within one line.
export const typography = {
  arabic: {
    fontFamily: "'Amiri', serif",
    direction: "rtl",
    lineHeightWithTashkeel: 2.0,
    lineHeightPlain: 1.6,
  },
  latin: {
    fontFamily: "'EB Garamond', serif",
    direction: "ltr",
    lineHeight: 1.5,
  },
};

export default typography;
