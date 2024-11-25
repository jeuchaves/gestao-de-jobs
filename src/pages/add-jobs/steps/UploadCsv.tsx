import {
  Box,
  Button,
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
import { IStepsProps } from "../AddJobs";
import { useDropzone } from "react-dropzone";

export const UploadCsv: React.FC<IStepsProps> = ({
  handleBack,
  handleNext,
}) => {
  const onDrop = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/xml": [".xml"],
    },
  });

  return (
    <Container>
      <Typography variant="h3" gutterBottom>
        Fazer upload do CSV
      </Typography>
      <Typography color="grey.500" gutterBottom>
        Para fazer o upload do arquivo CSV, por favor, siga o padrão apresentado
        abaixo:
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nº Doc</TableCell>
              <TableCell>Tipo Doc</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Projeto</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Situação do Job</TableCell>
              <TableCell>Prazo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>3278.31</TableCell>
              <TableCell>Tarefa</TableCell>
              <TableCell>Campanha Social Novembro - FME</TableCell>
              <TableCell>FME ( Social) CAMPANHA NOVEMBRO</TableCell>
              <TableCell>Criação</TableCell>
              <TableCell>Aberta</TableCell>
              <TableCell>22/11/2024</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box mt={4}>
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed grey",
            borderRadius: 1,
            p: 2,
            minHeight: 200,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            bgcolor: isDragActive ? "grey.200" : "grey.50",
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <Typography>Solte o arquivo aqui...</Typography>
          ) : (
            <Typography>
              Arraste e solte o arquivo CSV aqui, ou clique para selecionar o
              arquivo
            </Typography>
          )}
        </Box>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 4, gap: 2 }}>
        <Button onClick={handleBack}>Voltar</Button>
        <Button variant="contained" onClick={handleNext}>
          Enviar
        </Button>
      </Box>
    </Container>
  );
};
