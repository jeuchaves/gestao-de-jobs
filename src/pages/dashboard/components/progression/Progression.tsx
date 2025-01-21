import { Box, Paper, Typography } from "@mui/material";

export const Progression = () => {
  return (
    <Box mt={4}>
      <Typography variant="h2" sx={{ color: "text.secondary", mb: 2 }}>
        Progressão
      </Typography>
      {/* Gráfico de total de jobs */}
      <Box sx={{ bgcolor: "#1F1F1F", p: 4, mb: 2 }} component={Paper}>
        <Typography variant="h3" sx={{ color: "text.secondary", mb: 1 }}>
          Total de Jobs
        </Typography>
      </Box>
      {/* Gráfico de taxa de alteração */}
      <Box sx={{ bgcolor: "#1F1F1F", p: 4 }} component={Paper}>
        <Typography variant="h3" sx={{ color: "text.secondary", mb: 1 }}>
          Taxa de alteração
        </Typography>
      </Box>
    </Box>
  );
};
