import { createTheme } from "@mui/material";

export const DefaultTheme = createTheme({
  palette: {
    primary: {
      main: "#1E2159",
      light: "#635EF2",
      contrastText: "#E3E3E3",
    },
    secondary: {
      main: "#C4D977",
    },
    background: {
      default: "#0D0D0D",
    },
  },
  typography: {
    fontFamily: "Cairo, sans-serif",
  },
});
