import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { useEffect, useState } from "react";
import { UserServices } from "../../../services/api/users/UserServices";
import { IUser } from "../../../types/users";

export const PageUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    UserServices.getAll({ page: 1, limit: 10, filter: "" }).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setUsers(response);
    });
  }, []);

  return (
    <BaseLayout>
      <Typography variant="h3" mb={4}>
        Usuários
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Setor</TableCell>
              <TableCell>Função</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nomeCompleto}</TableCell>
                <TableCell>{user.sector}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
