import { useState } from "react";
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
  Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import { parse, format } from "date-fns";

import { IStepsProps } from "../AddJobs";
import { parseFile } from "../../../../services/parsers/parseCsv";

interface ICsvData {
  n__doc: number;
  tipo_doc: string;
  titulo: string;
  projeto: string;
  status: string;
  situacao_do_job: string;
  prazo: string;
}

export const UploadCsv: React.FC<
  Pick<IStepsProps, "handleNext" | "saveData">
> = ({ handleNext, saveData }) => {
  const [csvData, setCsvData] = useState<ICsvData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    setIsLoading(true);
    const file = acceptedFiles[0];
    try {
      const data = await parseFile<ICsvData>(file);
      setCsvData(data);
    } catch (error) {
      console.error("Erro ao processar o arquivo: ", error);
    }
    setIsLoading(false);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/xml": [".xml"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
        ".xls",
      ],
    },
  });

  const convertDate = (dateString: string): string => {
    const parsedDate = parse(dateString, "dd/MM/yyyy", new Date());
    return format(parsedDate, "yyyy-MM-dd");
  };

  const handleNextStep = () => {
    saveData(
      csvData.map((row) => ({
        nDoc:
          typeof row.n__doc === "number" ? row.n__doc.toString() : row.n__doc,
        typeDoc: row.tipo_doc,
        title: row.titulo,
        project: row.projeto,
        status: row.status,
        jobSituation: row.situacao_do_job,
        deadline: convertDate(row.prazo),
      })),
    );
    handleNext();
  };

  return (
    <>
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
            <Typography textAlign="center">Solte o arquivo aqui...</Typography>
          ) : (
            <Typography textAlign="center">
              Arraste e solte o arquivo CSV aqui, ou clique para selecionar o
              arquivo
            </Typography>
          )}
        </Box>
      </Box>
      {csvData.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6">
            Quantidade de jobs para adicionar:{" "}
            {csvData.length > 0 ? csvData.length : 0}
          </Typography>
        </Box>
      )}
      <Box sx={{ display: "flex", justifyContent: "end", mt: 4, gap: 2 }}>
        <Button
          variant="contained"
          onClick={handleNextStep}
          disabled={isLoading}
        >
          Continuar
        </Button>
      </Box>
    </>
  );
};
