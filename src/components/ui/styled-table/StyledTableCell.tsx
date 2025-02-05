import { Grid2, styled } from "@mui/material";

interface StyledTableCellProps {
  disablePadding?: boolean;
}

export const StyledTableCell = styled(Grid2, {
  shouldForwardProp: (prop) => prop !== "disablePadding",
})<StyledTableCellProps>(({ theme, disablePadding }) => ({
  paddingInline: disablePadding ? 0 : theme.spacing(2),
  paddingBlock: disablePadding ? 0 : theme.spacing(1),
  display: "flex",
  alignItems: "center",
}));
