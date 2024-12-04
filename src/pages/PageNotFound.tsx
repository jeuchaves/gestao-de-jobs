import { Button, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const PageNotFound = () => {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Página não encontrada
      </Typography>
      <Link to="/">
        <Button variant="contained">Voltar para página inicial</Button>
      </Link>
    </Container>
  );
};
