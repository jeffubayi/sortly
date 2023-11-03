import { PaletteMode } from "@mui/material";
import { Fira_Sans } from "next/font/google";

export const roboto = Fira_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  fallback: ["Helvetica", "Arial", "sans-serif"],
});

export const getDesignTokens = (mode: PaletteMode) => ({
  palette: {
    primary: { main: "#DD2B3B", secondary: "#aab4be" },
    secondary: { main: "#000", secondary: "#aab4be" },
    warning: { main: "#c1004b" },
    contrastText: "#fff",
    divider: "#c8ccd0",
    text: {
      primary: "#000",
      secondary: "#9b1e2f",
    },
    contrast: { main: "#CCF9FF" },
    background: {
      default: "#f7f9fc",
      paper: "#FFFF",
    }
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
    h6: {
      fontSize: "15pt",
    },
    subtitle1: {
      fontSize: "12pt",
    },
    body1: {
      fontSize: "10pt",
    },
  },
});
