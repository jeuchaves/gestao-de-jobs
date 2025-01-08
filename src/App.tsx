import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/AppRoutes";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { DefaultTheme } from "./themes";

export const App = () => {
  return (
    <ThemeProvider theme={DefaultTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};
