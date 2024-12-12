import { Box, Grid2, Paper, Typography } from "@mui/material";
import { BaseLayout } from "../../layouts/BaseLayout";

export const Dashboard = () => {
  return (
    <BaseLayout>
      <Typography variant="h3">Dashboard</Typography>
      <Box mt={4}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            gap: 2,
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h5">Visão Geral</Typography>
          </Box>
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 component={Paper} size={{ xs: 12, md: 4 }} sx={{ p: 4 }}>
            <Typography>Total de Jobs</Typography>
            <Typography variant="h4">10</Typography>
          </Grid2>
          <Grid2 component={Paper} size={{ xs: 12, md: 4 }} sx={{ p: 4 }}>
            <Typography>Tempo médio de resolução</Typography>
            <Typography variant="h4">10</Typography>
          </Grid2>
          <Grid2 component={Paper} size={{ xs: 12, md: 4 }} sx={{ p: 4 }}>
            <Typography>Alterações (%)</Typography>
            <Typography variant="h4">10</Typography>
          </Grid2>
          <Grid2 component={Paper} size={{ xs: 12, md: 6 }} sx={{ p: 4 }}>
            <Typography>Total de Jobs</Typography>
          </Grid2>
          <Grid2 component={Paper} size={{ xs: 12, md: 6 }} sx={{ p: 4 }}>
            <Typography>Total de Jobs</Typography>
          </Grid2>
          <Grid2 component={Paper} size={{ xs: 12 }} sx={{ p: 4 }}>
            <Typography>Total de Jobs</Typography>
          </Grid2>
        </Grid2>
      </Box>
    </BaseLayout>
  );
};
