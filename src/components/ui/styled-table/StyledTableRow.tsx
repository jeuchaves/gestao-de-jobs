import { Box, Grid2, styled } from "@mui/material";
import { FC, ReactNode } from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  marginBlock: theme.spacing(1),
  borderRadius: "100px",
  backgroundColor: "#C6C6C6",
  overflow: "hidden",
}));

interface IStyledTableRowProps {
  children?: ReactNode;
}

export const StyledTableRow: FC<IStyledTableRowProps> = ({ children }) => {
  return (
    <StyledBox>
      <Grid2 container spacing={2}>
        {children}
      </Grid2>
    </StyledBox>
  );
};
