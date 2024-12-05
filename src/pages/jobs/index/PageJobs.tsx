// PageJobs.tsx

import { useEffect, useState } from "react";
import { JobsServices } from "../../../services/api/jobs/JobsServices";
import { IJob } from "../../../types/jobs";
import {
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
import { BookmarkAddRounded } from "@mui/icons-material";
import { DialogFinishJob } from "./components/DialogFinishJob";

export const PageJobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);

  const [selectedJob, setSelectedJob] = useState<number | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    JobsServices.getAll({}).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setJobs(response);
    });
  }, []);

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
      <Typography variant="h3" gutterBottom>
        Jobs
      </Typography>
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
                  <TableCell>{job.responsibleName}</TableCell>
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
