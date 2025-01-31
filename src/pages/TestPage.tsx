import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { BaseLayout } from "../layouts/BaseLayout";

const rows = [
  {
    doc: "2025.2",
    nome: "Campanha Social Janeiro 2025 - DIB",
    projeto: "DIB SOCIAL - CAMPANHA JANEIRO 2025",
    prazo: "Hoje",
    responsavel: "Ton Soares",
  },
  {
    doc: "2025.2",
    nome: "Campanha Social Janeiro 2025 - DIB",
    projeto: "DIB SOCIAL - CAMPANHA JANEIRO 2025",
    prazo: "Amanhã",
    responsavel: "Ton Soares",
  },
  {
    doc: "2025.2",
    nome: "Campanha Social Janeiro 2025 - DIB",
    projeto: "DIB SOCIAL - CAMPANHA JANEIRO 2025",
    prazo: "2 dias",
    responsavel: "Ton Soares",
  },
];

export const TestPage = () => {
  return (
    <BaseLayout>
      <Typography variant="h1" sx={{ color: "text.secondary" }}>
        Página de teste
      </Typography>
      <Typography sx={{ color: "text.secondary" }}>
        Um lugar seguro para realizar testes
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N Doc</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Projeto</TableCell>
              <TableCell>Prazo</TableCell>
              <TableCell>Responsável</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.doc}>
                <TableCell>{row.doc}</TableCell>
                <TableCell>{row.nome}</TableCell>
                <TableCell>{row.projeto}</TableCell>
                <TableCell>{row.prazo}</TableCell>
                <TableCell>{row.responsavel}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
