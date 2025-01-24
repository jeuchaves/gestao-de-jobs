import { Box } from "@mui/material";
import { MenuLateral } from "../components/menu-lateral/MenuLateral";
import { FC, ReactNode } from "react";

interface IBaseLayoutProps {
  children?: ReactNode;
}

export const BaseLayout: FC<IBaseLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <MenuLateral />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
