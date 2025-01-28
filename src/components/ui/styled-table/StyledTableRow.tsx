import { Box, Grid2, styled } from "@mui/material";
import { FC, ReactNode } from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  paddingInline: theme.spacing(2),
  marginBlock: theme.spacing(1),
  borderRadius: "100px",
  backgroundColor: "#C6C6C6",
  minHeight: "40px",
  display: "flex",
  alignItems: "center",
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
