import {
  Box,
  Grid2,
  IconButton,
  List,
  Paper,
  styled,
  Typography,
} from "@mui/material";
import {
  CheckCircleOutlineRounded,
  DeleteForeverRounded,
  EditRounded,
} from "@mui/icons-material";

import { BaseLayout } from "../layouts/BaseLayout";

type DataRow = {
  id: string;
  nome: string;
  projeto: string;
  prazo: string;
  responsavel: string;
  prazoClass: "prazoHoje" | "prazoAmanha" | "";
};

const data: DataRow[] = [
  {
    id: "1",
    nome: "Campanha Social Janeiro 2025 – DIB",
    projeto: "DIB SOCIAL – CAMPANHA JANEIRO 2025",
    prazo: "Hoje",
    responsavel: "Ton Soares",
    prazoClass: "prazoHoje",
  },
  {
    id: "2",
    nome: "Campanha Social Janeiro 2025 – DIB",
    projeto: "DIB SOCIAL – CAMPANHA JANEIRO 2025",
    prazo: "Amanhã",
    responsavel: "Ton Soares",
    prazoClass: "prazoAmanha",
  },
  {
    id: "3",
    nome: "Campanha Social Janeiro 2025 – DIB",
    projeto: "DIB SOCIAL – CAMPANHA JANEIRO 2025",
    prazo: "2 dias",
    responsavel: "Ton Soares",
    prazoClass: "",
  },
];

const StyledListItem = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  paddingInline: theme.spacing(2),
  marginBlock: theme.spacing(1),
  borderRadius: "100px",
  backgroundColor: "#C6C6C6",
}));

const StyledHeadList = styled(Paper)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(1),
  paddingInline: theme.spacing(2),
  marginBlock: theme.spacing(1),
  borderBottom: "1px solid #000",
  borderRadius: 0,
}));

export const TestPage = () => {
  return (
    <BaseLayout>
      <Typography variant="h1" sx={{ color: "text.secondary" }}>
        Página de teste
      </Typography>
      <Typography sx={{ color: "text.secondary" }}>
        Um lugar seguro para realizar testes
      </Typography>
      <Box sx={{ my: 2, px: 2 }} component={Paper}>
        <List>
          <StyledHeadList elevation={0}>
            <Grid2
              container
              spacing={2}
              alignItems="center"
              sx={{ width: "100%" }}
            >
              <Grid2 size={1}>
                <Typography>N Doc</Typography>
              </Grid2>
              <Grid2 size={3}>
                <Typography>Nome</Typography>
              </Grid2>
              <Grid2 size={3}>
                <Typography>Projeto</Typography>
              </Grid2>
              <Grid2 size={1}>
                <Typography>Prazo</Typography>
              </Grid2>
              <Grid2 size={2}>
                <Typography>Responsável</Typography>
              </Grid2>
              <Grid2 size={2}>
                <Typography>Editar</Typography>
              </Grid2>
            </Grid2>
          </StyledHeadList>
          {data.map((row, index) => (
            <StyledListItem key={row.id} elevation={0}>
              <Grid2
                container
                spacing={2}
                alignItems="center"
                sx={{ width: "100%" }}
              >
                <Grid2 size={1}>
                  <Typography variant="body2">{`2025.${index + 2}`}</Typography>
                </Grid2>
                <Grid2 size={3}>
                  <Typography variant="body1">{row.nome}</Typography>
                </Grid2>
                <Grid2 size={3}>
                  <Typography variant="body2">{row.projeto}</Typography>
                </Grid2>
                <Grid2 size={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      color:
                        row.prazoClass === "prazoHoje"
                          ? "error.main"
                          : row.prazoClass === "prazoAmanha"
                            ? "info.main"
                            : "text.primary",
                    }}
                  >
                    {row.prazo}
                  </Typography>
                </Grid2>
                <Grid2 size={2}>
                  <Typography variant="body2">{row.responsavel}</Typography>
                </Grid2>
                <Grid2 size={2} sx={{ textAlign: "right" }}>
                  <IconButton>
                    <EditRounded />
                  </IconButton>
                  <IconButton>
                    <CheckCircleOutlineRounded color="success" />
                  </IconButton>
                  <IconButton>
                    <DeleteForeverRounded color="error" />
                  </IconButton>
                </Grid2>
              </Grid2>
            </StyledListItem>
          ))}
        </List>
      </Box>
    </BaseLayout>
  );
};
