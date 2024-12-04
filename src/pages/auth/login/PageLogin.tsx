import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

export const PageLogin = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Fazer login
      </Typography>
      <Box
        component={Paper}
        sx={{ p: 4, display: "flex", flexDirection: "column", gap: 2 }}
      >
        <TextField label="E-mail" />
        <TextField label="Senha" />
        <Button variant="contained">Entrar</Button>
      </Box>
    </Container>
  );
};
