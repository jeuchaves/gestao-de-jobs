import { FC } from "react";
import { IJob } from "../../../types/jobs";
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
} from "@mui/material";

interface IJobTableProps {
  jobs: IJob[];
}

export const JobTable: FC<IJobTableProps> = ({ jobs }) => {
  const handleRowClick = (job: IJob) => {
    console.log("Row clicked", job);
  };

  const handleEditClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    job: IJob,
  ) => {
    e.stopPropagation();
    console.log("Edit clicked", job);
  };

  const handleDeleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    job: IJob,
  ) => {
    e.stopPropagation();
    console.log("Delete clicked", job);
  };

  const handleCompleteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    job: IJob,
  ) => {
    e.stopPropagation();
    console.log("Complete clicked", job);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>N° Doc</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Projeto</TableCell>
            <TableCell>Prazo</TableCell>
            <TableCell>Responsável</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow
              key={job.id}
              hover
              sx={{ cursor: "pointer" }}
              onClick={() => handleRowClick(job)}
            >
              <TableCell>{job.nDoc}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>{job.project}</TableCell>
              <TableCell>{job.deadline}</TableCell>
              <TableCell>{job.responsibleName}</TableCell>
              <TableCell>
                <Box>
                  <Button onClick={(e) => handleEditClick(e, job)}>
                    Editar
                  </Button>
                  <Button onClick={(e) => handleCompleteClick(e, job)}>
                    Finalizar
                  </Button>
                  <Button onClick={(e) => handleDeleteClick(e, job)}>
                    Excluir
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
