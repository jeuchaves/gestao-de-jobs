import {
  Autocomplete,
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
  TextField,
  Typography,
} from "@mui/material";
import { IStepsProps } from "../AddJobs";
import { useEffect, useState } from "react";
import { UserServices } from "../../../services/api/users/UserServices";
import { IUser } from "../../../types/users";

export const SelectResponsible: React.FC<IStepsProps> = ({
  handleBack,
  handleNext,
  saveData,
  getData,
}) => {
  const [usersOptions, setUsersOptions] = useState<IUser[]>([]);

  useEffect(() => {
    UserServices.getAll({}).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      console.log(response);
      setUsersOptions(response);
    });
  }, []);

  if (!getData) {
    window.alert("Erro ao obter os dados");
    handleBack();
    return null;
  }

  const data = getData();

  const handleNextStep = () => {
    if (saveData) {
      saveData(
        data.map(() => ({
          responsible: "teste",
        })),
      );
    }
    handleNext();
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Selecionar responsáveis
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N° Doc</TableCell>
              <TableCell>Título</TableCell>
              <TableCell>Projeto</TableCell>
              <TableCell>Responsável</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.nDoc}</TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.project}</TableCell>
                <TableCell>
                  <Autocomplete
                    options={usersOptions || []}
                    getOptionLabel={(option) => option.nomeCompleto}
                    renderOption={(props, option) => (
                      <li {...props} key={option.id}>
                        {option.nomeCompleto}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Responsável"
                        sx={{ width: 200 }}
                      />
                    )}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ display: "flex", justifyContent: "end", mt: 4, gap: 2 }}>
        <Button onClick={handleBack}>Voltar</Button>
        <Button variant="contained" onClick={handleNextStep}>
          Enviar
        </Button>
      </Box>
    </Container>
  );
};
