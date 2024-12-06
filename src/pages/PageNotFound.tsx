import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { BaseLayout } from "../layouts/BaseLayout";

export const PageNotFound = () => {
  return (
    <BaseLayout>
      <Typography variant="h3" gutterBottom>
        Página não encontrada
      </Typography>
      <Link to="/">
        <Button variant="contained">Voltar para página inicial</Button>
      </Link>
    </BaseLayout>
  );
};
