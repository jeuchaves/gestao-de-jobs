import { List, Paper } from "@mui/material";
import { FC, ReactNode } from "react";

interface IStyledTableProps {
  children?: ReactNode;
}

export const StyledTable: FC<IStyledTableProps> = ({ children }) => {
  return (
    <Paper sx={{ my: 2, px: 2 }}>
      <List>{children}</List>
    </Paper>
  );
};
