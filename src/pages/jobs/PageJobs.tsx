import { useEffect, useState } from "react";
import { JobsServices } from "../../services/api/jobs/JobsServices";
import { IJob } from "../../types/jobs";
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

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
            </TableRow>
          </TableHead>
          <TableBody>
            {jobs.map((job) => (
              <TableRow key={job.id}>
                <TableCell>{job.nDoc}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.deadline}</TableCell>
                <TableCell>{job.responsibleName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
