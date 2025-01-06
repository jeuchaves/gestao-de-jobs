import {
  Box,
  Button,
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
import { PersonAddRounded } from "@mui/icons-material";
import { DialogAddUser } from "./components/DialogAddUser";

export const PageUsers = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const fetchUsers = () => {
    UserServices.getAll({ page: 1, limit: 10, filter: "" }).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setUsers(response);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCloseDialogAddUser = (updated: boolean) => {
    setOpen(false);
    setSelectedUser(null);
    if (updated) fetchUsers();
  };

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setOpen(true);
  };

  return (
    <BaseLayout>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h3">Usuários</Typography>
        <Button
          startIcon={<PersonAddRounded />}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Adicionar novo
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Setor</TableCell>
              <TableCell>Função</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.nomeCompleto}</TableCell>
                <TableCell>{user.sector}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEditUser(user)}
                  >
                    Editar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <DialogAddUser
        open={open}
        onClose={handleCloseDialogAddUser}
        user={selectedUser}
      />
    </BaseLayout>
  );
};
