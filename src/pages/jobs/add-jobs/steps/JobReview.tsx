import { FC, useState } from "react";
import {
  JobsServices,
  TResultCreateMany,
} from "../../../../services/api/jobs/JobsServices";
import {
  Alert,
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  Snackbar,
  Button,
} from "@mui/material";
import { CancelRounded, CheckCircleRounded } from "@mui/icons-material";
import { IJobCreate } from "../../../../types/jobs";
import { Alert as MuiAlert } from "@mui/material";

interface IJobReviewProps {
  getMessage: () => TResultCreateMany;
  handleNext: () => void;
}

export const JobReview: FC<IJobReviewProps> = ({ getMessage, handleNext }) => {
  const { insertedIds, duplicates } = getMessage();
  const [visibleJobs, setVisibleJobs] = useState<IJobCreate[]>(duplicates);
  const [snackbarQueue, setSnackbarQueue] = useState<
    { message: string; severity: "success" | "info" | "warning" | "error" }[]
  >([]);
  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
    if (snackbarQueue.length > 0) {
      const nextSnackbar = snackbarQueue.shift();
      if (nextSnackbar) {
        setSnackbar({ open: true, ...nextSnackbar });
      }
    }
  };

  const showSnackbar = (
    message: string,
    severity: "success" | "info" | "warning" | "error",
  ) => {
    if (snackbar.open) {
      setSnackbarQueue((prevQueue) => [...prevQueue, { message, severity }]);
    } else {
      setSnackbar({ open: true, message, severity });
    }
  };

  const renderMessage = (size: number) => {
    let message = "";
    switch (size) {
      case 0:
        message = "Nenhum job foi adicionado";
        break;
      case 1:
        message = "Foi adicionado 1 job com sucesso";
        break;
      default:
        message = `Foram adicionados ${size} jobs com sucesso`;
        break;
    }

    return (
      <Alert severity="success" sx={{ mb: 2 }}>
        {message}
      </Alert>
    );
  };

  const handleDeleteJob = (index: number) => {
    setVisibleJobs((prevJobs) => prevJobs.filter((_, i) => i !== index));
    showSnackbar(`Job deletado com sucesso`, "error");
  };

  const handleCreateJob = (job: IJobCreate) => {
    JobsServices.create(job).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        showSnackbar(`Erro ao criar o job ${job.nDoc}`, "error");
      }
      showSnackbar(`Job ${job.nDoc} criado com sucesso`, "success");
      setVisibleJobs((prevJobs) => prevJobs.filter((j) => j.nDoc !== job.nDoc));
    });
  };

  const renderActions = (job: IJobCreate, index: number) => (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      <Tooltip title="Aprovar">
        <IconButton onClick={() => handleCreateJob(job)}>
          <CheckCircleRounded color="success" />
        </IconButton>
      </Tooltip>
      <Tooltip title="Rejeitar">
        <IconButton onClick={() => handleDeleteJob(index)}>
          <CancelRounded color="error" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Revisão de jobs
      </Typography>
      <Box>
        <Typography variant="h4" gutterBottom>
          Jobs adicionados
        </Typography>
        {renderMessage(insertedIds.length)}
        <Typography variant="h4" gutterBottom>
          Jobs duplicados
        </Typography>
        {visibleJobs.length > 0 ? (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>N° Doc</TableCell>
                  <TableCell>Projeto</TableCell>
                  <TableCell>Título</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Ações</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {visibleJobs.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.nDoc}</TableCell>
                    <TableCell>{row.project}</TableCell>
                    <TableCell>{row.title}</TableCell>
                    <TableCell>{row.typeDoc}</TableCell>
                    <TableCell>{renderActions(row, index)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Alert severity="info">Nenhum job duplicado</Alert>
        )}
      </Box>
      <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          size="large"
          disabled={visibleJobs.length > 0}
          onClick={handleNext}
        >
          Salvar
        </Button>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </Box>
  );
};
