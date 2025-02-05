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
        lineHeight: 1.3,
      },
      h2: {
        fontSize: "2.25rem",
        lineHeight: 1.3,
      },
      h3: {
        fontSize: "1.69rem",
        lineHeight: 1.3,
      },
      h4: {
        fontSize: "1.27rem",
        lineHeight: 1.3,
      },
      h5: {
        fontSize: "0.95rem",
        lineHeight: 1.3,
      },
      h6: {
        fontSize: "0.71rem",
        lineHeight: 1.3,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 64,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 24,
            "&.MuiDrawer-paper": {
              borderRadius: 0,
            },
          },
        },
      },
    },
  }),
);
