import { Box, Grid2, styled } from "@mui/material";
import { FC, ReactNode } from "react";

const StyledHead = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  paddingInline: theme.spacing(2),
  marginBlock: theme.spacing(1),
  borderBottom: "1px solid #000",
  borderRadius: 0,
}));

interface IStyledTableHeadProps {
  children?: ReactNode;
}

export const StyledTableHead: FC<IStyledTableHeadProps> = ({ children }) => {
  return (
    <StyledHead>
      <Grid2 container spacing={2}>
        {children}
      </Grid2>
    </StyledHead>
  );
};
