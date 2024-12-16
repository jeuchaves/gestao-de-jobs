import React, { useEffect, useState } from "react";
import { JobsServices } from "../../../services/api/jobs/JobsServices";
import { IJob } from "../../../types/jobs";
import {
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { timeSinceDate } from "../../../utils/dateUtils";
import {
  DeleteRounded,
  LibraryAddCheckRounded,
  PersonRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { DialogFinishJob } from "./components/DialogFinishJob";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { DialogAddJobs } from "../../../components/dialog-add-jobs/DialogAddJobs";
import { DialogConfirmDelete } from "./components/DialogConfirmDelete";

// Função utilitária para agrupar jobs por nDoc
const groupJobsByNDoc = (jobs: IJob[]) => {
  return jobs.reduce((acc: Record<string, IJob[]>, job) => {
    if (!acc[job.nDoc]) {
      acc[job.nDoc] = [];
    }
    acc[job.nDoc].push(job);
    return acc;
  }, {});
};

export const PageJobs = () => {
  const [groupedJobs, setGroupedJobs] = useState<Record<string, IJob[]>>({});
  const [filter, setFilter] = useState<"all" | "completed">("all");

  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAddJob, setOpenDialogAddJob] = useState(false);
  const [openDialogDeleteJob, setOpenDialogDeleteJob] = useState(false);
  const [selectedJobForDelete, setSelectedJobForDelete] = useState<
    number | null
  >(null);

  const fetchJobs = () => {
    const props = filter === "all" ? {} : { completed: true };
    JobsServices.getAll(props).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setGroupedJobs(groupJobsByNDoc(response));
    });
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

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

  const renderActions = (jobId: number) => (
    <Box
      sx={{ display: "flex", gap: 1, flexWrap: "wrap", alignItems: "center" }}
    >
      <IconButton size="small">
        <VisibilityRounded color="info" fontSize="small" />
      </IconButton>
      {filter === "all" ? (
        <IconButton
          onClick={() => handleOpenDialogFinishJob(jobId)}
          size="small"
        >
          <LibraryAddCheckRounded color="success" fontSize="small" />
        </IconButton>
      ) : null}
      <IconButton size="small" onClick={() => handleOpenDialogDeleteJob(jobId)}>
        <DeleteRounded color="error" fontSize="small" />
      </IconButton>
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
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° Doc</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Projeto</TableCell>
              <TableCell>Prazo</TableCell>
              <TableCell>Responsável</TableCell>
              <TableCell>Concluir</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(groupedJobs).map(([nDoc, jobs]) => (
              <React.Fragment key={nDoc}>
                {/* Título do grupo */}
                <TableRow>
                  <TableCell colSpan={6} sx={{ backgroundColor: "#f0f0f0" }}>
                    <Typography variant="h6">N° Doc: {nDoc}</Typography>
                  </TableCell>
                </TableRow>
                {/* Renderização dos jobs do grupo */}
                {jobs.map((job) => {
                  const prazo = timeSinceDate(job.deadline);
                  return (
                    <TableRow key={job.id}>
                      <TableCell>{job.nDoc}</TableCell>
                      <TableCell>{job.title}</TableCell>
                      <TableCell>{job.project}</TableCell>
                      <TableCell
                        sx={{
                          color: prazo.isLate ? "error.main" : "success.main",
                        }}
                      >
                        {prazo.text}
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={<PersonRounded />}
                          label={job.responsibleName}
                        />
                      </TableCell>
                      <TableCell>{renderActions(job.id)}</TableCell>
                    </TableRow>
                  );
                })}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
