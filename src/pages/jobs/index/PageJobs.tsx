import { useEffect, useState } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@mui/material";
import {
  ExpandCircleDownRounded,
  PersonRounded,
  PostAddRounded,
} from "@mui/icons-material";

import { DialogAddJobs } from "../../../components/dialog-add-jobs/DialogAddJobs";
import { JobsServices } from "../../../services/api/jobs/JobsServices";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { IJob } from "../../../types/jobs";
import { IUser } from "../../../types/users";
import { UserServices } from "../../../services/api/users/UserServices";
import { JobDisplay } from "../../../components/job-display/JobDisplay";

export const PageJobs = () => {
  const [filter, setFilter] = useState<"all" | "completed">("all");
  const [jobs, setJobs] = useState<IJob[]>([]);

  const [openDialogAddJob, setOpenDialogAddJob] = useState(false);

  // Menu de filtrar por responsável
  const [users, setUsers] = useState<IUser[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fetchJobs = () => {
    const props = filter === "all" ? {} : { completed: true };
    JobsServices.getAll({
      userId: selectedUserId ? selectedUserId : undefined,
      completed: props.completed,
    }).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setJobs(response);
    });
  };

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleSelectUser = (id: number) => {
    setSelectedUserId(id);
    handleClose();
  };

  useEffect(() => {
    fetchJobs();
    UserServices.getAll({}).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setUsers(response);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, selectedUserId]);

  // Dialog de concluir job

  // Dialog de adicionar job
  const handleCloseDialogAddJob = (updated: boolean) => {
    setOpenDialogAddJob(false);
    if (updated) fetchJobs();
  };

  // Dialog de deletar job

  // Dialog de atualizar responsável do job

  const toggleFilter = () => {
    setFilter(filter === "all" ? "completed" : "all");
  };

  return (
    <BaseLayout>
      {/* Título */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h1" sx={{ color: "text.secondary" }}>
            Jobs
          </Typography>
          <Typography sx={{ color: "text.secondary" }}>
            A lista de jobs do time está aqui
          </Typography>
        </Box>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            onClick={() => setOpenDialogAddJob(true)}
            variant="contained"
            size="large"
            color="secondary"
            startIcon={<PostAddRounded />}
            sx={{ color: "primary.light", textTransform: "none" }}
          >
            Adicionar novo job
          </Button>
          <Button
            variant="contained"
            sx={{ bgcolor: "primary.light" }}
            endIcon={<ExpandCircleDownRounded />}
            size="large"
            onClick={toggleFilter}
          >
            {filter === "all" ? "Todos" : "Concluídos"}
          </Button>
          <Button
            variant="contained"
            onClick={handleClick}
            sx={{ bgcolor: "primary.light" }}
            size="large"
            endIcon={<PersonRounded />}
          >
            {selectedUserId
              ? users.find((v) => v.id === selectedUserId)?.nomeCompleto
              : "Responsável"}
          </Button>
        </Box>
        <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
          <MenuItem onClick={() => setSelectedUserId(null)}>Todos</MenuItem>
          {users.map((user) => (
            <MenuItem key={user.id} onClick={() => handleSelectUser(user.id)}>
              {user.nomeCompleto}
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <JobDisplay jobs={jobs} view="list" onChange={fetchJobs} />
      <DialogAddJobs
        open={openDialogAddJob}
        onClose={handleCloseDialogAddJob}
      />
    </BaseLayout>
  );
};
