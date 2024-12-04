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
import { useEffect, useMemo, useState } from "react";
import { UserServices } from "../../../../services/api/users/UserServices";
import { IUser } from "../../../../types/users";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

interface IFormValues {
  responsibleId: number[];
}

export const SelectResponsible: React.FC<IStepsProps> = ({
  handleBack,
  handleNext,
  saveData,
  getData,
}) => {
  const [usersOptions, setUsersOptions] = useState<IUser[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      responsibleId: [],
    },
  });

  useEffect(() => {
    UserServices.getAll({}).then((response) => {
      if (response instanceof Error) {
        console.error(response);
        return;
      }
      setUsersOptions(response);
    });
  }, []);

  const data = getData();

  const onSubmit: SubmitHandler<IFormValues> = (formData) => {
    const hasEmptyFields = formData.responsibleId.some((item) => !item);
    if (hasEmptyFields) {
      alert("Preencha todos os campos");
      return;
    }

    saveData(
      data.map((item, index) => ({
        ...item,
        responsible: formData.responsibleId[index],
      })),
    );

    handleNext();
  };

  const renderTableRows = useMemo(
    () =>
      data.map((row, index) => (
        <TableRow key={index}>
          <TableCell>{row.nDoc}</TableCell>
          <TableCell>{row.title}</TableCell>
          <TableCell>{row.project}</TableCell>
          <TableCell>
            <Controller
              control={control}
              name={`responsibleId.${index}`}
              rules={{ required: "Campo obrigatório" }}
              render={({ field }) => (
                <Autocomplete
                  {...field}
                  options={usersOptions}
                  getOptionLabel={(option) => option.nomeCompleto || ""}
                  isOptionEqualToValue={(option, value) =>
                    option.id === value.id
                  }
                  onChange={(_, value) => field.onChange(value?.id)}
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.nomeCompleto}
                    </li>
                  )}
                  value={
                    usersOptions.find((user) => user.id === field.value) || null
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Responsável"
                      sx={{ width: 200 }}
                      error={!!errors.responsibleId?.[index]}
                      helperText={errors.responsibleId?.[index]?.message}
                    />
                  )}
                />
              )}
            />
          </TableCell>
        </TableRow>
      )),
    [data, usersOptions, control, errors.responsibleId],
  );

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" gutterBottom>
        Selecionar responsáveis
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
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
            <TableBody>{renderTableRows}</TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ display: "flex", justifyContent: "end", mt: 4, gap: 2 }}>
          <Button onClick={handleBack}>Voltar</Button>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
