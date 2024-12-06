// PageJobs.tsx

import { useEffect, useState } from "react";
import { JobsServices } from "../../../services/api/jobs/JobsServices";
import { IJob } from "../../../types/jobs";
import {
  Box,
  Button,
  Chip,
  Container,
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

export const PageJobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [filter, setFilter] = useState<"all" | "completed">("all");

  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const props = filter === "all" ? {} : { completed: true };
    JobsServices.getAll(props).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setJobs(response);
    });
  }, [filter]);

  const handleOpenDialog = (id: number) => {
    setSelectedJob(id);
    setOpenDialog(true);
  };

  return (
    <Container sx={{ py: 4 }}>
      <DialogFinishJob
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        jobId={selectedJob}
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
    </Container>
  );
};
