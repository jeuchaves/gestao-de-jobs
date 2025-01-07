import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  DeleteRounded,
  EditRounded,
  LibraryAddCheckRounded,
  PersonRounded,
  VisibilityRounded,
} from "@mui/icons-material";

import { DialogAddJobs } from "../../../components/dialog-add-jobs/DialogAddJobs";
import { DialogUpdateResponsible } from "./components/DialogUpdateResponsible";
import { JobsServices } from "../../../services/api/jobs/JobsServices";
import { DialogConfirmDelete } from "./components/DialogConfirmDelete";
import { DialogFinishJob } from "./components/DialogFinishJob";
import {
  convertMinutesToHoursAndMinutes,
  timeSinceDate,
} from "../../../utils/dateUtils";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { IJob } from "../../../types/jobs";
import { DialogShowJob } from "./components/DialogShowJob";
import { format } from "date-fns";
import { IUser } from "../../../types/users";
import { UserServices } from "../../../services/api/users/UserServices";

export const PageJobs = () => {
  const [filter, setFilter] = useState<"all" | "completed">("all");
  const [jobs, setJobs] = useState<IJob[]>([]);

  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAddJob, setOpenDialogAddJob] = useState(false);
  const [openDialogDeleteJob, setOpenDialogDeleteJob] = useState(false);
  const [selectedJobForDelete, setSelectedJobForDelete] = useState<
    number | null
  >(null);

  const [openDialogUpdateResponsible, setOpenDialogUpdateResponsible] =
    useState(false);
  const [selectedJobForUpdateResponsible, setSelectedJobForUpdateResponsible] =
    useState<number | null>(null);

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

  // Mostrar job
  const [selectedJobForShow, setSelectedJobForShow] = useState<IJob | null>(
    null,
  );
  const [openDialogShowJob, setOpenDialogShowJob] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const handleOpenDialogShowJob = (job: IJob) => {
    setSelectedJobForShow(job);
    setOpenDialogShowJob(true);
  };
  const handleCloseDialogShowJob = () => {
    setSelectedJobForShow(null);
    setOpenDialogShowJob(false);
  };

  const handleSelectUser = (id: number) => {
    setSelectedUserId(id);
    handleClose();
  };
  // Fim mostrar job

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

  const handleOpenDialogFinishJob = (id: number) => {
    setSelectedJob(id);
    setOpenDialog(true);
  };
  const handleCloseDialogFinishJob = (update: boolean) => {
    setOpenDialog(false);
    if (update) fetchJobs();
  };

  const handleCloseDialogAddJob = (updated: boolean) => {
    setOpenDialogAddJob(false);
    if (updated) fetchJobs();
  };

  const handleOpenDialogDeleteJob = (id: number) => {
    setSelectedJobForDelete(id);
    setOpenDialogDeleteJob(true);
  };

  const handleCloseDialogDeleteJob = (update: boolean) => {
    setOpenDialogDeleteJob(false);
    if (update) fetchJobs();
  };

  const handleOpenDialogUpdateResponsible = (id: number) => {
    setSelectedJobForUpdateResponsible(id);
    setOpenDialogUpdateResponsible(true);
  };

  const handleCloseDialogUpdateResponsible = (update: boolean) => {
    setOpenDialogUpdateResponsible(false);
    if (update) fetchJobs();
  };

  const renderActions = (job: IJob) => (
    <Box
      sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}
    >
      <Tooltip title="Visualizar job" placement="top">
        <IconButton size="small" onClick={() => handleOpenDialogShowJob(job)}>
          <VisibilityRounded color="info" fontSize="small" />
        </IconButton>
      </Tooltip>
      {filter === "all" ? (
        <>
          <Tooltip title="Alterar responsável" placement="top">
            <IconButton
              size="small"
              onClick={() => handleOpenDialogUpdateResponsible(job.id)}
            >
              <EditRounded color="warning" fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Finalizar job" placement="top">
            <IconButton
              onClick={() => handleOpenDialogFinishJob(job.id)}
              size="small"
            >
              <LibraryAddCheckRounded color="success" fontSize="small" />
            </IconButton>
          </Tooltip>
        </>
      ) : null}
      <Tooltip title="Excluir job" placement="top">
        <IconButton
          size="small"
          onClick={() => handleOpenDialogDeleteJob(job.id)}
        >
          <DeleteRounded color="error" fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <BaseLayout>
      <DialogFinishJob
        open={openDialog}
        onClose={handleCloseDialogFinishJob}
        jobId={selectedJob}
      />
      <DialogAddJobs
        open={openDialogAddJob}
        onClose={handleCloseDialogAddJob}
      />
      <DialogConfirmDelete
        open={openDialogDeleteJob}
        onClose={handleCloseDialogDeleteJob}
        id={selectedJobForDelete}
      />
      <DialogUpdateResponsible
        open={openDialogUpdateResponsible}
        onClose={handleCloseDialogUpdateResponsible}
        id={selectedJobForUpdateResponsible}
      />
      <DialogShowJob
        open={openDialogShowJob}
        onClose={handleCloseDialogShowJob}
        job={selectedJobForShow}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Jobs
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button onClick={() => setOpenDialogAddJob(true)}>
            Adicionar novo job
          </Button>
          <Button
            variant={filter === "all" ? "contained" : "outlined"}
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "completed" ? "contained" : "outlined"}
            onClick={() => setFilter("completed")}
          >
            Concluídos
          </Button>
          <Button variant="outlined" onClick={handleClick}>
            {selectedUserId
              ? users.find((v) => v.id === selectedUserId)?.nomeCompleto
              : "Por Responsável"}
          </Button>
          <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
            {users.map((user) => (
              <MenuItem key={user.id} onClick={() => handleSelectUser(user.id)}>
                {user.nomeCompleto}
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° Doc</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Projeto</TableCell>
              <TableCell>{filter === "all" ? "Prazo" : "Conclusão"}</TableCell>
              <TableCell>Responsável</TableCell>
              <TableCell>Concluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => {
              const prazo = timeSinceDate(job.deadline);
              return (
                <TableRow key={job.id}>
                  <TableCell>{job.nDoc}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.project}</TableCell>
                  <TableCell>
                    {filter === "all" ? (
                      <Box
                        sx={{
                          color: prazo.isLate ? "error.main" : "success.main",
                        }}
                      >
                        {prazo.text}
                      </Box>
                    ) : (
                      <Box>
                        {format(new Date(job.updated_at), "dd/MM/yyyy") +
                          ` (${convertMinutesToHoursAndMinutes(job.timeSheet).hours}h${convertMinutesToHoursAndMinutes(job.timeSheet).minutes}m)`}
                      </Box>
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<PersonRounded />}
                      label={job.responsibleName}
                    />
                  </TableCell>
                  <TableCell>{renderActions(job)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
