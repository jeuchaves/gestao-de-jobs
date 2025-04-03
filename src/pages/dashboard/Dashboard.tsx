import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import { BaseLayout } from "../../layouts/BaseLayout";
import { endOfMonth, startOfMonth, subMonths } from "date-fns";
import { GeneralInfo } from "./components/general-info/GeneralInfo";
import { JobsByResponsible } from "./components/jobs-by-responsible/JobsByResponsible";
import { PersonOutline } from "@mui/icons-material";
import { Progression } from "./components/progression/Progression";
import { useEffect, useState } from "react";
import { UserServices } from "../../services/api/users/UserServices";
import { IUser } from "../../types/users";

const props = {
  startDate: startOfMonth(new Date()).toISOString().split("T")[0],
  endDate: endOfMonth(new Date()).toISOString().split("T")[0],
  startDateComparison: startOfMonth(subMonths(new Date(), 1))
    .toISOString()
    .split("T")[0],
  endDateComparison: endOfMonth(subMonths(new Date(), 1))
    .toISOString()
    .split("T")[0],
};

export const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<IUser>();

  useEffect(() => {
    UserServices.getAll({}).then((response) => {
      if (response instanceof Error) {
        console.error("Erro ao buscar usuários", response.message);
        return;
      }
      setUsers(response);
    });
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectUser = (user: IUser) => {
    setSelectedUser(user);
    setAnchorEl(null);
  };

  const handleSelectGeneralProgress = () => {
    setSelectedUser(undefined);
    setAnchorEl(null);
  };

  return (
    <BaseLayout>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Box>
          <Typography variant="h1" sx={{ color: "text.secondary" }}>
            Dashboard
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            Acompanhe aqui suas evoluções tanto individual quanto em equipe.
          </Typography>
        </Box>
        <Button
          id="user-button"
          size="large"
          variant="contained"
          color="secondary"
          endIcon={<PersonOutline />}
          onClick={handleClick}
          aria-controls={open ? "user-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {selectedUser ? selectedUser.nomeCompleto : "Progresso Geral"}
        </Button>
        <Menu
          id="user-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "user-button",
          }}
        >
          <MenuItem onClick={handleSelectGeneralProgress}>
            Progresso Geral
          </MenuItem>
          {users.map((user) => (
            <MenuItem onClick={() => handleSelectUser(user)} key={user.id}>
              {user.nomeCompleto}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <GeneralInfo responsibleId={selectedUser?.id} />
      <Progression />
      <JobsByResponsible filter={props} />
    </BaseLayout>
  );
};
