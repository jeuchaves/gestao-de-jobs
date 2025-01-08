import { createTheme, responsiveFontSizes } from "@mui/material";

export const DefaultTheme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: {
        main: "#1E2159",
        light: "#635EF2",
        contrastText: "#E3E3E3",
      },
      secondary: {
        main: "#C4D977",
        contrastText: "#0D0D0D",
      },
      background: {
        default: "#0D0D0D",
        paper: "#D9D9D9",
      },
      text: {
        primary: "#0D0D0D",
        secondary: "#FFF",
      },
    },
    typography: {
      fontFamily: "Cairo, sans-serif",
      h1: {
        fontSize: "3rem",
        fontWeight: 900,
        lineHeight: 1.2,
      },
    },
  }),
);
