// PageJobs.tsx

import { useEffect, useState } from "react";
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
import { BookmarkAddRounded, PersonRounded } from "@mui/icons-material";
import { DialogFinishJob } from "./components/DialogFinishJob";
import { BaseLayout } from "../../../layouts/BaseLayout";
import { DialogAddJobs } from "../../../components/dialog-add-jobs/DialogAddJobs";

export const PageJobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [filter, setFilter] = useState<"all" | "completed">("all");

  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialogAddJob, setOpenDialogAddJob] = useState(false);

  const fetchJobs = () => {
    const props = filter === "all" ? {} : { completed: true };
    JobsServices.getAll(props).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setJobs(response);
    });
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const handleOpenDialog = (id: number) => {
    setSelectedJob(id);
    setOpenDialog(true);
  };

  const handleCloseDialogAddJob = (updated: boolean) => {
    setOpenDialogAddJob(false);
    if (updated) fetchJobs();
  };

  const handleCloseDialog = (update: boolean) => {
    setOpenDialog(false);
    if (update) fetchJobs();
  };

  return (
    <BaseLayout>
      <DialogFinishJob
        open={openDialog}
        onClose={handleCloseDialog}
        jobId={selectedJob}
      />
      <DialogAddJobs
        open={openDialogAddJob}
        onClose={handleCloseDialogAddJob}
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
            {jobs.map((job) => {
              const prazo = timeSinceDate(job.deadline);
              return (
                <TableRow key={job.id}>
                  <TableCell>{job.nDoc}</TableCell>
                  <TableCell>{job.title}</TableCell>
                  <TableCell>{job.project}</TableCell>
                  <TableCell
                    sx={{ color: prazo.isLate ? "error.main" : "success.main" }}
                  >
                    {prazo.text}
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={<PersonRounded />}
                      label={job.responsibleName}
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpenDialog(job.id)}>
                      <BookmarkAddRounded color="primary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </BaseLayout>
  );
};
