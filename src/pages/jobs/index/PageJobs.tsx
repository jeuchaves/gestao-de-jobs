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

  useEffect(() => {
    JobsServices.getAll({}).then((response) => {
      if (response instanceof Error) {
        console.error(response.message);
        return;
      }
      setJobs(response);
    });
  }, []);

  return (
    <Container sx={{ py: 4 }}>
      <DialogFinishJob open={true} onClose={() => {}} />
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
                    <IconButton>
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
