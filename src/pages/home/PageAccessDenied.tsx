import { Button, Typography } from "@mui/material";
import { BaseLayout } from "../../layouts/BaseLayout";
import { Link } from "react-router-dom";

export const PageAccessDenied = () => {
  return (
    <BaseLayout>
      <Typography variant="h3" gutterBottom>
        Acesso negado
      </Typography>
      <Link to="/">
        <Button variant="contained">Voltar para página inicial</Button>
      </Link>
    </BaseLayout>
  );
};
